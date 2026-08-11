"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { TechCategory } from "@/types";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * §Technology — a stack you can read rather than a wall of logos. Every entry
 * carries the reason it is on the list.
 */
export function TechExplorer({
  categories: techCategories,
  dict,
}: {
  categories: TechCategory[];
  dict: Dictionary;
}) {
  const [activeKey, setActiveKey] = useState(techCategories[0].key);
  const reduced = useReducedMotionSafe();
  const active = techCategories.find((c) => c.key === activeKey) ?? techCategories[0];

  return (
    <div className="mt-12">
      <div role="tablist" aria-label={dict.capabilities.techTablistLabel} className="flex flex-wrap gap-2">
        {techCategories.map((category) => {
          const isActive = category.key === activeKey;
          return (
            <button
              key={category.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tech-panel-${category.key}`}
              id={`tech-tab-${category.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveKey(category.key)}
              onKeyDown={(event) => {
                const index = techCategories.findIndex((c) => c.key === activeKey);
                const move = (delta: number) => {
                  event.preventDefault();
                  const next =
                    techCategories[(index + delta + techCategories.length) % techCategories.length];
                  setActiveKey(next.key);
                  document.getElementById(`tech-tab-${next.key}`)?.focus();
                };
                if (event.key === "ArrowRight") move(1);
                if (event.key === "ArrowLeft") move(-1);
              }}
              data-cursor="explore"
              className={cn(
                "mono-sm border px-4 py-2 transition-colors duration-300",
                isActive
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-line text-muted hover:border-fg hover:text-fg",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`tech-panel-${active.key}`}
        aria-labelledby={`tech-tab-${active.key}`}
        className="mt-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-2xl text-lg text-muted">{active.blurb}</p>
            <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {active.items.map((item) => (
                <li key={item.name} className="bg-surface p-5">
                  <p className="font-display text-xl">{item.name}</p>
                  <p className="mt-2 text-base text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
