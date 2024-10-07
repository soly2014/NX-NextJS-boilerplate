// libs/shared-i18n/src/lib/get-messages.ts
import deepmerge from 'deepmerge';

export const locales = ['en', 'ar'];

export async function commonMessages(
  locale: any,
  appMessages: any = {},
): Promise<any> {
  if (!locales.includes(locale)) {
    throw new Error(`Locale '${locale}' not supported`);
  }

  // Load shared messages from the shared library
  const sharedMessages = (await import(`./${locale}.json`)).default;

  // Merge shared messages with app-specific messages
  const mergedMessages = deepmerge(sharedMessages, appMessages);

  return mergedMessages;
}
