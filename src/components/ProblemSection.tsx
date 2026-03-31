'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

const icons = [
  // Gear/exchange icon
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/>
  </svg>,
  // Warning triangle
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>,
  // Wrench
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>,
];

const cardTitles = [
  (t: Props['t']) => t.problem.card1Title,
  (t: Props['t']) => t.problem.card2Title,
  (t: Props['t']) => t.problem.card3Title,
];
const cardTexts = [
  (t: Props['t']) => t.problem.card1Text,
  (t: Props['t']) => t.problem.card2Text,
  (t: Props['t']) => t.problem.card3Text,
];

export default function ProblemSection({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('problem');
    if (el) el.setAttribute('data-section-name', 'problem');
  }, []);

  return (
    <section className="problem" id="problem" data-section-name="problem">
      <div className="container">
        <h2 className="problem__title reveal">{t.problem.sectionTitle}</h2>

        <div className="problem__cards reveal-stagger">
          {[0, 1, 2].map((i) => (
            <div className="problem__card" key={i}>
              <div className="problem__card-icon">{icons[i]}</div>
              <h3 className="problem__card-title">{cardTitles[i](t)}</h3>
              <p className="problem__card-text">{cardTexts[i](t)}</p>
            </div>
          ))}
        </div>

        <div className="problem__closing reveal">
          <p className="problem__closing-text">{t.problem.closingText}</p>
          <p className="problem__closing-bold">{t.problem.closingBold}</p>
        </div>
      </div>
    </section>
  );
}
