import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { LegalBody } from "@/components/sections/legal-body";
import { buildMetadata } from "@/lib/seo/metadata";
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
    title: dict.legal.termsTitle,
    description: dict.legal.termsIntro,
    path: "/terms",
    locale,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.legal.eyebrow}
        title={dict.legal.termsTitle}
        intro={dict.legal.termsIntro}
      />
      <Section surface="contrast" size="narrow">
        <LegalBody
          sections={getContent(locale).terms}
          updated="11.08.2026"
          updatedLabel={dict.legal.updated}
        />
      </Section>
    </>
  );
}
