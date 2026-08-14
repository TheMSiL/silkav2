/**
 * The social card system.
 *
 * Every OG image on the site is drawn on the same frame — grid, accent rule,
 * corner glow and the mark as a watermark — so a shared link is recognisable
 * before the title is read. Only the palette and the accent change:
 *
 *   light  the studio card, matching the bone bands on the site
 *   dark   case studies, tinted with the project's own accent
 *
 * Satori constraints, all of them load-bearing:
 *   - flexbox only, and every element carrying more than one child needs an
 *     explicit `display: flex`
 *   - no `currentColor`, no CSS variables, no external assets
 *   - `next/image` does not exist here; the mark arrives as an inline data URI
 */
import { logoDataUri } from "@/lib/logo";

export type OgTheme = "light" | "dark";

export interface OgPalette {
  bg: string;
  fg: string;
  muted: string;
  faint: string;
  line: string;
  grid: string;
  accent: string;
  glow: string;
  /** The watermark has to survive on both surfaces without becoming texture. */
  markOpacity: number;
}

/** Mirrors the KEEL tokens in globals.css. Hardcoded because Satori has no vars. */
export function ogPalette(theme: OgTheme, accent?: string): OgPalette {
  if (theme === "light") {
    const tone = accent ?? "#2119f0";
    return {
      bg: "#f4f2ec",
      fg: "#101315",
      muted: "#5a6067",
      faint: "#8a9098",
      line: "rgba(16,19,21,0.12)",
      grid: "rgba(16,19,21,0.05)",
      accent: tone,
      // Eight-digit hex, so the glow always belongs to the accent it sits under.
      glow: `${tone}14`,
      markOpacity: 0.06,
    };
  }

  // The brand accent is #2119f0; on black it needs the lighter tint to read.
  const tone = accent ?? "#5a52ff";
  return {
    bg: "#08090a",
    fg: "#eeece6",
    muted: "#8b9199",
    faint: "#565d64",
    line: "rgba(255,255,255,0.12)",
    grid: "rgba(255,255,255,0.05)",
    accent: tone,
    glow: `${tone}30`,
    markOpacity: 0.1,
  };
}

/** Vertical hairlines, one every 150px — the site's grid, quietly. */
const GRID_COLUMNS = [150, 300, 450, 600, 750, 900, 1050];

export function OgFrame({
  palette,
  children,
}: {
  palette: OgPalette;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: palette.bg,
        color: palette.fg,
        padding: "66px 72px 60px",
        fontFamily: "sans-serif",
      }}
    >
      {GRID_COLUMNS.map((x) => (
        <div
          key={x}
          style={{ position: "absolute", top: 0, left: x, width: 1, height: 630, background: palette.grid }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: -330,
          left: 640,
          width: 1000,
          height: 1000,
          borderRadius: 500,
          backgroundImage: `radial-gradient(circle at center, ${palette.glow} 0%, rgba(0,0,0,0) 66%)`,
        }}
      />

      {/*
        The mark bleeds off the right edge and is cropped only there — cropped on
        two edges it stops reading as the logo and starts reading as an artefact.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoDataUri(palette.accent)}
        width={560}
        height={560}
        alt=""
        style={{ position: "absolute", top: 36, left: 800, opacity: palette.markOpacity }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 8,
          backgroundImage: `linear-gradient(90deg, ${palette.accent} 0%, ${palette.accent} 32%, rgba(0,0,0,0) 88%)`,
        }}
      />

      {children}
    </div>
  );
}

/** Mark, wordmark and a label — the same lockup at the top of every card. */
export function OgLockup({
  palette,
  label,
  size = 44,
}: {
  palette: OgPalette;
  label: string;
  size?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoDataUri(palette.accent)} width={size} height={size} alt="" />
      <div style={{ display: "flex", fontSize: 32, letterSpacing: -1, fontWeight: 600 }}>Silka</div>
      <div style={{ width: 1, height: 26, background: palette.line }} />
      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: palette.muted,
          letterSpacing: 2.4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/** An outlined pill — the URL on the studio card, the industry on a case card. */
export function OgPill({
  palette,
  children,
  color,
}: {
  palette: OgPalette;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${palette.line}`,
        borderRadius: 999,
        padding: "9px 20px",
        fontSize: 20,
        color: color ?? palette.muted,
      }}
    >
      {children}
    </div>
  );
}

/**
 * A headline line with the accent phrase coloured — by word, never by offset.
 *
 * The previous version assumed the accent was the tail of the line and sliced
 * it off by character count. That held only for as long as every locale's
 * accent happened to sit at the end; the moment a headline put it at the
 * front, the slice cut a word in half and the accent was then appended a
 * second time, so the card read "Без хаосу нав Без хаосу".
 *
 * Matching whole words instead is the same rule `TextReveal` uses on the site,
 * punctuation stripped from both sides, so the card and the page colour the
 * same words wherever they fall.
 *
 * Satori has no inline layout: every word is its own flex item, and the space
 * between them is `gap` rather than a text node.
 */
export function AccentedLine({
  text,
  accent,
  palette,
  size,
}: {
  text: string;
  accent?: string;
  palette: OgPalette;
  size: number;
}) {
  const strip = (word: string) => word.replace(/[.,!?;:«»“”"']/g, "");
  const accented = new Set(accent ? accent.split(" ").map(strip) : []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        /*
         * Explicit, not the `gap` shorthand: Satori does not parse the
         * two-value form, so `gap: "0 14px"` silently resolves to nothing and
         * every word in the headline runs into the next one.
         */
        columnGap: Math.round(size * 0.23),
        rowGap: 0,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -3,
        color: palette.fg,
      }}
    >
      {text.split(" ").map((word, i) => (
        <div
          key={`${word}-${i}`}
          style={{ display: "flex", color: accented.has(strip(word)) ? palette.accent : palette.fg }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
