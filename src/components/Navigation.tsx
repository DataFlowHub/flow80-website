'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { Translations } from '@/i18n/translations';
import { locales } from '@/i18n/translations';
import { trackCtaClicked, trackLanguageToggled } from '@/services/analytics';

type Props = {
  t: Translations;
  locale: string;
  onLocaleChange: (locale: string) => void;
};

export default function Navigation({ t, locale, onLocaleChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = useCallback(
    (newLocale: string) => {
      const oldLang = locale;
      trackLanguageToggled(oldLang, newLocale, 'nav');
      onLocaleChange(newLocale);
      // Replace locale prefix in URL
      const newPath = pathname.replace(`/${oldLang}`, `/${newLocale}`) || `/${newLocale}`;
      router.push(newPath);
    },
    [locale, pathname, router, onLocaleChange]
  );

  const scrollToForms = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('forms-row')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav" data-site-state={process.env.NEXT_PUBLIC_SITE_STATE || 'pre-launch'}>
      <div className="nav__inner">
        <a href={`/${locale}`} className="nav__logo">
          Flow80
        </a>

        <ul className="nav__links">
          <li>
            <a
              href={`#whats-coming`}
              className="nav__link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('whats-coming')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.nav.howItWorks}
            </a>
          </li>
          <li>
            <a href="#" className="nav__link" onClick={(e) => { e.preventDefault(); }}>
              <span style={{ opacity: 0.5 }}>{t.nav.pricing} (coming soon)</span>
            </a>
          </li>
          <li>
            <button
              className="nav__cta"
              onClick={scrollToForms}
              data-cta="nav_early_access"
              data-cta-position="nav_early_access"
            >
              {t.nav.getEarlyAccess}
            </button>
          </li>
        </ul>

        {/* Mobile: just show CTA + lang switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="nav__lang">
            {locales.map((l) => (
              <button
                key={l}
                className={`nav__lang-btn${locale === l ? ' active' : ''}`}
                onClick={() => handleLangChange(l)}
                aria-label={`Switch to ${l.toUpperCase()}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
