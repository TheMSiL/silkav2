import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Technology marks, drawn in this site's own hand.
 *
 * These are deliberately NOT the vendors' colour logos. A row of twenty brand
 * marks in twenty brand colours would be the loudest thing on a site whose
 * entire palette is ink, bone and one blue — and it would read as a badge wall
 * rather than as a claim about what we build with. So every mark here is
 * redrawn on the same 24u grid as the rest of the icon set, in `currentColor`,
 * at one stroke weight, and always sits next to its wordmark. The wordmark
 * carries the identification; the glyph carries the rhythm.
 *
 * Where a technology's own mark is already geometric (React's atom, Node's
 * hexagon, Kotlin's notched square, GraphQL's hexagon of nodes) it is redrawn
 * faithfully. Where it is an illustration — a whale, a bird, an elephant — the
 * glyph is the honest abstraction of what the thing IS: containers for Docker,
 * a stack for Redis, a cylinder for Postgres. And where the identity is a
 * lettered badge to begin with (JS, TS, WordPress), the badge is the mark, set
 * in the site's own mono.
 */

const STROKE = 1.4;

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="square"
      aria-hidden
      className={cn("size-full", className)}
    >
      {children}
    </svg>
  );
}

/** A lettered badge — the identity of JS, TS and WordPress is a letterform. */
function Badge({ letters, round }: { letters: string; round?: boolean }) {
  return (
    <Frame>
      {round ? (
        <circle cx="12" cy="12" r="9" />
      ) : (
        <rect x="3" y="3" width="18" height="18" rx="1.5" />
      )}
      <text
        x="12"
        y="12.4"
        textAnchor="middle"
        dominantBaseline="central"
        stroke="none"
        fill="currentColor"
        fontSize={letters.length > 1 ? 8.6 : 10}
        letterSpacing="0.2"
        style={{ fontFamily: "var(--font-mono-jb), ui-monospace, monospace", fontWeight: 600 }}
      >
        {letters}
      </text>
    </Frame>
  );
}

/* ---------- Languages and markup ---------- */

/** The angle brackets everyone writes markup between. */
const Html = () => (
  <Frame>
    <path d="M8.5 5.5 2.8 12l5.7 6.5M15.5 5.5 21.2 12l-5.7 6.5M13.8 4l-3.6 16" />
  </Frame>
);

/** Braces — a rule set. */
const Css = () => (
  <Frame>
    <path d="M10.6 3.5c-2.4 0-2.4 2.6-2.4 4.2s0 3.8-2.4 3.8c2.4 0 2.4 2.2 2.4 3.8s0 4.2 2.4 4.2M13.4 3.5c2.4 0 2.4 2.6 2.4 4.2s0 3.8 2.4 3.8c-2.4 0-2.4 2.2-2.4 3.8s0 4.2-2.4 4.2" />
  </Frame>
);

const JavaScript = () => <Badge letters="JS" />;
const TypeScript = () => <Badge letters="TS" />;

/* ---------- Frameworks ---------- */

/** The atom, redrawn: three orbits and a nucleus. */
const React_ = () => (
  <Frame>
    <ellipse cx="12" cy="12" rx="9.6" ry="3.7" />
    <ellipse cx="12" cy="12" rx="9.6" ry="3.7" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.6" ry="3.7" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
  </Frame>
);

/** The circled N. */
const NextJs = () => (
  <Frame>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.8 16.5v-9l8.2 10.4M15.4 7.5v6" strokeLinecap="butt" />
  </Frame>
);

/** Node's hexagon. */
const NodeJs = () => (
  <Frame>
    <path d="M12 2.6 20.1 7.3v9.4L12 21.4 3.9 16.7V7.3z" />
  </Frame>
);

/** A hexagon of nodes — GraphQL's mark is exactly this. */
const GraphQl = () => (
  <Frame>
    <path d="M12 3.4 19.4 7.7v8.6L12 20.6l-7.4-4.3V7.7z" />
    <path d="M12 3.4 4.6 16.3h14.8L12 3.4" strokeWidth="1" opacity="0.55" />
    {[
      [12, 3.4],
      [19.4, 7.7],
      [19.4, 16.3],
      [12, 20.6],
      [4.6, 16.3],
      [4.6, 7.7],
    ].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="currentColor" stroke="none" />
    ))}
  </Frame>
);

/** Tailwind's two waves. */
const Tailwind = () => (
  <Frame>
    <path d="M7.4 6.2c-2.6 0-4.2 1.3-4.9 3.9 1-1.3 2.1-1.8 3.4-1.5.8.2 1.3.7 2 1.4 1 1 2.2 2.3 4.7 2.3 2.6 0 4.2-1.3 4.9-3.9-1 1.3-2.1 1.8-3.4 1.5-.8-.2-1.3-.7-2-1.4-1-1-2.2-2.3-4.7-2.3Z" />
    <path d="M11.5 13.6c-2.6 0-4.2 1.3-4.9 3.9 1-1.3 2.1-1.8 3.4-1.5.8.2 1.3.7 2 1.4 1 1 2.2 2.3 4.7 2.3 2.6 0 4.2-1.3 4.9-3.9-1 1.3-2.1 1.8-3.4 1.5-.8-.2-1.3-.7-2-1.4-1-1-2.2-2.3-4.7-2.3Z" />
  </Frame>
);

/* ---------- Data and infrastructure ---------- */

/** A relational store is a cylinder. It has been for forty years. */
const Postgres = () => (
  <Frame>
    <ellipse cx="12" cy="6.2" rx="7.2" ry="3.1" />
    <path d="M4.8 6.2v11.6c0 1.7 3.2 3.1 7.2 3.1s7.2-1.4 7.2-3.1V6.2" />
    <path d="M4.8 12c0 1.7 3.2 3.1 7.2 3.1s7.2-1.4 7.2-3.1" opacity="0.55" />
  </Frame>
);

