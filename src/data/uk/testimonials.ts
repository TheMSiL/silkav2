import type { Testimonial } from "@/types";

/**
 * Four of the thirty-four public reviews at `site.reviews.url`.
 *
 * Editorial rule: pick the ones that say something checkable — a kept
 * schedule, work beyond the brief, a score that is not five out of five.
 * Generic praise is left where it was published; it proves nothing here.
 *
 * Order is load-bearing: the home page renders the first entry as the lead
 * pull-quote, so the most specific review comes first and the vaguest last.
 *
 * Quotes are excerpted, never rewritten. Where the original was in another
 * language it is translated for this locale, and the source is linked so the
 * translation can be checked.
 */
export const testimonials: Testimonial[] = [
  {
    id: "syvolap",
    author: "Сергій Сиволап",
    year: "2023",
    quote:
      "Уважно вислухав мої вимоги і запропонував цілу низку покращень, які могли б покращити користувацький досвід і функціональність сайту.",
  },
  {
    id: "artur",
    author: "Artur",
    year: "2023",
    quote: "Робота виконана вчасно та якісно. Навіть було додано трішки більше ніж домовлялись.",
  },
  {
    id: "renat",
    author: "Ренат",
    year: "2023",
    quote: "Комунікація — 5/5. Відповідальність — 5/5. Терміни — 4/5.",
  },
  {
    id: "mark",
    author: "Марк",
    year: "2026",
    quote:
      "Усі домовленості були виконані чітко та вчасно, з відмінним тайм-менеджментом і дотриманням графіків.",
  },
];
