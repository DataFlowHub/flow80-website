'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

export default function HowItWorks({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('how-it-works');
    if (el) el.setAttribute('data-section-name', 'how-it-works');
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="how-it-works" id="how-it-works" data-section-name="how-it-works">
      <div className="container">
        <h2 className="how-it-works__title reveal">{t.howItWorks.sectionTitle}</h2>
        <div className="how-it-works__steps reveal-stagger">
          {t.howItWorks.steps.map((step, i) => (
            <div className="how-it-works__step" key={i}>
              <div className="how-it-works__step-number">{i + 1}</div>
              <h3 className="how-it-works__step-heading">{step.heading}</h3>
              <p className="how-it-works__step-body">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="how-it-works__cta reveal">
          <button
            className="how-it-works__cta-btn"
            onClick={scrollToPricing}
            data-cta="how_it_works"
            data-cta-position="how_it_works"
          >
            {t.howItWorks.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
