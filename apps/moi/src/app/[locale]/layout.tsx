'use client';
import { getMessages } from 'next-intl/server';
import '../global.css';
import { FluentThemeProvider } from '@azure/communication-react';

export const lightTheme = {
  palette: {
    themePrimary: 'red',
    themeLighterAlt: '#f3f9fd',
    themeLighter: '#d0e7f8',
    themeLight: '#a9d3f2',
    themeTertiary: '#5ca9e5',
    themeSecondary: '#1a86d9',
    themeDarkAlt: '#006cbe',
    themeDark: '#005ba1',
    themeDarker: '#004377',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started

  return (
    <html lang={locale}>
      <body>
        {/* <NextIntlClientProvider messages={messages}> */}
        <header className="bg-green-600 p-7 text-center text-white">
          <h1>MOI App Header</h1>
        </header>
        <FluentThemeProvider fluentTheme={lightTheme}>
          {children}
        </FluentThemeProvider>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
