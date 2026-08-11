"use client";

import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  /** Words inside `text` rendered in the accent colour. */
  accent?: string;
  /** `load` plays immediately — the right choice above the fold. */
  on?: "view" | "load";
}

/**
 * Word-by-word rise, driven by CSS. See `Reveal` for why the animation is not
 * JavaScript.
 *
 * This one *is* a client component, despite having no hooks and no event
 * handlers. The reason is payload: as a server component the expanded per-word
 * spans get serialised into the RSC flight data as well as the HTML, which cost
 * ~35KB across the site. As a client component the flight carries only the
 * original string and the spans exist once, in the markup.
 *
 * Each word sits in an `overflow: hidden` wrapper and slides up out of it. Note
 * that this shape rules out observing the words themselves: a translated child
 * of a clipping parent has an empty intersection rectangle, so it would never
 * report as visible. The observer watches the container instead.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  stagger = 0.035,
  accent,
  on = "view",
}: TextRevealProps) {
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const isAccent = (word: string) => accentWords.includes(word.replace(/[.,]/g, ""));

  return (
    <Tag className={className} data-reveal="words" data-reveal-on={on === "load" ? "load" : undefined}>
      {words.map((word, i) => (
        // The space must sit between the wrappers: trailing whitespace inside
        // an inline-block collapses, which would run the words together.
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className={cn("inline-block", isAccent(word) && "text-accent")}
              style={{ "--reveal-delay": `${delay + i * stagger}s` } as CSSProperties}
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
