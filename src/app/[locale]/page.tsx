'use client';

import { useParams } from 'next/navigation';
import { translations } from '@/i18n/translations';
import type { Locale } from '@/i18n/translations';

export default function LandingPage() {
  const params = useParams<{ locale: string }>();
  const locale = (params.locale || "en") as Locale;
  const t = translations[locale];
  return (
    <>
      <style>{`
        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse at 80% 0%, rgba(255, 87, 51, 0.05) 0%, transparent 60%);
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-glow);
          border: 1px solid var(--accent-border);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
        }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }
        .hero-title .accent { color: var(--accent); }
        .hero-sub {
          font-size: 1.125rem;
          color: var(--muted);
          margin-bottom: 2rem;
          max-width: 480px;
          line-height: 1.7;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .hero-badges {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          color: var(--muted);
          font-weight: 500;
        }

        /* Dashboard mockup */
        .dashboard-mockup {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,87,51,0.08);
        }
        .mockup-titlebar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid var(--border);
          background: var(--surface2);
        }
        .mockup-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot-red { background: #ff5f57; }
        .dot-yellow { background: #febc2e; }
        .dot-green { background: #28c840; }
        .mockup-title {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 500;
        }
        .mockup-body { padding: 1.5rem; }
        .mockup-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .mockup-heading {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
        }
        .mockup-badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          background: var(--accent-glow);
          color: var(--accent);
          border: 1px solid var(--accent-border);
          font-weight: 600;
        }
        .workflow-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: var(--surface2);
          border-radius: 8px;
          margin-bottom: 0.5rem;
          border: 1px solid rgba(255,255,255,0.04);
        }
        .workflow-row:last-child { margin-bottom: 0; }
        .wf-name {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text);
        }
        .wf-status {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
        }
        .status-running {
          background: rgba(52, 211, 153, 0.12);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.2);
        }
        .status-retrying {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.2);
        }
        .status-done {
          background: rgba(96, 96, 96, 0.2);
          color: #888;
          border: 1px solid rgba(96, 96, 96, 0.3);
        }

        /* ── How It Works ── */
        .hiw-section {
          background: var(--surface);
          border-top: 1px solid rgba(255, 87, 51, 0.06);
          border-bottom: 1px solid rgba(255, 87, 51, 0.06);
        }
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        .hiw-item {
          padding: 2rem;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          text-align: center;
          transition: border-color 0.2s;
        }
        .hiw-item:hover { border-color: var(--accent); }
        .hiw-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }
        .hiw-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .hiw-desc {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.7;
        }

        /* ── Pricing ── */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .pricing-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }
        .pricing-card:hover { transform: translateY(-4px); }
        .pricing-card.featured {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 8px 32px rgba(255, 87, 51, 0.15);
          position: relative;
        }
        .pricing-card.featured::before {
          content: 'Most Popular';
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: #0d0d0d;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 1rem;
          border-radius: 0 0 8px 8px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .pricing-tier {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .pricing-tagline {
          font-size: 0.875rem;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .pricing-price {
          margin-bottom: 1.5rem;
        }
        .pricing-amount {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
        }
        .pricing-amount .currency {
          font-size: 1.5rem;
          vertical-align: super;
          font-weight: 600;
          margin-right: 0.1em;
        }
        .pricing-period {
          font-size: 0.875rem;
          color: var(--muted);
        }
        .pricing-features {
          list-style: none;
          margin-bottom: 2rem;
          flex: 1;
        }
        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text);
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .pricing-features li:last-child { border-bottom: none; }
        .feat-arrow { color: var(--accent); font-weight: 700; }

        /* ── Comparison ── */
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 2.5rem;
          font-size: 0.875rem;
        }
        .comparison-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 1px solid var(--border);
          color: var(--muted);
          font-size: 0.8rem;
        }
        .comparison-table th.flow80-col {
          color: var(--accent);
          background: var(--accent-glow);
        }
        .comparison-table td {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: var(--text);
        }
        .comparison-table td.yes {
          color: #34d399;
          font-weight: 600;
        }
        .comparison-table td.no {
          color: #555;
        }
        .comparison-table tr:last-child td {
          border-bottom: none;
          font-weight: 700;
          color: var(--text);
          background: rgba(255,87,51,0.04);
          padding: 1.25rem 1rem;
        }

        /* ── Footer CTA ── */
        .footer-cta {
          background: var(--surface);
          border-top: 1px solid rgba(255, 87, 51, 0.06);
          padding: 5rem 0;
          text-align: center;
        }
        .footer-cta-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .hero { min-height: auto; }
          .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin-left: auto; margin-right: auto; }
          .hiw-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .comparison-table { font-size: 0.75rem; }
          .comparison-table th, .comparison-table td { padding: 0.6rem 0.5rem; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">⚡ Now in Early Access</div>
            <h1 className="hero-title">
              {t.heroGoLive.headline.split('.')[0]}
            </h1>
            <p className="hero-sub">
              {t.heroGoLive.subheadline}
            </p>
            <div className="hero-actions">
              <a href="/signup" className="btn btn-primary">{t.nav.getEarlyAccess}</a>
              <a href="/how-it-works" className="btn btn-outline">{t.nav.howItWorks}</a>
            </div>
            <div className="hero-badges">
              <span className="badge">{t.hero.trustBadge1}</span>
              <span className="badge">{t.hero.trustBadge2}</span>
              <span className="badge">{t.hero.trustBadge3}</span>
            </div>
          </div>

          <div className="dashboard-mockup">
            <div className="mockup-titlebar">
              <div className="mockup-dot dot-red" />
              <div className="mockup-dot dot-yellow" />
              <div className="mockup-dot dot-green" />
              <span className="mockup-title">Flow80 — Live Monitor</span>
            </div>
            <div className="mockup-body">
              <div className="mockup-header-row">
                <span className="mockup-heading">Active Workflows</span>
                <span className="mockup-badge">3 running</span>
              </div>
              {[
                { name: 'Order → Invoice Sync', status: 'Running', cls: 'status-running' },
                { name: 'EDI Payment Processor', status: 'Retrying', cls: 'status-retrying' },
                { name: 'Daily Data Backup', status: 'Done', cls: 'status-done' },
                { name: 'Lead Enrichment Pipeline', status: 'Running', cls: 'status-running' },
                { name: 'Inventory Alert Handler', status: 'Done', cls: 'status-done' },
              ].map((wf) => (
                <div className="workflow-row" key={wf.name}>
                  <span className="wf-name">{wf.name}</span>
                  <span className={`wf-status ${wf.cls}`}>{wf.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section hiw-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">{t.nav.howItWorks}</span>
            <h2 className="section-title">{t.howItWorks.sectionTitle}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.howItWorks.steps[0].body}</p>
          </div>
          <div className="hiw-grid">
            <div className="hiw-item">
              <span className="hiw-icon">1</span>
              <h3 className="hiw-title">{t.howItWorks.steps[0].heading.split(".")[0]}</h3>
              <p className="hiw-desc">{t.howItWorks.steps[0].body}</p>
            </div>
            <div className="hiw-item">
              <span className="hiw-icon">2</span>
              <h3 className="hiw-title">{t.howItWorks.steps[1].heading.split(".")[0]}</h3>
              <p className="hiw-desc">{t.howItWorks.steps[1].body}</p>
            </div>
            <div className="hiw-item">
              <span className="hiw-icon">3</span>
              <h3 className="hiw-title">{t.howItWorks.steps[2].heading.split(".")[0]}</h3>
              <p className="hiw-desc">{t.howItWorks.steps[2].body}</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="/pricing" className="btn btn-primary">{t.howItWorks.cta}</a>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Pricing</span>
            <h2 className="section-title">{t.pricing.sectionTitle}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.pricing.leadIn}</p>
          </div>
          <div className="pricing-grid">
            {[
              {
                tier: 'Starter',
                tagline: 'Perfect for small teams',
                price: '99',
                featured: false,
                features: [
                  '5 active workflows',
                  '10 integrations',
                  '10,000 API calls/mo',
                  'Email support',
                  'Basic monitoring',
                ],
              },
              {
                tier: 'Pro',
                tagline: 'For growing ops teams',
                price: '249',
                featured: true,
                features: [
                  'Unlimited workflows',
                  '40+ integrations',
                  '100,000 API calls/mo',
                  'Priority support',
                  'Real-time monitoring',
                  'Exception handling',
                  'Audit logging',
                ],
              },
              {
                tier: 'Scale',
                tagline: 'Enterprise-grade power',
                price: '499',
                featured: false,
                features: [
                  'Unlimited everything',
                  'Custom integrations',
                  'Unlimited API calls',
                  'Dedicated support',
                  'SLA guarantee',
                  'SSO / SAML',
                  'Multi-workspace',
                ],
              },
            ].map((plan) => (
              <div key={plan.tier} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
                <div className="pricing-tier">{plan.tier}</div>
                <div className="pricing-tagline">{plan.tagline}</div>
                <div className="pricing-price">
                  <span className="pricing-amount">
                    <span className="currency">€</span>{plan.price}
                  </span>
                  <span className="pricing-period"> / month</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}><span className="feat-arrow">→</span> {f}</li>
                  ))}
                </ul>
                <a href="/login" className={`btn${plan.featured ? ' btn-primary' : ' btn-outline'}`}>
                  Start Free Trial
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Competitor Comparison ── */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid rgba(255,87,51,0.06)', borderBottom: '1px solid rgba(255,87,51,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Compare</span>
            <h2 className="section-title">{t.competitorTable.sectionTitle}</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="flow80-col">Flow80</th>
                  <th>HubSpot Starter</th>
                  <th>HubSpot Pro</th>
                  <th>monday.com</th>
                  <th>Activepieces</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Price', flow80: '€19 – €129', hs_s: '€41/mo', hs_p: '€81/mo', mon: '€10/seat', ap: 'Free / €49' },
                  { feature: 'Unlimited workflows', flow80: true, hs_s: false, hs_p: false, mon: false, ap: true },
                  { feature: 'No per-user pricing', flow80: true, hs_s: false, hs_p: false, mon: false, ap: true },
                  { feature: 'Flat rate', flow80: true, hs_s: false, hs_p: false, mon: false, ap: true },
                  { feature: 'Built-in exception handling', flow80: true, hs_s: false, hs_p: false, mon: false, ap: false },
                  { feature: 'Real-time monitoring', flow80: true, hs_s: false, hs_p: true, mon: false, ap: false },
                  { feature: 'EDI + database integrations', flow80: true, hs_s: false, hs_p: false, mon: false, ap: false },
                  { feature: 'GDPR compliant', flow80: true, hs_s: true, hs_p: true, mon: true, ap: false },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    {(['flow80', 'hs_s', 'hs_p', 'mon', 'ap'] as const).map((key) => (
                      <td key={key} className={typeof row[key] === 'boolean' ? (row[key] ? 'yes' : 'no') : ''}>
                        {typeof row[key] === 'boolean' ? (row[key] ? '✓' : '—') : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td colSpan={6}>
                    {t.competitorTable.bottomLine}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="footer-cta">
        <div className="container">
          <h2 className="footer-cta-title">{t.footerGoLive.ctaStripHeadline}</h2>
          <a href="/login" className="btn btn-primary">{t.howItWorks.cta}</a>
        </div>
      </section>
    </>
  );
}
