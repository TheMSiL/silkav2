"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

type Tag = "span" | "h1" | "h2" | "h3" | "p";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: Tag;
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  /** Words inside `text` rendered in the accent colour. */
  accent?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word rise.
 *
 * The trigger lives on the container, not on the moving words. Each word sits
 * inside an `overflow: hidden` wrapper, and a translated child of a clipping
 * parent has an empty intersection rectangle — so observing the word itself
 * would mean it never reports as visible and the heading never appears.
 * The container orchestrates via variants instead.
 *
 * The full string stays in the DOM as ordinary text, and reduced motion
 * renders it flat.
 */
export function TextReveal({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.035,
  accent,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const isAccent = (word: string) => accentWords.includes(word.replace(/[.,]/g, ""));

  if (reduced) {
    const Static = as;
    return (
      <Static className={className}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={isAccent(word) ? "text-accent" : undefined}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Static>
    );
  }

  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    visible: { y: 0, transition: { duration: 0.85, ease } },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {words.map((w, i) => (
        // The space must sit between the wrappers: trailing whitespace inside
        // an inline-block collapses, which would run the words together.
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={word}
              className={cn("inline-block", isAccent(w) && "text-accent")}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
