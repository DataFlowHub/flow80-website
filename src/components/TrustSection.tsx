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

        <p className="trust-section__placeholder reveal">{t.trust.placeholder}</p>

        <div className="trust-section__quotes reveal-stagger">
          {t.trust.quotes.map((q, i) => (
            <div className="trust-section__quote" key={i}>
              <p className="trust-section__quote-text">"{q.text}"</p>
              <p className="trust-section__quote-attr">— {q.attribution}</p>
            </div>
          ))}
        </div>

        <div className="trust-section__badges reveal">
          {t.trust.badges.map((badge, i) => (
            <span className="trust-section__badge" key={i}>{badge}</span>
          ))}
        </div>

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
