'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import ConceptDNav from '@/components/ConceptDNav';
import Footer from '@/components/Footer';
import { translations, locales, defaultLocale, type Locale } from '@/i18n/translations';

const TIERS = [
  {
    label: 'Starter',
    tagline: 'Perfect for small ops teams getting started.',
    amount: '19',
    period: '/ month',
    badge: null,
    ctaStyle: 'outline' as const,
    features: [
      'Unlimited workflows',
      '5,000 workflow runs/month',
      'Visual workflow builder',
      '10 pre-built templates',
      'Real-time monitoring & logs',
      'Smart exception handling',
      'REST API & webhook integrations',
      'Email support (48h response)',
    ],
    notIncluded: [
      'Database integrations',
      'EDI / SFTP integrations',
      'Priority support',
    ],
  },
  {
    label: 'Professional',
    tagline: 'For growing ops teams that need more power.',
    amount: '49',
    period: '/ month',
    badge: 'Most Popular',
    ctaStyle: 'solid' as const,
    features: [
      'Unlimited workflows',
      'Unlimited workflow runs',
      'Visual workflow builder',
      'All 40+ integrations',
      'Real-time monitoring & logs',
      'Smart exception handling & retries',
      'Database + EDI + SFTP',
      'Priority email support (24h)',
      'Onboarding call included',
    ],
    notIncluded: [],
  },
  {
    label: 'Enterprise',
    tagline: 'For larger teams with complex requirements.',
    amount: '149',
    period: '/ month',
    badge: null,
    ctaStyle: 'outline' as const,
    features: [
      'Everything in Professional',
      'Unlimited workflow runs',
      'All integrations',
      'Custom rate limits',
      'Dedicated onboarding',
      'SLA guarantee',
      'SSO / SAML',
      'Dedicated account manager',
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  const pathname = usePathname();
  const router = useRouter();

  const pathLocale = (pathname?.split('/')[1] || defaultLocale) as Locale;
  const validLocale = locales.includes(pathLocale) ? pathLocale : defaultLocale;

  const [locale, setLocale] = useState<Locale>(validLocale);
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="concept-d-layout">
      <ConceptDNav t={t} locale={locale} />

      <main id="main-content">
        <div className="concept-d-subpage">
          {/* Hero */}
          <div className="concept-d-pricing-hero">
            <div className="concept-d-subpage__badge">💰 Simple Pricing</div>
            <h1 className="concept-d-subpage__headline">
              Simple, transparent pricing.<br />
              <span style={{ color: 'var(--concept-d-accent-light)' }}>No surprises.</span>
            </h1>
            <p className="concept-d-subpage__sub">
              Choose the plan that fits your team. All plans include core automation features. No hidden fees, no per-user pricing, no surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="concept-d-pricing-grid">
            {TIERS.map((tier) => (
              <div
                key={tier.label}
                className={`concept-d-pricing-card${tier.badge ? ' concept-d-pricing-card--highlight' : ''}`}
              >
                {tier.badge && (
                  <div className="concept-d-pricing-card__badge">{tier.badge}</div>
                )}
                <div className="concept-d-pricing-card__tier">{tier.label}</div>
                <div className="concept-d-pricing-card__tagline">{tier.tagline}</div>
                <div className="concept-d-pricing-card__price">
                  <span className="concept-d-pricing-card__amount">€{tier.amount}</span>
                  <span className="concept-d-pricing-card__period">{tier.period}</span>
                </div>
                <ul className="concept-d-pricing-card__features">
                  {tier.features.map((f) => (
                    <li key={f} className="concept-d-pricing-card__feature">
                      <svg className="concept-d-pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li key={f} className="concept-d-pricing-card__feature" style={{ color: 'var(--concept-d-muted)' }}>
                      <svg style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2, color: '#64748B' }} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`concept-d-pricing-card__cta concept-d-pricing-card__cta--${tier.ctaStyle}`}>
                  {tier.label === 'Professional' ? 'Start Free Trial →' : `Get Early Access →`}
                </button>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
              {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((item) => (
                <span key={item} style={{ fontSize: 14, color: 'var(--concept-d-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--concept-d-muted)' }}>
              <span>🇩🇰 Built in Denmark</span>
              <span>·</span>
              <span>🇪🇺 GDPR Compliant</span>
              <span>·</span>
              <span>🔒 Secure by design</span>
            </div>
          </div>

          {/* FAQ placeholder */}
          <div className="concept-d-subpage__section">
            <h2 className="concept-d-subpage__section-title" style={{ fontSize: 22 }}>Frequently asked questions.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              {[
                { q: 'What counts as a workflow run?', a: 'A workflow run is one complete execution of a workflow, from trigger to final step. Partial or failed runs that are retried count as a single run.' },
                { q: 'Can I change plans later?', a: 'Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.' },
                { q: 'What integrations are included?', a: 'All plans include REST API, webhooks, and email. Professional and Enterprise plans add database connectors (MySQL, PostgreSQL, SQL Server, MongoDB), EDI, SFTP, and more.' },
                { q: 'Is there a free trial?', a: 'Yes — 14 days, no credit card required. You get full access to all Professional features during the trial.' },
                { q: 'How does GDPR compliance work?', a: 'Flow80 is built in Denmark and operates under GDPR. All data is processed in EU data centers. We sign DPAs with all Enterprise customers.' },
              ].map((faq) => (
                <div key={faq.q} className="concept-d-card">
                  <div className="concept-d-card__title" style={{ fontSize: 16 }}>{faq.q}</div>
                  <div className="concept-d-card__body">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href={`/${locale}/how-it-works`} className="concept-d-hero__cta-primary" style={{ display: 'inline-block', marginBottom: 16 }}>
              See How It Works →
            </Link>
            <p style={{ fontSize: 14, color: 'var(--concept-d-muted)' }}>
              Still have questions? <a href="mailto:hello@flow80.com" style={{ color: 'var(--concept-d-accent-light)' }}>Talk to us</a> — no sales pressure.
            </p>
          </div>
        </div>
      </main>

      <Footer t={t} locale={locale} />
    </div>
  );
}