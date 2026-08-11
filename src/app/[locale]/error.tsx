"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { defaultLocale, localizeHref } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Route-level error boundary. Never a blank screen: the user gets an
 * explanation, a retry, and a way to reach a human.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dict = getDictionary(defaultLocale);

  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <section
      data-theme="dark"
      className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden bg-surface pt-[var(--header-h)]"
    >
      <div aria-hidden className="dot-bg pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative py-24">
        <p className="mono-sm text-accent">{dict.errors.errorEyebrow}</p>
        <h1 className="font-display mt-6 max-w-3xl text-4xl sm:text-5xl">
          {dict.errors.errorTitle}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{dict.errors.errorBody}</p>

        {error.digest ? (
          <p className="mono-sm mt-6 text-faint">
            {dict.errors.reference} {error.digest}
          </p>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button type="button" onClick={reset} variant="accent" size="lg" arrow="right">
            {dict.cta.tryAgain}
          </Button>
          <Button href={localizeHref("/", defaultLocale)} variant="secondary" size="lg">
            {dict.cta.homepage}
          </Button>
          <a href={`mailto:${site.email}`} className="link-underline text-muted hover:text-fg">
            {site.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
