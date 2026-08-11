import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import { defaultLocale, localizeHref, type Locale } from "@/lib/i18n/config";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  children?: ReactNode;
  /** Breadcrumb trail rendered above the title. Paths are locale-agnostic. */
  trail?: { label: string; href: string }[];
  locale?: Locale;
  className?: string;
}

/** The consistent opening band for every page below the home page. */
export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  children,
  trail,
  locale = defaultLocale,
  className,
}: PageHeroProps) {
  return (
    <section
      data-theme="dark"
      className={cn(
        "noise relative isolate overflow-hidden bg-surface pb-[var(--space-2xl)] pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))]",
        className,
      )}
    >
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <Container className="relative">
        {trail ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="mono-sm flex flex-wrap items-center gap-2 text-faint">
              {trail.map((item, i) => (
                <li key={item.href} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden>/</span> : null}
                  <Link
                    href={localizeHref(item.href, locale)}
                    className="transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <Reveal>
            <p className="mono-sm mb-8 flex items-center gap-3 text-muted">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              {eyebrow}
            </p>
          </Reveal>
        )}

        <TextReveal
          as="h1"
          text={title}
          accent={accent}
          className="font-display max-w-4xl text-4xl sm:text-5xl"
        />

        {intro ? (
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">{intro}</p>
          </Reveal>
        ) : null}

        {children ? <Reveal delay={0.22}>{children}</Reveal> : null}
      </Container>
    </section>
  );
}
