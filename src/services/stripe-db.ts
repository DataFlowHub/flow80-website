/**
 * Flow80 Stripe — MySQL subscription store
 *
 * Thin wrapper around mysql2. Connection is acquired per-query so we don't
 * hold a persistent pool in a serverless context.
 *
 * In production, set MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD,
 * MYSQL_DATABASE in your environment / .env.local.
 */

import mysql from 'mysql2/promise';

export type Tier      = 'starter' | 'pro' | 'business' | 'free';
export type SubStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete' | 'unknown';
export type Interval  = 'monthly' | 'annual';

export interface SubscriptionRecord {
  id:                   number;
  user_id:              string;
  stripe_customer_id:   string;
  stripe_subscription_id: string;
  tier:                 Tier;
  status:               SubStatus;
  interval:             Interval;
  trial_ends_at:        Date | null;
  current_period_end:  Date | null;
  canceled_at:          Date | null;
  created_at:           Date;
  updated_at:           Date;
}

// ── pool (lazy singleton) ───────────────────────────────────────────────────
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

// ── helpers ─────────────────────────────────────────────────────────────────

/** Map a raw MySQL row to a SubscriptionRecord. */
function rowToRecord(row: Record<string, unknown>): SubscriptionRecord {
  return {
    id:                   Number(row.id),
    user_id:              String(row.user_id),
    stripe_customer_id:   String(row.stripe_customer_id),
    stripe_subscription_id: String(row.stripe_subscription_id),
    tier:                 String(row.tier) as Tier,
    status:               String(row.status) as SubStatus,
    interval:             String(row.interval) as Interval,
    trial_ends_at:        row.trial_ends_at       ? new Date(String(row.trial_ends_at))       : null,
    current_period_end:  row.current_period_end  ? new Date(String(row.current_period_end))  : null,
    canceled_at:          row.canceled_at         ? new Date(String(row.canceled_at))          : null,
    created_at:           new Date(String(row.created_at)),
    updated_at:           new Date(String(row.updated_at)),
  };
}

/** Infer tier label from a Stripe price id stored in env. */
function tierFromPriceId(priceId: string): Tier {
  const map: Record<string, Tier> = {
    [process.env.STRIPE_PRICE_STARTER_MONTHLY ?? '']:  'starter',
    [process.env.STRIPE_PRICE_STARTER_ANNUAL  ?? '']:  'starter',
    [process.env.STRIPE_PRICE_PRO_MONTHLY     ?? '']:  'pro',
    [process.env.STRIPE_PRICE_PRO_ANNUAL      ?? '']:  'pro',
    [process.env.STRIPE_PRICE_BUSINESS_MONTHLY ?? '']: 'business',
    [process.env.STRIPE_PRICE_BUSINESS_ANNUAL ?? '']:  'business',
    [process.env.STRIPE_PRICE_FREE            ?? '']:  'free',
  };
  return map[priceId] ?? 'free';
}

// ── public API ───────────────────────────────────────────────────────────────

/**
 * Upsert a subscription record from a Stripe checkout.session.completed
 * or customer.subscription.updated webhook event.
 */
export async function upsertSubscription(params: {
  userId:               string;
  stripeCustomerId:     string;
  stripeSubscriptionId: string;
  priceId:              string;
  status:               string;
  trialEnd:             number | null;   // Unix timestamp
  periodEnd:            number | null;  // Unix timestamp
  canceledAt:           number | null;  // Unix timestamp
}): Promise<void> {
  const p = pool();
  const tier    = tierFromPriceId(params.priceId);
  const interval = inferInterval(params.priceId);
  const trialEndsAt    = params.trialEnd   ? new Date(params.trialEnd   * 1000) : null;
  const currentPeriodEnd = params.periodEnd ? new Date(params.periodEnd * 1000) : null;
  const canceledAt     = params.canceledAt  ? new Date(params.canceledAt * 1000) : null;

  await p.execute(
    `INSERT INTO flow80_subscriptions
       (user_id, stripe_customer_id, stripe_subscription_id, tier, status, interval,
        trial_ends_at, current_period_end, canceled_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       tier               = VALUES(tier),
       status            = VALUES(status),
       interval          = VALUES(interval),
       trial_ends_at     = VALUES(trial_ends_at),
       current_period_end = VALUES(current_period_end),
       canceled_at       = VALUES(canceled_at),
       updated_at        = CURRENT_TIMESTAMP`,
    [
      params.userId,
      params.stripeCustomerId,
      params.stripeSubscriptionId,
      tier,
      params.status,
      interval,
      trialEndsAt,
      currentPeriodEnd,
      canceledAt,
    ]
  );
}

/** Fetch the current subscription record for a user, or null. */
export async function getSubscriptionByUserId(userId: string): Promise<SubscriptionRecord | null> {
  const p = pool();
  const [rows] = await p.execute<mysql.RowDataPacket[]>(
    'SELECT * FROM flow80_subscriptions WHERE user_id = ? LIMIT 1',
    [userId]
  );
  if (!rows.length) return null;
  return rowToRecord(rows[0] as Record<string, unknown>);
}

/** Fetch the current subscription record for a Stripe customer id, or null. */
export async function getSubscriptionByCustomerId(
  stripeCustomerId: string
): Promise<SubscriptionRecord | null> {
  const p = pool();
  const [rows] = await p.execute<mysql.RowDataPacket[]>(
    'SELECT * FROM flow80_subscriptions WHERE stripe_customer_id = ? LIMIT 1',
    [stripeCustomerId]
  );
  if (!rows.length) return null;
  return rowToRecord(rows[0] as Record<string, unknown>);
}

/** Mark subscription as canceled (called from webhook). */
export async function markCanceled(stripeSubscriptionId: string): Promise<void> {
  const p = pool();
  await p.execute(
    `UPDATE flow80_subscriptions
       SET status = 'canceled', canceled_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE stripe_subscription_id = ?`,
    [stripeSubscriptionId]
  );
}

/** Infer monthly/annual from price id. */
function inferInterval(priceId: string): Interval {
  const id = priceId.toLowerCase();
  if (id.includes('annual') || id.includes('year')) return 'annual';
  return 'monthly';
}
