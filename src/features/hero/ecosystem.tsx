"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/icons";
import { EVENTS, track } from "@/lib/analytics";

export interface EcosystemNode {
  id: string;
  label: string;
  /** Position on the ring, 0–1. */
  angle: number;
  /** Vertical offset as a fraction of the radius. */
  lift: number;
  detail: string;
  href: string;
}


/** Extra chords between nodes, so the graph reads as a system rather than a star. */
const CHORDS: [number, number][] = [
  [0, 1],
  [1, 2],
  [3, 6],
  [4, 5],
  [5, 7],
  [6, 7],
  [2, 4],
];

/**
 * Perspective strength, as a multiple of the ring radius rather than a pixel
 * distance. Being unitless is what lets the server and the script agree
 * exactly, and it also means the depth effect no longer gets stronger as the
 * container gets wider.
 */
const FOCAL = 7;

/**
 * The ring projection expressed as fractions of the box rather than pixels.
 *
 * The diagram is laid out by script, which used to mean it was a blank square
 * until the bundle arrived and hydrated — several seconds on a phone, and the
 * single slowest thing on the page. The same maths runs here at render time,
 * so the server HTML already contains the diagram in its rest position and the
 * script only takes over to spin it.
 *
 * Everything is a percentage of a square box, so it is correct at any size.
 */
export function projectFraction(node: { angle: number; lift: number }, rotation = 0) {
  const theta = node.angle * Math.PI * 2 + rotation;
  const radius = 0.38;
  const x = Math.sin(theta) * radius;
  const z = Math.cos(theta) * radius;
  const y = node.lift * radius * 0.35 - z * 0.6;
  const scale = FOCAL / (FOCAL - Math.cos(theta));
  return {
    left: (0.5 + x * scale) * 100,
    top: (0.5 + y * scale) * 100,
    scale,
    depth: Math.cos(theta),
    opacity: Math.max(0.42, Math.min(1, 0.5 + scale * 0.55)),
  };
}

interface Projected {
  x: number;
  y: number;
  scale: number;
  depth: number;
}

interface HeroEcosystemProps {
  nodes: EcosystemNode[];
  idleTitle: string;
  idleBody: string;
  detailLabel: string;
  groupLabel: string;
  className?: string;
}

