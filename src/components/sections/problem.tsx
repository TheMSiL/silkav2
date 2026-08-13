import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * §03 — the character section.
 *
 * Laid out as a verdict list rather than as a two-column editorial block. The
 * four lines are four possible answers to "what do you actually need", and the
 * argument is in their order: the reader watches the scope narrow, and the
 * last answer is the one no supplier gives. Full-width rows make that
 * sequence legible at a glance — a column of prose beside a headline made it
 * read as four equal options.
 *
 * The last row is the only one that is filled, indexed in the accent and set
 * in the foreground weight. Everything above it is deliberately quieter, so
 * the crescendo happens without a second colour competing with the heading.
 */
export function Problem({ dict }: { dict: Dictionary }) {
  const lines = dict.home.problemLines;
  const last = lines.length - 1;

  return (
    <Section theme="light" label={dict.home.problemEyebrow} grid>
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
        className="font-display max-w-5xl text-balance text-3xl md:text-4xl"
      />

      <ol className="mt-16 border-t border-line">
        {lines.map((line, i) => (
          <Reveal as="li" key={line} delay={i * 0.07}>
            <div
              className={cn(
                "grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 border-b border-line py-7 md:py-9",
                i === last && "bg-surface-2",
              )}
            >
              <span className={cn("mono-sm", i === last ? "text-accent" : "text-faint")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "font-display text-2xl md:text-3xl",
                  i === last ? "text-fg" : "text-muted",
                )}
              >
                {line}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      {/*
        Offset to the right, under the lines rather than beside them: a
        footnote to the list, which is what it is.
      */}
      <Reveal delay={0.2}>
        <p className="mt-12 max-w-xl text-lg text-muted md:ml-[2.5rem] md:pl-5">
          {dict.home.problemOutro}
        </p>
      </Reveal>
    </Section>
  );
}
