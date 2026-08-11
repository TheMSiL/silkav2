"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { BuilderModule } from "@/types";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Check, Plus } from "@/components/ui/icons";
import { EVENTS, track } from "@/lib/analytics";

/**
 * §Tell us what you need.
 *
 * Compose a product from modules; the right column assembles the deliverable
 * list and a rough delivery window. The window is a range with the assumption
 * stated — we do not quote a price we have not scoped.
 */

/** Parallel work means the total is less than the sum. Kept pure for testing. */
export function estimateWeeks(selected: readonly { weeks: number }[]): { low: number; high: number } | null {
  if (selected.length === 0) return null;
  const sorted = [...selected].map((m) => m.weeks).sort((a, b) => b - a);
  const [largest, ...rest] = sorted;
  // The biggest module sets the floor; every additional one adds ~55% of its own size.
  const low = Math.round(largest + rest.reduce((sum, weeks) => sum + weeks * 0.45, 0));
  const high = Math.round(low * 1.45);
  return { low, high };
}

export function ProductBuilder({
  modules: builderModules,
  locale,
  dict,
}: {
  modules: BuilderModule[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [selected, setSelected] = useState<string[]>(["web"]);
  const reduced = useReducedMotion();

  const toggle = (key: string) => {
    setSelected((current) => {
      const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
      track(EVENTS.builderChange, { modules: next.join(","), count: next.length });
      return next;
    });
  };

  const chosen = useMemo(
    () => builderModules.filter((m) => selected.includes(m.key)),
    [selected, builderModules],
  );

  const outputs = useMemo(() => chosen.flatMap((m) => m.outputs), [chosen]);
  const range = estimateWeeks(chosen);

  const contactHref = selected.length
    ? localizeHref(`/contact?source=builder&modules=${encodeURIComponent(selected.join(","))}`, locale)
    : localizeHref("/contact?source=builder", locale);

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h3 className="mono-sm mb-6 text-faint">{dict.builder.pickParts}</h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {builderModules.map((module) => {
            const isOn = selected.includes(module.key);
            return (
              <li key={module.key}>
                <button
                  type="button"
                  onClick={() => toggle(module.key)}
                  aria-pressed={isOn}
                  data-cursor="explore"
                  className={cn(
                    "group flex w-full items-start gap-3 border p-4 text-left transition-colors duration-300",
                    isOn
                      ? "border-accent bg-accent/10 text-fg"
                      : "border-line text-muted hover:border-fg hover:text-fg",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center border text-[10px] transition-colors",
                      isOn ? "border-accent bg-accent text-accent-fg" : "border-line-strong",
                    )}
                  >
                    {isOn ? <Check /> : <Plus />}
                  </span>
                  <span>
                    <span className="block text-base font-medium text-fg">{module.label}</span>
                    <span className="mono-sm mt-1 block text-faint">{module.note}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border border-line bg-surface-2 p-6 md:p-8">
        <h3 className="mono-sm text-faint">{dict.builder.yourProduct}</h3>

        <div className="mt-5 min-h-16">
          <AnimatePresence mode="popLayout">
            {chosen.length === 0 ? (
              <motion.p
                key="empty"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg text-muted"
              >
                {dict.builder.empty}
              </motion.p>
            ) : (
              <motion.ul key="list" className="flex flex-wrap gap-2">
                {chosen.map((module) => (
                  <motion.li
                    key={module.key}
                    layout={!reduced}
                    initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.22 }}
                    className="font-display border border-accent/40 bg-accent/10 px-3 py-1.5 text-lg text-fg"
                  >
                    {module.label}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <h4 className="mono-sm mb-4 text-faint">{dict.builder.outputs}</h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {outputs.map((output) => (
                <motion.li
                  key={output}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-2.5 text-base text-fg"
                >
                  <span aria-hidden className="mt-2.5 size-1 shrink-0 bg-accent" />
                  {output}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {outputs.length === 0 ? (
            <p className="text-base text-faint">—</p>
          ) : null}
        </div>

        <div className="mt-8 border-t border-line pt-6" aria-live="polite">
          <h4 className="mono-sm mb-3 text-faint">{dict.builder.window}</h4>
          {range ? (
            <>
              <p className="font-display text-3xl">
                {range.low}–{range.high} {dict.builder.weeks}
              </p>
              <p className="mono-sm mt-3 max-w-sm text-faint">
                {dict.builder.assumption}
              </p>
            </>
          ) : (
            <p className="text-base text-faint">—</p>
          )}
        </div>

        <Link
          href={contactHref}
          data-cursor="explore"
          className="group mt-8 inline-flex items-center gap-3 bg-accent px-7 py-4 font-medium text-accent-fg transition-[filter] hover:brightness-110"
        >
          {dict.cta.build}
          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
