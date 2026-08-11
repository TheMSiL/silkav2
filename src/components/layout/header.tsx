"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { mainNav } from "@/lib/nav";
import { Logomark } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "./language-switcher";
import { localizeHref, stripLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const { path } = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  /*
   * The menu is scoped to the route it was opened on. Deriving `menuOpen` this
   * way means a navigation closes it without an effect that fires on every
   * pathname change.
   */
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;
  const setMenuOpen = (open: boolean) => setMenu({ open, path: pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = mainNav(dict);
  const isActive = (href: string) => {
    const clean = href.split("#")[0];
    return clean === "/" ? path === "/" : path.startsWith(clean);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        {dict.common.skipToContent}
      </a>

      <header
        data-theme="dark"
        className={cn(
          "fixed inset-x-0 top-0 transition-[background-color,backdrop-filter,border-color] duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
          menuOpen ? "z-[calc(var(--z-menu)+1)]" : "z-[var(--z-header)]",
          scrolled && !menuOpen
            ? "border-b border-white/10 bg-[rgb(8_9_10/0.72)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between px-[var(--container-pad)] transition-[height] duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
            scrolled ? "h-[var(--header-h-compact)]" : "h-[var(--header-h)]",
          )}
        >
          <Link
            href={localizeHref("/", locale)}
            aria-label={`${site.name} — ${dict.common.home}`}
            className="group flex items-center gap-2.5 text-white"
          >
            <Logomark className={cn("transition-all duration-[var(--dur-base)]", scrolled ? "size-5" : "size-6")} />
            <span className="font-display text-lg tracking-[-0.02em] text-white">{site.name}</span>
          </Link>

          <nav aria-label={dict.menu.label} className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={localizeHref(item.href, locale)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-xs tracking-[-0.01em] transition-colors duration-[var(--dur-fast)]",
                  isActive(item.href) ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3.5 bottom-1 h-px origin-left bg-accent transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
                    isActive(item.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher
              locale={locale}
              label={dict.common.language}
              className="hidden text-white sm:flex"
            />

            <Magnetic className="hidden lg:inline-block">
              <Link
                href={localizeHref("/contact", locale)}
                className="inline-flex h-10 items-center gap-2 border border-white/25 px-5 text-xs text-white transition-colors duration-[var(--dur-fast)] hover:border-accent hover:bg-accent hover:text-accent-fg"
              >
                {dict.cta.start}
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative z-[calc(var(--z-menu)+1)] -mr-2 flex size-11 items-center justify-center text-white lg:hidden"
            >
              <span className="sr-only">{menuOpen ? dict.menu.close : dict.menu.open}</span>
              {/* Three bars; the middle one fades out as the outer two cross. */}
              <span aria-hidden className="pointer-events-none relative block h-3.5 w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-6 bg-current transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
                    menuOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-px w-6 bg-current transition-opacity duration-[var(--dur-fast)]",
                    menuOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-6 bg-current transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
                    menuOpen ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
