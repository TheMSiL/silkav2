import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * §05 — the commercial argument, drawn rather than asserted.
 *
 * Two horizontal paths, stacked so they can be compared by shape alone: the
 * top one is six boxes with a break between every pair, the bottom one is a
 * box and then a single container. The reader does not have to read either to
 * get the point, which is the test a diagram has to pass.
 *
 * It used to be two panels side by side. That framing made them look like two
 * offers rather than one route and its alternative, and it forced the roles
 * into a tall column of empty surface to match the height of the chain
 * opposite. Running left to right instead means each path is as long as it
 * actually is, and the difference between them is the length.
 */
export function OneTeam({ dict }: { dict: Dictionary }) {
  const home = dict.home;

  return (
    <Section theme="light" label={home.oneTeamEyebrow}>
      <SectionHeading
        eyebrow={home.oneTeamEyebrow}
        title={home.oneTeamTitle}
        accent={home.oneTeamAccent}
        intro={home.oneTeamIntro}
      />

      <div className="mt-16 flex flex-col gap-12">
        {/* The usual way — a chain, with a seam at every joint. */}
        <Reveal>
          <div className="border-t border-line pt-8">
            <p className="mono-sm text-faint">{home.oneTeamSplitLabel}</p>

            <div className="mt-7 flex flex-wrap items-center gap-y-3">
              <Party label={home.oneTeamClient} />
              {home.oneTeamVendors.map((vendor) => (
                <div key={vendor} className="flex items-center">
                  <Seam label={home.oneTeamHandoff} />
                  <Party label={vendor} muted />
                </div>
              ))}
            </div>

            <p className="mt-7 max-w-2xl text-base text-muted">{home.oneTeamSplitNote}</p>
          </div>
        </Reveal>

        {/* Ours — one joint, then one container. */}
        <Reveal delay={0.1}>
          <div className="border-t border-line pt-8">
            <p className="mono-sm text-accent">{home.oneTeamUnifiedLabel}</p>

            <div className="mt-7 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0">
              <div className="flex items-center md:shrink-0">
                <Party label={home.oneTeamClient} />
                <span aria-hidden className="hidden h-px w-8 bg-accent md:block" />
              </div>
              {/* The vertical joint only exists once the row has stacked. */}
              <span aria-hidden className="ml-6 block h-6 w-px bg-accent md:hidden" />

              <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3 border border-accent px-6 py-5">
                {home.oneTeamRoles.map((role) => (
                  <li key={role} className="flex items-center gap-2.5 text-base text-fg">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-7 max-w-2xl text-base text-muted">{home.oneTeamUnifiedNote}</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <p className="font-display mt-16 max-w-3xl text-balance text-2xl md:text-3xl">
          {home.oneTeamOutro}
        </p>
      </Reveal>
    </Section>
  );
}

function Party({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className={
        muted
          ? "whitespace-nowrap border border-dashed border-line-strong px-4 py-2.5 text-base text-muted"
          : "whitespace-nowrap border border-line-strong bg-surface-2 px-4 py-2.5 text-base text-fg"
      }
    >
      {label}
    </span>
  );
}

/** The joint between two suppliers. Every one is a place work is dropped. */
function Seam({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 px-2 text-faint">
      <span aria-hidden className="block h-px w-3 border-t border-dashed border-line-strong" />
      <span aria-hidden className="text-xs leading-none">✕</span>
      <span aria-hidden className="block h-px w-3 border-t border-dashed border-line-strong" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