/** Redis is drawn as a stack, and a stack is what it is. */
const Redis = () => (
  <Frame>
    <ellipse cx="12" cy="6" rx="8" ry="2.9" />
    <ellipse cx="12" cy="12" rx="8" ry="2.9" />
    <ellipse cx="12" cy="18" rx="8" ry="2.9" />
  </Frame>
);

/**
 * The container stack. The whale is dropped deliberately: at 20px it collapses
 * into a smudge under the boxes, and the boxes alone are the half of the mark
 * that survives being small.
 */
const Docker = () => (
  <Frame>
    <g strokeWidth="1.25">
      <rect x="2.6" y="14.2" width="4.2" height="4.2" />
      <rect x="7.3" y="14.2" width="4.2" height="4.2" />
      <rect x="12" y="14.2" width="4.2" height="4.2" />
      <rect x="16.7" y="14.2" width="4.2" height="4.2" />
      <rect x="7.3" y="9.5" width="4.2" height="4.2" />
      <rect x="12" y="9.5" width="4.2" height="4.2" />
      <rect x="16.7" y="9.5" width="4.2" height="4.2" />
      <rect x="12" y="4.8" width="4.2" height="4.2" />
    </g>
  </Frame>
);

/* ---------- Mobile ---------- */

/**
 * Flutter's two diagonal bands, taken off the real geometry rather than
 * guessed: the upper stripe runs corner to corner, the lower one folds back on
 * itself.
 */
const Flutter = () => (
  <Frame>
    <path d="M13.6 2 2.2 13.4l3.5 3.5L20.6 2z" />
    <path d="M13.5 12.5 7.6 18.5l3.5 3.6 3.5-3.6 6-6z" />
  </Frame>
);

/** A swift, abstracted to the wing that gives it its name. */
const Swift = () => (
  <Frame>
    <path d="M3.4 4.2c3.9 4.9 8.6 8.3 13.1 9.6-1.9.6-4.3.3-6.9-.9 2.3 2.7 5.9 4.3 9.1 4-2.2 2-5.6 2.9-9 2.1C5.8 17.9 3.3 14 3 9.7c1.9 2.1 4.4 3.9 7.1 4.9C7.2 12.2 4.8 8.5 3.4 4.2Z" />
  </Frame>
);

/** Kotlin: a square divided by the chevron that meets at its centre. */
const Kotlin = () => (
  <Frame>
    <rect x="3.4" y="3.4" width="17.2" height="17.2" />
    <path d="M20.6 3.4 12 12l8.6 8.6M3.4 12h8.6" strokeWidth="1.1" opacity="0.6" />
  </Frame>
);

/* ---------- Commerce and content ---------- */

/** A bag. Everything after the catalog happens because of it. */
const Shopify = () => (
  <Frame>
    <path d="M5.8 7.4h12.4l1.1 13.2H4.7z" />
    <path d="M9.2 7.4V5.8a2.8 2.8 0 0 1 5.6 0v1.6" />
  </Frame>
);

const WordPress = () => <Badge letters="W" round />;

/** Figma's stack of bowls. */
const Figma = () => (
  <Frame>
    <g strokeWidth="1.3">
      <path d="M9 3h3v6H9a3 3 0 1 1 0-6Z" />
      <path d="M12 3h3a3 3 0 1 1 0 6h-3z" />
      <path d="M9 9h3v6H9a3 3 0 1 1 0-6Z" />
      <circle cx="15" cy="12" r="3" />
      <path d="M9 15h3v3a3 3 0 1 1-3-3Z" />
    </g>
  </Frame>
);

/** Vercel's triangle. */
const Vercel = () => (
  <Frame>
    <path d="M12 3.6 21.6 20.4H2.4z" />
  </Frame>
);

/** Commits on a branch. */
const Git = () => (
  <Frame>
    <path d="M6.5 7.8v8.4M6.5 12h7.2a3.8 3.8 0 0 0 3.8-3.8" />
    <circle cx="6.5" cy="5.4" r="2.4" />
    <circle cx="6.5" cy="18.6" r="2.4" />
    <circle cx="17.5" cy="5.4" r="2.4" />
  </Frame>
);

/**
 * The marquee's contents, in the order they scroll past. Frontend first,
 * because that is what a visitor recognises fastest, then the parts of the
 * stack they cannot see, then the tools around it.
 */
export const TECHNOLOGIES: { name: string; Icon: () => ReactNode }[] = [
  { name: "HTML", Icon: Html },
  { name: "CSS", Icon: Css },
  { name: "JavaScript", Icon: JavaScript },
  { name: "TypeScript", Icon: TypeScript },
  { name: "React", Icon: React_ },
  { name: "Next.js", Icon: NextJs },
  { name: "Tailwind", Icon: Tailwind },
  { name: "Node.js", Icon: NodeJs },
  { name: "GraphQL", Icon: GraphQl },
  { name: "PostgreSQL", Icon: Postgres },
  { name: "Redis", Icon: Redis },
  { name: "Docker", Icon: Docker },
  /* React Native is not on this list on purpose: it would carry React's atom a
     second time in one loop, and a repeated glyph reads as a mistake. The
     services page names it in text, where it belongs. */
  { name: "Flutter", Icon: Flutter },
  { name: "Swift", Icon: Swift },
  { name: "Kotlin", Icon: Kotlin },
  { name: "Shopify", Icon: Shopify },
  { name: "WordPress", Icon: WordPress },
  { name: "Figma", Icon: Figma },
  { name: "Vercel", Icon: Vercel },
  { name: "Git", Icon: Git },
];
