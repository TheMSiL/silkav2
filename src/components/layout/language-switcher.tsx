"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  localeShortNames,
  localeNames,
  locales,
  localizeHref,
  stripLocale,
  type Locale,
} from "@/lib/i18n/config";

/**
 * Renders real links to the same page in every locale, so the switcher works
 * without JavaScript and search engines can follow it.
 */
export function LanguageSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const { path } = stripLocale(pathname);

  return (
    <nav aria-label={label} className={cn("flex items-center gap-0.5", className)}>
      {locales.map((target) => {
        const isCurrent = target === locale;
        return (
          <Link
            key={target}
            href={localizeHref(path, target)}
            hrefLang={target}
            aria-current={isCurrent ? "true" : undefined}
            title={localeNames[target]}
            className={cn(
              "mono-sm px-2 py-1 transition-colors duration-200",
              isCurrent ? "text-fg" : "text-fg/40 hover:text-fg",
            )}
          >
            {localeShortNames[target]}
          </Link>
        );
      })}
    </nav>
  );
}
