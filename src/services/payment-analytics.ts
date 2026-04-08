/**
 * Flow80 Payment Analytics Service
 * Card: 69d57927864d77f88b8251bc
 *
 * Aggregates payment + subscription data from MySQL (flow80_subscriptions)
 * and Stripe (PaymentIntents) to produce the payment analytics dashboard payload.
 *
 * Data sources:
 *   - MySQL: flow80_subscriptions  (MRR, conversion, churn, revenue by plan)
 *   - Stripe: PaymentIntents        (payment success / failure rate)
 *
 * Plan prices (monthly, EUR) — override via env vars for live mode:
 *   STARTER  29 EUR/mo
 *   PRO      79 EUR/mo
 *   BUSINESS 199 EUR/mo
 */

import mysql from 'mysql2/promise';
import Stripe from 'stripe';
import type {
  PaymentAnalytics,
  MrrDataPoint,
  RevenueByPlan,
  ConversionMetrics,
  ChurnMetrics,
  PaymentMetrics,
  Tier,
} from '@/types/payment-analytics';

// ── Plan Prices (EUR/month) ──────────────────────────────────────────────────
interface PlanPrice {
  monthly: number;
  annual:  number;
}

const PLAN_PRICES: Record<Tier, PlanPrice> = {
  starter:  { monthly: Number(process.env.PLAN_PRICE_STARTER  ?? 29),  annual: Number(process.env.PLAN_PRICE_STARTER_ANNUAL  ?? 290) },
  pro:       { monthly: Number(process.env.PLAN_PRICE_PRO       ?? 79),  annual: Number(process.env.PLAN_PRICE_PRO_ANNUAL       ?? 790) },
  business:  { monthly: Number(process.env.PLAN_PRICE_BUSINESS  ?? 199), annual: Number(process.env.PLAN_PRICE_BUSINESS_ANNUAL ?? 1990) },
  free:      { monthly: 0, annual: 0 },
};

// ── MySQL Pool ───────────────────────────────────────────────────────────────
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

// ── Stripe Client ────────────────────────────────────────────────────────────
function getStripe(): Stripe {
  const live = process.env.STRIPE_LIVE_MODE === 'true';
  const key  = live
    ? (process.env.STRIPE_PROD_SECRET ?? '')
    : (process.env.STRIPE_TEST_SECRET  ?? '');
  if (!key) throw new Error('Stripe API key not set in environment');
  return new Stripe(key, { apiVersion: '2024-11-20.acacia' });
}

// ── Month Helpers ─────────────────────────────────────────────────────────────
function toMonthLabel(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function subtractMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() - n);
  return d;
}

// ── 1. MRR & Revenue by Plan ──────────────────────────────────────────────────

interface SubCountRow { tier: Tier; interval: string; cnt: number; }

async function getSubscriptionCounts(): Promise<SubCountRow[]> {
  const p = pool();
  const [rows] = await p.execute<mysql.RowDataPacket[]>(
    `SELECT tier, interval, COUNT(*) as cnt
     FROM flow80_subscriptions
     WHERE status IN ('active', 'trialing')
     GROUP BY tier, interval`
  );
  return rows as SubCountRow[];
}

export async function getMrrTrend(): Promise<MrrDataPoint[]> {
  // Build current month + 3 prior months
  const now     = new Date();
  const results: MrrDataPoint[] = [];

  for (let i = 0; i < 4; i++) {
    const monthDate = subtractMonths(now, i);
    const monthLabel = toMonthLabel(monthDate);
    // For simplicity, we compute MRR as-of today (the subscription snapshot).
    // A proper historical MRR would require a subscriptions_history table.
    const counts = await getSubscriptionCounts();
    let mrr = 0;
    let activeSubs = 0;
    for (const row of counts) {
      const prices = PLAN_PRICES[row.tier as Tier] ?? PLAN_PRICES.free;
      const price = row.interval === 'annual' ? prices.annual / 12 : prices.monthly;
      mrr += price * Number(row.cnt);
      activeSubs += Number(row.cnt);
    }
    results.unshift({ month: monthLabel, mrr: Math.round(mrr * 100) / 100, active_subs: activeSubs });
  }

  return results;
}

export async function getRevenueByPlan(): Promise<RevenueByPlan[]> {
  const counts = await getSubscriptionCounts();

  // Aggregate by tier (sum monthly-equivalent)
  const tierMap = new Map<Tier, { mrr: number; subs: number }>();
  for (const row of counts) {
    const prices = PLAN_PRICES[row.tier as Tier] ?? PLAN_PRICES.free;
    const price = row.interval === 'annual' ? prices.annual / 12 : prices.monthly;
    const existing = tierMap.get(row.tier as Tier) ?? { mrr: 0, subs: 0 };
    tierMap.set(row.tier as Tier, {
      mrr:  existing.mrr  + price * Number(row.cnt),
      subs: existing.subs  + Number(row.cnt),
    });
  }

  const totalMrr = Array.from(tierMap.values()).reduce((s, v) => s + v.mrr, 0);

  const tierOrder: Tier[] = ['starter', 'pro', 'business', 'free'];
  const labels: Record<Tier, string> = {
    starter: 'Starter',
    pro:      'Pro',
    business: 'Business',
    free:     'Free',
  };

  return tierOrder
    .filter(t => t !== 'free')
    .map(tier => {
      const data = tierMap.get(tier) ?? { mrr: 0, subs: 0 };
      return {
        tier,
        label:  labels[tier],
        mrr:    Math.round(data.mrr * 100) / 100,
        subs:   data.subs,
        pct:    totalMrr > 0 ? Math.round((data.mrr / totalMrr) * 10000) / 100 : 0,
      };
    });
}

