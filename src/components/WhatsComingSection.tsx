'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

export default function WhatsComingSection({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('whats-coming');
    if (el) el.setAttribute('data-section-name', 'features');
  }, []);

  return (
    <section className="whats-coming" id="whats-coming" data-section-name="features">
      <div className="container">
        <h2 className="whats-coming__title reveal">{t.whatsComing.sectionTitle}</h2>
        <div className="whats-coming__grid reveal-stagger">
          {t.whatsComing.cards.map((card, i) => (
            <div className="whats-coming__card" key={i}>
              <span className="whats-coming__badge">{card.badge}</span>
              <h3 className="whats-coming__name">{card.name}</h3>
              <p className="whats-coming__desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
