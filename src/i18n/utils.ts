import type { Locale } from '../consts';
import { DEFAULT_LOCALE } from '../consts';
import en from './en.json';
import ja from './ja.json';
import zh from './zh.json';

const dictionaries = { en, ja, zh } as const;

export type UIDict = typeof en;
export type UIKey = keyof UIDict;

/** Returns a `t(key)` translator for the given locale, falling back to English. */
export function useTranslations(lang: Locale) {
  const dict = dictionaries[lang] as UIDict;
  return function t(key: UIKey): string {
    return dict[key] ?? dictionaries[DEFAULT_LOCALE][key];
  };
}

export function getDict(lang: Locale): UIDict {
  return dictionaries[lang] as UIDict;
}
