import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        {/* <NextIntlClientProvider messages={messages}> */}
        <header className="bg-green-600 p-7 text-center text-white">
          <h1>MOI App Header</h1>
        </header>
        {children}
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
