'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

export default function PricingTeaserSection({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('pricing-teaser');
    if (el) el.setAttribute('data-section-name', 'pricing');
  }, []);

  const scrollToForms = () => {
    document.getElementById('forms-row')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pricing-teaser" id="pricing-teaser" data-section-name="pricing">
      <div className="container">
        <h2 className="pricing-teaser__title reveal">{t.pricingTeaser.sectionTitle}</h2>
        <p className="pricing-teaser__lead reveal">{t.pricingTeaser.leadIn}</p>

        <div className="pricing-teaser__card reveal">
          <p className="pricing-teaser__price">{t.pricingTeaser.pricePreview}</p>
          <div className="pricing-teaser__badge">{t.pricingTeaser.noCreditCard}</div>
          <p className="pricing-teaser__ea-heading">{t.pricingTeaser.earlyAccessHeading}</p>
          <p className="pricing-teaser__ea-body">{t.pricingTeaser.earlyAccessBody}</p>
          <button
            className="pricing-teaser__cta"
            onClick={scrollToForms}
            data-cta="pricing_teaser_cta"
            data-cta-position="pricing_teaser"
          >
            {t.pricingTeaser.ctaPrimary}
          </button>
        </div>
      </div>
    </section>
  );
}
