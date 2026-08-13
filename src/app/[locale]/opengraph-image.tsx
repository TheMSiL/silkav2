import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { getContent } from "@/data";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { OgFrame, OgLockup, OgPill, ogPalette } from "@/lib/seo/og-card";

export const alt = `${site.name} — ${site.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The studio card, on the light surface.
 *
 * Headline and proof numbers come from the same dictionary and content the page
 * renders, so the card is localised and cannot quote a stale figure. Case
 * studies override this per route with the dark variant (`work/[slug]`).
 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const palette = ogPalette("light");
  const stats = getContent(locale).stats.slice(0, 3);

  // heroAccent is always the tail of heroTitleB — the site colours it the same way.
  const { heroTitleA, heroTitleB, heroAccent } = dict.home;
  const leadIn = heroTitleB.slice(0, heroTitleB.length - heroAccent.length).trim();

  /*
   * The headline is a translation, and the Russian one is a third longer than
   * the English. Step the size down by the longest line so no locale wraps into
   * the band underneath — a fixed size only ever fits the language it was set in.
   */
  const longest = Math.max(heroTitleA.length, heroTitleB.length);
  const titleSize = longest <= 26 ? 72 : longest <= 32 ? 62 : 54;

  return new ImageResponse(
    (
      <OgFrame palette={palette}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <OgLockup palette={palette} label={site.descriptor} />
          <OgPill palette={palette}>{site.url.replace("https://", "")}</OgPill>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
            <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.08, letterSpacing: -3 }}>
              {heroTitleA}
            </div>
            <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.08, letterSpacing: -3 }}>
              {/* The space is baked into the text: `gap` collapses once the row wraps. */}
              {leadIn ? <div style={{ display: "flex" }}>{`${leadIn} `}</div> : null}
              <div style={{ display: "flex", color: palette.accent }}>{heroAccent}</div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: palette.muted, maxWidth: 760 }}>
            Web · Mobile · SaaS · CRM · ERP · Automation · AI · Backend
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", width: 1056, height: 1, background: palette.line }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: 52 }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <div style={{ display: "flex", fontSize: 34, letterSpacing: -1 }}>{stat.value}</div>
                  <div style={{ display: "flex", fontSize: 19, color: palette.muted }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", fontSize: 22, color: palette.accent }}>{site.tagline}</div>
          </div>
        </div>
      </OgFrame>
    ),
    size,
  );
}
