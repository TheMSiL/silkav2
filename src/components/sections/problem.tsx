import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * §03 — the character section.
 *
 * Four possible answers to "what do you actually need", set side by side as a
 * plaque rather than stacked as a list. Reading across instead of down is the
 * point: these are alternatives, not steps, and a vertical list kept implying
 * an order that does not exist. Only the last one is filled — the answer no
 * supplier volunteers, and the reason this section exists at all.
 *
 * It sits on the middle surface, so it reads as a separate material rather
 * than as a light switched on halfway down a dark page.
 */
export function Problem({ dict }: { dict: Dictionary }) {
  const lines = dict.home.problemLines;
  const last = lines.length - 1;

  return (
    <Section surface="muted" label={dict.home.problemEyebrow}>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mono-sm mb-6 flex items-center gap-3 text-muted">
              <span aria-hidden className="inline-block h-px w-8 bg-line-strong" />
              {dict.home.problemEyebrow}
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            text={dict.home.problemTitle}
            accent={dict.home.problemAccent}
            className="font-display text-balance text-3xl md:text-4xl"
          />
        </div>

        <Reveal delay={0.15} className="lg:max-w-sm lg:shrink-0">
          <p className="text-lg text-muted">{dict.home.problemOutro}</p>
        </Reveal>
      </div>

      {/*
        `grid-hairlines` draws the dividers from the cells themselves, so the
        four butt against each other as one object rather than floating as
        separate cards — and a row that stops early leaves no grey hole.
      */}
      <ol className="mt-16 grid grid-hairlines gap-px sm:grid-cols-2 lg:grid-cols-4">
        {lines.map((line, i) => (
          <Reveal
            as="li"
            key={line}
            delay={(i % 4) * 0.07}
            className={i === last ? "bg-accent" : "bg-surface"}
          >
            <div className="flex h-full flex-col gap-6 p-7 lg:min-h-56">
              <span className={cn("mono-sm", i === last ? "text-accent-fg/70" : "text-faint")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "font-display mt-auto text-xl md:text-2xl",
                  i === last ? "text-accent-fg" : "text-fg",
                )}
              >
                {line}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
