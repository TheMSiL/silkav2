import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Project } from "@/types";

/**
 * §02 — the strongest section on the page, and deliberately the second thing
 * a visitor meets.
 *
 * Three products at full width instead of a grid of equal tiles: a grid says
 * "here is our portfolio", a full-width row says "here is a product". Each row
 * carries the same four things — what it is, what it does, one figure from the
 * case study, and a way into the case — so they can be compared without being
 * read.
 *
 * Every value on screen comes from `data/<locale>/projects.ts`. Nothing here
 * invents a metric.
 */
export function FeaturedWork({
  locale,
  dict,
  featured,
  total,
}: {
  locale: Locale;
  dict: Dictionary;
  featured: Project[];
  total: number;
}) {
  return (
    <Section id="work" theme="dark" label={dict.home.workEyebrow}>
      <SectionHeading
        eyebrow={dict.home.workEyebrow}
        title={dict.home.workTitle}
        accent={dict.home.workAccent}
        intro={dict.home.workIntro}
        align="between"
      >
        <Link
          href={localizeHref("/work", locale)}
          className="mono group inline-flex items-center gap-2 text-fg"
          data-cursor="view"
        >
          {dict.cta.viewAll} ({total})
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </SectionHeading>

      <div className="mt-14 flex flex-col gap-16 md:gap-24">
        {featured.map((project, i) => (
          <WorkRow
            key={project.slug}
            project={project}
            locale={locale}
            dict={dict}
            /* Alternating sides stop three identical rows reading as a table. */
            flipped={i % 2 === 1}
            priority={i === 0}
          />
        ))}
      </div>
    </Section>
  );
}

function WorkRow({
  project,
  locale,
  dict,
  flipped,
  priority,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  flipped: boolean;
  priority: boolean;
}) {
  const href = localizeHref(`/work/${project.slug}`, locale);
  const metric = project.results[0];

  return (
    <Reveal as="article" className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
      <Link
        href={href}
        data-cursor="view"
        aria-label={`${project.name} — ${project.summary}`}
        className={cn(
          "relative block overflow-hidden border border-line bg-surface-2 lg:col-span-7",
          flipped && "lg:order-2 lg:col-start-6",
        )}
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 720px"
            priority={priority}
            quality={88}
            className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <span
          aria-hidden
          className="absolute right-4 top-4 flex size-9 items-center justify-center border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg"
        >
          <ArrowUpRight />
        </span>
      </Link>

      <div className={cn("lg:col-span-5", flipped && "lg:order-1 lg:col-start-1")}>
        <p className="mono-sm flex flex-wrap items-center gap-x-3 gap-y-1 text-faint">
          <span className="text-accent">{project.scope[0]}</span>
          <span aria-hidden>·</span>
          <span>{project.industry}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </p>

        <h3 className="font-display mt-4 text-2xl md:text-3xl">
          <Link href={href} data-cursor="view" className="transition-colors hover:text-accent">
            {project.name}
          </Link>
        </h3>

        <p className="mt-4 text-lg text-muted">{project.summary}</p>

        {/* One figure, stated the way the case study states it. */}
        <dl className="mt-8 border-t border-line pt-6">
          <dd className="font-display text-2xl leading-none text-fg">{metric.value}</dd>
          <dt className="mt-3 text-base text-fg">{metric.label}</dt>
          {metric.note ? <dd className="mono-sm mt-1.5 text-faint">{metric.note}</dd> : null}
        </dl>

        <Link
          href={href}
          data-cursor="view"
          className="mono group/link mt-8 inline-flex items-center gap-2 text-fg"
        >
          {dict.cta.readCase}
          <ArrowRight className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </Reveal>
  );
}
