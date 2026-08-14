"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { BUDGET_LABELS, BUDGET_RANGES, BUDGET_SCALE_LENGTH } from "@/server/validators/lead";
import type { BudgetRange } from "@/types";

/** The ordered part of the scale — everything except "not-sure". */
const SCALE = BUDGET_RANGES.slice(0, BUDGET_SCALE_LENGTH) as readonly BudgetRange[];

/** Where the handle rests before anyone touches it. Middle of the scale. */
const REST_INDEX = Math.floor(SCALE.length / 2);

/**
 * The budget control.
 *
 * A native `<select>` asked a visitor to open a menu, read six currency
 * ranges and pick one — a lot of ceremony for the softest question on the
 * form, and the only place on the site where the browser drew the widget
 * instead of us.
 *
 * A slider suits the answer better: budget is a magnitude, not a category, and
 * dragging along a scale says "roughly, and you can move it" in a way a
 * dropdown never does. The range input underneath is real, so keyboard,
 * screen readers and form semantics are the browser's, not ours — only the
 * paint is ours.
 *
 * Two states this has to get right:
 *   - Untouched submits nothing. The field is optional and a slider that
 *     arrives already pointing at a number would put words in the visitor's
 *     mouth, so the handle rests mid-scale in a neutral colour and the value
 *     is only committed on the first interaction.
 *   - "Not sure" is not a point on the scale. It sits beside the track as its
 *     own control, because at either end of it, it would read as a price.
 */
export function BudgetSlider({
  value,
  onChange,
  placeholder,
  unsureLabel,
  className,
}: {
  value: BudgetRange | undefined;
  onChange: (value: BudgetRange | undefined) => void;
  placeholder: string;
  unsureLabel: string;
  className?: string;
}) {
  const uid = useId();
  const unsure = value === "not-sure";
  const scaleIndex = value && !unsure ? SCALE.indexOf(value) : -1;
  /* Kept so the handle stays where it was left when "not sure" is toggled. */
  const [lastIndex, setLastIndex] = useState(REST_INDEX);
  const index = scaleIndex >= 0 ? scaleIndex : lastIndex;
  const chosen = scaleIndex >= 0;

  const progress = (index / (SCALE.length - 1)) * 100;

  const pick = (next: number) => {
    setLastIndex(next);
    onChange(SCALE[next]);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <output
          htmlFor={uid}
          className={cn(
            "font-display text-2xl transition-colors md:text-3xl",
            chosen ? "text-fg" : unsure ? "text-muted" : "text-faint",
          )}
        >
          {unsure ? unsureLabel : chosen ? BUDGET_LABELS[SCALE[index]] : placeholder}
        </output>

        <button
          type="button"
          onClick={() => (unsure ? onChange(undefined) : onChange("not-sure"))}
          aria-pressed={unsure}
          data-cursor="explore"
          className={cn(
            "mono-sm border px-3 py-1.5 transition-colors",
            unsure
              ? "border-accent bg-accent text-accent-fg"
              : "border-line text-muted hover:border-fg hover:text-fg",
          )}
        >
          {unsureLabel}
        </button>
      </div>

      <div className={cn("transition-opacity", unsure && "pointer-events-none opacity-40")}>
        <input
          id={uid}
          type="range"
          min={0}
          max={SCALE.length - 1}
          step={1}
          value={index}
          disabled={unsure}
          onChange={(event) => pick(Number(event.target.value))}
          /* A keyboard arrow is an interaction too — it commits, like a drag. */
          aria-label={placeholder}
          aria-valuetext={chosen ? BUDGET_LABELS[SCALE[index]] : placeholder}
          data-cursor="explore"
          className="complexity-range w-full"
          style={
            {
              /* Only fill the track once a value has actually been chosen. */
              "--progress": chosen ? `${progress}%` : "0%",
            } as React.CSSProperties
          }
        />

        {/*
          Ticks under the track, first and last labelled. Labelling all seven
          turns the scale into a price list and makes the phone layout wrap.
        */}
        <div className="mt-1 flex items-center justify-between">
          {SCALE.map((step, i) => (
            <span
              key={step}
              aria-hidden
              className={cn(
                "block h-1.5 w-px transition-colors",
                chosen && i <= index ? "bg-accent" : "bg-line-strong",
              )}
            />
          ))}
        </div>
        <div className="mono-sm mt-2 flex items-center justify-between text-faint">
          <span>{BUDGET_LABELS[SCALE[0]]}</span>
          <span>{BUDGET_LABELS[SCALE[SCALE.length - 1]]}</span>
        </div>
      </div>
    </div>
  );
}
