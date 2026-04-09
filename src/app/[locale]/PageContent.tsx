'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import WhatsComingSection from '@/components/WhatsComingSection';
import PricingTeaserSection from '@/components/PricingTeaserSection';
import NewsletterForm from '@/components/NewsletterForm';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import TemplateShowcase from '@/components/TemplateShowcase';
import Pricing from '@/components/Pricing';
import CompetitorTable from '@/components/CompetitorTable';
import TrustSection from '@/components/TrustSection';
import HeroSection from '@/components/HeroSection';
import { useScrollReveal } from '@/components/useScrollReveal';
import { translations, type Locale } from '@/i18n/translations';
import type { Translations } from '@/i18n/translations';
import {
  initPageViewTracking,
  initSectionTracking,
  initCtaTracking,
} from '@/services/analytics';

const isGoLive = process.env.NEXT_PUBLIC_SITE_STATE === 'go-live';

type Props = {
  locale: Locale;
};

export default function PageContent({ locale }: Props) {
  const t: Translations = translations[locale];

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

  if (isGoLive) {
    return (
      <main id="main-content">
        <HeroSection t={t} />
        <HowItWorks t={t} />
        <TemplateShowcase t={t} />
        <Pricing t={t} />
        <CompetitorTable t={t} />
        <TrustSection t={t} />
      </main>
    );
  }

  return (
    <>
      <main id="main-content">
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
