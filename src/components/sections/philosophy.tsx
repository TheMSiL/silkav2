import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PhilosophyLink } from "@/types";

/**
 * Where "Розробка" sits in the chain.
 *
 * The chain is structural — the same nine links in the same order in every
 * locale, with only the labels translated — so the position is a property of
 * the data rather than of the language. It is called out because it is the
 * entire argument of the section: eight decisions happen before anyone opens
 * an editor.
 */
const CODE_INDEX = 6;

/**
 * §06 — the argument, after the evidence rather than before it.
 *
 * Nine links, rendered as a chain rather than as nine cards. Cards give every
 * step the same weight, which is the opposite of the point: the order is what
 * matters, and a list you read top to bottom carries an order for free.
 */
export function Philosophy({ dict, chain }: { dict: Dictionary; chain: PhilosophyLink[] }) {
  return (
    <Section surface="base" label={dict.philosophy.eyebrow} grid>
      <SectionHeading
        eyebrow={dict.philosophy.eyebrow}
        title={dict.philosophy.title}
        accent={dict.philosophy.accent}
        intro={dict.philosophy.intro}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ol className="border-t border-line lg:col-span-7">
          {chain.map((link, i) => (
            <Reveal as="li" key={link.label} delay={Math.min(i, 5) * 0.04}>
              <div
                className={cn(
                  "grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-line py-4 md:grid-cols-[2.5rem_11rem_1fr]",
                  i === CODE_INDEX && "bg-surface-2",
                )}
              >
                <span
                  className={cn("mono-sm", i === CODE_INDEX ? "text-accent" : "text-faint")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-lg",
                    i === CODE_INDEX ? "text-accent" : "text-fg",
                  )}
                >
                  {link.label}
                </span>
                <span className="col-start-2 text-base text-muted md:col-start-3">{link.note}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Reveal delay={0.1}>
              <p className="border-l-2 border-accent pl-6 text-xl text-fg md:text-2xl">
                {dict.philosophy.codeNote}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-muted">{dict.philosophy.outro}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
