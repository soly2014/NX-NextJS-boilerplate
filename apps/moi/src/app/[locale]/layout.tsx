'use client';
import '../global.css';
import { FluentThemeProvider } from '@azure/communication-react';
import { purpleTealTheme } from '../../utils/themes';
import {
  LocalizationProvider,
  COMPONENT_LOCALE_AR_SA,
} from '@azure/communication-react';

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  COMPONENT_LOCALE_AR_SA.strings.cameraButton.cameraMenuTitle = 'Start';
  return (
    <html lang={locale}>
      <body>
        {/* <NextIntlClientProvider messages={messages}> */}
        <header className="bg-green-600 p-7 text-center text-white">
          <h1>MOI App Header</h1>
        </header>
        <FluentThemeProvider fluentTheme={purpleTealTheme}>
          <LocalizationProvider locale={COMPONENT_LOCALE_AR_SA}>
            {children}
          </LocalizationProvider>
        </FluentThemeProvider>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
