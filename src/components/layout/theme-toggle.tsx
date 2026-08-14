"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { THEME_KEY } from "./theme-boot";

type Mode = "dark" | "light";

/** Subscribers, so every toggle on the page agrees without a context. */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  /* Another tab switching theme should move this one too. */
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY) apply(read());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function read(): Mode {
  return document.documentElement.getAttribute("data-mode") === "light" ? "light" : "dark";
}

function apply(mode: Mode) {
  if (mode === "light") document.documentElement.setAttribute("data-mode", "light");
  else document.documentElement.removeAttribute("data-mode");
  for (const listener of listeners) listener();
}

function set(mode: Mode) {
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch {
    /* Private mode, or storage full. The theme still changes for this page. */
  }
  apply(mode);
}

/**
 * The mode switch.
 *
 * The rendered state comes from the DOM rather than from React state, because
 * the inline boot script has already decided it by the time this hydrates —
 * `useSyncExternalStore` with a server snapshot of "dark" keeps the first
 * client render matching the HTML, and the real value arrives immediately
 * after. Getting that wrong is what makes a toggle hydrate showing the wrong
 * icon.
 *
 * Two states, not three. A "system" position is more correct and, in a header
 * with one small control, unexplainable: the visitor still follows their
 * system until the first time they press this, which is the behaviour a third
 * position would be there to offer.
 */
export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  const mode = useSyncExternalStore(subscribe, read, () => "dark" as Mode);
  const next: Mode = mode === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => set(next)}
      aria-label={label}
      title={label}
      data-cursor="explore"
      className={cn(
        "inline-flex size-9 items-center justify-center text-muted transition-colors hover:text-fg",
        className,
      )}
    >
      {/*
        Both icons are always in the markup and cross-faded, so the control
        never reflows and the swap costs one composited property. `aria-label`
        carries the meaning; the glyphs are decoration.
      */}
      <span className="relative block size-[1.15rem]">
        <Sun
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)]",
            mode === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)]",
            mode === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
          )}
        />
      </span>
    </button>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 1.6v2.2M10 16.2v2.2M18.4 10h-2.2M3.8 10H1.6M15.94 4.06l-1.56 1.56M5.62 14.38l-1.56 1.56M15.94 15.94l-1.56-1.56M5.62 5.62L4.06 4.06"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
