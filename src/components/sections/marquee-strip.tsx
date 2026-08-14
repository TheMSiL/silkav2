import type { Service } from "@/types";

/**
 * How many times the list is repeated inside a single track.
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

/**
 * The hairline band directly under the hero.
 *
 * It is texture, not an argument — which is why it is `aria-hidden` and why it
 * sits between the claim and the first case study rather than anywhere a
 * visitor is being asked to read. The labels come from the translated services
 * content, so the strip can never name something the services page does not.
 */
export function MarqueeStrip({ services }: { services: Service[] }) {
  return (
    <div data-surface="base" className="bg-surface">
      <div className="overflow-hidden border-y border-line py-5">
        <div className="edge-fade-x flex">
          <Track services={services} />
          <Track services={services} />
        </div>
      </div>
    </div>
  );
}

function Track({ services }: { services: Service[] }) {
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
