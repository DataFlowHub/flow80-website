import type { Locale } from '@/i18n/translations';
import { locales } from '@/i18n/translations';
import PageContent from './PageContent';

type Props = { params: { locale: string } };

export default function LocalePage({ params }: Props) {
  const pathLocale = (params.locale || 'en') as Locale;
  const locale: Locale = locales.includes(pathLocale) ? pathLocale : 'en';

  return <PageContent locale={locale} />;
}
