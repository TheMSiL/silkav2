"use client";

import type { CSSProperties } from "react";
import type { Service } from "@/types";

/**
 * Abstract line diagrams, one per service family. They are schematic on
 * purpose — a diagram of the shape of the work, not an illustration of it.
 *
 * Decorative and `aria-hidden`, so the entrance is a plain staggered fade
 * through the shared reveal system rather than a JavaScript animation. That
 * keeps the whole panel out of the client bundle and, more importantly, out of
 * the set of things that ship invisible and wait for hydration.
 */
export function ServiceVisual({ variant }: { variant: Service["visual"] }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1,
    fill: "none",
    vectorEffect: "non-scaling-stroke" as const,
  };

  /** Staggered fade-in, played once on load. */
  const step = (index: number) => ({
    "data-reveal": "fade",
    "data-reveal-on": "load",
    style: { "--reveal-delay": `${index * 0.05}s` } as CSSProperties,
  });

  return (
    <svg
      viewBox="0 0 240 180"
      aria-hidden
      className="h-full w-full text-fg/45"
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === "grid" ? (
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 52}
                y={24 + row * 46}
                width={44}
                height={36}
                {...common}
                {...step(row * 4 + col)}
              />
            )),
          )}
          <rect x={20} y={24} width={44} height={36} fill="currentColor" opacity={0.25} />
        </g>
      ) : null}

      {variant === "device" ? (
        <g>
          <rect x={86} y={16} width={68} height={148} rx={8} {...common} {...step(0)} />
          <line x1={106} y1={30} x2={134} y2={30} {...common} {...step(1)} />
          <rect x={96} y={44} width={48} height={30} {...common} {...step(2)} />
          <rect x={96} y={82} width={48} height={12} {...common} {...step(3)} />
          <rect x={96} y={100} width={30} height={12} {...common} {...step(4)} />
          <rect x={96} y={126} width={48} height={22} fill="currentColor" opacity={0.25} stroke="none" />
        </g>
      ) : null}

      {variant === "flow" ? (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={22 + i * 52} y={74} width={38} height={32} {...common} {...step(i)} />
          ))}
          {[0, 1, 2].map((i) => (
            <line
              key={`c${i}`}
              x1={60 + i * 52}
              y1={90}
              x2={74 + i * 52}
              y2={90}
              {...common}
              strokeDasharray="4 4"
              className="flow-dash"
            />
          ))}
          <path d="M41 74V44h130v30" {...common} strokeDasharray="3 5" {...step(4)} />
        </g>
      ) : null}

      {variant === "layers" ? (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={44 + i * 6}
              y={30 + i * 30}
              width={152 - i * 12}
              height={22}
              {...common}
              {...step(i)}
            />
          ))}
          <rect x={44} y={30} width={152} height={22} fill="currentColor" opacity={0.2} />
        </g>
      ) : null}

      {variant === "graph" ? (
        <g>
          <line x1={40} y1={40} x2={200} y2={40} {...common} {...step(0)} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} {...step(i + 1)}>
              <line x1={40 + i * 44} y1={40} x2={40 + i * 44} y2={62} {...common} />
              <rect x={22 + i * 44} y={62} width={36} height={72} {...common} />
              <rect
                x={22 + i * 44}
                y={62 + (3 - i) * 14}
                width={36}
                height={72 - (3 - i) * 14}
                fill="currentColor"
                opacity={0.18}
              />
            </g>
          ))}
        </g>
      ) : null}

      {variant === "nodes" ? (
        <g>
          <circle cx={120} cy={90} r={16} {...common} {...step(0)} />
          <circle cx={120} cy={90} r={5} fill="currentColor" opacity={0.5} />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = 120 + Math.cos(angle) * 64;
            const y = 90 + Math.sin(angle) * 56;
            return (
              <g key={i} {...step(i + 1)}>
                <line x1={120} y1={90} x2={x} y2={y} {...common} opacity={0.5} />
                <circle cx={x} cy={y} r={9} {...common} />
              </g>
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}
