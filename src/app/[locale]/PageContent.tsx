'use client';

import { useEffect } from 'react';
import ConceptDNav from '@/components/ConceptDNav';
import ConceptDHero from '@/components/ConceptDHero';
import HowItWorks from '@/components/HowItWorks';
import TemplateShowcase from '@/components/TemplateShowcase';
import Pricing from '@/components/Pricing';
import CompetitorTable from '@/components/CompetitorTable';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/components/useScrollReveal';
import { translations, type Locale } from '@/i18n/translations';
import type { Translations } from '@/i18n/translations';
import {
  initPageViewTracking,
  initSectionTracking,
  initCtaTracking,
} from '@/services/analytics';

type Props = {
  locale: Locale;
};

export default function PageContent({ locale }: Props) {
  const t: Translations = translations[locale];

  useScrollReveal();

  useEffect(() => {
    initPageViewTracking();
    initSectionTracking();
    initCtaTracking();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <ConceptDNav t={t} locale={locale} />
      <main id="main-content">
        <ConceptDHero t={t} locale={locale} />
        <HowItWorks t={t} />
        <TemplateShowcase t={t} />
        <Pricing t={t} />
        <CompetitorTable t={t} />
        <TrustSection t={t} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
