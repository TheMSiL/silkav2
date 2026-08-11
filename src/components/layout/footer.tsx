"use client";

import Link from "next/link";
import { site, socialLabels, type SocialKey } from "@/lib/site";
import { footerStudioNav, legalNav } from "@/lib/nav";
import { EVENTS, track } from "@/lib/analytics";
import { ArrowUpRight, Logomark } from "@/components/ui/icons";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="relative isolate overflow-hidden bg-surface text-fg">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <div className="relative mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="grid gap-12 border-b border-line py-[var(--space-3xl)] lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href={localizeHref("/", locale)}
              className="inline-flex items-center gap-2.5"
              aria-label={`${site.name} — ${dict.common.home}`}
            >
              <Logomark className="size-6" />
              <span className="font-display text-xl">{site.name}</span>
            </Link>
            <p className="mt-6 max-w-sm text-lg text-muted">
              {dict.home.metaTitle}. {site.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              onClick={() => track(EVENTS.emailClick, { location: "footer" })}
              className="link-underline mt-8 inline-block text-xl text-fg"
            >
              {site.email}
            </a>
            <p className="mono-sm mt-4 text-faint">{site.location}</p>
          </div>

          <nav aria-label={dict.nav.about}>
            <h2 className="mono-sm mb-5 text-faint">{dict.nav.about}</h2>
            <ul className="space-y-3">
              {footerStudioNav(dict).map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizeHref(item.href, locale)}
                    className="link-underline text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono-sm mb-5 text-faint">{dict.nav.contact}</h2>
            <ul className="space-y-3">
              {Object.entries(site.social).map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => track(EVENTS.socialClick, { network: key, location: "footer" })}
                    className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
                  >
                    {socialLabels[key as SocialKey]}
                    <ArrowUpRight className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h2 className="mono-sm mb-2 text-faint">{dict.common.language}</h2>
              <LanguageSwitcher locale={locale} label={dict.common.language} className="-ml-2" />
            </div>
          </div>
        </div>

        {/* Wordmark — the footer's visual anchor. */}
        <div className="relative py-10" aria-hidden>
          <span className="font-display block w-full select-none text-center text-[clamp(4rem,19vw,17rem)] leading-[0.8] tracking-[-0.05em] text-white/[0.06]">
            {site.name.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-sm text-faint">
            © {year} {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-6">
            {legalNav(dict).map((item) => (
              <li key={item.href}>
                <Link
                  href={localizeHref(item.href, locale)}
                  className="mono-sm text-faint transition-colors hover:text-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
