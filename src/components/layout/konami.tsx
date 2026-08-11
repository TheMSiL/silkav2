"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Easter egg. Deliberately keyboard-only, silent, and non-blocking — it prints
 * to the console and briefly tints the accent variable. Nothing about the page
 * changes for anyone who is not looking for it.
 */
export function Konami() {
  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const expected = SEQUENCE[index];
      if (event.key.toLowerCase() === expected.toLowerCase()) {
        index += 1;
        if (index === SEQUENCE.length) {
          index = 0;
          console.log(
            `%c${site.name} — we build things.%c\n${site.tagline}\nHiring engineers who read the console: ${site.email}`,
            "font-size:16px;font-weight:600;color:#ff4a1c",
            "font-size:12px;color:#8b9199",
          );
          const root = document.documentElement;
          root.style.setProperty("--accent", "#46d39a");
          clearTimeout(timer);
          timer = setTimeout(() => root.style.removeProperty("--accent"), 2400);
        }
      } else {
        index = event.key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
