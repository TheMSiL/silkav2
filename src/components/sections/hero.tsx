import Link from "next/link";
import { HeroEcosystem, type EcosystemNode } from "@/features/hero/ecosystem";
import { HeroGlow } from "@/features/hero/glow";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Service, ServiceKey, Stat } from "@/types";

/**
 * The ring is a view over the translated services content, so the labels are
 * never hardcoded and can never drift from the services page.
 */
const RING: { key: ServiceKey; angle: number; lift: number }[] = [
  { key: "web", angle: 0, lift: -0.16 },
  { key: "saas", angle: 0.125, lift: 0.34 },
  { key: "mobile", angle: 0.25, lift: -0.42 },
  { key: "crm", angle: 0.375, lift: 0.12 },
  { key: "ai", angle: 0.5, lift: -0.28 },
  { key: "bots", angle: 0.625, lift: 0.4 },
  { key: "api", angle: 0.75, lift: -0.08 },
  { key: "automation", angle: 0.875, lift: 0.24 },
];

/**
 * §01 — the first five seconds.
 *
 * One line of claim, one line of what that means, two ways forward, and a
 * diagram the visitor can put their hands on. The figures under the buttons
 * are the only proof the hero carries; the rest of the evidence is the section
 * directly below it, which is close enough that nothing here has to oversell.
 */
export function Hero({
  locale,
  dict,
  services,
  stats,
}: {
  locale: Locale;
  dict: Dictionary;
  services: Service[];
  stats: Stat[];
}) {
  const byKey = new Map(services.map((service) => [service.key, service]));
  const nodes: EcosystemNode[] = RING.map(({ key, angle, lift }) => {
    const service = byKey.get(key);
    return {
      id: key,
      label: service?.label ?? key,
      angle,
      lift,
      detail: service?.headline ?? "",
      href: localizeHref(`/services#${key}`, locale),
    };
  });

  return (
    <section
      data-theme="dark"
      className="noise relative isolate flex min-h-lvh flex-col justify-center overflow-hidden bg-surface pt-[calc(var(--header-h)+2rem)] pb-16"
      aria-label={dict.home.metaTitle}
    >
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_at_50%_40%,black,transparent_78%)]"
      />
      {/* Must stay a direct child of the section — it measures its parent. */}
      <HeroGlow />

      <Container className="relative">
        {/*
          One grid for both columns, two rows deep.

          Row one is the pitch and the diagram, centred against each other. Row
          two is the pair of footers — the stat strip and the diagram's detail
          panel — and it exists so that the rule along the top of each of them
          starts at the same y. They used to sit inside their own columns,
          which centred independently, so the two hairlines were about
          twenty-five pixels out of step at 1440.

          Vertical rhythm is the row gap (1.5rem, the tightest step needed:
          diagram to panel) plus a per-item nudge, so one gap value can serve
          four different joints as the layout collapses to a single column.
          `order` keeps the reading order on a phone: pitch, figures, diagram,
          panel.
        */}
        <div className="grid items-center gap-y-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-10">
          <div className="order-1">
            <Reveal on="load" as="p" className="mono-sm mb-8 flex items-center gap-3 text-muted">
              <span aria-hidden className="relative flex size-1.5">
                <span className="reduced-motion-hide absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {dict.home.metaTitle} — {site.location}
            </Reveal>

            <h1 className="font-display text-balance text-3xl sm:text-4xl">
              <TextReveal on="load" as="span" text={dict.home.heroTitleA} className="block" />
              <TextReveal
                on="load"
                as="span"
                text={dict.home.heroTitleB}
                className="block"
                accent={dict.home.heroAccent}
                delay={0.12}
              />
            </h1>

            <Reveal on="load" as="p" delay={0.25} className="mt-8 max-w-xl text-lg text-muted md:text-xl">
              {dict.home.heroIntro}
            </Reveal>

            {/*
              Full-bleed on a phone, shrink-to-fit from `sm` up. Two buttons at
              their natural width leave a ragged gap down the right of a narrow
              screen and give the thumb a smaller target than it deserves.
            */}
            <Reveal
              on="load"
              delay={0.35}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Magnetic className="w-full sm:w-auto">
                <Link
                  href={localizeHref("/contact", locale)}
                  className="group flex h-14 w-full items-center justify-center gap-3 bg-accent px-8 font-medium text-accent-fg transition-[filter] hover:brightness-110 sm:inline-flex sm:w-auto sm:justify-start"
                  data-cursor="explore"
                >
                  {dict.cta.discuss}
                  <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <Link
                href={localizeHref("/work", locale)}
                className="group flex h-14 w-full items-center justify-center gap-3 border border-line-strong px-8 font-medium text-fg transition-colors hover:border-fg sm:inline-flex sm:w-auto sm:justify-start"
                data-cursor="view"
              >
                {dict.cta.explore}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>

          </div>

          {/*
            A one-line credibility strip, and the left half of the footer row.
            It is the only place these figures appear now, so each one links to
            the page that evidences it.
          */}
          <Reveal on="load" delay={0.45} className="order-2 mt-4 self-start lg:order-3">
            <ul className="mono-sm flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-faint">
              {stats.slice(0, 3).map((stat) => (
                <li key={stat.label}>
                  {stat.href ? (
                    <Link
                      href={
                        stat.href.startsWith("http") ? stat.href : localizeHref(stat.href, locale)
                      }
                      className="transition-colors hover:text-fg"
                    >
                      <span className="text-fg">{stat.value}</span> {stat.label.toLowerCase()}
                    </Link>
                  ) : (
                    <>
                      <span className="text-fg">{stat.value}</span> {stat.label.toLowerCase()}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          {/*
            Renders as two grid items, not one: the diagram into row one and
            its detail panel into row two, beside the strip above.
          */}
          <HeroEcosystem
            nodes={nodes}
            groupLabel={dict.home.ecosystemLabel}
            idleTitle={dict.home.ecosystemIdleTitle}
            idleBody={dict.home.ecosystemIdleBody}
            detailLabel={dict.cta.seeDetail}
            revealDelay={0.2}
            ringClassName="order-3 mt-8 lg:order-2 lg:mt-0"
            panelClassName="order-4 self-start lg:mt-4"
          />
        </div>
      </Container>
    </section>
  );
}
