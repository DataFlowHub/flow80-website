'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import WhatsComingSection from '@/components/WhatsComingSection';
import PricingTeaserSection from '@/components/PricingTeaserSection';
import NewsletterForm from '@/components/NewsletterForm';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/components/useScrollReveal';
import { translations, locales, defaultLocale, type Locale } from '@/i18n/translations';
import {
  initPageViewTracking,
  initSectionTracking,
  initCtaTracking,
} from '@/services/analytics';

export default function LocalePage() {
  const pathname = usePathname();
  const router = useRouter();

  // Derive locale from URL path
  const pathLocale = (pathname?.split('/')[1] || defaultLocale) as Locale;
  const validLocale = locales.includes(pathLocale) ? pathLocale : defaultLocale;

  const [locale, setLocale] = useState<Locale>(validLocale);
  const t = translations[locale];

  // Scroll reveal
  useScrollReveal();

  // Analytics init
  useEffect(() => {
    initPageViewTracking();
    initSectionTracking();
    initCtaTracking();
  }, []);

  // Sync html lang
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLocaleChange = useCallback((newLocale: string) => {
    setLocale(newLocale as Locale);
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    router.push(newPath);
  }, [locale, pathname, router]);

  return (
    <>
      <Navigation t={t} locale={locale} onLocaleChange={handleLocaleChange} />
      <main>
        <Hero t={t} locale={locale} />
        <ProblemSection t={t} />
        <WhatsComingSection t={t} />
        <PricingTeaserSection t={t} />

        {/* Forms Row */}
        <div className="forms-row" id="forms-row">
          <NewsletterForm t={t} locale={locale} />
          <EarlyAccessForm t={t} locale={locale} />
        </div>
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
