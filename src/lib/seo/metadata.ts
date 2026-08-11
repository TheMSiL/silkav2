import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  alternateLanguages,
  defaultLocale,
  localeTags,
  localizeHref,
  type Locale,
} from "@/lib/i18n/config";

interface PageMetaInput {
  title: string;
  description: string;
  /** Locale-agnostic canonical path, e.g. "/work/crashatlas". */
  path: string;
  locale?: Locale;
  /** Absolute or app-relative OG image. Defaults to the route's own OG image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  image,
  type = "website",
  publishedTime,
  authors,
  noIndex,
}: PageMetaInput): Metadata {
  const url = `${site.url}${localizeHref(path, locale)}`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternateLanguages(path, site.url),
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: localeTags[locale],
      images,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** Title template helper so page titles stay consistent. */
export const titleTemplate = `%s — ${site.name}`;
