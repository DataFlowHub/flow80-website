'use client';

import { useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import type { Locale } from '@/i18n/translations';
import type { Translations } from '@/i18n/translations';
import { translations } from '@/i18n/translations';

type Props = {
  children: React.ReactNode;
  initialLocale: Locale;
};

export default function LocaleShell({ children, initialLocale }: Props) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t: Translations = translations[locale];

  const handleLocaleChange = useCallback((newLocale: string) => {
    setLocale(newLocale as Locale);
  }, []);

  return (
    <>
      <Navigation
        t={t}
        locale={locale}
        onLocaleChange={handleLocaleChange}
      />
      {children}
    </>
  );
}
