import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PhilosophyLink } from "@/types";

/** The chain is the argument — nine links, code eighth. */
export function Philosophy({ dict, chain }: { dict: Dictionary; chain: PhilosophyLink[] }) {
  return (
    <Section theme="light" label={dict.philosophy.eyebrow} grid>
      <SectionHeading
        eyebrow={dict.philosophy.eyebrow}
        title={dict.philosophy.title}
        accent={dict.philosophy.accent}
        intro={dict.philosophy.intro}
      />

      <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {chain.map((link, i) => (
          <Reveal as="li" key={link.label} delay={(i % 3) * 0.06} className="bg-surface">
            <div className="flex h-full flex-col gap-2 p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl">{link.label}</span>
                <span className="mono-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-base text-muted">{link.note}</p>
              {i === chain.length - 1 ? null : (
                <span aria-hidden className="mt-auto pt-4 text-accent">
                  ↓
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1}>
        <p className="mt-12 max-w-2xl text-xl text-fg">{dict.philosophy.outro}</p>
      </Reveal>
    </Section>
  );
}
