"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { EstimatorStep } from "@/types";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { EVENTS, track } from "@/lib/analytics";

type Answers = Record<string, string>;

/**
 * §Project estimator.
 *
 * Deliberately produces a scope summary and a next step — not a price. We do
 * not have enough information at four questions to quote honestly, and a made-up
 * figure is worse than none.
 */

/** Pure: builds the brief that gets handed to the contact form. */
export function buildBrief(
  answers: Answers,
  estimatorSteps: EstimatorStep[],
  labels: Dictionary["brief"],
): string {
  const lookup = (stepId: string) => {
    const step = estimatorSteps.find((s) => s.id === stepId);
    const option = step?.options.find((o) => o.value === answers[stepId]);
    return option?.label;
  };

  const product = lookup("product");
  const stage = lookup("stage");
  const scope = lookup("scope");
  const timing = lookup("timing");

  const parts = [
    product ? `${labels.product}: ${product}.` : null,
    stage ? `${labels.stage}: ${stage}.` : null,
    scope ? `${labels.scope}: ${scope}.` : null,
    timing ? `${labels.timing}: ${timing}.` : null,
    "",
    `${labels.context}: `,
  ];

  return parts.filter((part) => part !== null).join("\n");
}

export function Estimator({
  steps: estimatorSteps,
  locale,
  dict,
}: {
  steps: EstimatorStep[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const reduced = useReducedMotion();

  const total = estimatorSteps.length;
  const isComplete = step >= total;
  const current = estimatorSteps[Math.min(step, total - 1)];

  const choose = (value: string) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step === 0) track(EVENTS.estimatorStart, { product: value });
    if (step === total - 1) {
      track(EVENTS.estimatorComplete, next);
    }
    setStep(step + 1);
  };

  const brief = useMemo(() => buildBrief(answers, estimatorSteps, dict.brief), [answers, estimatorSteps, dict.brief]);
  const contactHref = localizeHref(
    `/contact?source=estimator&type=${encodeURIComponent(answers.product ?? "other")}&brief=${encodeURIComponent(brief)}`,
    locale,
  );

  return (
    <div className="mt-14 border border-line bg-surface-2">
      {/* Progress */}
      <div className="flex items-center gap-4 border-b border-line px-6 py-4 md:px-8">
        <span className="mono-sm text-faint">
          {Math.min(step + 1, total)} / {total}
        </span>
        <div className="h-px flex-1 bg-line">
          <motion.div
            className="h-px bg-accent"
            initial={false}
            animate={{ width: `${(Math.min(step, total) / total) * 100}%` }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            className="mono-sm text-faint transition-colors hover:text-fg"
          >
            {dict.cta.back}
          </button>
        ) : null}
      </div>

      <div className="p-6 md:p-10">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="result"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mono-sm text-accent">{dict.estimator.yourBrief}</p>
              <h3 className="font-display mt-4 text-2xl md:text-3xl">
                {dict.estimator.heard}
              </h3>

              <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                {estimatorSteps.map((s) => {
                  const option = s.options.find((o) => o.value === answers[s.id]);
                  return (
                    <div key={s.id} className="bg-surface p-5">
                      <dt className="mono-sm text-faint">{s.question}</dt>
                      <dd className="mt-2 text-lg text-fg">{option?.label ?? "—"}</dd>
                    </div>
                  );
                })}
              </dl>

              <p className="mt-8 max-w-xl text-base text-muted">{dict.estimator.note}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={contactHref} variant="accent" size="lg" arrow="up-right">
                  {dict.cta.discussIt}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setStep(0);
                  }}
                  className="mono-sm text-faint transition-colors hover:text-fg"
                >
                  {dict.cta.startOver}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={current.id}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-2xl md:text-3xl">{current.question}</h3>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {current.options.map((option) => {
                  const selected = answers[current.id] === option.value;
                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => choose(option.value)}
                        data-cursor="explore"
                        className={cn(
                          "group flex h-full w-full flex-col items-start gap-1 border p-4 text-left transition-colors duration-300",
                          selected
                            ? "border-accent bg-accent/10"
                            : "border-line hover:border-fg hover:bg-surface",
                        )}
                      >
                        <span className="flex w-full items-center justify-between gap-3 text-base font-medium text-fg">
                          {option.label}
                          <ArrowRight className="text-faint transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="mono-sm text-faint">{option.note}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
