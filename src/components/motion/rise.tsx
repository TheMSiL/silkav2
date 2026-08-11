import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Server-rendered entry animations for above-the-fold content.
 *
 * `Reveal` and `TextReveal` are the right primitives further down the page:
 * they wait for the element to scroll into view, which needs JavaScript. But at
 * the top of the page that costs a visible delay — motion writes the hidden
 * `initial` state as inline styles into the server HTML, so the content stays
 * invisible until hydration finishes. On a phone on a slow connection that is
 * the hero arriving seconds late, and under reduced motion it pops in with no
 * animation at all.
 *
 * These render as plain markup with a class. The animation lives entirely in
 * CSS, behind `prefers-reduced-motion: no-preference` — so a reduced-motion
 * visitor sees the content in its final state directly from the HTML, and
 * everyone else gets the animation the moment the stylesheet lands, with no
 * dependency on the JavaScript bundle.
 *
 * They are also unconditional: correct only where the content is on screen at
 * load. Anything below the fold still belongs in `Reveal`.
 */

type RiseTag = "div" | "p" | "span" | "li" | "section";

interface RiseProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  as?: RiseTag;
}

export function Rise({ children, className, delay = 0, as: Tag = "div" }: RiseProps) {
  return (
    <Tag
      className={cn("rise", className)}
      style={delay ? ({ animationDelay: `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

interface TextRiseProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  /** Words inside `text` rendered in the accent colour. */
  accent?: string;
}

/** The word-by-word rise of `TextReveal`, driven by CSS instead of JavaScript. */
export function TextRise({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  stagger = 0.035,
  accent,
}: TextRiseProps) {
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const isAccent = (word: string) => accentWords.includes(word.replace(/[.,]/g, ""));

  return (
    <Tag className={cn("word-rise", className)}>
      {words.map((word, i) => (
        // The space must sit between the wrappers: trailing whitespace inside
        // an inline-block collapses, which would run the words together.
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className={cn("inline-block", isAccent(word) && "text-accent")}
              style={{ animationDelay: `${delay + i * stagger}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
