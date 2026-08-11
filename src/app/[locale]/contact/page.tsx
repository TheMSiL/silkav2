import { Suspense } from "react";
import type { Metadata } from "next";

import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { LeadForm } from "@/features/lead-form/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { site, socialLabels, type SocialKey } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { getContent } from "@/data";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const content = getContent(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.nav.contact, path: "/contact" },
          ],
          locale,
        )}
      />

      <PageHero
        eyebrow={dict.nav.contact}
        title={dict.contact.title}
        accent={dict.contact.accent}
        intro={dict.contact.intro}
      />

      <Section theme="dark" className="pt-0">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Suspense fallback={<FormSkeleton />}>
              <LeadForm locale={locale} dict={dict} />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-10">
            <div className="border border-line p-6">
              <h2 className="mono-sm text-faint">{dict.contact.direct}</h2>
              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-3 inline-block text-xl text-fg"
              >
                {site.email}
              </a>
              <p className="mono-sm mt-4 text-faint">{site.location}</p>
              <ul className="mt-6 flex flex-wrap gap-4">
                {Object.entries(site.social).map(([key, href]) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mono-sm text-muted transition-colors hover:text-fg"
                    >
                      {socialLabels[key as SocialKey]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl">{dict.contact.pricingTitle}</h2>
              <p className="mt-4 text-base text-muted">{dict.contact.pricingIntro}</p>
              <dl className="mt-6 border-t border-line">
                {content.pricingFactors.map((factor, i) => (
                  <Reveal key={factor.label} delay={i * 0.04}>
                    <div className="flex gap-4 border-b border-line py-3">
                      <dt className="w-32 shrink-0 text-base text-fg">{factor.label}</dt>
                      <dd className="mono-sm text-faint">{factor.note}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            <div className="border border-line bg-surface-2 p-6">
              <h2 className="mono-sm text-faint">{dict.contact.nextTitle}</h2>
              <ol className="mt-4 space-y-3">
                {dict.contact.next.map((item, i) => (
                  <li key={item} className="flex gap-3 text-base text-muted">
                    <span className="mono-sm shrink-0 text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      <div className="grid gap-6 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[4.75rem] animate-pulse bg-surface-2" />
        ))}
      </div>
      <div className="h-24 animate-pulse bg-surface-2" />
      <div className="h-44 animate-pulse bg-surface-2" />
      <div className="h-14 w-64 animate-pulse bg-surface-2" />
    </div>
  );
}
