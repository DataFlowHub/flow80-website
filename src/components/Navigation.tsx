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

const isGoLive = process.env.NEXT_PUBLIC_SITE_STATE === 'go-live';

export default function Navigation({ t, locale, onLocaleChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = useCallback(
    (newLocale: string) => {
      const oldLang = locale;
      trackLanguageToggled(oldLang, newLocale, 'nav');
      onLocaleChange(newLocale);
      const newPath = pathname.replace(`/${oldLang}`, `/${newLocale}`) || `/${newLocale}`;
      router.push(newPath);
    },
    [locale, pathname, router, onLocaleChange]
  );

  const scrollToForms = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('forms-row')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goLiveNav = isGoLive ? t.goLiveNav || t.nav : null;
  const ctaLabel = isGoLive
    ? (t.goLiveNav?.startFreeTrial ?? 'Start Free Trial →')
    : t.nav.getEarlyAccess;
  const ctaScrollHandler = isGoLive ? scrollToPricing : scrollToForms;
  const ctaDataAttr = isGoLive ? 'nav_start_trial' : 'nav_early_access';

  return (
    <nav className="nav" aria-label="Main navigation" data-site-state={process.env.NEXT_PUBLIC_SITE_STATE || 'pre-launch'}>
      <div className="nav__inner">
        <a href={`/${locale}`} className="nav__logo" aria-label="Flow80 home">
          Flow80
        </a>

        <ul className="nav__links" role="list">
          {isGoLive ? (
            // Go-Live nav
            <>
              <li>
                <a
                  href="#how-it-works"
                  className="nav__link"
                  onClick={scrollToHowItWorks}
                >
                  {goLiveNav?.howItWorks ?? 'How It Works'}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="nav__link"
                  onClick={scrollToPricing}
                >
                  {goLiveNav?.pricing ?? 'Pricing'}
                </a>
              </li>
            </>
          ) : (
            // Pre-launch nav
            <>
              <li>
                <a
                  href="#whats-coming"
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
                <button
                  className="nav__link nav__link--disabled"
                  aria-disabled="true"
                  tabIndex={-1}
                >
                  {t.nav.pricing} (coming soon)
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="nav__cta"
              onClick={ctaScrollHandler}
              aria-label={ctaLabel}
              data-cta={ctaDataAttr}
              data-cta-position="nav"
            >
              {ctaLabel}
            </button>
          </li>
        </ul>

        {/* Mobile: just show CTA + lang switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="nav__lang" role="group" aria-label="Language switcher">
            {locales.map((l) => (
              <button
                key={l}
                className={`nav__lang-btn${locale === l ? ' active' : ''}`}
                onClick={() => handleLangChange(l)}
                aria-label={`Switch to ${l.toUpperCase()}`}
                aria-pressed={locale === l}
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
