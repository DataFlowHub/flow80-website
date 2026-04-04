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
          <div className="trust-section__quote trust-section__quote--placeholder">
            <div className="trust-section__quote-mark" aria-hidden="true">"</div>
            <p className="trust-section__quote-text">
              This is a placeholder testimonial. Once we have real customers, we'll add a quote here addressing ease of setup and time saved.
            </p>
            <div className="trust-section__quote-footer">
              <p className="trust-section__quote-attr">Awaiting customer feedback</p>
              <span className="trust-section__quote-soon">Coming soon</span>
            </div>
          </div>
          <div className="trust-section__quote trust-section__quote--placeholder">
            <div className="trust-section__quote-mark" aria-hidden="true">"</div>
            <p className="trust-section__quote-text">
              This is a placeholder testimonial. Once we have real customers, we'll add a quote here comparing Flow80 to their previous manual process.
            </p>
            <div className="trust-section__quote-footer">
              <p className="trust-section__quote-attr">Awaiting customer feedback</p>
              <span className="trust-section__quote-soon">Coming soon</span>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="trust-section__logos reveal">
          <p className="trust-section__logos-label">Used by teams at:</p>
          <div className="trust-section__logos-grid">
            <div className="trust-section__logo-placeholder">
              <span>Logo</span>
              <span className="trust-section__logo-soon">Coming soon</span>
            </div>
            <div className="trust-section__logo-placeholder">
              <span>Logo</span>
              <span className="trust-section__logo-soon">Coming soon</span>
            </div>
            <div className="trust-section__logo-placeholder">
              <span>Logo</span>
              <span className="trust-section__logo-soon">Coming soon</span>
            </div>
            <div className="trust-section__logo-placeholder">
              <span>Logo</span>
              <span className="trust-section__logo-soon">Coming soon</span>
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
