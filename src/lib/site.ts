/**
 * Single source of truth for brand + site-wide constants.
 * Anything that would otherwise be typed twice in a layout lives here.
 */

export const site = {
  name: "Silka",
  legalName: "Silka Studio",
  /**
   * The studio is named after its founder — Silka is a surname, not a word.
   * Nothing in the brand should be built on a folk etymology of it; an earlier
   * note here derived the name from silk and the first logomark followed that
   * reading, which is why the mark is now a plain monogram (`docs/logo.md`).
   *
   * The tagline stands on its own as a claim about the work, not the name.
   */
  tagline: "Built to carry weight.",
  descriptor: "Digital product engineering studio",
  description:
    "Silka is a digital product engineering studio. We design and build web platforms, mobile apps, SaaS, CRM and ERP systems, automation and AI products — from first architecture sketch to running infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://silka.studio",
  locale: "uk",
  email: "hello@silka.studio",
  founded: "2019",
  location: "Kyiv · Remote across EU",
  /** Where the quoted client reviews are published, in full and unedited. */
  reviews: {
    url: "https://freelance.ua/user/msil/opinions/",
  },
  /**
   * Messaging only — these are the channels clients actually reply on.
   * REPLACE the handles and the phone number before launch.
   */
  phone: "+380000000000",
  social: {
    telegram: "https://t.me/silkastudio",
    whatsapp: "https://wa.me/380000000000",
    viber: "viber://chat?number=%2B380000000000",
  },
} as const;

export type SocialKey = keyof typeof site.social;

export const socialLabels: Record<SocialKey, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  viber: "Viber",
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = {
  Studio: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export type NavItem = (typeof nav)[number];
