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
          <table className="competitor-table__table">
            <thead>
              <tr>
                <th></th>
                <th className="competitor-table__header-cell--flow80">{ct.flow80}</th>
                <th>{ct.hubspotStarter}</th>
                <th>{ct.hubspotPro}</th>
                <th>{ct.monday}</th>
                <th>{ct.activepieces}</th>
              </tr>
            </thead>
            <tbody>
              {ct.rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.feature}</td>
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
