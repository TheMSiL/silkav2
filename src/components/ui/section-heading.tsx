import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  /** Small monospace label above the title — the section's index or category. */
  eyebrow?: string;
  title: string;
  /** Words inside `title` rendered in the accent colour. */
  accent?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "between";
  level?: "h2" | "h3";
  size?: "md" | "lg";
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  children,
  className,
  align = "left",
  level = "h2",
  size = "lg",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "between" && "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        className,
      )}
    >
      <div className="max-w-3xl">
        {eyebrow ? (
          <Reveal>
            <p className="mono-sm mb-5 flex items-center gap-3 text-muted">
              <span aria-hidden className="inline-block h-px w-8 bg-line-strong" />
              {eyebrow}
            </p>
          </Reveal>
        ) : null}
        <TextReveal
          as={level}
          text={title}
          accent={accent}
          className={cn(
            "font-display text-balance",
            size === "lg" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
          )}
        />
        {intro ? (
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>
          </Reveal>
        ) : null}
      </div>
      {children ? <Reveal delay={0.12}>{children}</Reveal> : null}
    </div>
  );
}