export function HeroEcosystem({
  nodes: NODES,
  idleTitle,
  idleBody,
  detailLabel,
  groupLabel,
  className,
}: HeroEcosystemProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const spokeRefs = useRef<(SVGLineElement | null)[]>([]);
  const chordRefs = useRef<(SVGLineElement | null)[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  const setActiveNode = useCallback((index: number | null) => {
    activeRef.current = index;
    setActive(index);
    if (index !== null) {
      track(EVENTS.serviceView, { service: NODES[index].id, location: "hero_ecosystem" });
    }
  }, [NODES]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let spin = 0;
    let last = performance.now();
    let paused = false;
    /* The server positions the nodes with percentage left/top; the loop below
       positions them with a transform alone. Handing over means zeroing those
       offsets exactly once, on the first frame that has real pixels. */
    let handedOver = false;

    /* Last value written to each element, so a frame only touches the DOM
       where something actually changed. Depth opacity in particular settles
       for long stretches at this rotation speed. */
    const lastOpacity = new Float32Array(NODES.length).fill(-1);
    const lastLayer = new Int16Array(NODES.length).fill(-1);
    const lastSpokeAlpha = new Float32Array(NODES.length).fill(-1);
    const lastChordAlpha = new Float32Array(CHORDS.length).fill(-1);

    const observer = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      /* Redraw immediately, not on the next tick. The viewBox and the line
         coordinates are two halves of one coordinate system, and a frame that
         paints between them collapses every line into the top-left corner. */
      draw(spin);
    });

    const project = (node: EcosystemNode, rotation: number): Projected => {
      const f = projectFraction(node, rotation);
      return {
        x: (f.left / 100) * width,
        y: (f.top / 100) * height,
        scale: f.scale,
        depth: f.depth,
      };
    };

    function draw(rotation: number) {
      if (!width || !height) return;
      const cx = width / 2;
      const cy = height / 2;
      const activeIndex = activeRef.current;

      if (!handedOver) {
        handedOver = true;
        for (const el of nodeRefs.current) {
          if (!el) continue;
          el.style.left = "0px";
          el.style.top = "0px";
        }
        for (const spoke of spokeRefs.current) {
          if (!spoke) continue;
          spoke.setAttribute("x1", String(cx));
          spoke.setAttribute("y1", String(cy));
        }
      }

      const points: Projected[] = [];

      for (let i = 0; i < NODES.length; i++) {
        const point = project(NODES[i], rotation);
        points[i] = point;

        const el = nodeRefs.current[i];
        if (el) {
          const depthScale = 0.82 + point.scale * 0.16;
          const scale = activeIndex === i ? depthScale * 1.06 : depthScale;
          /* One compositor-only write per node per frame. Writing left/top
             instead would put a layout pass in the middle of every frame. */
          el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${scale})`;

          const opacity = Math.max(0.42, Math.min(1, 0.5 + point.scale * 0.55));
          if (Math.abs(opacity - lastOpacity[i]) > 0.004) {
            el.style.opacity = opacity.toFixed(3);
            lastOpacity[i] = opacity;
          }
          const layer = Math.round(point.scale * 100);
          if (layer !== lastLayer[i]) {
            el.style.zIndex = String(layer);
            lastLayer[i] = layer;
          }
        }

        const spoke = spokeRefs.current[i];
        if (spoke) {
          spoke.setAttribute("x2", point.x.toFixed(1));
          spoke.setAttribute("y2", point.y.toFixed(1));
          const base = 0.1 + Math.max(0, point.depth) * 0.16;
          const alpha = activeIndex === i ? 0.85 : activeIndex === null ? base : base * 0.4;
          if (Math.abs(alpha - lastSpokeAlpha[i]) > 0.004) {
            spoke.setAttribute("opacity", alpha.toFixed(3));
            lastSpokeAlpha[i] = alpha;
          }
        }
      }

      for (let i = 0; i < CHORDS.length; i++) {
        const line = chordRefs.current[i];
        if (!line) continue;
        const [a, b] = CHORDS[i];
        line.setAttribute("x1", points[a].x.toFixed(1));
        line.setAttribute("y1", points[a].y.toFixed(1));
        line.setAttribute("x2", points[b].x.toFixed(1));
        line.setAttribute("y2", points[b].y.toFixed(1));
        const touching = activeIndex === a || activeIndex === b;
        const alpha = touching ? 0.5 : activeIndex === null ? 0.09 : 0.04;
        if (alpha !== lastChordAlpha[i]) {
          line.setAttribute("opacity", String(alpha));
          lastChordAlpha[i] = alpha;
        }
      }
    }

    /* Observed only now that `draw` and everything it closes over exist. */
    observer.observe(wrap);

    if (reduced) return () => observer.disconnect();

    /*
     * Capped at ~30fps. A full revolution takes about ninety seconds, so the
     * frames in between are indistinguishable — but on a mid-range phone the
     * uncapped loop was spending every frame it had on a rotation nobody could
     * see move, and stealing them from scrolling.
     */
    const FRAME_MS = 32;
    let drawnAt = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const delta = Math.min(64, now - last);
      last = now;
      if (!paused) spin += delta * 0.00007;
      else spin += delta * 0.00002; // slow, don't freeze — a dead visual reads as broken
      if (now - drawnAt < FRAME_MS) return;
      drawnAt = now;
      draw(spin);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("focusin", onEnter);
    wrap.addEventListener("focusout", onLeave);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("focusin", onEnter);
      wrap.removeEventListener("focusout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, NODES]);

  const activeNode = active === null ? null : NODES[active];

  /*
   * Rest-position geometry for the server render. The effect above overwrites
   * all of it on mount — in the same units, so there is no jump — but until
   * then this is what a visitor sees instead of an empty square.
   */
  const rest = NODES.map((node) => projectFraction(node));

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        ref={wrapRef}
        role="group"
        aria-label={groupLabel}
        className="relative aspect-square w-full select-none"
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {CHORDS.map(([a, b], i) => (
            <line
              key={`chord-${a}-${b}`}
              ref={(el) => {
                chordRefs.current[i] = el;
              }}
              x1={rest[a].left}
              y1={rest[a].top}
              x2={rest[b].left}
              y2={rest[b].top}
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="text-fg"
              opacity="0.09"
            />
          ))}
          {NODES.map((node, i) => (
            <line
              key={`spoke-${node.id}`}
              ref={(el) => {
                spokeRefs.current[i] = el;
              }}
              x1={50}
              y1={50}
              x2={rest[i].left}
              y2={rest[i].top}
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className={active === i ? "text-accent" : "text-fg"}
              opacity="0.14"
            />
          ))}
        </svg>

        {/* Core */}
        <div
          ref={coreRef}
          aria-hidden
          className="absolute flex size-24 items-center justify-center sm:size-28"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span className="absolute inset-0 rounded-full border border-line" />
          <span className="absolute inset-[18%] rounded-full border border-line-strong" />
          <span
            className={cn(
              "absolute inset-[38%] rounded-full bg-accent transition-[transform,opacity] duration-500",
              active === null ? "opacity-70" : "opacity-100",
            )}
          />
          <span className="reduced-motion-hide absolute inset-0 animate-[ping_3.6s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border border-accent/25" />
        </div>

        {NODES.map((node, i) => (
          <button
            key={node.id}
            type="button"
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            onPointerEnter={() => setActiveNode(i)}
            onFocus={() => setActiveNode(i)}
            onPointerLeave={() => setActiveNode(null)}
            onBlur={() => setActiveNode(null)}
            onClick={() => setActiveNode(i)}
            aria-pressed={active === i}
            aria-describedby="ecosystem-detail"
            data-cursor="explore"
            style={{
              left: `${rest[i].left}%`,
              top: `${rest[i].top}%`,
              transform: `translate(-50%, -50%) scale(${0.82 + rest[i].scale * 0.16})`,
              opacity: rest[i].opacity,
            }}
            /*
              No backdrop blur here. These eight boxes move every frame, and a
              backdrop filter makes each one re-sample the layers beneath it on
              every one of those frames — together with the blurred bloom it
              replaced, that held the hero at 22fps on a throttled phone where
              it now runs at 50+. What sits behind them is a near-black panel
              and some hairlines, so an opaque-enough background is visually
              indistinguishable and free.
            */
            className={cn(
              "absolute whitespace-nowrap border px-3 py-1.5 text-xs tracking-[-0.01em] transition-colors duration-200 will-change-transform",
              active === i
                ? "border-accent bg-accent text-accent-fg"
                : "border-line-strong bg-surface/90 text-fg hover:border-fg",
            )}
          >
            {node.label}
          </button>
        ))}
      </div>

      {/*
        Detail panel. Every state is stacked in the same grid cell and
        cross-faded, so the panel's height is the tallest copy at all times and
        the layout below never moves as you sweep across the nodes.
      */}
      <div
        id="ecosystem-detail"
        aria-live="polite"
        className="grid border-t border-line pt-5 *:col-start-1 *:row-start-1"
      >
        <div
          className={cn(
            "transition-opacity duration-200",
            activeNode ? "pointer-events-none opacity-0" : "opacity-100",
          )}
          aria-hidden={activeNode ? true : undefined}
        >
          <p className="mono-sm mb-2 text-faint">{idleTitle}</p>
          <p className="max-w-md text-base text-muted">{idleBody}</p>
        </div>

        {NODES.map((node, i) => (
          <div
            key={node.id}
            className={cn(
              "transition-opacity duration-200",
              active === i ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={active === i ? undefined : true}
          >
            <p className="mono-sm mb-2 text-accent">{node.label}</p>
            <p className="max-w-md text-base text-muted">{node.detail}</p>
            <Link
              href={node.href}
              tabIndex={active === i ? undefined : -1}
              className="mono-sm group mt-3 inline-flex items-center gap-2 text-fg"
            >
              {detailLabel}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
