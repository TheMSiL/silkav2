import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { Container } from "./container";

interface SectionProps {
  children: ReactNode;
  /** Surface theme for this band. The dark/light rhythm is part of the design. */
  theme?: "dark" | "light";
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
  theme = "dark",
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
      data-theme={theme}
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
