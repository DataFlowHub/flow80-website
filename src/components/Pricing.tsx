'use client';

import type { Translations } from '@/i18n/translations';

type Props = {
  t: Translations;
};

export default function Pricing({ t }: Props) {
  const gl = t.pricing;

  return (
    <section className="pricing" id="pricing" data-section-name="pricing">
      <div className="container">
        <h2 className="pricing__title reveal">{t.pricing.sectionTitle}</h2>
        <p className="pricing__lead reveal">{t.pricing.leadIn}</p>
        <div className="pricing__card reveal">
          <div className="pricing__price">{t.pricing.price}</div>
          <div className="pricing__price-note">{t.pricing.tagline}</div>
          <ul className="pricing__features">
            {t.pricing.features.map((feat, i) => (
              <li className="pricing__feature" key={i}>
                <svg
                  className="pricing__feature-check"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feat}
              </li>
            ))}
          </ul>
          <button
            className="pricing__cta-btn"
            data-cta="pricing_primary"
            data-cta-position="pricing"
          >
            {t.pricing.ctaPrimary}
          </button>
          <p className="pricing__trial-note">{t.pricing.trialNote}</p>
        </div>
      </div>
    </section>
  );
}
