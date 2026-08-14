"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * One product, assembling itself.
 *
 * This is the section's whole argument made literal: the same rectangle starts
 * as a sentence somebody said in a meeting and ends as a running console, and
 * it never restarts. Each stage ADDS a layer to what is already there —
 * a wireframe over the note, an interface over the wireframe, data into the
 * interface, the architecture underneath it, then production around all of it.
 *
 * Two rules keep it honest, and both are load-bearing:
 *
 *   1. Nothing ever moves. Every box in the finished console is in the DOM from
 *      the first frame, at its final size and position, and only opacity, colour
 *      and transform change. So there is no reflow at any step, the transitions
 *      are compositor work, and — more importantly — the eye sees one thing
 *      growing rather than six pictures replacing each other.
 *
 *   2. Everything is sized in `em` against a container-query font size. The
 *      composition is therefore identical at 320px and at 900px, which is why
 *      the same component can serve the cinematic frame and the plain list
 *      further down without a second layout.
 *
 * The chrome is written in technical tokens (ORDERS, API, DB, p95) rather than
 * prose, exactly as the diagrams elsewhere on the site are, so the drawing
 * reads the same in all three locales. The one real sentence in it — the
 * client's brief at stage 01 — is passed in translated.
 */

export const STAGE_COUNT = 6;

const STRUCTURE = 1;
const INTERFACE = 2;
const DATA = 3;
const SYSTEM = 4;
const LIVE = 5;

/*
 * One transition definition for the whole drawing. Explicitly enumerated rather
 * than `transition-all`: several of these elements also change width or flex
 * basis between breakpoints, and animating those would be a reflow per frame.
 *
 * `translate` and `scale`, not `transform` — Tailwind v4 compiles those
 * utilities to the individual CSS properties, so a transition on `transform`
 * alone would leave every rise and every zoom snapping.
 */
const EASE =
  "transition-[opacity,translate,scale,color,background-color,border-color,box-shadow] duration-[520ms] ease-[var(--ease-out-expo)]";

/** Mono token styling. Never `.mono-sm` — that carries a rem size and would
    break out of the container-query scale everything else is drawn in. */
const TOKEN = "font-mono font-medium uppercase tracking-[0.1em]";

const TABLE_ROWS = [
  { id: "#4820", src: "shopify", state: "auto", total: "1,240" },
  { id: "#4819", src: "api", state: "auto", total: "380" },
  { id: "#4818", src: "manual", state: "review", total: "2,905" },
  { id: "#4817", src: "shopify", state: "auto", total: "640" },
];

/** The row that arrives on its own once the thing is in production. */
const LIVE_ROW = { id: "#4821", src: "api", state: "auto", total: "1,065" };

const CHART_LINE = "M0 48 L22 41 L44 44 L66 30 L88 34 L110 22 L132 27 L154 12 L176 17 L200 6";
const CHART_AREA = `${CHART_LINE} L200 60 L0 60 Z`;

const NODES = [
  { id: "ui", x: 11, y: 50 },
  { id: "api", x: 33, y: 50 },
  { id: "auth", x: 33, y: 15 },
  { id: "queue", x: 58, y: 24 },
  { id: "worker", x: 58, y: 78 },
  { id: "db", x: 84, y: 50 },
];
const EDGES: [string, string][] = [
  ["ui", "api"],
  ["api", "auth"],
  ["api", "queue"],
  ["queue", "worker"],
  ["worker", "db"],
  ["api", "db"],
];
const nodeAt = (id: string) => NODES.find((n) => n.id === id)!;

const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 0 → 1 whenever `active` turns on, so the figures count rather than appear.
 *
 * It rests at 1, never at 0: the server, the plain list further down the page
 * and anyone who prefers reduced motion all get the real figures, and only a
 * running animation ever pulls them back down to count up again. That also
 * keeps the reset out of the effect body — the first frame does it.
 */
