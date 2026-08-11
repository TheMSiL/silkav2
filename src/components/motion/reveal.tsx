"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds when several reveals share a group. */
  delay?: number;
  direction?: "up" | "down" | "none";
  as?: "div" | "li" | "span" | "section" | "article";
}

const distance = 18;

/**
 * The single entry animation used across the site: a short rise + fade on first
 * view. One primitive keeps timing consistent; reduced motion renders instantly.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotionSafe();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset = direction === "none" ? 0 : direction === "up" ? distance : -distance;

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
