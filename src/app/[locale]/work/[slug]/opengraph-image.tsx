import { ImageResponse } from "next/og";
import { getProject, getProjectSlugs } from "@/data";
import { site } from "@/lib/site";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjectSlugs().map((slug) => ({ locale, slug })));
}

/** Per-case social card, so every case study shares with its own identity. */
export default async function CaseOgImage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(locale, slug);
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090a",
          color: "#eeece6",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          {/* Satori needs single text children unless display is set explicitly. */}
          <div style={{ display: "flex", color: "#8b9199", letterSpacing: 2, textTransform: "uppercase" }}>
            {`${site.name} — ${dict.nav.work}`}
          </div>
          <div style={{ display: "flex", color: project?.accent ?? "#2119f0" }}>
            {project?.industry ?? ""}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 84, letterSpacing: -3, lineHeight: 1, display: "flex" }}>
            {project?.name ?? site.name}
          </div>
          <div style={{ fontSize: 30, color: "#8b9199", maxWidth: 940, lineHeight: 1.3, display: "flex" }}>
            {project?.summary ?? site.description}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {(project?.scope ?? []).map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid #262b30",
                borderRadius: 999,
                padding: "8px 18px",
                fontSize: 20,
                color: "#8b9199",
                display: "flex",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
