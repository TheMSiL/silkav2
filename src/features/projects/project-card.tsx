"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/icons";
import { EVENTS, track } from "@/lib/analytics";
import { localizeHref, type Locale } from "@/lib/i18n/config";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  /** `feature` gives the card a full-width, editorial treatment. */
  layout?: "feature" | "grid";
  index?: number;
  priority?: boolean;
}

export function ProjectCard({
  project,
  locale,
  layout = "grid",
  index = 0,
  priority = false,
}: ProjectCardProps) {
  const reduced = useReducedMotion();
  const isFeature = layout === "feature";

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link
        href={localizeHref(`/work/${project.slug}`, locale)}
        data-cursor="view"
        onClick={() => track(EVENTS.projectOpen, { project: project.slug, layout })}
        className="block focus-visible:outline-offset-8"
        aria-label={`${project.name} — ${project.summary}`}
      >
        <div
          className={cn(
            "relative overflow-hidden border border-line bg-surface-2",
            isFeature ? "aspect-[16/10] md:aspect-[2/1]" : "aspect-[16/11]",
          )}
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={isFeature ? "(max-width: 1024px) 100vw, 1200px" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 620px"}
            priority={priority}
            quality={90}
            className={cn(
              "object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out-expo)]",
              !reduced && "group-hover:scale-[1.035]",
            )}
          />

          {/* Reveal layer — scope chips slide up on hover, always readable on touch. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(8_9_10/0.92)] via-[rgb(8_9_10/0.55)] to-transparent p-5 pt-16"
          >
            <ul className="flex flex-wrap gap-2 opacity-100 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              {project.scope.map((item) => (
                <li
                  key={item}
                  className="mono-sm rounded-full border border-white/25 px-2.5 py-1 text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <span
            aria-hidden
            className="absolute right-4 top-4 flex size-9 items-center justify-center border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg"
          >
            <ArrowUpRight />
          </span>
        </div>

        <div className={cn("flex items-start justify-between gap-6 pt-5", isFeature && "md:pt-7")}>
          <div>
            <h3
              className={cn(
                "font-display tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent",
                isFeature ? "text-2xl md:text-3xl" : "text-xl",
              )}
            >
              {project.name}
            </h3>
            <p className={cn("mt-2 max-w-xl text-muted", isFeature ? "text-lg" : "text-base")}>
              {project.summary}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="mono-sm text-faint">{project.industry}</p>
            <p className="mono-sm mt-1 text-faint">{project.year}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
