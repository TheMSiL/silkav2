import { site } from "@/lib/site";
import { defaultLocale, localeTags, localizeHref, type Locale } from "@/lib/i18n/config";
import type { Insight, Project, Service } from "@/types";

type Json = Record<string, unknown>;

const url = (path: string, locale: Locale) => `${site.url}${localizeHref(path, locale)}`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    foundingDate: site.founded,
    email: site.email,
    logo: `${site.url}/icon.svg`,
    sameAs: Object.values(site.social),
    knowsAbout: [
      "Software development",
      "Web application development",
      "Mobile application development",
      "SaaS platforms",
      "CRM and ERP systems",
      "Business process automation",
      "AI integration",
    ],
  };
}

export function websiteSchema(locale: Locale = defaultLocale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: localeTags[locale],
  };
}

export function serviceSchema(service: Service, locale: Locale = defaultLocale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.label,
    serviceType: service.headline,
    description: service.description,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    url: `${url("/services", locale)}#${service.key}`,
  };
}

export function projectSchema(project: Project, locale: Locale = defaultLocale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: `${project.name} — ${project.summary}`,
    description: project.strapline,
    url: url(`/work/${project.slug}`, locale),
    dateCreated: project.year,
    creator: { "@id": `${site.url}/#organization` },
    about: project.industry,
    keywords: project.scope.join(", "),
    inLanguage: localeTags[locale],
  };
}

export function articleSchema(insight: Insight, locale: Locale = defaultLocale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.date,
    dateModified: insight.date,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: url(`/insights/${insight.slug}`, locale),
    articleSection: insight.category,
    inLanguage: localeTags[locale],
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
  locale: Locale = defaultLocale,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path, locale),
    })),
  };
}
