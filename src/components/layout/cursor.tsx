"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Cursor ink: light on dark bands, near-black on the paper ones. */
const tint = (onLight: boolean, alpha: number) =>
  onLight ? `rgba(11,13,15,${alpha})` : `rgba(255,255,255,${alpha})`;

/**
 * Is the pointer over a light band right now?
 *
 * A band declares a role — `base`, `contrast` or `muted` — and the site mode
 * decides what that role is made of, so neither answers this on its own.
 * `contrast` is the band that opposes the page, so it is light exactly when
 * the page is dark; the other two follow the page.
 *
 * This used to read `data-theme="light"`, which the surface roles replaced.
 * The lookup then matched nothing, `onLight` was permanently false, and the
 * cursor stayed white — invisible on every paper band, and on the whole site
 * once the light theme existed.
 */
function isOverLightSurface(target: Element): boolean {
  const role = target.closest("[data-surface]")?.getAttribute("data-surface");
  const lightMode = document.documentElement.getAttribute("data-mode") === "light";
  return (role === "contrast") !== lightMode;
}

/**
 * Desktop-only custom cursor.
 *
 * Deliberately silent: a dot that grows into a ring over anything
 * interactive. No labels — a word chasing the pointer covers the thing you
 * are about to click and adds nothing the element itself doesn't already say.
 *
 * The native cursor is hidden only once a fine pointer is confirmed, so touch
 * and keyboard users are never left without one. Disabled under reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  /* The page alternates dark and light bands; a fixed-colour cursor would
     disappear over half of them. */
  const [onLight, setOnLight] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 1100, damping: 50, mass: 0.28 });
  const springY = useSpring(y, { stiffness: 1100, damping: 50, mass: 0.28 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setEnabled(fine.matches && !reduced.matches);
    evaluate();
    fine.addEventListener("change", evaluate);
    reduced.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      reduced.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-cursor-mode");
      return;
    }
    document.documentElement.setAttribute("data-cursor-mode", "custom");

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element &&
      !!target.closest(
        "a[href], button:not([disabled]), [role='button'], [role='tab'], summary, [data-cursor]",
      );

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setHovering(isInteractive(event.target));
      if (event.target instanceof Element) setOnLight(isOverLightSurface(event.target));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onLeave);

    return () => {
      document.documentElement.removeAttribute("data-cursor-mode");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-(--z-cursor) hidden pointer-fine:block"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute left-0 top-0"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.span
          className="block rounded-full border"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{
            width: hovering ? 28 : 8,
            height: hovering ? 28 : 8,
            scale: pressed ? 0.82 : 1,
            // Hollow over interactive targets, so the ring never covers the
            // label you are about to click.
            backgroundColor: hovering ? tint(onLight, 0) : tint(onLight, 1),
            borderColor: hovering ? tint(onLight, 0.85) : tint(onLight, 0),
          }}
          transition={{ type: "spring", stiffness: 480, damping: 30, mass: 0.4 }}
        />
      </motion.div>
    </div>
  );
}
