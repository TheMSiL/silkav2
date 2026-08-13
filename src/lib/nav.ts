import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Navigation is derived from the dictionary so labels translate while the
 * paths stay locale-agnostic — `localizeHref` adds the prefix at render time.
 */
/**
 * Four items, not five.
 *
 * "Process" pointed at an anchor inside About, so the header offered two
 * routes to one page and spent a slot saying so. The timeline is still there
 * and still linked from within About.
 */
export function mainNav(dict: Dictionary) {
  return [
    { label: dict.nav.work, href: "/work" },
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.capabilities, href: "/capabilities" },
    { label: dict.nav.about, href: "/about" },
  ];
}

export function footerStudioNav(dict: Dictionary) {
  return [
    { label: dict.nav.work, href: "/work" },
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.capabilities, href: "/capabilities" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.insights, href: "/insights" },
    { label: dict.nav.contact, href: "/contact" },
  ];
}

export function legalNav(dict: Dictionary) {
  return [
    { label: dict.legal.privacyTitle, href: "/privacy" },
    { label: dict.legal.termsTitle, href: "/terms" },
  ];
}
