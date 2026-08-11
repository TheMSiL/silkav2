import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { NotFoundContent } from "@/components/sections/not-found-content";
import { site } from "@/lib/site";
import { defaultLocale, localeTags } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans-brand",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-mono-jb",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `404 — ${site.name}`,
  robots: { index: false, follow: false },
};

/**
 * Rendered for URLs that never match a route at all — those 404 outside the
 * `[locale]` segment, so they cannot use its layout. Falls back to the primary
 * language and renders a complete document of its own.
 */
export default function GlobalNotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <html lang={localeTags[defaultLocale]} className={`${sans.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh bg-surface text-fg antialiased">
        <NotFoundContent locale={defaultLocale} dict={dict} />
      </body>
    </html>
  );
}
