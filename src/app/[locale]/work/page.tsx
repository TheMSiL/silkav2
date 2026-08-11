import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectGrid } from "@/features/projects/project-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { getProjectFilters, getProjects } from "@/data";
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

      <Section theme="dark" className="pt-0">
        <ProjectGrid projects={projects} filters={filters} locale={locale} dict={dict} />
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