function useCountIn(active: boolean, reduced: boolean, duration = 1100) {
  const [t, setT] = useState(1);

  useEffect(() => {
    if (!active || reduced) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // easeOutExpo — the figures sprint, then settle.
      setT(progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, duration]);

  return t;
}

/** In production the order count moves by itself. One order every few seconds
    is enough to read as traffic; faster reads as a slot machine. */
function useLiveOrders(live: boolean, reduced: boolean) {
  const [extra, setExtra] = useState(0);

  useEffect(() => {
    if (!live || reduced) return;
    const id = setInterval(() => setExtra((n) => n + 1), 2800);
    return () => clearInterval(id);
  }, [live, reduced]);

  return live ? extra : 0;
}

export function ProductBuild({
  stage,
  brief,
  className,
}: {
  stage: number;
  brief: string;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();

  const ui = stage >= INTERFACE;
  const filled = stage >= DATA;
  const xray = stage === SYSTEM;
  const live = stage >= LIVE;

  const t = useCountIn(filled, reduced);
  const extra = useLiveOrders(live, reduced);

  /** Fade-and-rise, from the stage this element belongs to onwards. */
  const enter = (from: number) =>
    stage >= from ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.5em]";

  /** Stagger, applied only on the way in — leaving should be immediate. */
  const after = (from: number, ms: number) => ({
    transitionDelay: stage >= from ? `${ms}ms` : "0ms",
  });

  /** A panel: dashed outline while it is a wireframe, real surface once it is
      an interface. Same box, same place, both times. */
  const panel = cn(
    EASE,
    ui ? "border border-line bg-surface-3" : "border border-dashed border-line-strong bg-transparent",
  );

  const kpis = [
    { label: "orders", value: group(Math.round((1284 + extra) * t)) },
    { label: "automated", value: `${Math.round(94 * t)}%` },
    { label: "sla", value: `${(99.6 * t).toFixed(1)}%` },
  ];

  return (
    <div
      aria-hidden
      className={cn(
        "@container dot-bg relative aspect-[16/11] w-full overflow-hidden border bg-surface-2 sm:aspect-[16/10]",
        EASE,
        live ? "border-accent/40 shadow-[var(--glow-accent)]" : "border-line shadow-none",
        className,
      )}
    >
      {/*
        The scale everything inside is drawn against. It has to sit inside the
        container rather than on it: container units resolve against the nearest
        ANCESTOR container, so an element cannot measure itself.
      */}
      <div className="absolute inset-0" style={{ fontSize: "clamp(7.5px, 1.7cqw, 15px)" }}>
        {/* The grid the structure is laid out on — arrives with the wireframe,
            then stays underneath the finished interface as a faint memory. */}
        <div
          className={cn(
            "grid-bg absolute inset-0 transition-opacity duration-700",
            stage >= STRUCTURE ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundSize: "2.5em 2.5em" }}
        />

        {/* ---------------------------------------------------------------
            01 — the sentence the client actually said.
            --------------------------------------------------------------- */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-center gap-[1em] p-[8%] transition-[opacity,translate] duration-[600ms] ease-[var(--ease-out-expo)]",
            stage >= STRUCTURE ? "-translate-y-[0.6em] opacity-0" : "translate-y-0 opacity-100",
          )}
        >
          <span className={cn(TOKEN, "text-[0.8em] text-faint")}>client · day 0</span>
          <p className="font-display max-w-[85%] text-[2.1em] leading-[1.05] text-fg">
            “{brief}”
            <span
              className="reduced-motion-hide ml-[0.15em] inline-block h-[0.85em] w-[0.06em] translate-y-[0.06em] animate-pulse bg-accent align-middle"
            />
          </p>
          <span className={cn(TOKEN, "text-[0.75em] text-faint")}>no screens · no stack · no estimate</span>
        </div>

        {/* ---------------------------------------------------------------
            02 → 06 — the product itself. Present from the first frame at its
            final geometry; only its material changes.
            --------------------------------------------------------------- */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col p-[3.5%] transition-[opacity,scale] duration-[520ms] ease-[var(--ease-out-expo)]",
            xray ? "scale-[0.985] opacity-20" : "scale-100 opacity-100",
          )}
        >
          {/* ---- app bar ---- */}
          <div
            className={cn(panel, "flex shrink-0 items-center gap-[0.6em] px-[0.8em] py-[0.6em]", enter(STRUCTURE))}
            style={after(STRUCTURE, 0)}
          >
            <span
              className={cn(EASE, "size-[0.8em] shrink-0", ui ? "bg-accent" : "border border-dashed border-line-strong")}
            />
            <span
              className={cn(EASE, TOKEN, "text-[0.8em] text-fg", enter(INTERFACE))}
              style={after(INTERFACE, 80)}
            >
              orderflow
            </span>

            <span className="ml-[0.8em] hidden items-center gap-[0.9em] sm:flex">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    EASE,
                    "h-[0.35em] w-[2.2em]",
                    ui ? (i === 0 ? "bg-fg/45" : "bg-fg/15") : "border-b border-dashed border-line-strong",
                    enter(STRUCTURE),
                  )}
                  style={after(STRUCTURE, 60 + i * 40)}
                />
              ))}
            </span>

            <span className="ml-auto flex items-center gap-[0.5em]">
              <span
                className={cn(
                  EASE,
                  TOKEN,
                  "flex items-center gap-[0.4em] border px-[0.5em] py-[0.2em] text-[0.7em]",
                  live ? "border-signal-green/50 text-signal-green" : "border-line text-faint",
                  enter(INTERFACE),
                )}
                style={after(INTERFACE, 160)}
              >
                <span
                  className={cn(
                    EASE,
                    "size-[0.5em] rounded-full",
                    live ? "bg-signal-green" : "bg-fg/25",
                    live && "reduced-motion-hide animate-pulse",
                  )}
                />
                {live ? "live" : "draft"}
              </span>
              <span
                className={cn(
                  EASE,
                  "size-[1.3em] shrink-0 rounded-full",
                  ui ? "bg-fg/20" : "border border-dashed border-line-strong",
                  enter(STRUCTURE),
                )}
                style={after(STRUCTURE, 120)}
              />
            </span>
          </div>

          <div className="mt-[0.6em] flex min-h-0 flex-1 gap-[0.6em]">
            {/* ---- sidebar ---- */}
            <div
              className={cn(panel, "flex w-[21%] shrink-0 flex-col gap-[0.6em] p-[0.7em]", enter(STRUCTURE))}
              style={after(STRUCTURE, 80)}
            >
              {[70, 54, 62, 46, 58].map((width, i) => (
                <span key={i} className="flex items-center gap-[0.45em]">
                  <span
                    className={cn(
                      EASE,
                      "size-[0.65em] shrink-0",
                      ui
                        ? i === 0
                          ? "bg-accent"
                          : "bg-fg/25"
                        : "border border-dashed border-line-strong",
                      enter(STRUCTURE),
                    )}
                    style={after(STRUCTURE, 120 + i * 45)}
                  />
                  <span
                    className={cn(
                      EASE,
                      "h-[0.35em]",
                      ui ? (i === 0 ? "bg-fg/45" : "bg-fg/15") : "border-b border-dashed border-line-strong",
                      enter(STRUCTURE),
                    )}
                    style={{ width: `${width}%`, ...after(STRUCTURE, 120 + i * 45) }}
                  />
                </span>
              ))}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-[0.6em]">
              {/* ---- figures ---- */}
              <div className="grid shrink-0 grid-cols-3 gap-[0.6em]">
                {kpis.map((kpi, i) => (
                  <div
                    key={kpi.label}
                    className={cn(panel, "flex flex-col gap-[0.4em] p-[0.6em]", enter(STRUCTURE))}
                    style={after(STRUCTURE, 140 + i * 55)}
                  >
                    <span
                      className={cn(EASE, TOKEN, "text-[0.65em] text-faint", enter(INTERFACE))}
                      style={after(INTERFACE, 120 + i * 55)}
                    >
                      {kpi.label}
                    </span>
                    <span className="relative block h-[1.35em]">
                      <span
                        className={cn(
                          EASE,
                          "absolute inset-x-0 top-[0.35em] h-[0.65em] w-[70%]",
                          ui ? "bg-fg/12" : "border border-dashed border-line",
                          filled ? "opacity-0" : "opacity-100",
                        )}
                      />
                      <span
                        className={cn(
                          "font-display absolute inset-0 flex items-center text-[1.3em] leading-none tabular-nums transition-opacity duration-500",
                          filled ? "opacity-100" : "opacity-0",
                        )}
                        style={after(DATA, 60 + i * 70)}
                      >
                        {kpi.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* ---- chart ---- */}
              <div
                className={cn(panel, "relative min-h-0 flex-1 overflow-hidden p-[0.6em]", enter(STRUCTURE))}
                style={after(STRUCTURE, 220)}
              >
                <span
                  className={cn(EASE, TOKEN, "relative z-1 text-[0.65em] text-faint", enter(INTERFACE))}
                  style={after(INTERFACE, 200)}
                >
                  volume · 30d
                </span>

                {/* The measure lines are the wireframe's chart placeholder, and
                    they stay on as gridlines once there is a curve to read. */}
                <span className="absolute inset-x-[0.6em] bottom-[0.6em] top-[1.9em] flex flex-col justify-between">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={cn(EASE, "block border-t", ui ? "border-line" : "border-dashed border-line-strong")}
                    />
                  ))}
                </span>

                {/*
                  The curve is painted on by a wipe rather than by a dash
                  offset. `pathLength` normalisation and `non-scaling-stroke`
                  disagree about which space the dash pattern lives in — the
                  line leaks out early under a non-uniform viewBox — and a wipe
                  reveals the fill along with the stroke, which is closer to
                  what drawing a chart actually looks like.
                */}
                <span
                  className="absolute inset-x-[0.6em] bottom-[0.6em] top-[1.9em] transition-[clip-path] duration-[1300ms] ease-[var(--ease-out-expo)]"
                  style={{
                    clipPath: filled ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                    transitionDelay: filled ? "160ms" : "0ms",
                  }}
                >
                  <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 size-full">
                    <path d={CHART_AREA} fill="var(--accent)" opacity={0.14} />
                    <path
                      d={CHART_LINE}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
              </div>

              {/* ---- orders ---- */}
              <div
                className={cn(panel, "shrink-0 px-[0.6em] pb-[0.5em] pt-[0.45em]", enter(STRUCTURE))}
                style={after(STRUCTURE, 280)}
              >
                <div className={cn(EASE, "flex items-center gap-[0.6em] border-b pb-[0.35em]", ui ? "border-line" : "border-dashed border-line-strong")}>
                  {[
                    { label: "order", w: "22%" },
                    { label: "source", w: "auto" },
                    { label: "state", w: "24%" },
                    { label: "total", w: "20%" },
                  ].map((column, i) => (
                    <span
                      key={column.label}
                      className={cn(
                        EASE,
                        TOKEN,
                        "text-[0.6em] text-faint",
                        i === 3 && "text-right",
                        enter(INTERFACE),
                      )}
                      style={{
                        width: column.w === "auto" ? undefined : column.w,
                        flex: column.w === "auto" ? "1 1 0%" : undefined,
                        ...after(INTERFACE, 240),
                      }}
                    >
                      {column.label}
                    </span>
                  ))}
                </div>

                {/*
                  Four rows of window over five rows of list. In production the
                  list slides down by exactly one row, the new order arrives at
                  the top and the oldest leaves the window — the motion a real
                  console makes when something happens while you are looking at
                  it.
                */}
                <div className="relative mt-[0.2em] h-[5.4em] overflow-hidden">
                  <div
                    className={cn(
                      "transition-transform duration-[700ms] ease-[var(--ease-out-expo)]",
                      live ? "translate-y-0" : "-translate-y-[1.35em]",
                    )}
                  >
                    <Row row={LIVE_ROW} ui={ui} filled={filled} shown={live} fresh delay={live ? 420 : 0} />
                    {TABLE_ROWS.map((row, i) => (
                      <Row key={row.id} row={row} ui={ui} filled={filled} shown delay={80 + i * 70} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- deploy strip ---- */}
          <div
            className={cn(panel, "mt-[0.6em] flex shrink-0 items-center gap-[0.5em] px-[0.7em] py-[0.45em]", enter(STRUCTURE))}
            style={after(STRUCTURE, 340)}
          >
            {["ci", "cdn", "ssl", "logs"].map((token, i) => (
              <span
                key={token}
                className={cn(
                  EASE,
                  TOKEN,
                  "border px-[0.45em] py-[0.15em] text-[0.6em]",
                  live ? "border-signal-green/40 text-signal-green" : "border-line text-faint",
                  enter(INTERFACE),
                )}
                style={after(live ? LIVE : INTERFACE, live ? 200 + i * 90 : 280)}
              >
                {token}
              </span>
            ))}

            <span
              className={cn(EASE, TOKEN, "ml-auto text-[0.6em]", live ? "text-fg" : "text-faint", enter(INTERFACE))}
              style={after(INTERFACE, 300)}
            >
              {live ? "p95 118ms · 99.98%" : "not deployed"}
            </span>

            <span className="hidden items-center gap-[0.12em] sm:flex">
              {[5, 8, 6, 10, 7, 11, 9, 12, 8, 13].map((height, i) => (
                <span
                  key={i}
                  className={cn(
                    EASE,
                    "block w-[0.18em] origin-bottom",
                    live ? "bg-signal-green/70" : "bg-fg/12",
                  )}
                  style={{ height: `${height * 0.09}em`, ...after(LIVE, live ? 260 + i * 35 : 0) }}
                />
              ))}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            05 — what is underneath the screen the client was looking at.
            --------------------------------------------------------------- */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-[520ms] ease-[var(--ease-out-expo)]",
            xray ? "opacity-100" : "opacity-0",
          )}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
            {EDGES.map(([from, to], i) => {
              const a = nodeAt(from);
              const b = nodeAt(to);
              return (
                <g key={`${from}-${to}`}>
                  {/* Drawn once, as a connection being made… */}
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--accent)"
                    strokeWidth={1}
                    opacity={0.4}
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={xray ? 0 : 1}
                    className="transition-[stroke-dashoffset] duration-[700ms] ease-[var(--ease-out-expo)]"
                    style={{ transitionDelay: xray ? `${140 + i * 80}ms` : "0ms" }}
                  />
                  {/* …then traffic runs along it. */}
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--accent)"
                    strokeWidth={1.5}
                    strokeDasharray="3 7"
                    vectorEffect="non-scaling-stroke"
                    className={cn("flow-dash transition-opacity duration-500", xray ? "opacity-90" : "opacity-0")}
                    style={{ transitionDelay: xray ? `${700 + i * 80}ms` : "0ms" }}
                  />
                </g>
              );
            })}
          </svg>

          {NODES.map((node, i) => (
            <span
              key={node.id}
              className={cn(
                TOKEN,
                "absolute -translate-x-1/2 -translate-y-1/2 border border-accent bg-surface px-[0.5em] py-[0.25em] text-[0.7em] text-fg transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)]",
                xray ? "scale-100 opacity-100" : "scale-90 opacity-0",
              )}
              style={{ left: `${node.x}%`, top: `${node.y}%`, transitionDelay: xray ? `${i * 70}ms` : "0ms" }}
            >
              {node.id}
            </span>
          ))}

          <span
            className={cn(
              TOKEN,
              "absolute bottom-[5%] left-[4%] text-[0.65em] text-faint transition-opacity duration-500",
              xray ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: xray ? "620ms" : "0ms" }}
          >
            idempotent · retried · audited
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * A row of the orders table. Placeholder bars and real values are stacked in
 * the same fixed-height cells, so a row filling with data costs one opacity
 * change and never moves the row below it.
 */
