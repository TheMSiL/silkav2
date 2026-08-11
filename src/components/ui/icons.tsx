import { cn } from "@/lib/cn";

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
 * The mark: two threads crossing — a weave, and an implied S. Geometric
 * rather than calligraphic, so it holds up at favicon size.
 */
export function Logomark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("size-6", className)}>
      <path
        d="M19 6.5A5.5 5.5 0 1 0 12 12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <path
        d="M5 17.5A5.5 5.5 0 1 0 12 12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        opacity="0.5"
      />
    </svg>
  );
}
