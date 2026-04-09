'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { Translations } from '@/i18n/translations';
import { locales } from '@/i18n/translations';

type Props = {
  t: Translations;
  locale: string;
};

export default function ConceptDNav({ t, locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <nav className="concept-d-nav" aria-label="Main navigation">
      <div className="concept-d-nav__inner">
        <Link href={`/${locale}`} className="concept-d-nav__logo" aria-label="Flow80 home">
          Flow80
        </Link>

        <ul className="concept-d-nav__links" role="list">
          <li>
            <Link href={`/${locale}/how-it-works`} className="concept-d-nav__link">
              {t.nav.howItWorks}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/features`} className="concept-d-nav__link">
              Features
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/pricing`} className="concept-d-nav__link">
              {t.nav.pricing}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/pricing`} className="concept-d-nav__cta">
              Get Early Access →
            </Link>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="concept-d-nav__lang" role="group" aria-label="Language switcher">
            {locales.map((l) => (
              <button
                key={l}
                className={`concept-d-nav__lang-btn${locale === l ? ' active' : ''}`}
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