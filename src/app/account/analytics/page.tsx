/**
 * Flow80 Account — Payment Analytics Dashboard
 * Card: 69d57927864d77f88b8251bc
 *
 * Displays:
 *   1. Trial → Paid conversion rate
 *   2. MRR with 3-month trend
 *   3. Churn metrics
 *   4. Revenue by plan
 *   5. Payment success vs failure rate
 */

'use client';

import { useEffect, useState } from 'react';
import type { PaymentAnalytics } from '@/types/payment-analytics';

function fmt(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function pct(n: number): string {
  return `${Math.round(n * 100)}%`;
}

function MetricCard({
  label, value, sub, accent = false
}: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`analytics-card ${accent ? 'analytics-card--accent' : ''}`}>
      <p className="analytics-card__label">{label}</p>
      <p className="analytics-card__value">{value}</p>
      {sub && <p className="analytics-card__sub">{sub}</p>}
    </div>
  );
}

function PlanBar({ label, pct, mrr, subs }: { label: string; pct: number; mrr: number; subs: number }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{pct}% — {subs} sub{subs !== 1 ? 's' : ''}</span>
      </div>
      <div style={{ background: '#1e293b', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            borderRadius: '6px',
            transition: 'width 0.6s ease',
          }}
        />
      </div>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>{fmt(mrr)}/mo MRR</p>
    </div>
  );
}

