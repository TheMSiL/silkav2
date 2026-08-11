"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProcessStep } from "@/types";

/**
 * §Process — a horizontal timeline driven by vertical scroll.
 *
 * Under reduced motion (or on narrow screens) it degrades to an ordinary
 * vertical list, because a scroll-hijacked rail is hostile on a phone.
 */
export function ProcessTimeline({
  steps: processSteps,
  dict,
}: {
  steps: ProcessStep[];
  dict: Dictionary;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  /*
   * Measured, not guessed. A hardcoded percentage stops short of the last card
   * as soon as a card's height, the gap or the viewport width changes.
   */
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -travel]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      // Distance from the rail's right edge to the container's right edge,
      // so the final card lands flush inside the viewport padding.
      const overflow = rail.scrollWidth - rail.clientWidth;
      setTravel(Math.max(0, overflow));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  if (reduced) {
    return (
      <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {processSteps.map((step) => (
          <li key={step.index}>
            <StepCard step={step} />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <>
      {/* Mobile / tablet: a swipeable rail, no scroll hijacking. */}
      <ol className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:hidden">
        {processSteps.map((step) => (
          <li key={step.index} className="w-[80vw] shrink-0 snap-start sm:w-[22rem]">
            <StepCard step={step} />
          </li>
        ))}
      </ol>

      {/* Desktop: pinned rail advanced by page scroll. */}
      <div ref={sectionRef} className="relative mt-12 hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mb-8 h-px w-full bg-line">
            <motion.div style={{ width: progress }} className="h-px bg-accent" />
          </div>
          <motion.ol
            ref={railRef}
            style={{ x }}
            className="flex gap-6 will-change-transform"
          >
            {processSteps.map((step) => (
              <li key={step.index} className="w-[26rem] shrink-0">
                <StepCard step={step} />
              </li>
            ))}
          </motion.ol>
          <p className="mono-sm mt-8 text-faint">{dict.process.scrollHint}</p>
        </div>
      </div>
    </>
  );
}

function StepCard({ step }: { step: ProcessStep }) {
  return (
    <article className="flex h-full min-h-[22rem] flex-col border border-line bg-surface-2 p-6">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-4xl text-accent">{step.index}</span>
        <span className="mono-sm text-faint">{step.duration}</span>
      </div>
      <h3 className="font-display mt-6 text-2xl">{step.title}</h3>
      <p className="mt-3 text-lg text-fg">{step.summary}</p>
      <p className="mt-3 text-base text-muted">{step.detail}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-6">
        {step.outputs.map((output) => (
          <li key={output} className="mono-sm rounded-full border border-line px-2.5 py-1 text-faint">
            {output}
          </li>
        ))}
      </ul>
    </article>
  );
}