function Row({
  row,
  ui,
  filled,
  shown,
  fresh,
  delay,
}: {
  row: { id: string; src: string; state: string; total: string };
  ui: boolean;
  filled: boolean;
  shown: boolean;
  fresh?: boolean;
  delay: number;
}) {
  const review = row.state === "review";

  return (
    <div
      className={cn(
        "flex h-[1.35em] items-center gap-[0.6em] transition-opacity duration-500 ease-[var(--ease-out-expo)]",
        shown ? "opacity-100" : "opacity-0",
      )}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      <Cell width="22%" filled={filled} ui={ui} delay={delay}>
        <span className={cn(TOKEN, "text-[0.65em]", fresh ? "text-accent" : "text-fg")}>{row.id}</span>
      </Cell>

      <Cell grow filled={filled} ui={ui} delay={delay + 40}>
        <span className={cn(TOKEN, "text-[0.65em] text-muted")}>{row.src}</span>
      </Cell>

      <Cell width="24%" filled={filled} ui={ui} delay={delay + 80}>
        <span
          className={cn(
            TOKEN,
            "flex items-center gap-[0.35em] text-[0.6em]",
            review ? "text-signal-amber" : "text-signal-green",
          )}
        >
          <span className={cn("size-[0.45em] rounded-full", review ? "bg-signal-amber" : "bg-signal-green")} />
          {row.state}
        </span>
      </Cell>

      <Cell width="20%" align="right" filled={filled} ui={ui} delay={delay + 120}>
        <span className={cn(TOKEN, "text-[0.65em] tabular-nums text-fg")}>€ {row.total}</span>
      </Cell>
    </div>
  );
}

function Cell({
  width,
  grow,
  align = "left",
  filled,
  ui,
  delay,
  children,
}: {
  width?: string;
  grow?: boolean;
  align?: "left" | "right";
  filled: boolean;
  ui: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className="relative block h-full"
      style={{ width, flex: grow ? "1 1 0%" : undefined }}
    >
      <span
        className={cn(
          "absolute top-1/2 h-[0.35em] w-[70%] -translate-y-1/2 transition-opacity duration-500",
          align === "right" && "right-0",
          ui ? "bg-fg/12" : "border-b border-dashed border-line",
          filled ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute inset-0 flex items-center transition-opacity duration-500",
          align === "right" && "justify-end",
          filled ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDelay: filled ? `${delay}ms` : "0ms" }}
      >
        {children}
      </span>
    </span>
  );
}