function MrrChart({ data }: { data: Array<{ month: string; mrr: number; active_subs: number }> }) {
  const maxMrr = Math.max(...data.map(d => d.mrr), 1);
  return (
    <div className="mrr-chart">
      {data.map((d, i) => (
        <div key={d.month} className="mrr-bar-wrap">
          <p className="mrr-bar__label">{d.month}</p>
          <div className="mrr-bar__track">
            <div
              className="mrr-bar__fill"
              style={{ height: `${Math.max((d.mrr / maxMrr) * 100, 2)}%` }}
            />
          </div>
          <p className="mrr-bar__value">{fmt(d.mrr)}</p>
          <p className="mrr-bar__subs">{d.active_subs} subs</p>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<PaymentAnalytics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/payments')
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div className="analytics-page"><div className="analytics-loading">Loading analytics…</div></div>;
  if (error)   return <div className="analytics-page"><div className="analytics-error">Failed to load analytics: {error}</div></div>;
  if (!data)   return null;

  const currentMrr = data.mrr[data.mrr.length - 1]?.mrr ?? 0;
  const prevMrr    = data.mrr[data.mrr.length - 2]?.mrr ?? 0;
  const mrrDelta  = prevMrr > 0 ? ((currentMrr - prevMrr) / prevMrr) * 100 : 0;

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1 className="analytics-title">Payment Analytics</h1>
        <p className="analytics-subtitle">
          Last updated: {new Date(data.generated_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      </div>

      {/* ── Row 1: Key Metrics ── */}
      <div className="analytics-grid analytics-grid--4">
        <MetricCard
          label="Monthly Recurring Revenue"
          value={fmt(currentMrr)}
          sub={mrrDelta !== 0 ? `${mrrDelta > 0 ? '+' : ''}${mrrDelta.toFixed(1)}% vs last month` : 'First month'}
          accent
        />
        <MetricCard
          label="Trial → Paid Rate"
          value={pct(data.conversion.conversion_rate)}
          sub={`${data.conversion.trial_to_paid} upgrades / ${data.conversion.trial_starts} trials (30d)`}
        />
        <MetricCard
          label="Churn Rate (this month)"
          value={pct(data.churn.churn_rate)}
          sub={`${data.churn.canceled_this_month} canceled / ${data.churn.active_at_month_start} active at month start`}
        />
        <MetricCard
          label="Payment Success Rate"
          value={pct(data.payments.success_rate)}
          sub={`${data.payments.successful} succeeded / ${data.payments.total} total (30d)`}
        />
      </div>

      {/* ── Row 2: MRR Trend ── */}
      <div className="analytics-card">
        <h2 className="analytics-card__title">MRR Trend</h2>
        <MrrChart data={data.mrr} />
      </div>

      {/* ── Row 3: Revenue by Plan + Payments ── */}
      <div className="analytics-grid analytics-grid--2">
        <div className="analytics-card">
          <h2 className="analytics-card__title">Revenue by Plan</h2>
          {data.revenue_by_plan.map(plan => (
            <PlanBar
              key={plan.tier}
              label={plan.label}
              pct={plan.pct}
              mrr={plan.mrr}
              subs={plan.subs}
            />
          ))}
          {data.revenue_by_plan.length === 0 && (
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No paid subscriptions yet.</p>
          )}
        </div>

        <div className="analytics-card">
          <h2 className="analytics-card__title">Payment Outcomes (30d)</h2>
          <div className="payment-outcomes">
            <div className="outcome-bar">
              <div
                className="outcome-bar__fill outcome-bar__fill--success"
                style={{ width: `${Math.round(data.payments.success_rate * 100)}%` }}
              />
              <div
                className="outcome-bar__fill outcome-bar__fill--failed"
                style={{ width: `${Math.round((1 - data.payments.success_rate) * 100)}%` }}
              />
            </div>
            <div className="outcome-legend">
              <span className="outcome-legend__item outcome-legend__item--success">
                ● {data.payments.successful} Successful
              </span>
              <span className="outcome-legend__item outcome-legend__item--failed">
                ● {data.payments.failed} Failed
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .analytics-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: 'Inter', system-ui, sans-serif;
          color: #f1f5f9;
        }
        .analytics-header { margin-bottom: 2rem; }
        .analytics-title { font-size: 1.75rem; font-weight: 700; color: #f8fafc; margin: 0; }
        .analytics-subtitle { font-size: 0.85rem; color: #64748b; margin: 0.25rem 0 0; }

        .analytics-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .analytics-grid--4 { grid-template-columns: repeat(4, 1fr); }
        .analytics-grid--2 { grid-template-columns: repeat(2, 1fr); }

        @media (max-width: 900px) {
          .analytics-grid--4 { grid-template-columns: repeat(2, 1fr); }
          .analytics-grid--2 { grid-template-columns: 1fr; }
        }

        .analytics-card {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 1.5rem;
        }
        .analytics-card--accent {
          border-color: #6366f1;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
        }
        .analytics-card__title {
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
          margin: 0 0 1.25rem;
        }
        .analytics-card__label {
          font-size: 0.78rem;
          font-weight: 500;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 0.5rem;
        }
        .analytics-card__value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          line-height: 1;
        }
        .analytics-card__sub {
          font-size: 0.78rem;
          color: #64748b;
          margin: 0.4rem 0 0;
        }

        /* MRR Chart */
        .mrr-chart {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 140px;
          padding-top: 0.5rem;
        }
        .mrr-bar-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          height: 100%;
        }
        .mrr-bar__label {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          white-space: nowrap;
        }
        .mrr-bar__track {
          flex: 1;
          width: 100%;
          background: #1e293b;
          border-radius: 6px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .mrr-bar__fill {
          width: 100%;
          background: linear-gradient(180deg, #6366f1, #8b5cf6);
          border-radius: 6px;
          min-height: 4px;
          transition: height 0.6s ease;
        }
        .mrr-bar__value {
          font-size: 0.8rem;
          font-weight: 600;
          color: #e2e8f0;
          margin: 0;
        }
        .mrr-bar__subs {
          font-size: 0.7rem;
          color: #64748b;
          margin: 0;
        }

        /* Payment Outcomes */
        .payment-outcomes { display: flex; flex-direction: column; gap: 1rem; }
        .outcome-bar {
          display: flex;
          height: 16px;
          border-radius: 8px;
          overflow: hidden;
          background: #1e293b;
        }
        .outcome-bar__fill { height: 100%; transition: width 0.6s ease; }
        .outcome-bar__fill--success { background: #10b981; }
        .outcome-bar__fill--failed   { background: #ef4444; }
        .outcome-legend {
          display: flex;
          gap: 1.5rem;
          font-size: 0.85rem;
        }
        .outcome-legend__item { display: flex; align-items: center; gap: 0.4rem; }
        .outcome-legend__item--success { color: #10b981; }
        .outcome-legend__item--failed   { color: #ef4444; }

        .analytics-loading, .analytics-error {
          text-align: center;
          padding: 4rem 0;
          font-size: 1rem;
        }
        .analytics-error { color: #ef4444; }
      `}</style>
    </div>
  );
}
