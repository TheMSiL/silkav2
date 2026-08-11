"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import type { ComplexityLevel } from "@/types";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/icons";
import { EVENTS, track } from "@/lib/analytics";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * §From simple to insanely complex.
 *
 * A real range input does the work: keyboard, screen reader and touch support
 * come free, and the visual reacts to its value.
 */
export function ComplexitySlider({
  levels: complexityLevels,
  locale,
  dict,
}: {
  levels: ComplexityLevel[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [index, setIndex] = useState(3);
  const reduced = useReducedMotionSafe();
  const id = useId();
  const level = complexityLevels[index];
  const max = complexityLevels.length - 1;

  const handleChange = (value: number) => {
    setIndex(value);
    track(EVENTS.complexityChange, { level: complexityLevels[value].label });
  };

  return (
    <div className="mt-14">
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
        <div className="order-2 min-w-0 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={level.label}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mono-sm text-accent">
                {String(index + 1).padStart(2, "0")} / {String(max + 1).padStart(2, "0")} —{" "}
                {level.scale}
              </p>
              <h3 className="font-display mt-4 text-3xl md:text-4xl">{level.label}</h3>
              <p className="mt-5 max-w-xl text-lg text-fg">{level.summary}</p>
              <p className="mt-4 max-w-xl text-base text-muted">{level.detail}</p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {level.signals.map((signal) => (
                  <li
                    key={signal}
                    className="mono-sm rounded-full border border-line px-3 py-1 text-muted"
                  >
                    {signal}
                  </li>
                ))}
              </ul>

              <p className="mono-sm mt-8 text-faint">
                {dict.common.typicalDelivery} — {level.weeks}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* `w-full` keeps the aspect box from resolving its width from its
            height and forcing the mobile grid column wider than the screen. */}
        <div className="order-1 aspect-square w-full min-w-0 border border-line bg-surface-2 p-6 lg:order-2">
          <ComplexityDiagram steps={index} />
        </div>
      </div>

      <div className="mt-14">
        <label htmlFor={id} className="mono-sm mb-4 block text-faint">
          {dict.complexity.drag}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={max}
          step={1}
          value={index}
          onChange={(event) => handleChange(Number(event.target.value))}
          aria-valuetext={`${level.label} — ${level.scale}`}
          data-cursor="drag"
          className="complexity-range w-full"
          style={{ ["--progress" as string]: `${(index / max) * 100}%` }}
        />
        {/*
          Every level is a tap target on every screen. This list used to be
          `hidden md:flex`, which left the range handle as the only way to
          change level on a phone — a drag, on a control 6px tall. It wraps on
          mobile rather than scrolling sideways, so nothing needs swiping to
          be reachable.
        */}
        <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-1 md:flex-nowrap md:justify-between md:gap-0">
          {complexityLevels.map((item, i) => (
            <li
              key={item.label}
              className="md:flex-1 md:text-center md:first:text-left md:last:text-right"
            >
              <button
                type="button"
                onClick={() => handleChange(i)}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "mono-sm py-1.5 transition-colors",
                  i === index ? "text-accent" : "text-faint hover:text-muted",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-8">
        <p className="max-w-xl text-lg text-muted">{dict.complexity.outro}</p>
        <Link
          href={localizeHref("/contact", locale)}
          data-cursor="explore"
          className="group inline-flex h-12 items-center gap-2 border border-line-strong px-6 transition-colors hover:border-fg"
        >
          {dict.cta.discuss}
          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

/** Modules multiply and interconnect as the scale increases. */
function ComplexityDiagram({ steps }: { steps: number }) {
  const reduced = useReducedMotionSafe();
  const columns = 4;
  const total = 2 + steps * 2;
  const rows = Math.ceil(total / columns);
  // Keep the cluster optically centred as it grows from one row to five.
  const offsetY = (200 - (rows * 40 - 14)) / 2 - 16;

  return (
    <svg viewBox="0 0 200 200" aria-hidden className="h-full w-full text-fg/50">
      <g transform={`translate(0 ${offsetY})`}>
      {Array.from({ length: total }).map((_, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const x = 16 + col * 44;
        const y = 16 + row * 40;
        return (
          <motion.g
            key={i}
            initial={reduced ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: reduced ? 0 : i * 0.02 }}
          >
            <rect
              x={x}
              y={y}
              width={36}
              height={26}
              fill={i === 0 ? "currentColor" : "none"}
              fillOpacity={i === 0 ? 0.22 : 0}
              stroke="currentColor"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            {col < columns - 1 && i + 1 < total ? (
              <line x1={x + 36} y1={y + 13} x2={x + 44} y2={y + 13} stroke="currentColor" strokeWidth={1} opacity={0.5} />
            ) : null}
            {i + columns < total ? (
              <line x1={x + 18} y1={y + 26} x2={x + 18} y2={y + 40} stroke="currentColor" strokeWidth={1} opacity={0.35} />
            ) : null}
          </motion.g>
        );
      })}
      </g>
    </svg>
  );
}
