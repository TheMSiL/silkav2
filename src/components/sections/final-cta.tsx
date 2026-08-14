"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { EVENTS, track } from "@/lib/analytics";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * §Final CTA — the background reacts to the pointer. Subtle, and completely
 * absent under reduced motion or on touch.
 */
export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();

  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  const glow = useMotionTemplate`radial-gradient(38rem 38rem at ${springX}% ${springY}%, rgb(90 82 255 / 0.2), transparent 70%)`;

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((event.clientX - rect.left) / rect.width) * 100);
    y.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      data-surface="base"
      aria-label={dict.cta.start}
      className="noise relative isolate overflow-hidden bg-surface py-[clamp(6rem,12vw,11rem)]"
    >
      <div
        aria-hidden
        className="dot-bg edge-fade-all pointer-events-none absolute inset-0 opacity-60"
      />
      {!reduced ? (
        <motion.div
          aria-hidden
          /*
           * The glow is larger than the section, so without a mask it ends in a
           * hard rectangular edge where the section box clips it. The mask fades
           * it out before it ever reaches a boundary.
           */
          className="edge-fade-all pointer-events-none absolute inset-0"
          style={{ background: glow }}
        />
      ) : null}

      <Container className="relative">
        {/*
          Sized for a sentence, not for three words.

          This heading used to hold "Є складна ідея? Зберімо її." — 26
          characters, which is why it could afford `text-6xl` inside a 56rem
          column. The closing line is now a question and an answer, and at that
          size in that width it broke into six lines of 120px type: a column of
          two or three words per line, which reads as a poster rather than as
          something addressed to the visitor. One step down the scale and a
          wider measure puts it back at two lines a piece.
        */}
        <h2 className="font-display max-w-5xl text-4xl sm:text-5xl">
          <TextReveal as="span" text={dict.home.ctaTitleA} className="block" />
          <TextReveal as="span" text={dict.home.ctaTitleB} className="block" accent={dict.home.ctaAccent} delay={0.1} />
        </h2>

        <p className="mt-8 max-w-xl text-lg text-muted">{dict.home.ctaIntro}</p>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Magnetic strength={0.4}>
            <Link
              href={localizeHref("/contact", locale)}
              onClick={() => track(EVENTS.heroCtaClick, { location: "final_cta" })}
              data-cursor="explore"
              className="group inline-flex h-16 items-center gap-3 bg-fg px-10 text-lg font-medium text-surface transition-colors hover:bg-accent hover:text-accent-fg"
            >
              {dict.cta.start}
              <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Magnetic>
          <a
            href={`mailto:${site.email}`}
            onClick={() => track(EVENTS.emailClick, { location: "final_cta" })}
            className="link-underline text-lg text-muted hover:text-fg"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
