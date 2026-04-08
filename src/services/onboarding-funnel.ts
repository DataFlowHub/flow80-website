/**
 * Flow80 Onboarding Funnel — Tracking Service
 * Card: 69d57925390d8571c7c61c6d
 *
 * Records step_viewed, step_completed, step_abandoned events to MySQL.
 * Provides getFunnelSummary() for analytics dashboard.
 */

import mysql from 'mysql2/promise';
import type { OnboardingStep, OnboardingEventType } from '@/types/analytics';

// ── Pool ─────────────────────────────────────────────────────────────────────
let _pool: mysql.Pool | null = null;

function pool(): mysql.Pool {
  if (_pool) return _pool;
  _pool = mysql.createPool({
    host:     process.env.MYSQL_HOST     ?? 'localhost',
    port:     Number(process.env.MYSQL_PORT ?? 3306),
    user:     process.env.MYSQL_USER     ?? 'root',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? 'flow80',
    waitForConnections: true,
    connectionLimit: 10,
    timezone: '+00:00',
  });
  return _pool;
}

// ── Track Events ─────────────────────────────────────────────────────────────

/**
 * Record a step_viewed, step_completed, or step_abandoned event.
 */
export async function trackOnboardingEvent(params: {
  userId:         string;
  sessionId:      string;
  step:           OnboardingStep;
  eventType:      OnboardingEventType;
  timeOnStepMs?:  number;
}): Promise<void> {
  const p = pool();
  await p.execute(
    `INSERT INTO flow80_onboarding_events
       (user_id, session_id, funnel_name, step_name, event_type, time_on_step_ms)
     VALUES (?, ?, 'onboarding', ?, ?, ?)`,
    [
      params.userId,
      params.sessionId,
      params.step,
      params.eventType,
      params.timeOnStepMs ?? null,
    ]
  );
}

/** Convenience wrapper — step viewed. */
export async function trackStepViewed(
  userId: string,
  sessionId: string,
  step: OnboardingStep
): Promise<void> {
  await trackOnboardingEvent({ userId, sessionId, step, eventType: 'step_viewed' });
}

/** Convenience wrapper — step completed. */
export async function trackStepCompleted(
  userId: string,
  sessionId: string,
  step: OnboardingStep,
  timeOnStepMs: number
): Promise<void> {
  await trackOnboardingEvent({ userId, sessionId, step, eventType: 'step_completed', timeOnStepMs });
}

/** Convenience wrapper — step abandoned. */
export async function trackStepAbandoned(
  userId: string,
  sessionId: string,
  step: OnboardingStep,
  timeOnStepMs: number
): Promise<void> {
  await trackOnboardingEvent({ userId, sessionId, step, eventType: 'step_abandoned', timeOnStepMs });
}

// ── Funnel Summary ───────────────────────────────────────────────────────────

export interface FunnelStepData {
  step_name:     string;
  viewed:        number;
  completed:     number;
  abandoned:     number;
  avg_time_ms:   number | null;
}

export interface FunnelSummary {
  funnel: Array<{
    step:           OnboardingStep;
    viewed:         number;
    completed:      number;
    abandoned:      number;
    completion_rate: number;
    avg_time_ms:    number | null;
  }>;
  total_users:   number;
  generated_at:  string;
}

export async function getFunnelSummary(): Promise<FunnelSummary> {
  const p = pool();

  const [rows] = await p.execute<mysql.RowDataPacket[]>(
    `SELECT
       step_name,
       event_type,
       COUNT(*) as count,
       AVG(time_on_step_ms) as avg_time_ms
     FROM flow80_onboarding_events
     WHERE funnel_name = 'onboarding'
       AND step_name IN ('signup','step1','step2','step3','step4','dashboard')
     GROUP BY step_name, event_type`
  );

  // Aggregate by step
  const stepMap = new Map<string, FunnelStepData>();
  for (const row of rows as Array<{ step_name: string; event_type: string; count: number; avg_time_ms: number | null }>) {
    if (!stepMap.has(row.step_name)) {
      stepMap.set(row.step_name, { step_name: row.step_name, viewed: 0, completed: 0, abandoned: 0, avg_time_ms: null });
    }
    const entry = stepMap.get(row.step_name)!;
    if (row.event_type === 'step_viewed')    entry.viewed    = Number(row.count);
    if (row.event_type === 'step_completed') entry.completed  = Number(row.count);
    if (row.event_type === 'step_abandoned') entry.abandoned  = Number(row.count);
    if (row.avg_time_ms !== null)            entry.avg_time_ms = Math.round(Number(row.avg_time_ms));
  }

  // Count distinct users
  const [userRows] = await p.execute<mysql.RowDataPacket[]>(
    `SELECT COUNT(DISTINCT user_id) as total FROM flow80_onboarding_events WHERE funnel_name = 'onboarding'`
  );
  const totalUsers = Number((userRows[0] as { total: number }).total) || 0;

  const orderedSteps: OnboardingStep[] = ['signup', 'step1', 'step2', 'step3', 'step4', 'dashboard'];
  const funnel = orderedSteps.map(step => {
    const d = stepMap.get(step) ?? { step_name: step, viewed: 0, completed: 0, abandoned: 0, avg_time_ms: null };
    const viewed = d.viewed || 0;
    const completionRate = viewed > 0 ? Math.round((d.completed / viewed) * 1000) / 1000 : 0;
    return {
      step: step as OnboardingStep,
      viewed: viewed,
      completed: d.completed,
      abandoned: d.abandoned,
      completion_rate: completionRate,
      avg_time_ms: d.avg_time_ms,
    };
  });

  return {
    funnel,
    total_users: totalUsers,
    generated_at: new Date().toISOString(),
  };
}