/**
 * The Silka mark, as geometry.
 *
 * One source for the three places that draw it: the `Logomark` component, the
 * OG card renderer, and — by hand, because a static file cannot import —
 * `src/app/icon.svg`. If you change the construction here, change the icon too.
 *
 * `docs/logo.md` carries the construction, the clear space and the misuse
 * rules. Both paths below are generated from it; do not nudge the coordinates.
 */

/** 1.7u openings. The default, for anything rendered at 20px or larger. */
export const LOGO_PATH =
  "M21 5H11A3.5 3.5 0 0 0 7.758 7.182M7.517 8.848A3.5 3.5 0 0 0 11 12H13A3.5 3.5 0 0 1 16.483 15.152M16.242 16.818A3.5 3.5 0 0 1 13 19H3";

/**
 * 2.2u openings, for tiles rendered at 16px. At that size a 1.7u gap falls
 * under one device pixel and the detail is lost rather than softened.
 */
export const LOGO_PATH_WIDE =
  "M21 5H11A3.5 3.5 0 0 0 7.86 6.954M7.551 9.095A3.5 3.5 0 0 0 11 12H13A3.5 3.5 0 0 1 16.449 14.905M16.14 17.046A3.5 3.5 0 0 1 13 19H3";

export const LOGO_VIEWBOX = "0 0 24 24";
export const LOGO_STROKE_WIDTH = 2.6;

/**
 * The mark as a base64 SVG data URI.
 *
 * Satori renders the OG cards and has no access to `currentColor` or to the
 * component tree, so the mark has to arrive as an image with its colour already
 * baked in. Base64 rather than utf8 because the `#` in a hex colour terminates
 * a data URI early.
 */
export function logoDataUri(color: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">` +
    `<path d="${LOGO_PATH}" fill="none" stroke="${color}" stroke-width="${LOGO_STROKE_WIDTH}" stroke-linecap="butt"/>` +
    `</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
