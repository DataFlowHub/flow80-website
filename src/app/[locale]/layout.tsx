import type { Metadata } from 'next';
import { translations, type Locale } from '@/i18n/translations';

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (params.locale || 'en') as Locale;
  const meta = translations[locale]?.meta?.[locale] || translations.en.meta.en;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: locale === 'da' ? 'da_DK' : locale === 'sv' ? 'sv_SE' : 'en_US',
    },
    alternates: {
      canonical: `https://flow80.com/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
