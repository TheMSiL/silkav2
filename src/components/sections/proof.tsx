import { Container } from "@/components/ui/container";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import type { Service, Stat } from "@/types";

/**
 * The band immediately under the hero: what we build, then the figures behind
 * it. Deliberately the first thing after the headline claim.
 */
export function Proof({ stats, services }: { stats: Stat[]; services: Service[] }) {
  return (
    <section data-theme="dark" className="relative bg-surface">
      <div className="overflow-hidden border-y border-line py-5">
        <div className="edge-fade-x flex">
          <Marquee services={services} />
          <Marquee services={services} />
        </div>
      </div>

      <Container className="py-[var(--space-3xl)]">
        <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07}>
              <div className="border-t border-line pt-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <Counter
                    value={stat.value}
                    className="font-display block text-3xl leading-none md:text-4xl"
                  />
                  <p className="mt-4 text-base text-fg">{stat.label}</p>
                  <p className="mono-sm mt-1.5 text-faint">{stat.note}</p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/**
 * How many times the service list is repeated inside a single track.
 *
 * The strip is two identical tracks side by side, each animating left by
 * exactly its own width. At the end of a cycle the first track has left the
 * viewport entirely, so the second one has to cover the screen alone — and if a
 * track is narrower than the viewport, the remainder is empty. That was the
 * intermittent gap: one pass of the list measures ~1365px, so every display
 * wider than that showed a hole once per loop, from 31px on a 1440 laptop to
 * over 1100px at 2560.
 *
 * Three passes put a track at roughly 4090px, which covers any viewport this
 * will realistically meet. Repeating inside the track rather than adding more
 * tracks keeps this to two composited layers.
 *
 * The invariant, if the list or the type ever changes: one track must be at
 * least as wide as the widest viewport you intend to support.
 */
const PASSES_PER_TRACK = 3;

function Marquee({ services }: { services: Service[] }) {
  return (
    // `marquee-track` only animates when motion is allowed; under reduced
    // motion it stays put rather than ending translated off-screen.
    <ul aria-hidden className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {Array.from({ length: PASSES_PER_TRACK }).flatMap((_, pass) =>
        services.map((service) => (
          <li key={`${pass}-${service.key}`} className="flex items-center gap-10">
            <span className="mono whitespace-nowrap text-muted">{service.label}</span>
            <span aria-hidden className="size-1 rounded-full bg-accent/60" />
          </li>
        )),
      )}
    </ul>
  );
}
