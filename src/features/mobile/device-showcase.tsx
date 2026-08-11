"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * §Mobile — a sticky device whose screen follows the text beside it, and which
 * tilts very slightly with scroll. On reduced motion it becomes a plain
 * two-column list with all four screens shown as static panels.
 */
export function DeviceShowcase({ dict }: { dict: Dictionary }) {
  const SCREENS = dict.device;
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const rotate = useTransform(smooth, [0, 1], [8, -8]);

  if (reduced) {
    return (
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {SCREENS.map((screen) => (
          <div key={screen.title} className="border border-line bg-surface-2 p-6">
            <h3 className="font-display text-xl">{screen.title}</h3>
            <p className="mt-3 text-base text-muted">{screen.body}</p>
            <PhoneScreen rows={screen.rows} className="mt-6 max-w-[13rem]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="order-2 lg:order-1">
        <ul>
          {SCREENS.map((screen, i) => (
            <li key={screen.title}>
              <motion.div
                onViewportEnter={() => setActiveIndex(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className={cn(
                  "border-l-2 py-10 pl-6 transition-colors duration-500",
                  activeIndex === i ? "border-accent" : "border-line",
                )}
              >
                <p className="mono-sm text-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3
                  className={cn(
                    "font-display mt-3 text-2xl transition-colors duration-500",
                    activeIndex === i ? "text-fg" : "text-muted",
                  )}
                >
                  {screen.title}
                </h3>
                <p className="mt-3 max-w-md text-base text-muted">{screen.body}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
          <motion.div
            style={{ rotate, transformPerspective: 1200 }}
            className="mx-auto w-full max-w-[16rem]"
          >
            <PhoneScreen rows={SCREENS[activeIndex].rows} label={SCREENS[activeIndex].title} />
          </motion.div>
          <p className="mono-sm mt-6 text-center text-faint">
            {SCREENS[activeIndex].title} — {activeIndex + 1} / {SCREENS.length}
          </p>
        </div>
      </div>
    </div>
  );
}

function PhoneScreen({
  rows,
  label,
  className,
}: {
  rows: string[];
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative aspect-[9/19] w-full rounded-[2rem] border border-line-strong bg-surface p-3", className)}
      role="img"
      aria-label={label}
    >
      <span aria-hidden className="absolute left-1/2 top-4 h-1.5 w-16 -translate-x-1/2 rounded-full bg-fg/15" />
      <div className="flex h-full flex-col gap-2 rounded-[1.6rem] border border-line bg-surface-2 p-4 pt-10">
        {rows.map((row, i) => (
          <motion.div
            key={`${row}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={cn(
              "flex items-center justify-between border px-3 py-2.5 text-[0.8rem]",
              i === rows.length - 1
                ? "border-accent bg-accent text-accent-fg"
                : "border-line text-muted",
            )}
          >
            {row}
          </motion.div>
        ))}
        <div aria-hidden className="mt-auto grid grid-cols-4 gap-1.5 pt-4">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("h-1 rounded-full", i === 0 ? "bg-accent" : "bg-fg/15")} />
          ))}
        </div>
      </div>
    </div>
  );
}
