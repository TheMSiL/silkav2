"use client";

import { motion } from "motion/react";
import type { Service } from "@/types";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * Abstract line diagrams, one per service family. They are schematic on
 * purpose — a diagram of the shape of the work, not an illustration of it.
 */
export function ServiceVisual({ variant }: { variant: Service["visual"] }) {
  const reduced = useReducedMotionSafe();

  const draw = reduced
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
      };

  const common = {
    stroke: "currentColor",
    strokeWidth: 1,
    fill: "none",
    vectorEffect: "non-scaling-stroke" as const,
  };

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
              <motion.rect
                key={`${row}-${col}`}
                x={20 + col * 52}
                y={24 + row * 46}
                width={44}
                height={36}
                {...common}
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 6 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.4, delay: (row * 4 + col) * 0.03 },
                    })}
              />
            )),
          )}
          <rect x={20} y={24} width={44} height={36} fill="currentColor" opacity={0.25} />
        </g>
      ) : null}

      {variant === "device" ? (
        <g>
          <motion.rect x={86} y={16} width={68} height={148} rx={8} {...common} {...draw} />
          <motion.line x1={106} y1={30} x2={134} y2={30} {...common} {...draw} />
          <motion.rect x={96} y={44} width={48} height={30} {...common} {...draw} />
          <motion.rect x={96} y={82} width={48} height={12} {...common} {...draw} />
          <motion.rect x={96} y={100} width={30} height={12} {...common} {...draw} />
          <motion.rect x={96} y={126} width={48} height={22} fill="currentColor" opacity={0.25} stroke="none" />
        </g>
      ) : null}

      {variant === "flow" ? (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={22 + i * 52}
              y={74}
              width={38}
              height={32}
              {...common}
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, x: -6 },
                    animate: { opacity: 1, x: 0 },
                    transition: { duration: 0.35, delay: i * 0.07 },
                  })}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <motion.line
              key={`c${i}`}
              x1={60 + i * 52}
              y1={90}
              x2={74 + i * 52}
              y2={90}
              {...common}
              strokeDasharray="4 4"
              className="reduced-motion-hide"
              style={reduced ? undefined : { animation: "flow-dash 1.4s linear infinite" }}
            />
          ))}
          <motion.path d="M41 74V44h130v30" {...common} strokeDasharray="3 5" {...draw} />
        </g>
      ) : null}

      {variant === "layers" ? (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={44 + i * 6}
              y={30 + i * 30}
              width={152 - i * 12}
              height={22}
              {...common}
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, delay: i * 0.08 },
                  })}
            />
          ))}
          <rect x={44} y={30} width={152} height={22} fill="currentColor" opacity={0.2} />
        </g>
      ) : null}

      {variant === "graph" ? (
        <g>
          <motion.line x1={40} y1={40} x2={200} y2={40} {...common} {...draw} />
          {[0, 1, 2, 3].map((i) => (
            <motion.g
              key={i}
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.35, delay: i * 0.08 },
                  })}
            >
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
            </motion.g>
          ))}
        </g>
      ) : null}

      {variant === "nodes" ? (
        <g>
          <motion.circle cx={120} cy={90} r={16} {...common} {...draw} />
          <circle cx={120} cy={90} r={5} fill="currentColor" opacity={0.5} />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = 120 + Math.cos(angle) * 64;
            const y = 90 + Math.sin(angle) * 56;
            return (
              <motion.g
                key={i}
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { duration: 0.4, delay: i * 0.06 },
                    })}
              >
                <line x1={120} y1={90} x2={x} y2={y} {...common} opacity={0.5} />
                <circle cx={x} cy={y} r={9} {...common} />
              </motion.g>
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}
