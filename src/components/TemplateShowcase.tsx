'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

export default function TemplateShowcase({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('templates');
    if (el) el.setAttribute('data-section-name', 'templates');
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="template-showcase" id="templates" data-section-name="templates">
      <div className="container">
        <div className="template-showcase__header reveal">
          <h2 className="template-showcase__title">{t.templates.sectionTitle}</h2>
          <p className="template-showcase__intro">{t.templates.intro}</p>
        </div>
        <div className="template-showcase__grid reveal-stagger">
          {t.templates.cards.map((card, i) => (
            <div className="template-showcase__card" key={i}>
              <div className="template-showcase__icon">{card.icon}</div>
              <h3 className="template-showcase__name">{card.name}</h3>
              <p className="template-showcase__desc">{card.description}</p>
            </div>
          ))}
        </div>
        <div className="template-showcase__cta reveal">
          <button
            className="template-showcase__cta-btn"
            onClick={scrollToPricing}
            data-cta="templates"
            data-cta-position="templates"
          >
            {t.templates.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
