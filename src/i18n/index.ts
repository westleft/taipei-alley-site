import { createI18n } from 'vue-i18n';
import zhTW from './locales/zh-TW';
import en from './locales/en';
import ja from './locales/ja';

export const SUPPORTED_LOCALES = ['zh-TW', 'en', 'ja'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = 'zh-TW';

const STORAGE_KEY = 'taipei-alley-locale';

/** Maps an app locale to the value used for the <html lang> attribute. */
const HTML_LANG: Record<AppLocale, string> = {
  'zh-TW': 'zh-Hant',
  en: 'en',
  ja: 'ja',
};

function isSupported(value: string | null | undefined): value is AppLocale {
  return (
    value != null && (SUPPORTED_LOCALES as readonly string[]).includes(value)
  );
}

/** Resolves the initial locale from storage, then the browser, then the default. */
function detectLocale(): AppLocale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isSupported(stored)) return stored;
  } catch {
    // localStorage may be unavailable (private mode, etc.) — fall through.
  }

  const candidates =
    typeof navigator !== 'undefined'
      ? [navigator.language, ...(navigator.languages ?? [])]
      : [];

  for (const candidate of candidates) {
    const lower = candidate.toLowerCase();
    if (lower.startsWith('zh')) return 'zh-TW';
    if (lower.startsWith('ja')) return 'ja';
    if (lower.startsWith('en')) return 'en';
  }

  return DEFAULT_LOCALE;
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    'zh-TW': zhTW,
    en,
    ja,
  },
});

/** Reflects the active locale on the document and persists the choice. */
export function applyLocale(locale: AppLocale): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = HTML_LANG[locale];
  }

  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Persisting the preference is best-effort.
  }
}

/** Switches the active locale and applies the side effects. */
export function setLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale;
  applyLocale(locale);
}

// Keep the document in sync with the locale detected at startup.
applyLocale(i18n.global.locale.value as AppLocale);
