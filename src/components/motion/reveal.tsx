import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds when several reveals share a group. */
  delay?: number;
  direction?: "up" | "down" | "none";
  as?: "div" | "li" | "span" | "section" | "article" | "p";
  /**
   * `view` waits until the element is scrolled into view; `load` plays once,
   * immediately. Use `load` above the fold — waiting to be "scrolled into" a
   * region that is already on screen only adds latency.
   */
  on?: "view" | "load";
}

/**
 * Props for any element whose reveal state is written by the boot script.
 *
 * The script marks elements `data-reveal-in` as soon as they are in view,
 * which for anything above the fold happens long before React hydrates. React
 * then finds an attribute on the node that its own render did not produce and
 * reports a hydration mismatch on it.
 *
 * That race is the design working as intended — revealing without waiting for
 * the bundle is the entire point of this file — so the attribute is declared
 * as owned from outside React. This suppresses only the element's own
 * attributes, never its subtree.
 *
 * `Reveal` applies it already. Spread it onto anything that sets `data-reveal`
 * by hand instead of going through this component.
 */
export const revealedByScript = { suppressHydrationWarning: true } as const;

/**
 * The single entry animation used across the site: a short rise and fade.
 *
 * This is a server component on purpose. The obvious implementation — a client
 * component with `whileInView` — writes the hidden `initial` state into the
 * server HTML as inline styles, so every element it wraps ships invisible and
 * stays that way until the JavaScript bundle has downloaded, hydrated and run
 * an observer. On this site that meant 86 invisible elements in the shipped
 * HTML, which on a phone reads as the page arriving all at once, late.
 *
 * Here the markup carries only a `data-reveal` attribute. The hidden state and
 * the transition live in CSS, and an inline script in the document head starts
 * observing elements as the parser produces them — so content fades in while
 * the page is still streaming, and never waits on React. If that script is
 * blocked or fails, nothing is ever hidden and the page is simply readable.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as: Tag = "div",
  on = "view",
}: RevealProps) {
  const variant = direction === "none" ? "fade" : direction === "down" ? "fall" : "rise";

  return (
    <Tag
      className={className}
      data-reveal={variant}
      data-reveal-on={on === "load" ? "load" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
      {...revealedByScript}
    >
      {children}
    </Tag>
  );
}
