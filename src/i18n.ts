import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';

const locales: string[] = ['en', 'tr'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  try {
    const messages = (await import(`../public/${locale}.json`)).default;
    return {
      messages
    };
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}":`, error);
    notFound();
  }
});