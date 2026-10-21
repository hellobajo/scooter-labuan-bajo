import messages from './additional-languages.json';
import type { Language } from './translations';

type AddedLanguage = 'ES' | 'IT' | 'JA';
const dictionaries = messages as Record<AddedLanguage, Record<string, string>>;

/** Existing ID/ZH copy stays intact; the added languages share the English source keys. */
export const usesEnglishSource = (language: Language) => language !== 'ID' && language !== 'ZH';

export function phrase(language: Language, source: string, ...values: unknown[]): string {
  const text = dictionaries[language as AddedLanguage]?.[source] ?? source;
  return text.replace(/\{(\d+)\}/g, (placeholder, index) =>
    Number(index) < values.length ? String(values[Number(index)]) : placeholder);
}

export function translateData<T>(language: Language, value: T): T {
  if (typeof value === 'string') return phrase(language, value) as T;
  if (Array.isArray(value)) return value.map(item => translateData(language, item)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) =>
      [key, translateData(language, item)])) as T;
  }
  return value;
}
