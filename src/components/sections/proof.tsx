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

function Marquee({ services }: { services: Service[] }) {
  return (
    // `marquee-track` only animates when motion is allowed; under reduced
    // motion it stays put rather than ending translated off-screen.
    <ul aria-hidden className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {services.map((service) => (
        <li key={service.key} className="flex items-center gap-10">
          <span className="mono whitespace-nowrap text-muted">{service.label}</span>
          <span aria-hidden className="size-1 rounded-full bg-accent/60" />
        </li>
      ))}
    </ul>
  );
}
