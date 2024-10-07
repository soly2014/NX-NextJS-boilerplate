import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { commonMessages } from '@localization';

// Can be imported from a shared config
const locales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  // Load app-specific messages
  const appMessages = (await import(`../messages/${locale}.json`)).default;

  // Get combined messages (shared + app-specific)
  const messages = await commonMessages(locale, appMessages);

  return {
    messages: messages,
  };
});
