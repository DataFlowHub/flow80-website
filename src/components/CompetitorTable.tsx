'use client';

import type { Translations } from '@/i18n/translations';
import { useEffect } from 'react';

type Props = {
  t: Translations;
};

export default function CompetitorTable({ t }: Props) {
  useEffect(() => {
    const el = document.getElementById('competitor-table');
    if (el) el.setAttribute('data-section-name', 'competitor-table');
  }, []);

  const ct = t.competitorTable;

  return (
    <section className="competitor-table" id="competitor-table" data-section-name="competitor-table">
      <div className="container">
        <h2 className="competitor-table__title reveal">{ct.sectionTitle}</h2>
        <div className="competitor-table__wrap reveal">
          <table className="competitor-table__table" aria-label={ct.sectionTitle}>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" className="competitor-table__header-cell--flow80">{ct.flow80}</th>
                <th scope="col">{ct.hubspotStarter}</th>
                <th scope="col">{ct.hubspotPro}</th>
                <th scope="col">{ct.monday}</th>
                <th scope="col">{ct.activepieces}</th>
              </tr>
            </thead>
            <tbody>
              {ct.rows.map((row, i) => (
                <tr key={i}>
                  <th scope="row">{row.feature}</th>
                  {row.cells.map((cell, j) => (
                    <td
                      key={j}
                      className={j === 0 ? 'competitor-table__cell--flow80' : ''}
                    >
                      {cell === 'check' && <span className="competitor-table__check">✓</span>}
                      {cell === 'cross' && <span className="competitor-table__cross">–</span>}
                      {cell === 'partial' && <span className="competitor-table__partial">~</span>}
                      {typeof cell === 'string' && cell !== 'check' && cell !== 'cross' && cell !== 'partial' && (
                        <span className="competitor-table__price">{cell}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="competitor-table__bottom-line">
                  <strong>{ct.bottomLine}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
