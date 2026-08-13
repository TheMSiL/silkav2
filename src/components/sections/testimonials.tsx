import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Testimonial } from "@/types";

/**
 * The proof band under the principles.
 *
 * Deliberately quiet: a hairline row rather than a wall of cards, because the
 * quotes are the weaker half of the evidence. The number and the link are the
 * stronger half — thirty-four public reviews with nothing hidden — so the
 * count is stated once, in full, and points at the source.
 *
 * Renders on both surfaces without knowing which one it is on; every colour
 * here is a semantic token.
 */
export function Testimonials({
  testimonials,
  dict,
}: {
  testimonials: Testimonial[];
  dict: Dictionary;
}) {
  return (
    <div className="mt-16 border-t border-line pt-10">
      <p className="mono-sm text-faint">{dict.testimonials.eyebrow}</p>

      <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial, i) => (
          <Reveal as="li" key={testimonial.id} delay={(i % 4) * 0.06}>
            <figure className="flex h-full flex-col">
              <blockquote className="text-base text-fg">{testimonial.quote}</blockquote>
              <figcaption className="mono-sm mt-4 text-faint">
                {testimonial.author} · {testimonial.year}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.2}>
        <a
          href={site.reviews.url}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="explore"
          className="mono-sm group mt-10 inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
        >
          {dict.testimonials.link}
          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </div>
  );
}
