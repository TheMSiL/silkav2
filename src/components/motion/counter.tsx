"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

interface CounterProps {
  /** Accepts "12", "18,243", "98.2%", "∞" or "End to end". */
  value: string;
  className?: string;
  duration?: number;
}

/** Splits a display string into a leading prefix, a number, and a suffix. */
export function parseCountable(value: string): { prefix: string; number: number | null; suffix: string; decimals: number } {
  const match = value.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: value, number: null, suffix: "", decimals: 0 };
  const [, prefix, digits, suffix] = match;
  const normalised = digits.replace(/,/g, "");
  const decimals = normalised.includes(".") ? normalised.split(".")[1].length : 0;
  return { prefix, number: Number(normalised), suffix, decimals };
}

function format(value: number, decimals: number, grouped: boolean) {
  const fixed = value.toFixed(decimals);
  if (!grouped) return fixed;
  const [whole, fraction] = fixed.split(".");
  const withSeparators = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fraction ? `${withSeparators}.${fraction}` : withSeparators;
}

/**
 * Counts up when the figure first enters view. Non-numeric values ("∞",
 * "End to end") render as-is, so the stat row can mix both.
 */
export function Counter({ value, className, duration = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotionSafe();
  const { prefix, number, suffix, decimals } = parseCountable(value);
  const grouped = value.includes(",");
  /* Non-numeric values and reduced motion bypass the animation entirely, so
     the effect below never has to set state just to reach a static result. */
  const animates = number !== null && !reduced;
  /* Starts at the final value so the server HTML shows the real figure — a
     visitor without JavaScript would otherwise be told every stat is zero. */
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!animates || number === null || !inView) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast start, long settle.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(`${prefix}${format(number * eased, decimals, grouped)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animates, inView, number, prefix, suffix, decimals, duration, grouped]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {animates ? display : value}
    </span>
  );
}
