'use client';

import type { Translations } from '@/i18n/translations';
import { trackCtaClicked } from '@/services/analytics';
import { useEffect } from 'react';

type Props = {
  t: Translations;
  locale: string;
};

export default function Hero({ t, locale }: Props) {
  useEffect(() => {
    // Animate elements on mount (they have CSS animations but JS ensures trigger)
    const el = document.querySelector('.hero');
    if (el) {
      el.setAttribute('data-section-name', 'hero');
    }
  }, []);

  const scrollToWhatsComing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('whats-coming')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForms = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('forms-row')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" data-section-name="hero">
      <div className="container">
        <h1 className="hero__headline">{t.hero.headline}</h1>
        <p className="hero__subheadline">{t.hero.subheadline}</p>

        <div className="hero__ctas">
          <button
            className="hero__cta-primary"
            onClick={scrollToForms}
            data-cta="hero_primary"
            data-cta-position="hero_primary"
            aria-label={t.hero.ctaPrimary}
          >
            {t.hero.ctaPrimary}
          </button>
          <button
            className="hero__cta-secondary"
            onClick={scrollToWhatsComing}
            data-cta="hero_secondary"
            data-cta-position="hero_secondary"
            aria-label={t.hero.ctaSecondary}
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        <div className="hero__trust">
          <span>🇩🇰 {t.hero.trustBadge1}</span>
          <span>·</span>
          <span>🇪🇺 {t.hero.trustBadge2}</span>
          <span>·</span>
          <span>🔒 {t.hero.trustBadge3}</span>
        </div>
      </div>
    </section>
  );
}
