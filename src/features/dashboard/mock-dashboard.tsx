"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { DashboardTab } from "@/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * §CRM / ERP — a working miniature of the kind of console we build.
 *
 * The data is illustrative, and labelled as such. What it demonstrates is the
 * interface pattern: dense tables, tabular figures, one accent for attention.
 */
export function MockDashboard({
  tabs: dashboardTabs,
  dict,
}: {
  tabs: DashboardTab[];
  dict: Dictionary;
}) {
  const [activeKey, setActiveKey] = useState<string>(dashboardTabs[0].key);
  const reduced = useReducedMotionSafe();
  const active = dashboardTabs.find((t) => t.key === activeKey) ?? dashboardTabs[0];
  const peak = Math.max(...active.chart);

  return (
    <div className="mt-12 overflow-hidden border border-line bg-surface-2">
      {/* Chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          {["bg-fg/20", "bg-fg/20", "bg-fg/20"].map((c, i) => (
            <span key={i} className={cn("size-2.5 rounded-full", c)} />
          ))}
        </span>
        <span className="mono-sm text-faint">{dict.capabilities.dashboardChrome}</span>
      </div>

      <div className="hide-scrollbar flex gap-1 overflow-x-auto border-b border-line px-4 py-2" role="tablist" aria-label={dict.capabilities.dashboardTablistLabel}>
        {dashboardTabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`dash-panel-${tab.key}`}
              id={`dash-tab-${tab.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveKey(tab.key)}
              data-cursor="explore"
              className={cn(
                "mono-sm shrink-0 whitespace-nowrap px-3 py-1.5 transition-colors",
                isActive ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`dash-panel-${active.key}`}
        aria-labelledby={`dash-tab-${active.key}`}
        className="p-4 md:p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-display text-xl">{active.headline}</h3>

            <dl className="mt-5 grid grid-hairlines gap-px sm:grid-cols-2 lg:grid-cols-4">
              {active.metrics.map((metric) => (
                <div key={metric.label} className="bg-surface p-4">
                  <dt className="mono-sm text-faint">{metric.label}</dt>
                  <dd className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-2xl tabular-nums">{metric.value}</span>
                    <span
                      className={cn(
                        "mono-sm",
                        metric.delta.startsWith("−") || metric.delta.startsWith("-")
                          ? "text-signal-green"
                          : "text-accent",
                      )}
                    >
                      {metric.delta}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              <div className="min-w-0 overflow-x-auto border border-line bg-surface">
                <table className="w-full min-w-[26rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line">
                      {active.columns.map((column) => (
                        <th key={column} scope="col" className="mono-sm px-4 py-3 text-faint">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {active.rows.map((row) => (
                      <tr key={row.join()} className="border-b border-line last:border-0">
                        {row.map((cell, i) => (
                          <td
                            key={`${cell}-${i}`}
                            className={cn(
                              "px-4 py-3 text-base",
                              i === 0 ? "text-fg" : "text-muted tabular-nums",
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border border-line bg-surface p-4">
                <p className="mono-sm text-faint">{dict.capabilities.dashboardPeriods}</p>
                <div className="mt-4 flex h-40 items-end gap-1.5" role="img" aria-label={dict.capabilities.dashboardChartLabel}>
                  {active.chart.map((value, i) => (
                    <motion.span
                      key={i}
                      initial={reduced ? false : { height: 0 }}
                      animate={{ height: `${(value / peak) * 100}%` }}
                      transition={{ duration: 0.4, delay: reduced ? 0 : i * 0.025, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "flex-1",
                        i === active.chart.length - 1 ? "bg-accent" : "bg-fg/20",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
