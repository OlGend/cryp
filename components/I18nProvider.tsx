'use client';
import { useEffect } from 'react';
import i18n from '@/i18n-client';

export function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('NEXT_LOCALE', locale);
    }
  }, [locale]);

  return <>{children}</>;
}
