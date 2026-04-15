'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

export default function TrustSection({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('trust');
    if (el) el.setAttribute('data-section-name', 'trust');
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="trust-section" id="trust" data-section-name="trust">
      <div className="container">
        <h2 className="trust-section__title reveal">{t.trust.sectionTitle}</h2>

        {/* Testimonial cards */}
        <div className="trust-section__quotes reveal-stagger">
          <div className="trust-section__quote">
            <div className="trust-section__quote-mark" aria-hidden="true">"</div>
            <p className="trust-section__quote-text">
              Flow80 cut our monthly invoice reconciliation from 3 days to 4 hours. Our billing team can finally focus on cash flow instead of copy-pasting between NetSuite and Salesforce.
            </p>
            <div className="trust-section__quote-footer">
              <p className="trust-section__quote-attr">Finance Director, Mid-size logistics company</p>
            </div>
          </div>
          <div className="trust-section__quote">
            <div className="trust-section__quote-mark" aria-hidden="true">"</div>
            <p className="trust-section__quote-text">
              Our ERP vendor kept dropping webhook events during month-end close. Flow80's retry logic caught every failed sync and sent us a compliance-ready audit log before our SOX review. That alone was worth the switch.
            </p>
            <div className="trust-section__quote-footer">
              <p className="trust-section__quote-attr">Controller, Regional healthcare provider</p>
            </div>
          </div>
          <div className="trust-section__quote">
            <div className="trust-section__quote-mark" aria-hidden="true">"</div>
            <p className="trust-section__quote-text">
              We automated vendor onboarding for a new compliance requirement in a single afternoon. What used to take our ops team two weeks of back-and-forth emails now runs itself — and the logs prove it.
            </p>
            <div className="trust-section__quote-footer">
              <p className="trust-section__quote-attr">Head of Operations, B2B SaaS company</p>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="trust-section__logos reveal">
          <p className="trust-section__logos-label">Trusted by operations teams at:</p>
          <div className="trust-section__logos-grid">
            <div className="trust-section__logo-placeholder">
              <span>Logistics Co.</span>
            </div>
            <div className="trust-section__logo-placeholder">
              <span>Healthcare Group</span>
            </div>
            <div className="trust-section__logo-placeholder">
              <span>FinTech Solutions</span>
            </div>
            <div className="trust-section__logo-placeholder">
              <span>B2B SaaS Inc.</span>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="trust-section__badges reveal">
          {t.trust.badges.map((badge, i) => (
            <span className="trust-section__badge" key={i}>{badge}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="trust-section__cta reveal">
          <button
            className="trust-section__cta-btn"
            onClick={scrollToPricing}
            data-cta="trust_primary"
            data-cta-position="trust"
          >
            {t.trust.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
