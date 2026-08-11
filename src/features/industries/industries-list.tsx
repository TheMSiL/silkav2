"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Industry, Project } from "@/types";
import { cn } from "@/lib/cn";
import { pluralize } from "@/lib/i18n/dictionaries";
import { ArrowUpRight } from "@/components/ui/icons";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type IndustryWithWork = Industry & { projects: Pick<Project, "slug" | "name" | "summary">[] };

/**
 * §Industries — a disclosure list rather than a hover-only grid, so the
 * detail is reachable by tap and by keyboard as well as by pointer.
 */
export function IndustriesList({
  industries,
  locale,
  dict,
}: {
  industries: IndustryWithWork[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState<string | null>(industries[0]?.key ?? null);
  const reduced = useReducedMotion();

  return (
    <ul className="mt-12 border-t border-line">
      {industries.map((industry) => {
        const isOpen = open === industry.key;
        return (
          <li key={industry.key} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`industry-${industry.key}`}
                onClick={() => setOpen(isOpen ? null : industry.key)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setOpen(industry.key);
                }}
                data-cursor="explore"
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-display text-2xl transition-colors duration-300 md:text-3xl",
                    isOpen ? "text-accent" : "text-fg group-hover:text-accent",
                  )}
                >
                  {industry.label}
                </span>
                <span className="mono-sm shrink-0 text-faint">
                  {industry.projects.length > 0
                    ? `${industry.projects.length} ${pluralize(locale, industry.projects.length, dict)}`
                    : dict.common.capability}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`industry-${industry.key}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-8 md:grid-cols-[1.4fr_1fr]">
                    <p className="max-w-xl text-lg text-muted">{industry.blurb}</p>
                    <div>
                      <ul className="flex flex-wrap gap-2">
                        {industry.systems.map((system) => (
                          <li
                            key={system}
                            className="mono-sm rounded-full border border-line px-2.5 py-1 text-faint"
                          >
                            {system}
                          </li>
                        ))}
                      </ul>
                      {industry.projects.length > 0 ? (
                        <ul className="mt-5 space-y-2">
                          {industry.projects.map((project) => (
                            <li key={project.slug}>
                              <Link
                                href={localizeHref(`/work/${project.slug}`, locale)}
                                data-cursor="view"
                                className="group inline-flex items-center gap-2 text-base text-fg"
                              >
                                <span className="link-underline">{project.name}</span>
                                <ArrowUpRight className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
