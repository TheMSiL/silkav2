import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { ProcessTimeline } from "@/features/process/process-timeline";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { ArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/json-ld";

import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { getContent } from "@/data";
import { site } from "@/lib/site";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const content = getContent(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.nav.about, path: "/about" },
          ],
          locale,
        )}
      />

      <PageHero
        eyebrow={dict.nav.about}
        title={dict.about.title}
        accent={dict.about.accent}
        intro={dict.about.intro}
      />

      <Section surface="base" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="max-w-xl space-y-6 text-lg text-fg">
            <p>{dict.about.story1}</p>
            <p>{dict.about.story2}</p>
            <p>{dict.about.story3}</p>
          </div>

          <div>
            <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {content.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.06}>
                  <div className="border-t border-line pt-5">
                    <dd>
                      <Counter value={stat.value} className="font-display block text-3xl" />
                    </dd>
                    <dt className="mt-3 text-base text-fg">{stat.label}</dt>
                    <p className="mono-sm mt-1.5 text-faint">{stat.note}</p>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.3}>
              <p className="mono-sm mt-10 text-faint">
                {site.location} · {dict.about.workingSince} {site.founded}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Disciplines in place of a fabricated team page. */}
      <Section surface="contrast" label={dict.about.teamEyebrow}>
        <SectionHeading
          eyebrow={dict.about.teamEyebrow}
          title={dict.about.teamTitle}
          accent={dict.about.teamAccent}
          intro={dict.about.teamIntro}
        />
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {content.disciplines.map((discipline, i) => (
            <Reveal as="li" key={discipline.label} delay={(i % 4) * 0.05} className="bg-surface">
              <div className="flex h-full flex-col gap-2 p-6">
                <h3 className="text-lg text-fg">{discipline.label}</h3>
                <p className="text-base text-muted">{discipline.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg text-muted">
            {dict.about.teamOutro}{" "}
            <Link href={localizeHref("/contact", locale)} className="link-underline text-fg">
              {dict.about.teamOutroLink}
            </Link>{" "}
            {dict.about.teamOutroEnd}
          </p>
        </Reveal>
      </Section>

      <Section surface="base" id="process" label={dict.home.processEyebrow}>
        <SectionHeading
          eyebrow={dict.home.processEyebrow}
          title={dict.home.processTitle}
          accent={dict.home.processAccent}
          intro={dict.home.processIntro}
        />
        <ProcessTimeline steps={content.processSteps} dict={dict} />
      </Section>

      <Philosophy dict={dict} chain={content.philosophyChain} />

      <Section surface="base" label={dict.home.principlesEyebrow}>
        <SectionHeading
          eyebrow={dict.home.principlesEyebrow}
          title={dict.about.principlesTitle}
          accent={dict.about.principlesAccent}
          intro={dict.about.principlesIntro}
        />
        <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {content.principles.map((principle, i) => (
            <Reveal as="li" key={principle.title} delay={(i % 3) * 0.06} className="bg-surface">
              <div className="flex h-full flex-col gap-3 p-7">
                <span className="mono-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl text-fg">{principle.title}</h3>
                <p className="text-base text-muted">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.2}>
          <Link
            href={localizeHref("/work", locale)}
            data-cursor="view"
            className="mono group mt-12 inline-flex items-center gap-2 text-fg"
          >
            {dict.about.principlesLink}
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <Testimonials testimonials={content.testimonials} dict={dict} />
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
