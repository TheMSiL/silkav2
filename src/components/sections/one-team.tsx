import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * §05 — the commercial argument as one graphic.
 *
 * Two bars, same width, same place on the page: the first cut into five
 * segments with a visible gap at every joint, the second unbroken. That is the
 * whole point, and it lands before a word is read — which is the test a
 * diagram has to pass, and the reason this is no longer a set of labelled
 * boxes with crosses between them. Boxes made the reader parse a flowchart to
 * reach a conclusion a silhouette can give them.
 *
 * The gaps are the argument, so they are real gaps in the grid rather than
 * drawn dividers.
 */
export function OneTeam({ dict }: { dict: Dictionary }) {
  const home = dict.home;

  return (
    <Section surface="muted" label={home.oneTeamEyebrow}>
      <SectionHeading
        eyebrow={home.oneTeamEyebrow}
        title={home.oneTeamTitle}
        accent={home.oneTeamAccent}
        intro={home.oneTeamIntro}
      />

      <div className="mt-16 flex flex-col gap-12 md:gap-16">
        <Reveal>
          <Path
            label={home.oneTeamSplitLabel}
            from={home.oneTeamClient}
            note={home.oneTeamSplitNote}
            steps={home.oneTeamVendors}
            broken
          />
        </Reveal>

        <Reveal delay={0.12}>
          <Path
            label={home.oneTeamUnifiedLabel}
            from={home.oneTeamClient}
            note={home.oneTeamUnifiedNote}
            steps={home.oneTeamRoles}
          />
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <p className="font-display mt-16 max-w-3xl text-balance text-2xl md:text-3xl">
          {home.oneTeamOutro}
        </p>
      </Reveal>
    </Section>
  );
}

function Path({
  label,
  from,
  note,
  steps,
  broken = false,
}: {
  label: string;
  from: string;
  note: string;
  steps: string[];
  broken?: boolean;
}) {
  return (
    <div className="border-t border-line pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        {/*
          Not the accent for the second label. At mono-sm the brand blue over
          the middle surface is barely legible, and the bar underneath already
          says which path this is.
        */}
        <p className={broken ? "mono-sm text-faint" : "mono-sm text-fg"}>{label}</p>
        <p className="mono-sm text-faint">{from}</p>
      </div>

      {/*
        One grid drives both the bar and the labels under it, so a name is
        always directly beneath its own segment at every width. The columns are
        even, which is a claim the diagram is entitled to make: the point is how
        many there are, not how long each one takes.
      */}
      <ul
        className="mt-7 grid gap-x-2"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step, i) => (
          <li key={step} className="min-w-0">
            {/*
              The unbroken path closes the column gap by bleeding half of it
              into each side, so the segments meet and read as one bar without
              the labels below losing their gutter.
            */}
            <span
              aria-hidden
              className={
                broken
                  ? "block h-2.5 border border-dashed border-line-strong"
                  : "block h-2.5 bg-accent"
              }
              style={
                broken
                  ? undefined
                  : {
                      marginLeft: i === 0 ? 0 : "-0.5rem",
                      marginRight: i === steps.length - 1 ? 0 : "-0.5rem",
                    }
              }
            />
            <span className="mono-sm mt-3 block leading-tight text-muted">{step}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl text-base text-muted">{note}</p>
    </div>
  );
}
