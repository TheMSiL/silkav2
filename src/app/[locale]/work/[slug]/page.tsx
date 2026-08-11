import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Counter } from "@/components/motion/counter";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ArchitectureDiagram } from "@/features/projects/architecture-diagram";
import { CaseView } from "@/features/projects/case-view";
import { JsonLd } from "@/components/seo/json-ld";
import { FinalCta } from "@/components/sections/final-cta";

import { getAdjacentProject, getProject, getProjectSlugs } from "@/data";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, projectSchema } from "@/lib/seo/json-ld";
import { locales, localizeHref, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { CaseSection } from "@/types";

/**
 * The portfolio is a fixed set, so unknown slugs are 404s at the routing layer.
 * That returns a real 404 status rather than a streamed 200 with 404 content.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjectSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(locale, slug);
  if (!project) {
    return buildMetadata({ title: "404", description: "", path: "/work", locale, noIndex: true });
  }

  return buildMetadata({
    title: `${project.name} — ${project.industry}`,
    description: project.strapline,
    path: `/work/${project.slug}`,
    locale,
    image: project.cover.src,
    type: "article",
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(locale, slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const next = getAdjacentProject(locale, slug);
  const desktopShots = project.gallery.filter((shot) => shot.device === "desktop");
  const mobileShot = project.gallery.find((shot) => shot.device === "mobile");

  return (
    <>
      <CaseView slug={project.slug} name={project.name} />
      <JsonLd
        data={[
          projectSchema(project, locale),
          breadcrumbSchema(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.nav.work, path: "/work" },
              { name: project.name, path: `/work/${project.slug}` },
            ],
            locale,
          ),
        ]}
      />

      {/* 1 — Hero */}
      <section
        data-theme="dark"
        className="noise relative isolate overflow-hidden bg-surface pb-(--space-2xl) pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))]"
      >
        <div
          aria-hidden
          className="grid-bg pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent_80%)]"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="mono-sm flex flex-wrap items-center gap-2 text-faint">
              <li>
                <Link href={localizeHref("/", locale)} className="transition-colors hover:text-fg">
                  {dict.common.home}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={localizeHref("/work", locale)} className="transition-colors hover:text-fg">
                  {dict.nav.work}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-fg">{project.name}</li>
            </ol>
          </nav>

          <p className="mono-sm mb-6 flex flex-wrap items-center gap-3 text-muted">
            <span style={{ color: project.accent }}>{project.industry}</span>
            <span aria-hidden className="inline-block h-px w-6 bg-line-strong" />
            {project.year}
            {project.locales ? (
              <>
                <span aria-hidden className="inline-block h-px w-6 bg-line-strong" />
                {project.locales.join(" · ")}
              </>
            ) : null}
          </p>

          <TextReveal as="h1" text={project.name} className="font-display text-5xl sm:text-6xl" />
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-3xl text-xl text-muted md:text-2xl">{project.strapline}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="view"
                className="group inline-flex items-center gap-3 border border-line-strong px-6 py-3.5 font-medium text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg"
              >
                {dict.cta.visitSite}
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <ul className="flex flex-wrap gap-2">
                {project.scope.map((item) => (
                  <li key={item} className="mono-sm rounded-full border border-line px-3 py-1.5 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>

        <Container className="relative mt-14">
          <ImageReveal
            src={project.cover.src}
            alt={project.cover.alt}
            width={1440}
            height={900}
            priority
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="border border-line"
          />
        </Container>
      </section>

      {/* 2 — Client / industry facts */}
      <Section theme="dark" className="pb-0 pt-0">
        <dl className="grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label={dict.common.industry} value={project.industry} />
          <Fact label={dict.common.engagement} value={project.duration} />
          <Fact label={dict.common.team} value={project.team} />
          <Fact label={dict.common.platforms} value={project.platforms.join(" · ")} />
        </dl>
      </Section>

      {/* 3 — Challenge */}
      <CaseBlock section={project.challenge} index="01" theme="dark" />

      {/* 4 — Solution */}
      <CaseBlock section={project.solution} index="02" theme="light" />

      {/* 5 — Architecture */}
      <Section theme="light" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
          <div>
            <p className="mono-sm text-accent">03</p>
            <h2 className="font-display mt-3 text-3xl">{dict.caseStudy.architecture}</h2>
          </div>
          <div className="min-w-0">
            <ArchitectureDiagram diagram={project.architecture} dict={dict} />
          </div>
        </div>
      </Section>

      {/* 6, 7 — UX and UI */}
      <CaseBlock section={project.ux} index="04" theme="dark" />
      <CaseBlock section={project.ui} index="05" theme="dark" className="pt-0" />

      {/* 8 — Development */}
      <CaseBlock section={project.development} index="06" theme="dark" className="pt-0" />

      {/* 9 — Features */}
      <Section theme="light" label={dict.caseStudy.features}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
          <div>
            <p className="mono-sm text-accent">07</p>
            <h2 className="font-display mt-3 text-3xl">{dict.caseStudy.features}</h2>
          </div>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {project.features.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 2) * 0.05} className="bg-surface">
                <div className="flex h-full flex-col gap-2 p-6">
                  <h3 className="text-lg text-fg">{feature.title}</h3>
                  <p className="text-base text-muted">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* 10 — Integrations + stack */}
      <Section theme="light" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
          <div>
            <p className="mono-sm text-accent">08</p>
            <h2 className="font-display mt-3 text-3xl">{dict.caseStudy.integrationsStack}</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mono-sm mb-4 text-faint">{dict.common.integrations}</h3>
              <ul className="space-y-2">
                {project.integrations.map((item) => (
                  <li key={item} className="flex gap-2.5 text-base text-fg">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              {project.stack.map((group) => (
                <div key={group.group}>
                  <h3 className="mono-sm mb-3 text-faint">{group.group}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="mono-sm rounded-full border border-line px-2.5 py-1 text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 11 — Results */}
      <Section theme="dark" label={dict.caseStudy.results}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
          <div>
            <p className="mono-sm text-accent">09</p>
            <h2 className="font-display mt-3 text-3xl">{dict.caseStudy.results}</h2>
          </div>
          <div>
            <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {project.results.map((metric, i) => (
                <Reveal key={metric.label} delay={i * 0.06}>
                  <div className="border-t border-line pt-5">
                    <dd>
                      <Counter value={metric.value} className="font-display block text-3xl" />
                    </dd>
                    <dt className="mt-3 text-base text-fg">{metric.label}</dt>
                    {metric.note ? <p className="mono-sm mt-1.5 text-faint">{metric.note}</p> : null}
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.2}>
              <p className="mt-12 max-w-2xl text-xl text-fg">{project.outcome}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 12 — Gallery */}
      <Section theme="dark" className="pt-0" label={dict.caseStudy.gallery}>
        <div className="flex flex-col gap-12">
          {desktopShots.map((shot, i) => (
            <figure key={shot.src}>
              <ImageReveal
                src={shot.src}
                alt={shot.alt}
                width={1440}
                height={900}
                delay={i * 0.05}
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="border border-line"
              />
              {shot.caption ? (
                <figcaption className="mono-sm mt-3 text-faint">{shot.caption}</figcaption>
              ) : null}
            </figure>
          ))}

          {mobileShot ? (
            <figure className="flex flex-col items-start gap-6 border border-line bg-surface-2 p-6 md:flex-row md:items-center md:p-10">
              <div className="w-full max-w-[16rem] shrink-0 overflow-hidden border border-line">
                <Image
                  src={mobileShot.src}
                  alt={mobileShot.alt}
                  width={390}
                  height={844}
                  sizes="260px"
                  quality={90}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="text-base text-muted">
                <span className="mono-sm block text-faint">{dict.common.mobile}</span>
                <p className="mt-3 max-w-md text-lg text-fg">{dict.caseStudy.mobileNote}</p>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </Section>

      {/* 13 — Next project */}
      <Section theme="dark" className="pt-0">
        <Link
          href={localizeHref(`/work/${next.slug}`, locale)}
          data-cursor="view"
          className="group flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mono-sm text-faint">{dict.caseStudy.nextProject}</p>
            <h2 className="font-display mt-3 text-3xl transition-colors group-hover:text-accent md:text-4xl">
              {next.name}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{next.summary}</p>
          </div>
          <span className="mono inline-flex items-center gap-2 text-fg">
            {dict.cta.readCase}
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono-sm text-faint">{label}</dt>
      <dd className="mt-2 text-base text-fg">{value}</dd>
    </div>
  );
}

function CaseBlock({
  section,
  index,
  theme,
  className,
}: {
  section: CaseSection;
  index: string;
  theme: "dark" | "light";
  className?: string;
}) {
  return (
    <Section theme={theme} className={className} label={section.heading}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
        <div>
          <p className="mono-sm text-accent">{index}</p>
          <h2 className="font-display mt-3 text-3xl">{section.heading}</h2>
        </div>
        <div>
          <div className="max-w-2xl space-y-5">
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg text-fg">
                {paragraph}
              </p>
            ))}
          </div>
          {section.items ? (
            <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.label} className="bg-surface p-5">
                  <dt className="mono-sm text-faint">{item.label}</dt>
                  <dd className="mt-2 text-base text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

