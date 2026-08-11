import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Cursor } from "@/components/layout/cursor";
import { Konami } from "@/components/layout/konami";
import { RevealBoot } from "@/components/motion/reveal-boot";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { titleTemplate } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/json-ld";
import {
  alternateLanguages,
  isLocale,
  localeTags,
  locales,
  localizeHref,
  type Locale,
} from "@/lib/i18n/config";
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "uk") as Locale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.home.metaTitle}`,
      template: titleTemplate,
    },
    description: dict.home.metaDescription,
    applicationName: site.name,
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    publisher: site.legalName,
    category: "technology",
    alternates: {
      canonical: `${site.url}${localizeHref("/", locale)}`,
      languages: alternateLanguages("/", site.url),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeTags[locale],
      url: `${site.url}${localizeHref("/", locale)}`,
      title: `${site.name} — ${dict.home.metaTitle}`,
      description: dict.home.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${dict.home.metaTitle}`,
      description: dict.home.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#08090a" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  /*
   * Pinch-zoom is turned off by request. Note that Safari on iOS has ignored
   * both of these since iOS 10 and always allows the gesture — the fixes that
   * actually stop unwanted zoom there are the 16px minimum on form controls
   * and `touch-action: manipulation`, both in globals.css.
   */
  maximumScale: 1,
  userScalable: false,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${sans.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <RevealBoot />
      </head>
      <body className="min-h-dvh bg-surface text-fg antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema(locale)]} />
        <Cursor />
        <Header locale={locale} dict={dict} />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <Konami />
      </body>
    </html>
  );
}
