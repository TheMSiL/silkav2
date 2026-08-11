/**
 * Single source of truth for brand + site-wide constants.
 * Anything that would otherwise be typed twice in a layout lives here.
 */

export const site = {
  name: "Silka",
  legalName: "Silka Studio",
  /**
   * Silk has a higher tensile strength-to-weight ratio than steel. That is the
   * whole brand in one fact: light, precise, and load-bearing.
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
  { label: "Process", href: "/about#process" },
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
