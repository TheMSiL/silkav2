"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site, socialLabels, type SocialKey } from "@/lib/site";
import { legalNav, mainNav } from "@/lib/nav";
import { ArrowUpRight } from "@/components/ui/icons";
import { track, EVENTS } from "@/lib/analytics";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose, locale, dict }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotionSafe();

  /* Scroll lock + focus trap + Escape. */
  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const nav = mainNav(dict);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={dict.menu.label}
          data-theme="dark"
          className="fixed inset-0 z-[var(--z-menu)] flex flex-col bg-surface text-fg"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduced ? 0.15 : 0.6, ease }}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />

          <nav className="relative flex flex-1 flex-col justify-center px-[var(--container-pad)] pt-24">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease }}
                  className="border-b border-line"
                >
                  <Link
                    href={localizeHref(item.href, locale)}
                    onClick={onClose}
                    className="flex items-baseline justify-between py-4 font-display text-3xl transition-colors hover:text-accent"
                  >
                    {item.label}
                    <span className="mono-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease }}
              className="mt-10"
            >
              <Link
                href={localizeHref("/contact", locale)}
                onClick={onClose}
                className="flex h-14 w-full items-center justify-center gap-2 bg-accent font-medium text-accent-fg"
              >
                {dict.cta.start}
                <ArrowUpRight />
              </Link>
            </motion.div>
          </nav>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="relative border-t border-line px-[var(--container-pad)] py-6"
          >
            <div className="flex items-center justify-between gap-4">
              <a
                href={`mailto:${site.email}`}
                className="link-underline mono text-fg"
                onClick={() => track(EVENTS.emailClick, { location: "mobile_menu" })}
              >
                {site.email}
              </a>
              <LanguageSwitcher locale={locale} label={dict.common.language} />
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {Object.entries(site.social).map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono-sm text-muted transition-colors hover:text-fg"
                    onClick={() => track(EVENTS.socialClick, { network: key, location: "mobile_menu" })}
                  >
                    {socialLabels[key as SocialKey]}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex gap-6">
              {legalNav(dict).map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizeHref(item.href, locale)}
                    onClick={onClose}
                    className="mono-sm text-faint hover:text-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
