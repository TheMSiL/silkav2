"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/** Where the light sits before anyone moves a pointer, in percent of the section. */
const REST_X = 62;
const REST_Y = 34;

/**
 * The bloom behind the hero, following the pointer across the whole section.
 *
 * Two things this is careful about:
 *
 *   - It renders its gradient on the server. The motion value's current value
 *     is serialised into the inline style, so the light is in the HTML at its
 *     rest position and a visitor never sees a flat black hero waiting for a
 *     bundle. If the script never runs, the glow is simply static.
 *   - It listens on the section, not on the window, and only for a mouse. A
 *     touch "pointermove" is a scroll gesture, and dragging the light around
 *     with the same finger that is trying to scroll reads as a bug.
 *
 * The spring is deliberately slack — the light trails the cursor by a good
 * fraction of a second, which is what makes it read as depth rather than as a
 * cursor effect. Under reduced motion the listener is never attached.
 */
export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const x = useMotionValue(REST_X);
  const y = useMotionValue(REST_Y);
  const springX = useSpring(x, { stiffness: 42, damping: 20, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 42, damping: 20, mass: 0.8 });

  /*
   * Values are literal rather than `var(--accent)`: `color-mix` inside a
   * gradient stop is still the slower path in WebKit, and this repaints on
   * every spring frame. The tone is `--volt-400` because the accent itself
   * carries too little luminance over `--ink-900` to read as light at all.
   */
  const background = useMotionTemplate`radial-gradient(38rem 34rem at ${springX}% ${springY}%, rgb(90 82 255 / 0.15) 0%, rgb(90 82 255 / 0.085) 28%, rgb(90 82 255 / 0.035) 52%, rgb(90 82 255 / 0.01) 74%, transparent 100%)`;

  useEffect(() => {
    if (reduced) return;
    const section = ref.current?.parentElement;
    if (!section) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      x.set(((event.clientX - rect.left) / rect.width) * 100);
      y.set(((event.clientY - rect.top) / rect.height) * 100);
    };
    /* Back to rest when the pointer leaves, so the hero has a resting state. */
    const onLeave = () => {
      x.set(REST_X);
      y.set(REST_Y);
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, x, y]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="edge-fade-all pointer-events-none absolute inset-0 -z-10"
      style={{ background }}
    />
  );
}
