"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * A media query that is safe to branch rendering on.
 *
 * The server snapshot is always `false`, and React uses it for SSR *and* for
 * hydration — so the first client render can never disagree with the HTML.
 * The real value arrives on the render straight after, which means anything
 * gated on this must be an enhancement, never the only way to read the page.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
