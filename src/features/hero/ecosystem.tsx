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

const FOCAL = 900;

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
  /*
   * The nodes are laid out by the projection below, not by CSS, so before the
   * first draw they all sit stacked in the corner. Hold the diagram hidden
   * until it has been positioned once.
   */
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

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

    const observer = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      if (reduced) draw(0);
    });
    observer.observe(wrap);

    const project = (node: EcosystemNode, rotation: number, radius: number, cx: number, cy: number): Projected => {
      const theta = node.angle * Math.PI * 2 + rotation;
      const x = Math.sin(theta) * radius;
      const z = Math.cos(theta) * radius;
      // Tilt the ring so it reads as a disc seen from slightly above.
      const y = node.lift * radius * 0.35 - z * 0.6;
      const scale = FOCAL / (FOCAL - z);
      return { x: cx + x * scale, y: cy + y * scale, scale, depth: z / radius };
    };

    function draw(rotation: number) {
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;
      const points = NODES.map((node) => project(node, rotation, radius, cx, cy));
      const activeIndex = activeRef.current;

      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }

      points.forEach((point, i) => {
        const el = nodeRefs.current[i];
        if (el) {
          const isActive = activeIndex === i;
          const depthScale = 0.82 + point.scale * 0.16;
          el.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%) scale(${isActive ? depthScale * 1.06 : depthScale})`;
          el.style.opacity = String(Math.max(0.42, Math.min(1, 0.5 + point.scale * 0.55)));
          el.style.zIndex = String(Math.round(point.scale * 100));
        }

        const spoke = spokeRefs.current[i];
        if (spoke) {
          spoke.setAttribute("x1", String(cx));
          spoke.setAttribute("y1", String(cy));
          spoke.setAttribute("x2", String(point.x));
          spoke.setAttribute("y2", String(point.y));
          const base = 0.1 + Math.max(0, point.depth) * 0.16;
          spoke.setAttribute("opacity", String(activeIndex === i ? 0.85 : activeIndex === null ? base : base * 0.4));
        }
      });

      CHORDS.forEach(([a, b], i) => {
        const line = chordRefs.current[i];
        if (!line) return;
        line.setAttribute("x1", String(points[a].x));
        line.setAttribute("y1", String(points[a].y));
        line.setAttribute("x2", String(points[b].x));
        line.setAttribute("y2", String(points[b].y));
        const touching = activeIndex === a || activeIndex === b;
        line.setAttribute("opacity", String(touching ? 0.5 : activeIndex === null ? 0.09 : 0.04));
      });

      if (!readyRef.current) {
        readyRef.current = true;
        setReady(true);
      }
    }

    if (reduced) {
      draw(0);
      return () => observer.disconnect();
    }

    const tick = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;
      if (!paused) spin += delta * 0.00007;
      else spin += delta * 0.00002; // slow, don't freeze — a dead visual reads as broken
      draw(spin);
      raf = requestAnimationFrame(tick);
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

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        ref={wrapRef}
        role="group"
        aria-label={groupLabel}
        className={cn(
          "relative aspect-square w-full select-none transition-opacity duration-500",
          ready ? "opacity-100" : "opacity-0",
        )}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
          preserveAspectRatio="none"
        >
          {CHORDS.map(([a, b], i) => (
            <line
              key={`chord-${a}-${b}`}
              ref={(el) => {
                chordRefs.current[i] = el;
              }}
              stroke="currentColor"
              strokeWidth="1"
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
              stroke="currentColor"
              strokeWidth="1"
              className={active === i ? "text-accent" : "text-fg"}
              opacity="0.14"
            />
          ))}
        </svg>

        {/* Core */}
        <div
          ref={coreRef}
          aria-hidden
          className="absolute left-0 top-0 flex size-24 items-center justify-center sm:size-28"
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
            className={cn(
              "absolute left-0 top-0 whitespace-nowrap border px-3 py-1.5 text-xs tracking-[-0.01em] transition-colors duration-200 will-change-transform",
              active === i
                ? "border-accent bg-accent text-accent-fg"
                : "border-line-strong bg-surface/70 text-fg backdrop-blur-sm hover:border-fg",
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
        className="grid border-t border-line pt-5 [&>*]:col-start-1 [&>*]:row-start-1"
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
