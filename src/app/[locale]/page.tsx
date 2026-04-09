'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ConceptDNav from '@/components/ConceptDNav';
import ConceptDHero from '@/components/ConceptDHero';
import Footer from '@/components/Footer';
import { translations, locales, defaultLocale, type Locale } from '@/i18n/translations';
import {
  initPageViewTracking,
  initSectionTracking,
  initCtaTracking,
} from '@/services/analytics';

const isGoLive = process.env.NEXT_PUBLIC_SITE_STATE === 'go-live';

export default function LocalePage() {
  const pathname = usePathname();
  const router = useRouter();

  const pathLocale = (pathname?.split('/')[1] || defaultLocale) as Locale;
  const validLocale = locales.includes(pathLocale) ? pathLocale : defaultLocale;

  const [locale, setLocale] = useState<Locale>(validLocale);
  const t = translations[locale];

  useEffect(() => {
    initPageViewTracking();
    initSectionTracking();
    initCtaTracking();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLocaleChange = useCallback((newLocale: string) => {
    setLocale(newLocale as Locale);
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    router.push(newPath);
  }, [locale, pathname, router]);

  if (isGoLive) {
    return (
      <>
        <main id="main-content">
          {/* Go-live: use existing sections */}
          <div />
        </main>
      </>
    );
  }

  // Pre-launch: Concept D design
  return (
    <div className="concept-d-layout">
      <ConceptDNav t={t} locale={locale} />
      <main id="main-content">
        <ConceptDHero t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </div>
  );
}