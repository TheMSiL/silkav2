import Link from "next/link";

import { Hero } from "@/components/sections/hero";
import { Proof } from "@/components/sections/proof";
import { SelectedWork } from "@/components/sections/selected-work";
import { Philosophy } from "@/components/sections/philosophy";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

import { ServicesExplorer } from "@/features/services/services-explorer";
import { ComplexitySlider } from "@/features/complexity/complexity-slider";
import { ProductBuilder } from "@/features/builder/product-builder";
import { ProcessTimeline } from "@/features/process/process-timeline";
import { IndustriesList } from "@/features/industries/industries-list";
import { FlowDiagram } from "@/features/flows/flow-diagram";

import { getContent, getFeaturedProjects, getIndustriesWithWork, getInsights, getProjects } from "@/data";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const content = getContent(locale);

  const projects = getProjects(locale);
  const projectsBySlug = Object.fromEntries(
    projects.map((p) => [p.slug, { slug: p.slug, name: p.name, summary: p.summary }]),
  );
  const industries = getIndustriesWithWork(locale).map((industry) => ({
    ...industry,
    projects: industry.projects.map((p) => ({ slug: p.slug, name: p.name, summary: p.summary })),
  }));
  const insights = getInsights(locale).slice(0, 3);

  return (
    <>
      <Hero locale={locale} dict={dict} services={content.services} />
      <Proof stats={content.stats} services={content.services} />
      <SelectedWork
        locale={locale}
        dict={dict}
        featured={getFeaturedProjects(locale, 5)}
        total={projects.length}
      />

      <Section id="services" theme="light" label={dict.home.servicesEyebrow}>
        <SectionHeading
          eyebrow={dict.home.servicesEyebrow}
          title={dict.home.servicesTitle}
          accent={dict.home.servicesAccent}
          intro={dict.home.servicesIntro}
        />
        <ServicesExplorer
          services={content.services}
          projectsBySlug={projectsBySlug}
          locale={locale}
          dict={dict}
        />
      </Section>

      <Section id="complexity" theme="dark" label={dict.home.complexityEyebrow}>
        <SectionHeading
          eyebrow={dict.home.complexityEyebrow}
          title={dict.home.complexityTitle}
          accent={dict.home.complexityAccent}
          intro={dict.home.complexityIntro}
        />
        <ComplexitySlider levels={content.complexityLevels} locale={locale} dict={dict} />
      </Section>

      <Section id="builder" theme="dark" className="border-t border-line" label={dict.home.builderEyebrow}>
        <SectionHeading
          eyebrow={dict.home.builderEyebrow}
          title={dict.home.builderTitle}
          accent={dict.home.builderAccent}
          intro={dict.home.builderIntro}
        />
        <ProductBuilder modules={content.builderModules} locale={locale} dict={dict} />
      </Section>

      <Section id="systems" theme="light" label={dict.home.systemsEyebrow}>
        <SectionHeading
          eyebrow={dict.home.systemsEyebrow}
          title={dict.home.systemsTitle}
          accent={dict.home.systemsAccent}
          intro={dict.home.systemsIntro}
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="border border-line bg-surface-2 p-6 md:p-8">
            <h3 className="font-display text-2xl">{dict.home.automationFlowTitle}</h3>
            <p className="mt-3 text-base text-muted">{dict.home.automationFlowBody}</p>
            <FlowDiagram steps={content.automationFlow} dict={dict} className="mt-8" />
          </div>
          <div className="border border-line bg-surface-2 p-6 md:p-8">
            <h3 className="font-display text-2xl">{dict.home.aiFlowTitle}</h3>
            <p className="mt-3 text-base text-muted">{dict.home.aiFlowBody}</p>
            <FlowDiagram steps={content.aiFlow} dict={dict} className="mt-8" />
          </div>
        </div>
        <Reveal delay={0.1}>
          <Link
            href={localizeHref("/capabilities#automation", locale)}
            data-cursor="explore"
            className="mono group mt-10 inline-flex items-center gap-2 text-fg"
          >
            {dict.home.automationLink}
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Section>

      <Section id="process" theme="dark" label={dict.home.processEyebrow}>
        <SectionHeading
          eyebrow={dict.home.processEyebrow}
          title={dict.home.processTitle}
          accent={dict.home.processAccent}
          intro={dict.home.processIntro}
        />
        <ProcessTimeline steps={content.processSteps} dict={dict} />
      </Section>

      <Philosophy dict={dict} chain={content.philosophyChain} />

      <Section id="industries" theme="dark" label={dict.home.industriesEyebrow}>
        <SectionHeading
          eyebrow={dict.home.industriesEyebrow}
          title={dict.home.industriesTitle}
          accent={dict.home.industriesAccent}
          intro={dict.home.industriesIntro}
        />
        <IndustriesList industries={industries} locale={locale} dict={dict} />
      </Section>

      <Section id="principles" theme="light" label={dict.home.principlesEyebrow}>
        <SectionHeading
          eyebrow={dict.home.principlesEyebrow}
          title={dict.home.principlesTitle}
          accent={dict.home.principlesAccent}
          intro={dict.home.principlesIntro}
        />
        <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
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
        <Testimonials testimonials={content.testimonials} dict={dict} />
      </Section>

      <Section id="insights" theme="dark" label={dict.home.insightsEyebrow}>
        <SectionHeading eyebrow={dict.home.insightsEyebrow} title={dict.home.insightsTitle} align="between">
          <Link
            href={localizeHref("/insights", locale)}
            data-cursor="explore"
            className="mono group inline-flex items-center gap-2 text-fg"
          >
            {dict.cta.allInsights}
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </SectionHeading>
        <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {insights.map((insight, i) => (
            <Reveal as="li" key={insight.slug} delay={i * 0.07} className="bg-surface">
              <Link
                href={localizeHref(`/insights/${insight.slug}`, locale)}
                data-cursor="view"
                className="group flex h-full flex-col gap-4 p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-sm text-accent">{dict.categories[insight.category]}</span>
                  <span className="mono-sm text-faint">{insight.readingTime}</span>
                </div>
                <h3 className="font-display text-xl transition-colors group-hover:text-accent">
                  {insight.title}
                </h3>
                <p className="text-base text-muted">{insight.excerpt}</p>
                <span aria-hidden className="mt-auto pt-4 text-faint transition-colors group-hover:text-accent">
                  <ArrowUpRight />
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
