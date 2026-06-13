export const SITE_BASE = 'https://pavilion.asianews.blog';

export const LOCALES = ['en', 'ja', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Maps our URL locale segment to the value used in <html lang> and hreflang. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  ja: 'ja',
  zh: 'zh-CN',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Splits a content-collection article id ("en/some-slug") into [locale, slug]. */
export function parseArticleId(id: string): [Locale, string] {
  const [lang, ...rest] = id.split('/');
  return [lang as Locale, rest.join('/')];
}