// ── 2. Trial → Paid Conversion ───────────────────────────────────────────────

export async function getConversionMetrics(): Promise<ConversionMetrics> {
  const p = pool();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Count trial starts in last 30 days (first subscription record with status='trialing')
  const [trialRows] = await p.execute<mysql.RowDataPacket[]>(
    `SELECT COUNT(DISTINCT user_id) as trial_starts
     FROM flow80_subscriptions
     WHERE status = 'trialing'
       AND created_at >= ?`,
    [thirtyDaysAgo]
  );

  // Count conversions: those whose status moved to 'active' in last 30 days
  // (a trial that upgraded has status='active' and created_at within window)
  const [paidRows] = await p.execute<mysql.RowDataPacket[]>(
    `SELECT COUNT(DISTINCT user_id) as conversions
     FROM flow80_subscriptions
     WHERE status = 'active'
       AND created_at >= ?
       AND user_id IN (
         SELECT DISTINCT user_id FROM flow80_subscriptions
         WHERE status = 'trialing' AND created_at >= ?
       )`,
    [thirtyDaysAgo, thirtyDaysAgo]
  );

  const trialStarts  = Number((trialRows[0] as { trial_starts: number }).trial_starts)  || 0;
  const conversions  = Number((paidRows[0] as { conversions:  number }).conversions)   || 0;
  const rate = trialStarts > 0 ? Math.round((conversions / trialStarts) * 1000) / 1000 : 0;

  return { trial_starts: trialStarts, trial_to_paid: conversions, conversion_rate: rate };
}

// ── 3. Churn ─────────────────────────────────────────────────────────────────

export async function getChurnMetrics(): Promise<ChurnMetrics> {
  const p = pool();
  const now          = new Date();
  const monthStart   = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0); // last day of prev month

  // Cancellations in current month
  const [cancelRows] = await p.execute<mysql.RowDataPacket[]>(
    `SELECT COUNT(*) as canceled
     FROM flow80_subscriptions
     WHERE status = 'canceled'
       AND canceled_at >= ?`,
    [monthStart]
  );

  // Active at start of month (active or trialing before or at month start)
  const [activeRows] = await p.execute<mysql.RowDataPacket[]>(
    `SELECT COUNT(*) as active_count
     FROM flow80_subscriptions
     WHERE status IN ('active', 'trialing')
       AND created_at <= ?`,
    [monthStart]
  );

  const canceled       = Number((cancelRows[0] as { canceled: number }).canceled)       || 0;
  const activeAtStart  = Number((activeRows[0] as { active_count: number }).active_count) || 1;
  const churnRate      = Math.round((canceled / activeAtStart) * 1000) / 1000;

  return { canceled_this_month: canceled, active_at_month_start: activeAtStart, churn_rate: churnRate };
}

// ── 4. Payment Success / Failure Rate ────────────────────────────────────────

export async function getPaymentMetrics(): Promise<PaymentMetrics> {
  const stripe = getStripe();
  const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);

  let successful = 0;
  let failed     = 0;
  let hasMore     = true;
  let lastId: string | undefined;

  // Paginate through PaymentIntents of the last 30 days
  while (hasMore) {
    const params: Stripe.PaymentIntentListParams = {
      limit: 100,
      created: { gte: thirtyDaysAgo },
    };
    if (lastId) (params as Record<string, unknown>).starting_after = lastId;

    const list = await stripe.paymentIntents.list(params);
    for (const pi of list.data) {
      if (pi.status === 'succeeded') successful++;
      else failed++; // canceled, requires_payment_method, requires_confirmation, etc.
    }
    hasMore = list.has_more;
    if (list.data.length > 0) lastId = list.data[list.data.length - 1].id;
    else hasMore = false;
  }

  const total       = successful + failed || 1;
  const successRate = Math.round((successful / total) * 1000) / 1000;

  return { successful, failed, total, success_rate: successRate };
}

// ── Full Payload ─────────────────────────────────────────────────────────────

export async function getPaymentAnalytics(): Promise<PaymentAnalytics> {
  const [mrr, revenueByPlan, conversion, churn, payments] = await Promise.all([
    getMrrTrend(),
    getRevenueByPlan(),
    getConversionMetrics(),
    getChurnMetrics(),
    getPaymentMetrics(),
  ]);

  return {
    mrr,
    revenue_by_plan:  revenueByPlan,
    conversion,
    churn,
    payments,
    generated_at: new Date().toISOString(),
  };
}
