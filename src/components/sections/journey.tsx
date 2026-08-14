"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StageArt } from "@/features/journey/stage-art";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * §04 — one product, five states, driven by the scroll.
 *
 * This is the section the site is trying to be an example of: rather than
 * claiming the studio takes a product from idea to production, it shows the
 * same rectangle becoming a note, a wireframe, an interface, an architecture
 * and a running system without ever moving.
 *
 * Two rendering modes, and the plain one is the default:
 *
 *   - Below `lg`, and whenever motion is unwelcome, every stage is laid out as
 *     an ordinary vertical list. That is also what the server renders and what
 *     a visitor without JavaScript gets, so the argument survives with the
 *     scripting turned off.
 *   - On a wide screen with motion allowed, the same five stages are stacked
 *     in a sticky frame and cross-faded as the page scrolls past.
 *
 * Scroll-jacking a phone is not worth the trick, which is why the tall
 * scroll-track only exists on wide screens.
 */
export function Journey({ dict }: { dict: Dictionary }) {
  const stages = dict.home.journeyStages;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const reduced = useReducedMotionSafe();
  const wide = useMediaQuery("(min-width: 64rem)");
  const cinematic = wide && !reduced;

  /*
   * `end end` puts the last stage on screen exactly as the track bottoms out,
   * so the section never holds an empty sticky frame at either end.
   */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(stages.length - 1, Math.max(0, Math.floor(progress * stages.length)));
    setStage(next);
  });

  const active = stages[stage];

  return (
    <section
      id="journey"
      data-surface="base"
      aria-label={dict.home.journeyEyebrow}
      className="relative isolate bg-surface text-fg"
    >
      <Container className="py-[var(--section-y)] pb-0">
        <SectionHeading
          eyebrow={dict.home.journeyEyebrow}
          title={dict.home.journeyTitle}
          accent={dict.home.journeyAccent}
          intro={dict.home.journeyIntro}
        />
      </Container>

      <div
        ref={wrapRef}
        /*
         * Four screens of travel for five stages — about 60% of a viewport
         * each, which is one unhurried flick. Five screens read as a tunnel in
         * a page this long; three make the stages blur into each other.
         */
        className={cn("relative", cinematic && "h-[400lvh]")}
        /* The list below is the real content; the sticky frame is a view of it. */
      >
        <div
          className={cn(
            cinematic && "sticky top-0 flex h-lvh items-center overflow-hidden",
          )}
        >
          {/*
            In the sticky mode the frame is already centred in a full-height
            box, so section padding would only push it off-centre; the list
            mode still needs its own rhythm.
          */}
          <Container className={cn("w-full", cinematic ? "pt-[var(--header-h)]" : "py-[var(--section-y)]")}>
            {cinematic ? (
              <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <ol className="border-t border-line">
                    {stages.map((item, i) => (
                      <li key={item.label}>
                        <div
                          className={cn(
                            "flex items-center gap-4 border-b border-line py-3 transition-colors duration-300",
                            i === stage ? "text-fg" : "text-faint",
                          )}
                        >
                          <span className="mono-sm w-6 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="mono-sm">{item.label}</span>
                          <span
                            aria-hidden
                            className={cn(
                              "ml-auto h-px flex-1 origin-left transition-transform duration-500 ease-[var(--ease-out-expo)]",
                              i <= stage ? "scale-x-100 bg-accent" : "scale-x-0 bg-line",
                            )}
                          />
                        </div>
                      </li>
                    ))}
                  </ol>

                  {/*
                    Fixed minimum height: the bodies differ by a line or two and
                    the frame beside them must not shuffle every time the stage
                    changes.
                  */}
                  <div className="mt-10 min-h-[11rem]" aria-live="polite">
                    <h3 className="font-display text-2xl md:text-3xl">{active.title}</h3>
                    <p className="mt-4 max-w-md text-lg text-muted">{active.body}</p>
                  </div>

                  <p
                    className={cn(
                      "mono-sm mt-2 flex items-center gap-2 text-faint transition-opacity duration-300",
                      stage === 0 ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <span aria-hidden>↓</span>
                    {dict.home.journeyHint}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <StageArt stage={stage} />
                </div>
              </div>
            ) : (
              <ol className="flex flex-col gap-16">
                {stages.map((item, i) => (
                  <Reveal as="li" key={item.label}>
                    <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
                      <div className="md:col-span-7 md:order-2">
                        <StageArt stage={i} />
                      </div>
                      <div className="md:col-span-5 md:order-1">
                        <p className="mono-sm flex items-center gap-3 text-accent">
                          <span>{String(i + 1).padStart(2, "0")}</span>
                          <span aria-hidden className="inline-block h-px w-8 bg-line-strong" />
                          <span className="text-muted">{item.label}</span>
                        </p>
                        <h3 className="font-display mt-4 text-2xl">{item.title}</h3>
                        <p className="mt-3 text-base text-muted">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            )}
          </Container>
        </div>
      </div>
    </section>
  );
}
