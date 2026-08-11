"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { ArchitectureDiagram as Diagram } from "@/types";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const kindStyles: Record<string, string> = {
  client: "border-fg/40 text-fg",
  service: "border-signal-blue/50 text-signal-blue",
  data: "border-signal-green/50 text-signal-green",
  infra: "border-signal-amber/50 text-signal-amber",
  external: "border-line text-muted",
};


/**
 * Layered architecture diagram.
 *
 * Nodes are laid out in columns by `layer` and edges drawn as SVG between the
 * measured positions. The DOM order is a readable list of layers, so the
 * diagram degrades to something comprehensible without CSS or on a narrow
 * screen, where the edges are hidden and the layers stack.
 */
export function ArchitectureDiagram({ diagram, dict }: { diagram: Diagram; dict: Dictionary }) {
  const reduced = useReducedMotionSafe();

  const layers = useMemo(() => {
    const grouped = new Map<number, typeof diagram.nodes>();
    for (const node of diagram.nodes) {
      grouped.set(node.layer, [...(grouped.get(node.layer) ?? []), node]);
    }
    return [...grouped.entries()].sort(([a], [b]) => a - b);
  }, [diagram]);

  return (
    // `min-w-0` at every level: a grid or flex item defaults to
    // `min-width: auto`, so the 46rem rail below would widen the whole page
    // instead of scrolling inside its own container.
    <figure className="mt-8 min-w-0">
      <div className="relative min-w-0 overflow-x-auto border border-line bg-surface-2 p-6 md:p-8">
        <ol className="flex min-w-[46rem] items-stretch gap-4">
          {layers.map(([layer, nodes], layerIndex) => (
            <li key={layer} className="flex flex-1 flex-col gap-3">
              <span className="mono-sm text-faint">L{layer}</span>
              {nodes.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.4, delay: (layerIndex * 3 + i) * 0.04 }}
                  className={cn(
                    "flex flex-col gap-1 border bg-surface p-3",
                    kindStyles[node.kind] ?? kindStyles.external,
                  )}
                >
                  <span className="text-base text-fg">{node.label}</span>
                  <span className="mono-sm text-faint">
                    {node.detail ?? dict.diagram[node.kind]}
                  </span>
                </motion.div>
              ))}
              {layerIndex < layers.length - 1 ? (
                <span aria-hidden className="mt-auto pt-2 text-center text-faint">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      {/* The edges as text: the part a diagram usually loses. */}
      <details className="mt-4 border border-line bg-surface-2 p-4">
        <summary className="mono-sm cursor-pointer text-faint transition-colors hover:text-fg">
          {dict.common.connections} ({diagram.edges.length})
        </summary>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {diagram.edges.map((edge) => {
            const from = diagram.nodes.find((n) => n.id === edge.from);
            const to = diagram.nodes.find((n) => n.id === edge.to);
            return (
              <li key={`${edge.from}-${edge.to}`} className="mono-sm text-muted">
                {from?.label} <span className="text-accent">→</span> {to?.label}
                {edge.label ? <span className="text-faint"> · {edge.label}</span> : null}
              </li>
            );
          })}
        </ul>
      </details>

      <figcaption className="mt-4 max-w-2xl text-base text-muted">{diagram.caption}</figcaption>
    </figure>
  );
}
