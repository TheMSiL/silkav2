"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project, ServiceKey } from "@/types";
import { filterProjects } from "@/data";
import type { Locale } from "@/lib/i18n/config";
import { pluralize, type Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  projects: Project[];
  filters: { key: ServiceKey | "all"; label: string; count: number }[];
  locale: Locale;
  dict: Dictionary;
}

export function ProjectGrid({ projects, filters, locale, dict }: ProjectGridProps) {
  const [active, setActive] = useState<ServiceKey | "all">("all");
  const reduced = useReducedMotion();

  const visible = useMemo(() => filterProjects(projects, active), [projects, active]);

  return (
    <div>
      <div
        role="group"
        aria-label={dict.work.filterLabel}
        className="hide-scrollbar -mx-[var(--container-pad)] flex gap-2 overflow-x-auto px-[var(--container-pad)] pb-2"
      >
        {filters.map((filter) => {
          const isActive = filter.key === active;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              aria-pressed={isActive}
              data-cursor="explore"
              className={cn(
                "mono-sm shrink-0 whitespace-nowrap border px-4 py-2 transition-colors duration-300",
                isActive
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-line text-muted hover:border-fg hover:text-fg",
              )}
            >
              {filter.label}
              <span className={cn("ml-2", isActive ? "text-accent-fg/70" : "text-faint")}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mono-sm mt-6 text-faint">
        {visible.length} {pluralize(locale, visible.length, dict)}
      </p>

      {/*
        Filtering cross-fades rather than layout-animating. A `layout` prop
        across twelve image cards keeps the grid in motion for hundreds of
        milliseconds, which is both expensive and hostile to a click landing
        where the user aimed it.
      */}
      <motion.ul className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} locale={locale} index={i} priority={i < 2} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 ? (
        <p className="mt-10 text-lg text-muted">{dict.work.empty}</p>
      ) : null}
    </div>
  );
}
