import { TECHNOLOGIES } from "@/components/ui/tech-icons";
import type { Surface } from "@/components/ui/section";

/**
 * Two passes per track. Same invariant as the services strip on the home page:
 * the band is two identical tracks side by side, each translating left by its
 * own width, so at the end of a cycle one track has to cover the viewport
 * alone. One pass of twenty marks measures ~3200px, which puts a track at
 * ~6400px — wide enough that no display this will meet can open a gap.
 */
const PASSES_PER_TRACK = 2;

/**
 * The technology band on /capabilities.
 *
 * It is texture and recognition, not an argument — a visitor scanning the page
 * should be able to see, without reading a word, that the stack is the ordinary
 * professional one. The reasoning lives directly underneath it in the explorer,
 * where every entry carries WHY it is on the list; this strip only carries
 * that it is.
 *
 * `aria-hidden`, therefore, and no links: everything named here is named again
 * in the explorer below, in text, where a screen reader and a crawler will both
 * find it properly.
 */
export function TechMarquee({ surface = "contrast" }: { surface?: Surface }) {
  return (
    <div data-surface={surface} className="bg-surface">
      <div className="overflow-hidden border-t border-line py-6">
        <div className="edge-fade-x flex">
          <Track />
          <Track />
        </div>
      </div>
    </div>
  );
}

function Track() {
  return (
    /*
     * `marquee-track` only animates when motion is allowed; under reduced
     * motion it stays put rather than ending translated off-screen. The
     * duration is overridden because this track is half again as wide as the
     * services strip, and the shared 38s would run it noticeably faster than
     * the band on the home page — two strips on one site should drift at the
     * same speed, not at the same duration.
     */
    <ul
      aria-hidden
      className="marquee-track flex shrink-0 items-center gap-8 pr-8"
      style={{ animationDuration: "58s" }}
    >
      {Array.from({ length: PASSES_PER_TRACK }).flatMap((_, pass) =>
        TECHNOLOGIES.map(({ name, Icon }) => (
          <li key={`${pass}-${name}`} className="flex items-center gap-8">
            <span className="flex items-center gap-2.5 text-muted">
              <span className="size-5 shrink-0">
                <Icon />
              </span>
              <span className="mono whitespace-nowrap">{name}</span>
            </span>
            <span aria-hidden className="size-1 shrink-0 rounded-full bg-accent/60" />
          </li>
        )),
      )}
    </ul>
  );
}
