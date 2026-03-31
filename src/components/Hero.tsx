'use client';

import type { Translations } from '@/i18n/translations';
import { trackCtaClicked } from '@/services/analytics';
import { useEffect } from 'react';

type Props = {
  t: Translations;
  locale: string;
};

const isGoLive = process.env.NEXT_PUBLIC_SITE_STATE === 'go-live';

export default function Hero({ t, locale }: Props) {
  useEffect(() => {
    const el = document.querySelector('.hero');
    if (el) {
      el.setAttribute('data-section-name', 'hero');
    }
  }, []);

  const goLiveHero = isGoLive ? (t as Translations & { heroGoLive?: Props['t']['hero'] }).heroGoLive : null;
  const headline = goLiveHero?.headline ?? t.hero.headline;
  const subheadline = goLiveHero?.subheadline ?? t.hero.subheadline;
  const ctaPrimary = goLiveHero?.ctaPrimary ?? t.hero.ctaPrimary;
  const ctaSecondary = goLiveHero?.ctaSecondary ?? t.hero.ctaSecondary;
  const trustBadge1 = goLiveHero?.trustBadge1 ?? t.hero.trustBadge1;
  const trustBadge2 = goLiveHero?.trustBadge2 ?? t.hero.trustBadge2;
  const trustBadge3 = goLiveHero?.trustBadge3 ?? t.hero.trustBadge3;

  const scrollToWhatsComing = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isGoLive) {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('whats-coming')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForms = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isGoLive) {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('forms-row')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" data-section-name="hero">
      <div className="container">
        <h1 className="hero__headline">{headline}</h1>
        <p className="hero__subheadline">{subheadline}</p>

        <div className="hero__ctas">
          <button
            className="hero__cta-primary"
            onClick={scrollToForms}
            data-cta={isGoLive ? 'hero_primary_go_live' : 'hero_primary'}
            data-cta-position="hero_primary"
            aria-label={ctaPrimary}
          >
            {ctaPrimary}
          </button>
          <button
            className="hero__cta-secondary"
            onClick={scrollToWhatsComing}
            data-cta={isGoLive ? 'hero_secondary_go_live' : 'hero_secondary'}
            data-cta-position="hero_secondary"
            aria-label={ctaSecondary}
          >
            {ctaSecondary}
          </button>
        </div>

        <div className="hero__trust">
          <span>{trustBadge1}</span>
          <span>·</span>
          <span>{trustBadge2}</span>
          <span>·</span>
          <span>{trustBadge3}</span>
        </div>
      </div>
    </section>
  );
}
