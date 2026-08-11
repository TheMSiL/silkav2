/**
 * i18n.
 *
 * Ukrainian is the primary language and is served unprefixed at `/`.
 * English and Russian are prefixed: `/en/...`, `/ru/...`.
 *
 * `middleware.ts` rewrites unprefixed requests to `/uk/...` internally, so
 * every page lives once under `app/[locale]/` while the Ukrainian URLs stay
 * clean. Build links with `localizeHref()` — never by string concatenation.
 */

export const locales = ["uk", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uk";

/** Native names, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  uk: "Українська",
  en: "English",
  ru: "Русский",
};

/** Two-letter labels used in the compact switcher. */
export const localeShortNames: Record<Locale, string> = {
  uk: "UA",
  en: "EN",
  ru: "RU",
};

/** BCP-47 tags for <html lang> and hreflang. */
export const localeTags: Record<Locale, string> = {
  uk: "uk-UA",
  en: "en",
  ru: "ru",
};

/** Locale used for date formatting. */
export const localeIntl: Record<Locale, string> = {
  uk: "uk-UA",
  en: "en-GB",
  ru: "ru-RU",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Locale-aware href from a locale-agnostic path. */
export function localizeHref(path: string, locale: Locale = defaultLocale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/** Splits a pathname into its locale and canonical (locale-free) path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return { locale: segments[0], path: `/${segments.slice(1).join("/")}` };
  }
  return { locale: defaultLocale, path: pathname === "" ? "/" : pathname };
}

/** hreflang map for the Metadata API, including x-default. */
export function alternateLanguages(path: string, origin: string) {
  const entries = locales.map((locale) => [
    localeTags[locale],
    `${origin}${localizeHref(path, locale)}`,
  ]);
  return Object.fromEntries([
    ...entries,
    ["x-default", `${origin}${localizeHref(path, defaultLocale)}`],
  ]);
}
