import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * What a band is made of — a role, not a colour.
 *
 * `base` is the page's own material, `contrast` the band that breaks a run of
 * it, `muted` the middle material for bands that should recede rather than
 * announce themselves. Which pigment each role resolves to is decided by the
 * site mode in `globals.css`, so nothing here changes when a visitor switches
 * to the light theme.
 */
export type Surface = "base" | "contrast" | "muted";

interface SectionProps {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
  containerClassName?: string;
  size?: "default" | "wide" | "narrow";
  /** Removes vertical padding for sections that manage their own rhythm. */
  flush?: boolean;
  /** Renders a subtle technical grid behind the content. */
  grid?: boolean;
  label?: string;
}

export function Section({
  children,
  surface = "base",
  id,
  className,
  containerClassName,
  size = "default",
  flush = false,
  grid = false,
  label,
}: SectionProps) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-label={label}
      className={cn(
        "relative isolate bg-surface text-fg",
        !flush && "py-[var(--section-y)]",
        className,
      )}
    >
      {grid ? (
        <div
          aria-hidden
          className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
      ) : null}
      <Container size={size} className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
