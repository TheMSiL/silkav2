"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const subscribe = () => () => {};

/**
 * True only after hydration has finished.
 *
 * `useSyncExternalStore` is the sanctioned way to do this: React uses the
 * server snapshot during SSR *and* during hydration, then swaps to the client
 * one — so the first client render always matches the server HTML.
 */
function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Reduced-motion preference that is safe to branch rendering on.
 *
 * `useReducedMotion()` alone reads `matchMedia` immediately, so on a device
 * with Reduce Motion enabled the very first client render disagrees with the
 * server HTML. Every component that swaps markup on it then hydrates a
 * different tree — React discards the server output, and any handler that was
 * supposed to be attached (the menu button, for one) silently isn't.
 *
 * This reports `false` until mounted, so hydration always matches, and the
 * reduced-motion path takes over on the render straight after.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  return useMounted() && !!reduced;
}
