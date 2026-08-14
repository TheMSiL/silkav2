import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/json-ld";

import { TechExplorer } from "@/features/technology/tech-explorer";
import { MockDashboard } from "@/features/dashboard/mock-dashboard";
import { DeviceShowcase } from "@/features/mobile/device-showcase";
import { FlowDiagram } from "@/features/flows/flow-diagram";
import { ArchitectureDiagram } from "@/features/projects/architecture-diagram";

import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { getContent, getProject } from "@/data";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { CapabilityBlock } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({
    title: dict.capabilities.metaTitle,
    description: dict.capabilities.metaDescription,
    path: "/capabilities",
    locale,
  });
}

export default async function CapabilitiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const content = getContent(locale);
  const [web, mobile, systems, automation, ai, backend] = content.capabilityBlocks;
  /** A real architecture from the portfolio beats an invented one. */
  const referenceArchitecture = getProject(locale, "crashatlas")?.architecture;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.nav.capabilities, path: "/capabilities" },
          ],
          locale,
        )}
      />

      <PageHero
        eyebrow={dict.nav.capabilities}
        title={dict.capabilities.title}
        accent={dict.capabilities.accent}
        intro={dict.capabilities.intro}
      />

      {/* Web */}
      <Section surface="base" id="web" className="pt-0" label={web.eyebrow}>
        <CapabilityIntro block={web} />
        <BulletGrid bullets={web.bullets} columns={2} />
      </Section>

      {/* Mobile */}
      <Section surface="contrast" id="mobile" label={mobile.eyebrow}>
        <CapabilityIntro block={mobile} />
        <DeviceShowcase dict={dict} />
      </Section>

      {/* CRM / ERP */}
      <Section surface="base" id="systems" label={systems.eyebrow}>
        <CapabilityIntro block={systems} />
        <MockDashboard tabs={content.dashboardTabs} dict={dict} />
        <BulletGrid bullets={systems.bullets} columns={4} />
      </Section>

      {/* Automation & AI */}
      <Section surface="contrast" id="automation" label={automation.eyebrow}>
        <CapabilityIntro block={automation} />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="border border-line bg-surface-2 p-6 md:p-8">
            <h3 className="font-display text-2xl">{dict.capabilities.automationTitle}</h3>
            <p className="mt-3 text-base text-muted">{dict.capabilities.automationBody}</p>
            <FlowDiagram steps={content.automationFlow} dict={dict} className="mt-8" />
          </div>
          <div className="border border-line bg-surface-2 p-6 md:p-8">
            <h3 className="font-display text-2xl">{dict.capabilities.aiTitle}</h3>
            <p className="mt-3 text-base text-muted">{dict.capabilities.aiBody}</p>
            <FlowDiagram steps={content.aiFlow} dict={dict} className="mt-8" />
          </div>
        </div>
        <BulletGrid bullets={ai.bullets} columns={4} />
      </Section>

      {/* Backend */}
      <Section surface="base" id="backend" label={backend.eyebrow}>
        <CapabilityIntro block={backend} />
        {referenceArchitecture ? (
          <div className="mt-4 min-w-0">
            <p className="mono-sm mb-2 text-faint">{dict.capabilities.architectureNote}</p>
            <ArchitectureDiagram diagram={referenceArchitecture} dict={dict} />
            <Link
              href={localizeHref("/work/crashatlas", locale)}
              data-cursor="view"
              className="mono group mt-6 inline-flex items-center gap-2 text-fg"
            >
              {dict.capabilities.architectureLink}
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        ) : null}
        <BulletGrid bullets={backend.bullets} columns={4} />
      </Section>

      {/* Technology */}
      <Section surface="contrast" id="technology" label={dict.capabilities.techEyebrow}>
        <SectionHeading
          eyebrow={dict.capabilities.techEyebrow}
          title={dict.capabilities.techTitle}
          accent={dict.capabilities.techAccent}
          intro={dict.capabilities.techIntro}
        />
        <TechExplorer categories={content.techCategories} dict={dict} />
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}

function CapabilityIntro({ block }: { block: CapabilityBlock }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div>
        <Reveal>
          <p className="mono-sm mb-5 flex items-center gap-3 text-muted">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {block.eyebrow}
          </p>
        </Reveal>
        <h2 className="font-display text-3xl md:text-4xl">{block.title}</h2>
      </div>
      <Reveal delay={0.08}>
        <p className="text-lg text-muted">{block.body}</p>
      </Reveal>
    </div>
  );
}

function BulletGrid({
  bullets,
  columns,
}: {
  bullets: CapabilityBlock["bullets"];
  columns: 2 | 4;
}) {
  return (
    <ul
      className={
        columns === 2
          ? "mt-12 grid gap-px border border-line bg-line md:grid-cols-2"
          : "mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4"
      }
    >
      {bullets.map((bullet, i) => (
        <Reveal as="li" key={bullet.title} delay={(i % columns) * 0.05} className="bg-surface">
          <div className="flex h-full flex-col gap-2 p-6">
            <h3 className="text-lg text-fg">{bullet.title}</h3>
            <p className="text-base text-muted">{bullet.description}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
