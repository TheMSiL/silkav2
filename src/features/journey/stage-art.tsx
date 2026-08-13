import { cn } from "@/lib/cn";

/**
 * The five states of one product, drawn in the same box.
 *
 * All five layers are always in the DOM, stacked, and only opacity separates
 * them — so moving between stages is a cross-fade of one composited property
 * and never a reflow. The geometry is deliberately shared between the
 * wireframe, the interface and the system view: the same rectangle is a dashed
 * outline, then a filled panel, then a node in a graph. That continuity is the
 * whole argument of the section, and it only works if the boxes do not move.
 *
 * Labels are technical tokens (UI, API, DB, CDN) rather than prose, so the
 * drawing reads identically in all three locales and never needs translating.
 */
export function StageArt({ stage, className }: { stage: number; className?: string }) {
  const layer = (index: number) =>
    cn(
      "absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out-expo)]",
      index === stage ? "opacity-100" : "opacity-0",
    );

  return (
    <div
      aria-hidden
      className={cn(
        "dot-bg relative aspect-[16/11] w-full overflow-hidden border border-line bg-surface-2 sm:aspect-[16/10]",
        className,
      )}
    >
      {/* 01 — the problem, written down. */}
      <div className={layer(0)}>
        <div className="flex h-full flex-col justify-center gap-3 p-[8%]">
          <span className="mono-sm mb-2 text-faint">brief</span>
          <span className="block h-2.5 w-[86%] bg-fg/15" />
          <span className="block h-2.5 w-[64%] bg-fg/15" />
          <span className="block h-2.5 w-[74%] bg-fg/15" />
          <span className="mt-4 flex items-center gap-2">
            <span className="block h-2.5 w-[46%] bg-accent" />
            <span className="reduced-motion-hide block h-4 w-0.5 animate-pulse bg-accent" />
          </span>
          <span className="block h-2.5 w-[30%] bg-fg/10" />
        </div>
      </div>

      {/* 02 — the same product as an outline. */}
      <div className={layer(1)}>
        <Skeleton mode="wire" />
      </div>

      {/* 03 — the outline, filled in. */}
      <div className={layer(2)}>
        <Skeleton mode="ui" />
      </div>

      {/* 04 — what is underneath it. */}
      <div className={layer(3)}>
        <div className="absolute inset-0 opacity-20">
          <Skeleton mode="ui" />
        </div>
        <SystemGraph />
      </div>

      {/* 05 — running. */}
      <div className={layer(4)}>
        <Skeleton mode="ui" />
        <div className="absolute inset-x-0 bottom-0 border-t border-line bg-surface/90 p-3 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="mono-sm flex items-center gap-1.5 text-signal-green">
              <span className="size-1.5 rounded-full bg-signal-green" />
              live
            </span>
            {["CI", "DB", "CDN", "SSL", "LOGS"].map((token) => (
              <span
                key={token}
                className="mono-sm border border-line px-2 py-0.5 text-faint"
              >
                {token}
              </span>
            ))}
            <span className="ml-auto hidden items-center gap-0.5 sm:flex">
              {[6, 9, 7, 11, 8, 12, 10, 13, 9, 14].map((height, i) => (
                <span
                  key={i}
                  className="block w-1 bg-signal-green/60"
                  style={{ height: `${height}px` }}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The shared layout. `wire` draws it as dashed outlines, `ui` as a working
 * interface — same boxes, same positions, so stage 02 becomes stage 03 without
 * anything moving.
 */
function Skeleton({ mode }: { mode: "wire" | "ui" }) {
  const wire = mode === "wire";
  const box = wire ? "border border-dashed border-line-strong" : "border border-line bg-surface-3";
  const fill = wire ? "border border-dashed border-line" : "bg-fg/10";

  return (
    <div className="flex h-full flex-col p-[5%]">
      {/* Top bar */}
      <div className={cn("flex items-center gap-2 px-3 py-2.5", box)}>
        <span className={cn("size-2 rounded-full", wire ? "border border-line-strong" : "bg-accent")} />
        <span className={cn("h-1.5 w-16", fill)} />
        <span className={cn("ml-auto h-4 w-12", wire ? "border border-dashed border-line-strong" : "bg-accent")} />
      </div>

      <div className="mt-[3%] flex min-h-0 flex-1 gap-[3%]">
        {/* Sidebar */}
        <div className={cn("flex w-[24%] flex-col gap-2 p-3", box)}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn("h-1.5", i === 1 && !wire ? "bg-accent" : fill)}
              style={{ width: `${[88, 70, 80, 58][i]}%` }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-[4%]">
          <div className={cn("relative min-h-0 flex-1 overflow-hidden p-3", box)}>
            {wire ? (
              <span className="mono-sm text-faint">chart</span>
            ) : (
              <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]">
                <path
                  d="M0 46 L25 38 L50 42 L75 26 L100 30 L125 16 L150 22 L175 8 L200 12"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0 46 L25 38 L50 42 L75 26 L100 30 L125 16 L150 22 L175 8 L200 12 L200 60 L0 60 Z"
                  fill="var(--accent)"
                  opacity="0.12"
                />
              </svg>
            )}
          </div>
          <div className="grid grid-cols-3 gap-[4%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("flex flex-col gap-1.5 p-2.5", box)}>
                <span className={cn("h-1 w-8", fill)} />
                <span className={cn("h-2.5 w-12", wire ? "border border-dashed border-line" : "bg-fg/25")} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Stage 04 — the architecture behind the screen the client was looking at. */
function SystemGraph() {
  const nodes = [
    { id: "UI", x: 12, y: 50 },
    { id: "CDN", x: 32, y: 22 },
    { id: "API", x: 50, y: 50 },
    { id: "AUTH", x: 70, y: 22 },
    { id: "JOBS", x: 70, y: 78 },
    { id: "DB", x: 88, y: 50 },
  ];
  const edges: [string, string][] = [
    ["UI", "CDN"],
    ["UI", "API"],
    ["API", "AUTH"],
    ["API", "JOBS"],
    ["API", "DB"],
    ["JOBS", "DB"],
  ];
  const at = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {edges.map(([from, to]) => {
          const a = at(from);
          const b = at(to);
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              opacity="0.55"
              className="flow-dash"
            />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <span
          key={node.id}
          className="mono-sm absolute -translate-x-1/2 -translate-y-1/2 border border-accent bg-surface px-2 py-1 text-fg"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.id}
        </span>
      ))}
    </div>
  );
}
