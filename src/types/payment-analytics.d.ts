/**
 * Flow80 Payment Analytics — Type Definitions
 * Card: 69d57927864d77f88b8251bc
 */

export type Tier      = 'starter' | 'pro' | 'business' | 'free';
export type SubStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete' | 'unknown';

// ── MRR Trend ────────────────────────────────────────────────────────────────
export interface MrrDataPoint {
  month:      string;  // YYYY-MM
  mrr:        number;  // euros (float)
  active_subs: number;
}

// ── Revenue by Plan ──────────────────────────────────────────────────────────
export interface RevenueByPlan {
  tier:  Tier;
  label: string;
  mrr:   number;
  subs:  number;
  pct:   number; // 0–100
}

// ── Conversion ───────────────────────────────────────────────────────────────
export interface ConversionMetrics {
  trial_starts:       number; // trials begun in the last 30 days
  trial_to_paid:      number; // trials that upgraded to active in the last 30 days
  conversion_rate:    number; // 0–1 fraction
}

// ── Churn ────────────────────────────────────────────────────────────────────
export interface ChurnMetrics {
  canceled_this_month: number;
  active_at_month_start: number;
  churn_rate:          number; // 0–1 fraction
}

// ── Payment Outcomes ──────────────────────────────────────────────────────────
export interface PaymentMetrics {
  successful: number;
  failed:     number;
  total:      number;
  success_rate: number; // 0–1 fraction
}

// ── Full Payment Analytics ────────────────────────────────────────────────────
export interface PaymentAnalytics {
  mrr:                MrrDataPoint[];  // current + last 3 months
  revenue_by_plan:    RevenueByPlan[];
  conversion:         ConversionMetrics;
  churn:              ChurnMetrics;
  payments:           PaymentMetrics;
  generated_at:       string;  // ISO timestamp
}
