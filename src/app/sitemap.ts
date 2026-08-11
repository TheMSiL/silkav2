import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getInsightSlugs, getProjectSlugs } from "@/data";
import { alternateLanguages, locales, localizeHref } from "@/lib/i18n/config";

/** Every page is listed once per locale, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; changeFrequency: "monthly" | "weekly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  const dynamicPaths = [
    ...getProjectSlugs().map((slug) => ({
      path: `/work/${slug}`,
      priority: 0.8,
      changeFrequency: "yearly" as const,
    })),
    ...getInsightSlugs().map((slug) => ({
      path: `/insights/${slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ];

  return [...staticPaths, ...dynamicPaths].flatMap((entry) =>
    locales.map((locale) => ({
      url: `${site.url}${localizeHref(entry.path, locale)}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: alternateLanguages(entry.path, site.url) },
    })),
  );
}
