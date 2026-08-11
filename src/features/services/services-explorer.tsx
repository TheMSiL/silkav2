"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, Service } from "@/types";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ServiceVisual } from "./service-visual";
import { EVENTS, track } from "@/lib/analytics";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

interface ServicesExplorerProps {
  services: Service[];
  /** Slug → project, so each service can link the work that proves it. */
  projectsBySlug: Record<string, Pick<Project, "slug" | "name" | "summary">>;
  locale: Locale;
  dict: Dictionary;
}

export function ServicesExplorer({
  services,
  projectsBySlug,
  locale,
  dict,
}: ServicesExplorerProps) {
  const [activeKey, setActiveKey] = useState(services[0].key);
  const reduced = useReducedMotionSafe();
  const active = services.find((s) => s.key === activeKey) ?? services[0];

  const select = (key: Service["key"]) => {
    setActiveKey(key);
    track(EVENTS.serviceView, { service: key, location: "services_explorer" });
  };

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
      {/* Category list — a real tablist, so arrow keys work. */}
      <div
        role="tablist"
        aria-label={dict.services.tablistLabel}
        aria-orientation="vertical"
        className="flex min-w-0 flex-col"
      >
        {services.map((service) => {
          const isActive = service.key === activeKey;
          return (
            <button
              key={service.key}
              role="tab"
              type="button"
              id={`service-tab-${service.key}`}
              aria-selected={isActive}
              aria-controls={`service-panel-${service.key}`}
              tabIndex={isActive ? 0 : -1}
              data-cursor="explore"
              onClick={() => select(service.key)}
              onPointerEnter={() => select(service.key)}
              onKeyDown={(event) => {
                const index = services.findIndex((s) => s.key === activeKey);
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  const next = services[(index + 1) % services.length];
                  select(next.key);
                  document.getElementById(`service-tab-${next.key}`)?.focus();
                }
                if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const prev = services[(index - 1 + services.length) % services.length];
                  select(prev.key);
                  document.getElementById(`service-tab-${prev.key}`)?.focus();
                }
              }}
              className={cn(
                "group relative flex items-baseline justify-between gap-4 border-b border-line py-4 text-left transition-colors duration-300",
                isActive ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              <span className="font-display text-2xl tracking-[-0.03em] md:text-[1.75rem]">
                {service.label}
              </span>
              <span className="mono-sm shrink-0 text-faint">
                {service.examples.length} {dict.services.areas}
              </span>
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        role="tabpanel"
        id={`service-panel-${active.key}`}
        aria-labelledby={`service-tab-${active.key}`}
        className="relative min-w-0 min-h-[34rem] border border-line bg-surface-2 p-6 md:p-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,14rem)] lg:gap-12">
              <div className="min-w-0">
                <p className="mono-sm text-accent">{active.label}</p>
                <h3 className="font-display mt-3 text-2xl md:text-3xl">{active.headline}</h3>
                <p className="mt-5 max-w-xl text-lg text-muted">{active.description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="mono-sm mb-3 text-faint">{dict.services.whatYouGet}</h4>
                    <ul className="space-y-2">
                      {active.deliverables.map((item) => (
                        <li key={item} className="flex gap-2.5 text-base text-fg">
                          <span aria-hidden className="mt-2.5 size-1 shrink-0 bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mono-sm mb-3 text-faint">{dict.services.typicalWork}</h4>
                    <ul className="space-y-2">
                      {active.examples.map((item) => (
                        <li key={item} className="text-base text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-8">
                {/*
                  `w-full` is load-bearing: without a definite width, an
                  aspect-ratio box resolves its width from its height, and that
                  intrinsic width becomes the grid column's minimum — which
                  blows the single-column mobile layout far past the viewport.
                */}
                <div className="aspect-[4/3] w-full border border-line bg-surface p-4">
                  <ServiceVisual variant={active.visual} />
                </div>
                <div>
                  <h4 className="mono-sm mb-3 text-faint">{dict.common.stack}</h4>
                  <ul className="flex flex-wrap gap-2">
                    {active.stack.map((item) => (
                      <li
                        key={item}
                        className="mono-sm rounded-full border border-line px-2.5 py-1 text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <h4 className="mono-sm mb-4 text-faint">
                {active.proof.length > 0 ? dict.services.proofTitle : dict.services.noProofTitle}
              </h4>
              {active.proof.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {active.proof.map((slug) => {
                    const project = projectsBySlug[slug];
                    if (!project) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={localizeHref(`/work/${slug}`, locale)}
                          data-cursor="view"
                          className="group inline-flex items-center gap-2 border border-line px-4 py-2 text-base transition-colors hover:border-fg"
                        >
                          {project.name}
                          <ArrowUpRight className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="max-w-xl text-base text-muted">
                  {dict.services.noProofBody}{" "}
                  <Link
                    href={localizeHref("/contact", locale)}
                    className="link-underline text-fg"
                  >
                    {dict.services.noProofLink}
                  </Link>
                  .
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <Link
          href={localizeHref("/capabilities", locale)}
          className="mono group mt-10 inline-flex items-center gap-2 text-fg"
          data-cursor="explore"
        >
          {dict.cta.fullCapabilities}
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
