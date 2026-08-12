# The Silka mark

Silka is a surname. The mark is a monogram — an S, and nothing more clever than
that. It is constructed rather than drawn, so it can be rebuilt exactly from the
numbers below instead of being traced from a file.

## Construction

Everything falls out of four inputs on a **24u box with a 4u module**:

| Input | Value |
| --- | --- |
| Bowl radius | `3.5u` |
| Upper bowl centre | `(11, 8.5)` |
| Lower bowl centre | `(13, 15.5)` — one module across, one module down |
| Stroke | `2.6u`, butt caps |

From those: both bowls are exact semicircles, the upper sweeping 12 o'clock
round the left to 6 o'clock, the lower 12 o'clock round the right to 6. They are
joined by a `2u` horizontal waist at `y=12`. Straight leads run out of each bowl
to `x=21` and `x=3`.

The leads are what make the mark, and they are why it is not the usual
two-arc S. They give it a horizontal axis instead of a circular one, so it sets
beside a wordmark rather than sitting next to it — and the upper lead points
into the word it precedes.

### The openings

Each opening is **1.7u of arc**, centred exactly where a horizontal grid line
crosses the outer flank of a bowl: `y=8` on the left of the upper bowl, `y=16`
on the right of the lower. It is the same 4u grid the site draws behind itself
(`--grid-line`, `.grid-bg`).

They are not a stencil effect. They are the point of the mark: a detail that is
legible at display size and closes to a solid S by 16px. The mark carries
detail it can afford to lose.

Do not widen them past ~2u in the stroke version. At 2.6u the upper bowl reads
as amputated and the whole thing starts to look like a **5**.

## Where it lives

| File | What it draws |
| --- | --- |
| [`src/lib/logo.ts`](../src/lib/logo.ts) | The paths. Single source. |
| [`src/components/ui/icons.tsx`](../src/components/ui/icons.tsx) | `Logomark` — header, footer, `currentColor` |
| [`src/app/icon.svg`](../src/app/icon.svg) | Favicon. **Hand-copied** — a static file cannot import. |
| [`src/app/[locale]/opengraph-image.tsx`](../src/app/[locale]/opengraph-image.tsx) | Social card, via `logoDataUri()` |

Changing the construction means changing `logo.ts` **and** `icon.svg`.

## The two paths

`LOGO_PATH` has 1.7u openings and is the default — use it at 20px and above.

`LOGO_PATH_WIDE` has 2.2u openings and exists only for the favicon. At 16px a
1.7u gap falls under one device pixel, so it disappears instead of softening;
2.2u survives the same rounding.

## Favicon

The favicon is the mark reversed out of a solid `#2119f0` tile in `#f4f2ec`.

A tab strip gives every favicon the same square whether it is used or not, so
the tile is free presence — a stroke-only mark floats in that square and reads
as noise at 16px. This is the one lockup where the mark is not on the site's own
surface, and the only one that uses `LOGO_PATH_WIDE`.

## Clear space and minimum size

Clear space on all four sides is **one bowl radius (3.5u ≈ 15% of the box)**,
measured from the box, not from the ink. The leads already sit 3u inside the
box, which is deliberate — do not crop to the ink and then add clear space, or
the mark will sit too tight against a wordmark.

Minimum size for the stroke mark is **16px**. Below that use the tile.

## Misuse

- Do not use square caps. They overshoot the constructed terminals and blunt
  the leads; the rest of the icon set is square-capped and the mark is the
  deliberate exception.
- Do not close the openings to "clean it up". A solid S is not this mark.
- Do not outline, gradient-fill, or add a second colour. It is one stroke in
  one colour, which is what lets it inherit `currentColor` everywhere.
- Do not re-space the lockup. `gap-2.5` against the wordmark is set so the
  upper lead reads as pointing into the word rather than touching it.
- Do not rebuild it by tracing a PNG. Regenerate from the construction above.
