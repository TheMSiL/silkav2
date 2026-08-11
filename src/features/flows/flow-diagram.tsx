"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

export interface FlowStep {
  readonly id: string;
  readonly label: string;
  readonly kind: "trigger" | "step" | "system" | "guard";
  readonly detail: string;
}

const kindStyles: Record<FlowStep["kind"], { chip: string; ring: string }> = {
  trigger: { chip: "text-accent border-accent/50", ring: "bg-accent" },
  step: { chip: "text-fg border-line-strong", ring: "bg-fg/60" },
  system: { chip: "text-signal-blue border-signal-blue/50", ring: "bg-signal-blue" },
  guard: { chip: "text-signal-green border-signal-green/50", ring: "bg-signal-green" },
};


/**
 * A vertical workflow that reveals step by step on scroll.
 *
 * Rendered as an ordered list so it reads correctly to a screen reader and
 * without JavaScript; the motion only paces it.
 */
export function FlowDiagram({
  steps,
  dict,
  className,
}: {
  steps: readonly FlowStep[];
  dict: Dictionary;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();

  return (
    <ol className={cn("relative", className)}>
      <span aria-hidden className="absolute bottom-4 left-[0.6875rem] top-4 w-px bg-line" />
      {steps.map((step, i) => {
        const style = kindStyles[step.kind];
        return (
          <motion.li
            key={step.id}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            <span className="relative z-10 mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-surface">
              <span aria-hidden className={cn("size-2 rounded-full", style.ring)} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="text-lg text-fg">{step.label}</h4>
                <span className={cn("mono-sm rounded-full border px-2 py-0.5", style.chip)}>
                  {dict.flow[step.kind]}
                </span>
              </div>
              <p className="mt-1.5 text-base text-muted">{step.detail}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
