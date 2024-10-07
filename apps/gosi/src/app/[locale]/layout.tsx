import '../global.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { Header, Footer } from '@ui';
import ClientQueryProvider from '@gosi/components/query-client-provider';
import { LocaleProviders } from '@localization';

const PingARFont = localFont({
  src: [
    {
      path: '../../../public/font/PingAR+LT-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/font/PingAR+LT-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/font/PingAR+LT-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/font/PingL-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
});

export const metadata = {
  title: 'موقع المؤسسة العامة للتأمينات الاجتماعية',
  description:
    'مؤسسة حكومية تعنى بتوفير الحماية التأمينية للعاملين في القطاعين العام والخاص وتقديم المنافع لهم ولأفراد أسرهم',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${PingARFont.className} fallback-font`}>
        <ClientQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <LocaleProviders locale={locale}>
              <div className="flex min-h-[100vh] flex-col">
                <Header locale={locale} />
                <div className="min-h-[calc(100dvh-10.2rem)]">{children}</div>
                <Footer />
              </div>
            </LocaleProviders>
          </NextIntlClientProvider>
        </ClientQueryProvider>
      </body>
    </html>
  );
}
