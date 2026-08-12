import { cn } from "@/lib/cn";
import { LOGO_PATH, LOGO_STROKE_WIDTH } from "@/lib/logo";

interface IconProps {
  className?: string;
}

/** Diagonal arrow — outbound links and project cards. */
export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-[1em]", className)}>
      <path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

/** Horizontal arrow — forward navigation and primary CTAs. */
export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-[1em]", className)}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-[1em]", className)}>
      <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-[1em]", className)}>
      <path d="m3 8.5 3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

/**
 * The mark — an S for Silka, constructed rather than drawn.
 *
 * A 24u box on a 4u module. Two semicircular bowls of radius 3.5 sit on
 * centres (11, 8.5) and (13, 15.5) — one module apart on each axis — joined by
 * a 2u waist. Straight leads run out of both bowls to x=21 and x=3, which is
 * what gives the mark its horizontal axis and lets the top lead point into the
 * wordmark it sits beside.
 *
 * The two openings are not decoration: each is 1.7u of arc centred exactly
 * where a horizontal grid line (y=8, y=16) crosses the outer flank of a bowl —
 * the same 4u grid the site draws behind itself. They read as a deliberate
 * detail at display size and close up to a solid S by 16px, which is the whole
 * point: the mark carries detail it can afford to lose.
 *
 * Butt caps, not the square caps the rest of this icon set uses — square caps
 * overshoot the constructed terminals and blunt the leads.
 *
 * The path lives in `@/lib/logo` because the OG renderer and the favicon draw
 * it too. See `docs/logo.md` for the construction and the misuse rules.
 */
export function Logomark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("size-6", className)}>
      <path d={LOGO_PATH} stroke="currentColor" strokeWidth={LOGO_STROKE_WIDTH} strokeLinecap="butt" />
    </svg>
  );
}
