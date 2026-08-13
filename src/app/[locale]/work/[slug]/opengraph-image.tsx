import { ImageResponse } from "next/og";
import { getProject, getProjectSlugs } from "@/data";
import { site } from "@/lib/site";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { OgFrame, OgLockup, OgPill, ogPalette } from "@/lib/seo/og-card";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjectSlugs().map((slug) => ({ locale, slug })));
}

/**
 * Per-case social card: the studio frame in dark, tinted with the project's own
 * accent, so a shared case study carries its identity and the studio's at once.
 */
export default async function CaseOgImage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(locale, slug);
  const dict = getDictionary(locale);
  const palette = ogPalette("dark", project?.accent);

  return new ImageResponse(
    (
      <OgFrame palette={palette}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <OgLockup palette={palette} label={dict.nav.work} size={40} />
          {project ? (
            <OgPill palette={palette} color={palette.accent}>
              {project.industry}
            </OgPill>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 86, letterSpacing: -3.5, lineHeight: 1.02 }}>
            {project?.name ?? site.name}
          </div>
          <div style={{ display: "flex", fontSize: 29, color: palette.muted, maxWidth: 820, lineHeight: 1.3 }}>
            {project?.summary ?? site.description}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", width: 1056, height: 1, background: palette.line }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12 }}>
              {(project?.scope ?? []).slice(0, 4).map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    border: `1px solid ${palette.line}`,
                    borderRadius: 999,
                    padding: "8px 18px",
                    fontSize: 19,
                    color: palette.muted,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", fontSize: 20, color: palette.faint }}>
              {site.url.replace("https://", "")}
            </div>
          </div>
        </div>
      </OgFrame>
    ),
    size,
  );
}
