import type { Insight, IndustryKey, LocaleContent, Project, Service, ServiceKey } from "@/types";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { ukContent } from "./uk";
import { enContent } from "./en";
import { ruContent } from "./ru";

/**
 * Locale-aware content access layer.
 *
 * Pages and components never import a `data/<locale>/*` module directly — they
 * call these functions with the current locale. Moving to a CMS means making
 * them async fetches; nothing above this file changes.
 *
 * Structural fields (slugs, URLs, image paths, architecture graphs) are
 * identical across locales. `tests/unit/content.test.ts` enforces that, so a
 * translation cannot silently drift from the others.
 */
const content: Record<Locale, LocaleContent> = {
  uk: ukContent,
  en: enContent,
  ru: ruContent,
};

export function getContent(locale: Locale = defaultLocale): LocaleContent {
  return content[locale] ?? content[defaultLocale];
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export function getProjects(locale: Locale = defaultLocale): Project[] {
  return getContent(locale).projects;
}

export function getFeaturedProjects(locale: Locale = defaultLocale, limit = 4): Project[] {
  return getProjects(locale)
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

export function getAdjacentProject(locale: Locale, slug: string): Project {
  const all = getProjects(locale);
  const index = all.findIndex((p) => p.slug === slug);
  return all[(index + 1) % all.length];
}

export function filterProjects(all: Project[], service: ServiceKey | "all"): Project[] {
  if (service === "all") return all;
  return all.filter((p) => p.services.includes(service));
}

export function getProjectsByIndustry(locale: Locale, key: IndustryKey): Project[] {
  return getProjects(locale).filter((p) => p.industryKey === key);
}

/** Industries paired with the work that evidences them. */
export function getIndustriesWithWork(locale: Locale = defaultLocale) {
  return getContent(locale).industries.map((industry) => ({
    ...industry,
    projects: getProjectsByIndustry(locale, industry.key),
  }));
}

/** Service keys that at least one project evidences — drives the work filter. */
export function getProjectFilters(
  locale: Locale,
  allLabel: string,
): { key: ServiceKey | "all"; label: string; count: number }[] {
  const projects = getProjects(locale);
  const counts = new Map<ServiceKey, number>();
  for (const project of projects) {
    for (const key of project.services) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const filters = getContent(locale)
    .services.filter((s) => counts.has(s.key))
    .map((s) => ({
      key: s.key as ServiceKey | "all",
      label: s.label,
      count: counts.get(s.key) ?? 0,
    }));
  return [{ key: "all" as const, label: allLabel, count: projects.length }, ...filters];
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export function getServices(locale: Locale = defaultLocale): Service[] {
  return getContent(locale).services;
}

export function getService(locale: Locale, key: string): Service | undefined {
  return getServices(locale).find((s) => s.key === key);
}

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export function getInsights(locale: Locale = defaultLocale): Insight[] {
  return [...getContent(locale).insights].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsight(locale: Locale, slug: string): Insight | undefined {
  return getInsights(locale).find((i) => i.slug === slug);
}

export function getRelatedInsights(locale: Locale, slug: string, limit = 2): Insight[] {
  const current = getInsight(locale, slug);
  const rest = getInsights(locale).filter((i) => i.slug !== slug);
  if (!current) return rest.slice(0, limit);
  const sameCategory = rest.filter((i) => i.category === current.category);
  return [...sameCategory, ...rest.filter((i) => i.category !== current.category)].slice(0, limit);
}

/**
 * Slugs are shared across locales, so static params only need one pass.
 * Used by generateStaticParams.
 */
export function getProjectSlugs(): string[] {
  return ukContent.projects.map((p) => p.slug);
}

export function getInsightSlugs(): string[] {
  return ukContent.insights.map((i) => i.slug);
}
