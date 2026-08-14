import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { mainNav } from "@/lib/nav";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Shared by both 404 surfaces: the in-locale `not-found.tsx` and the
 * document-level `global-not-found.tsx` for URLs that match no route at all.
 */
export function NotFoundContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    ...mainNav(dict),
    { label: dict.nav.insights, href: "/insights" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  return (
    <section
      data-surface="base"
      className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden bg-surface"
    >
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_75%)]"
      />
      <Container className="relative py-24">
        <p className="mono-sm text-accent">{dict.errors.notFoundCode}</p>
        <h1 className="font-display mt-6 max-w-3xl text-5xl sm:text-6xl">
          {dict.errors.notFoundTitle}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{dict.errors.notFoundBody}</p>

        <nav aria-label={dict.errors.sectionsLabel} className="mt-12">
          <ul className="grid max-w-3xl gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {links.map((item) => (
              <li key={item.href} className="bg-surface">
                <Link
                  href={localizeHref(item.href, locale)}
                  data-cursor="explore"
                  className="group flex items-center justify-between p-5 transition-colors hover:text-accent"
                >
                  {item.label}
                  <ArrowRight className="text-faint transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href={localizeHref("/", locale)}
          variant="accent"
          size="lg"
          arrow="right"
          className="mt-12"
        >
          {dict.cta.homepage}
        </Button>
      </Container>
    </section>
  );
}
