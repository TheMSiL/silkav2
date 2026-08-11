import Link from "next/link";
import { HeroEcosystem, type EcosystemNode } from "@/features/hero/ecosystem";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Service } from "@/types";

/**
 * The ring is a view over the translated services content, so the labels are
 * never hardcoded and can never drift from the services section.
 */
const RING: { key: Service["key"]; angle: number; lift: number }[] = [
  { key: "web", angle: 0, lift: -0.16 },
  { key: "saas", angle: 0.125, lift: 0.34 },
  { key: "mobile", angle: 0.25, lift: -0.42 },
  { key: "crm", angle: 0.375, lift: 0.12 },
  { key: "ai", angle: 0.5, lift: -0.28 },
  { key: "bots", angle: 0.625, lift: 0.4 },
  { key: "api", angle: 0.75, lift: -0.08 },
  { key: "automation", angle: 0.875, lift: 0.24 },
];

export function Hero({
  locale,
  dict,
  services,
}: {
  locale: Locale;
  dict: Dictionary;
  services: Service[];
}) {
  const nodes: EcosystemNode[] = RING.map(({ key, angle, lift }) => {
    const service = services.find((s) => s.key === key);
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
      className="noise relative isolate flex min-h-[100lvh] flex-col justify-center overflow-hidden bg-surface pt-[calc(var(--header-h)+2rem)] pb-16"
      aria-label={dict.home.metaTitle}
    >
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_78%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <Reveal on="load"
              as="p"
              className="mono-sm mb-8 flex items-center gap-3 text-muted"
            >
              <span aria-hidden className="relative flex size-1.5">
                <span className="reduced-motion-hide absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {dict.home.metaTitle} — {site.location}
            </Reveal>

            <h1 className="font-display text-balance text-3xl sm:text-4xl">
              <TextReveal on="load"
                as="span"
                text={dict.home.heroTitleA}
                className="block"
              />
              <TextReveal on="load"
                as="span"
                text={dict.home.heroTitleB}
                className="block"
                accent={dict.home.heroAccent}
                delay={0.12}
              />
            </h1>

            <Reveal on="load"
              as="p"
              delay={0.25}
              className="mt-8 max-w-xl text-lg text-muted md:text-xl"
            >
              {dict.home.heroIntro}
            </Reveal>

            <Reveal on="load"
              delay={0.35}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Link
                  href={localizeHref("/contact", locale)}
                  className="group inline-flex h-14 items-center gap-3 bg-accent px-8 font-medium text-accent-fg transition-[filter] hover:brightness-110"
                  data-cursor="explore"
                >
                  {dict.cta.start}
                  <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <Link
                href={localizeHref("/work", locale)}
                className="group inline-flex h-14 items-center gap-3 border border-line-strong px-8 font-medium text-fg transition-colors hover:border-fg"
                data-cursor="view"
              >
                {dict.cta.explore}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <Reveal on="load" delay={0.2} className="relative">
            <HeroEcosystem
              nodes={nodes}
              groupLabel={dict.home.ecosystemLabel}
              idleTitle={dict.home.ecosystemIdleTitle}
              idleBody={dict.home.ecosystemIdleBody}
              detailLabel={dict.cta.seeDetail}
            />
          </Reveal>
        </div>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <span className="mono-sm text-faint">{dict.common.scroll}</span>
      </div>
    </section>
  );
}
