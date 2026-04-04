'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

export default function HeroSection({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('hero-section');
    if (el) el.setAttribute('data-section-name', 'hero');
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const hero = t.heroGoLive;

  return (
    <section className="hero-section" id="hero-section" data-section-name="hero">
      {/* Decorative background grid */}
      <div className="hero-section__bg-grid" aria-hidden="true" />

      <div className="container">
        <div className="hero-section__content">
          <h1 className="hero-section__headline reveal">{hero.headline}</h1>
          <p className="hero-section__subheadline reveal">{hero.subheadline}</p>

          <div className="hero-section__ctas reveal">
            <button
              className="hero-section__cta-primary"
              onClick={scrollToPricing}
              data-cta="hero_section_primary"
              data-cta-position="hero_section_primary"
            >
              {hero.ctaPrimary}
            </button>
            <button
              className="hero-section__cta-secondary"
              onClick={scrollToHowItWorks}
              data-cta="hero_section_secondary"
              data-cta-position="hero_section_secondary"
            >
              {hero.ctaSecondary}
            </button>
          </div>

          <div className="hero-section__trust reveal">
            <span className="hero-section__trust-item">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {hero.trustBadge1}
            </span>
            <span className="hero-section__trust-sep" aria-hidden="true">·</span>
            <span className="hero-section__trust-item">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {hero.trustBadge2}
            </span>
            <span className="hero-section__trust-sep" aria-hidden="true">·</span>
            <span className="hero-section__trust-item">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {hero.trustBadge3}
            </span>
          </div>
        </div>

        {/* Visual / graphic area */}
        <div className="hero-section__visual reveal" aria-hidden="true">
          <div className="hero-section__visual-card">
            <div className="hero-section__visual-dot hero-section__visual-dot--green" />
            <div className="hero-section__visual-text">Workflow running</div>
            <div className="hero-section__visual-bar">
              <div className="hero-section__visual-bar-fill" />
            </div>
          </div>
          <div className="hero-section__visual-card">
            <div className="hero-section__visual-dot hero-section__visual-dot--blue" />
            <div className="hero-section__visual-text">2 systems synced</div>
            <div className="hero-section__visual-bar">
              <div className="hero-section__visual-bar-fill" style={{ width: '70%' }} />
            </div>
          </div>
          <div className="hero-section__visual-card">
            <div className="hero-section__visual-dot hero-section__visual-dot--orange" />
            <div className="hero-section__visual-text">Order processed</div>
            <div className="hero-section__visual-bar">
              <div className="hero-section__visual-bar-fill" style={{ width: '90%' }} />
            </div>
          </div>
          <div className="hero-section__visual-glow" />
        </div>
      </div>
    </section>
  );
}
