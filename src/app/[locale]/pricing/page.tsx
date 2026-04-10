export default function PricingPage() {
  const plans = [
    {
      tier: 'Starter',
      tagline: 'For small teams getting started with automation.',
      price: '99',
      featured: false,
      features: [
        { label: '5 active workflows', detail: '' },
        { label: '10 integrations', detail: '' },
        { label: '10,000 API calls / month', detail: '' },
        { label: 'Community support', detail: '' },
        { label: 'Basic monitoring & logs', detail: '' },
        { label: '1 team member', detail: '' },
        { label: '14-day free trial', detail: '' },
      ],
    },
    {
      tier: 'Pro',
      tagline: 'For professional ops teams that need real power.',
      price: '249',
      featured: true,
      features: [
        { label: 'Unlimited workflows', detail: '' },
        { label: '40+ integrations', detail: '' },
        { label: '100,000 API calls / month', detail: '' },
        { label: 'Priority email & chat support', detail: '' },
        { label: 'Real-time monitoring', detail: '' },
        { label: 'Exception handling & retries', detail: '' },
        { label: 'Audit logging', detail: '' },
        { label: 'Up to 10 team members', detail: '' },
        { label: '14-day free trial', detail: '' },
      ],
    },
    {
      tier: 'Scale',
      tagline: 'Enterprise-grade infrastructure and support.',
      price: '499',
      featured: false,
      features: [
        { label: 'Unlimited workflows', detail: '' },
        { label: 'Custom integrations', detail: '' },
        { label: 'Unlimited API calls', detail: '' },
        { label: 'Dedicated support + SLA', detail: '' },
        { label: 'SSO / SAML', detail: '' },
        { label: 'Multi-workspace management', detail: '' },
        { label: 'Audit logging + data export', detail: '' },
        { label: 'Unlimited team members', detail: '' },
        { label: 'Custom data residency', detail: '' },
      ],
    },
  ];

  const faqs = [
    {
      q: 'Is there a free trial?',
      a: 'Yes — all plans come with a 14-day free trial. No credit card required to start. You can upgrade or cancel at any time.',
    },
    {
      q: 'What happens if I exceed my API call limit?',
      a: "We'll notify you when you're at 80% of your limit. If you exceed it, workflows continue running but overage charges apply at €0.0005 per additional call. You can also upgrade your plan at any time.",
    },
    {
      q: 'Can I change plans later?',
      a: "Absolutely. Upgrade or downgrade at any time from your account settings. Upgrades take effect immediately; downgrades apply at the next billing cycle.",
    },
    {
      q: 'Is there a setup fee?',
      a: 'No setup fees, no hidden charges. What you see is what you pay.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, Amex) and bank transfers for annual plans. All payments are processed securely via Stripe.',
    },
  ];

  const trustBadges = [
    '🇪🇺 GDPR Compliant',
    '🔒 SOC 2 Type II',
    '🇩🇰 Built in Denmark',
    '14-day Free Trial',
    'Cancel Anytime',
  ];

  return (
    <>
      <style>{`
        .pricing-hero {
          padding: 6rem 0 4rem;
          text-align: center;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,87,51,0.04) 0%, transparent 60%);
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        .plan-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-card.featured {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 16px 48px rgba(255, 87, 51, 0.15);
          position: relative;
        }
        .plan-badge {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: #0d0d0d;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.3rem 1.2rem;
          border-radius: 0 0 12px 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .plan-tier {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.4rem;
        }
        .plan-tagline {
          font-size: 0.875rem;
          color: var(--muted);
          margin-bottom: 2rem;
          min-height: 2.5rem;
        }
        .plan-price {
          margin-bottom: 2rem;
        }
        .plan-amount {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
        }
        .plan-amount .currency {
          font-size: 1.5rem;
          vertical-align: super;
          font-weight: 600;
          margin-right: 0.1em;
        }
        .plan-period {
          font-size: 0.875rem;
          color: var(--muted);
          display: block;
          margin-top: 0.25rem;
        }
        .plan-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 1.5rem;
        }
        .plan-features {
          list-style: none;
          flex: 1;
          margin-bottom: 2rem;
        }
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text);
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .plan-features li:last-child { border-bottom: none; }
        .feat-check { color: var(--accent); font-weight: 700; }
        .faq-section {
          margin-top: 5rem;
          padding-top: 4rem;
          border-top: 1px solid var(--border);
        }
        .faq-title {
          font-size: 1.75rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .faq-list {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .faq-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .faq-q {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        .faq-a {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.7;
        }
        .trust-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid var(--border);
        }
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          color: var(--muted);
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .plans-grid { grid-template-columns: 1fr; max-width: 440px; margin-left: auto; margin-right: auto; }
        }
      `}</style>

      <section className="pricing-hero">
        <div className="container">
          <span className="section-label">Pricing</span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Simple, transparent pricing.
          </h1>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
            Flat rate. No per-user surprises. No enterprise tax.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan.tier} className={`plan-card${plan.featured ? ' featured' : ''}`}>
                {plan.featured && <div className="plan-badge">Most Popular</div>}
                <div className="plan-tier">{plan.tier}</div>
                <div className="plan-tagline">{plan.tagline}</div>
                <div className="plan-price">
                  <div className="plan-amount">
                    <span className="currency">€</span>{plan.price}
                  </div>
                  <span className="plan-period">per month, billed monthly</span>
                </div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  {plan.features.map((f) => (
                    <li key={f.label}>
                      <span className="feat-check">✓</span> {f.label}
                    </li>
                  ))}
                </ul>
                <a href="/login" className={`btn${plan.featured ? ' btn-primary' : ' btn-outline'}`}>
                  Start Free Trial
                </a>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="faq-section">
            <h2 className="faq-title">Frequently asked questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <div key={faq.q} className="faq-item">
                  <div className="faq-q">{faq.q}</div>
                  <div className="faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="trust-row">
            {trustBadges.map((badge) => (
              <div key={badge} className="trust-badge">{badge}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
