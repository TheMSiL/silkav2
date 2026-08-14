import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/json-ld";

import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/json-ld";
import { getInsight, getInsightSlugs, getRelatedInsights } from "@/data";
import { localeIntl, locales, localizeHref, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Fixed article set — unknown slugs 404 at the routing layer. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getInsightSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const insight = getInsight(locale, slug);
  if (!insight) {
    return buildMetadata({ title: "404", description: "", path: "/insights", locale, noIndex: true });
  }

  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    locale,
    type: "article",
    publishedTime: insight.date,
    authors: [insight.author],
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const insight = getInsight(locale, slug);
  if (!insight) notFound();

  const dict = getDictionary(locale);
  const related = getRelatedInsights(locale, slug, 2);
  const published = new Date(insight.date).toLocaleDateString(localeIntl[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={[
          articleSchema(insight, locale),
          breadcrumbSchema(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.nav.insights, path: "/insights" },
              { name: insight.title, path: `/insights/${insight.slug}` },
            ],
            locale,
          ),
        ]}
      />

      <PageHero
        eyebrow={dict.categories[insight.category]}
        title={insight.title}
        locale={locale}
        trail={[
          { label: dict.common.home, href: "/" },
          { label: dict.nav.insights, href: "/insights" },
        ]}
        intro={insight.excerpt}
      >
        <p className="mono-sm mt-8 flex flex-wrap items-center gap-3 text-faint">
          <span className="text-accent">{dict.categories[insight.category]}</span>
          <span aria-hidden className="inline-block h-px w-6 bg-line-strong" />
          <time dateTime={insight.date}>{published}</time>
          <span aria-hidden className="inline-block h-px w-6 bg-line-strong" />
          {insight.readingTime}
        </p>
      </PageHero>

      <article>
        <Section surface="contrast" size="narrow">
          <div className="flex flex-col gap-10">
            {insight.body.map((block, i) => (
              <Reveal key={block.heading ?? i} delay={0.04}>
                <div>
                  {block.heading ? (
                    <h2 className="font-display mb-5 text-2xl md:text-3xl">{block.heading}</h2>
                  ) : null}
                  <div className="space-y-5">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="text-lg leading-[1.65] text-fg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {block.list ? (
                    <ul className="mt-6 space-y-3 border-l-2 border-accent pl-6">
                      {block.list.map((item) => (
                        <li key={item} className="text-lg text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <Container size="narrow" className="mt-16 px-0">
            <div className="border-t border-line pt-8">
              <p className="text-lg text-muted">
                {dict.insights.articleOutro}{" "}
                <Link href={localizeHref("/work", locale)} className="link-underline text-fg">
                  {dict.insights.articleOutroWork}
                </Link>{" "}
                {dict.insights.articleOutroOr}{" "}
                <Link href={localizeHref("/contact", locale)} className="link-underline text-fg">
                  {dict.insights.articleOutroContact}
                </Link>
                .
              </p>
            </div>
          </Container>
        </Section>
      </article>

      {related.length > 0 ? (
        <Section surface="base" label={dict.insights.keepReading}>
          <h2 className="mono-sm text-faint">{dict.insights.keepReading}</h2>
          <ul className="mt-8 grid grid-hairlines gap-px md:grid-cols-2">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.06} className="bg-surface">
                <Link
                  href={localizeHref(`/insights/${item.slug}`, locale)}
                  data-cursor="view"
                  className="group flex h-full flex-col gap-4 p-7"
                >
                  <span className="mono-sm text-accent">{dict.categories[item.category]}</span>
                  <h3 className="font-display text-xl transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="text-base text-muted">{item.excerpt}</p>
                  <span aria-hidden className="mt-auto pt-4 text-faint group-hover:text-accent">
                    <ArrowUpRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
