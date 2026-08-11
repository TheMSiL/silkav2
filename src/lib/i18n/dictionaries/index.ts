import { defaultLocale, type Locale } from "../config";
import { uk, type Dictionary } from "./uk";
import { en } from "./en";
import { ru } from "./ru";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { uk, en, ru };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Ukrainian and Russian need three plural forms; English needs two. */
export function pluralize(locale: Locale, count: number, dict: Dictionary): string {
  if (locale === "en") return count === 1 ? dict.common.project : dict.common.projects;

  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return dict.common.project;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return dict.common.projects;
  return dict.common.projectsMany;
}
