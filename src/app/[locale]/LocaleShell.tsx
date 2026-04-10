'use client';

import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import type { Locale } from '@/i18n/translations';

type Props = {
  children: React.ReactNode;
  initialLocale: Locale;
};

export default function LocaleShell({ children, initialLocale }: Props) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const handleLocaleChange = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
  }, []);

  return (
    <>
      <Navbar locale={locale} onLocaleChange={handleLocaleChange} />
      {children}
    </>
  );
}
