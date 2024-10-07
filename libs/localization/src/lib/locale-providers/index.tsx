'use client';

import { DirectionProvider } from '@radix-ui/react-direction';
import React from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
// import { createZodErrorMap } from '@utils';
import {
  COMPONENT_LOCALE_AR_SA,
  COMPONENT_LOCALE_EN_US,
  LocalizationProvider,
} from '@azure/communication-react';
import { Toaster } from '@ui';

export function LocaleProviders({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const t = useTranslations();

  // Apply the global Zod error map based on translations
  React.useEffect(() => {
    // z.setErrorMap(createZodErrorMap(t));
  }, [t]);

  const LOCALE =
    locale === 'ar' ? COMPONENT_LOCALE_AR_SA : COMPONENT_LOCALE_EN_US;

  return (
    <DirectionProvider dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* <FluentThemeProvider fluentTheme={purpleTealTheme} rtl={locale === 'ar'}> */}
      <LocalizationProvider locale={LOCALE}>
        {/* <ErrorBoundary> */}
        {children}
        {/* </ErrorBoundary> */}
      </LocalizationProvider>
      {/* </FluentThemeProvider> */}
      <Toaster />
    </DirectionProvider>
  );
}
