import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectGrid } from "@/features/projects/project-grid";
import { IndustriesList } from "@/features/industries/industries-list";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { getIndustriesWithWork, getProjectFilters, getProjects } from "@/data";
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
    title: dict.work.metaTitle,
    description: dict.work.metaDescription,
    path: "/work",
    locale,
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const projects = getProjects(locale);
  const filters = getProjectFilters(locale, dict.common.all);
  const industries = getIndustriesWithWork(locale).map((industry) => ({
    ...industry,
    projects: industry.projects.map((p) => ({ slug: p.slug, name: p.name, summary: p.summary })),
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.nav.work, path: "/work" },
            ],
            locale,
          ),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: dict.nav.work,
            description: dict.work.metaDescription,
            url: `${site.url}${localizeHref("/work", locale)}`,
            hasPart: projects.map((project) => ({
              "@type": "CreativeWork",
              name: project.name,
              url: `${site.url}${localizeHref(`/work/${project.slug}`, locale)}`,
            })),
          },
        ]}
      />

      <PageHero
        eyebrow={dict.nav.work}
        title={dict.work.title}
        accent={dict.work.accent}
        intro={dict.work.intro}
      />

      <Section surface="base" className="pt-0">
        <ProjectGrid projects={projects} filters={filters} locale={locale} dict={dict} />
      </Section>

      {/*
        The same fifteen projects, cut by industry instead of by discipline.
        It lives here rather than on the home page because it is a second way
        into the work — useful to someone already looking at the portfolio,
        noise to someone who has not seen a single case study yet. The home
        page's "13 industries" figure links straight to this anchor.
      */}
      <Section surface="contrast" id="industries" label={dict.home.industriesEyebrow}>
        <SectionHeading
          eyebrow={dict.home.industriesEyebrow}
          title={dict.home.industriesTitle}
          accent={dict.home.industriesAccent}
          intro={dict.home.industriesIntro}
        />
        <IndustriesList industries={industries} locale={locale} dict={dict} />
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
