import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { ServicesExplorer } from "@/features/services/services-explorer";
import { ComplexitySlider } from "@/features/complexity/complexity-slider";
import { Estimator } from "@/features/estimator/estimator";
import { ProductBuilder } from "@/features/builder/product-builder";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";

import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/json-ld";
import { getContent, getProjects } from "@/data";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({
    title: dict.services.metaTitle,
    description: dict.services.metaDescription,
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const content = getContent(locale);
  const projects = getProjects(locale);
  const projectsBySlug = Object.fromEntries(
    projects.map((p) => [p.slug, { slug: p.slug, name: p.name, summary: p.summary }]),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.nav.services, path: "/services" },
            ],
            locale,
          ),
          ...content.services.map((service) => serviceSchema(service, locale)),
        ]}
      />

      <PageHero
        eyebrow={dict.nav.services}
        title={dict.services.title}
        accent={dict.services.accent}
        intro={dict.services.intro}
      />

      <Section surface="base" className="pt-0" label={dict.services.tablistLabel}>
        <ServicesExplorer
          services={content.services}
          projectsBySlug={projectsBySlug}
          locale={locale}
          dict={dict}
        />
      </Section>

      {/*
        Scale, next to the ten disciplines rather than on the home page: this
        is a question someone asks once they already believe the studio can
        build the thing — "is my project too small, or too large".
      */}
      <Section surface="contrast" id="complexity" label={dict.home.complexityEyebrow}>
        <SectionHeading
          eyebrow={dict.home.complexityEyebrow}
          title={dict.home.complexityTitle}
          accent={dict.home.complexityAccent}
          intro={dict.home.complexityIntro}
        />
        <ComplexitySlider levels={content.complexityLevels} locale={locale} dict={dict} />
      </Section>

      <Section surface="base" id="builder" label={dict.home.builderEyebrow}>
        <SectionHeading
          eyebrow={dict.home.builderEyebrow}
          title={dict.services.builderTitle}
          accent={dict.services.builderAccent}
          intro={dict.services.builderIntro}
        />
        <ProductBuilder modules={content.builderModules} locale={locale} dict={dict} />
      </Section>

      <Section surface="base" id="estimator" label={dict.services.estimatorEyebrow}>
        <SectionHeading
          eyebrow={dict.services.estimatorEyebrow}
          title={dict.services.estimatorTitle}
          accent={dict.services.estimatorAccent}
          intro={dict.services.estimatorIntro}
        />
        <Estimator steps={content.estimatorSteps} locale={locale} dict={dict} />
      </Section>

      <Section surface="base" id="pricing" className="pt-0" label={dict.services.pricingEyebrow}>
        <SectionHeading
          eyebrow={dict.services.pricingEyebrow}
          title={dict.services.pricingTitle}
          accent={dict.services.pricingAccent}
          intro={dict.services.pricingIntro}
        />
        <dl className="mt-12 grid grid-hairlines gap-px sm:grid-cols-2 lg:grid-cols-4">
          {content.pricingFactors.map((factor, i) => (
            <Reveal key={factor.label} delay={(i % 4) * 0.05} className="bg-surface">
              <div className="flex h-full flex-col gap-2 p-6">
                <dt className="text-lg text-fg">{factor.label}</dt>
                <dd className="mono-sm text-faint">{factor.note}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-lg text-muted">{dict.services.pricingNote}</p>
        </Reveal>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
