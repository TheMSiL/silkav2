import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/json-ld";

import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { getInsights } from "@/data";
import { site } from "@/lib/site";
import { localeIntl, localizeHref, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({
    title: dict.insights.metaTitle,
    description: dict.insights.metaDescription,
    path: "/insights",
    locale,
  });
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const insights = getInsights(locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.nav.insights, path: "/insights" },
            ],
            locale,
          ),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${site.name} — ${dict.nav.insights}`,
            url: `${site.url}${localizeHref("/insights", locale)}`,
            publisher: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <PageHero
        eyebrow={dict.nav.insights}
        title={dict.insights.title}
        accent={dict.insights.accent}
        intro={dict.insights.intro}
      />

      <Section theme="dark" className="pt-0">
        <ul className="border-t border-line">
          {insights.map((insight, i) => (
            <Reveal as="li" key={insight.slug} delay={(i % 4) * 0.05}>
              <Link
                href={localizeHref(`/insights/${insight.slug}`, locale)}
                data-cursor="view"
                className="group grid gap-4 border-b border-line py-8 md:grid-cols-[minmax(0,10rem)_1fr_auto] md:items-baseline md:gap-8"
              >
                <div className="mono-sm flex gap-3 text-faint md:flex-col md:gap-1">
                  <span className="text-accent">{dict.categories[insight.category]}</span>
                  <time dateTime={insight.date}>
                    {new Date(insight.date).toLocaleDateString(localeIntl[locale], {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <div>
                  <h2 className="font-display text-2xl transition-colors group-hover:text-accent md:text-3xl">
                    {insight.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-lg text-muted">{insight.excerpt}</p>
                </div>

                <span className="mono-sm flex items-center gap-3 text-faint">
                  {insight.readingTime}
                  <ArrowUpRight className="text-fg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
