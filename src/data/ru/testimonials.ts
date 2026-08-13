import type { Testimonial } from "@/types";

/**
 * Four of the thirty-four public reviews at `site.reviews.url`.
 *
 * Editorial rule: pick the ones that say something checkable — a kept
 * schedule, work beyond the brief, a score that is not five out of five.
 * Generic praise is left where it was published; it proves nothing here.
 *
 * Quotes are excerpted, never rewritten. Where the original was in another
 * language it is translated for this locale, and the source is linked so the
 * translation can be checked.
 */
export const testimonials: Testimonial[] = [
  {
    id: "mark",
    author: "Марк",
    year: "2026",
    quote:
      "Все договорённости были выполнены чётко и вовремя, с отличным тайм-менеджментом и соблюдением графиков.",
  },
  {
    id: "syvolap",
    author: "Сергей Сиволап",
    year: "2023",
    quote:
      "Он внимательно выслушал мои требования и предложил целый ряд улучшений, которые могли бы улучшить пользовательский опыт и функциональность сайта.",
  },
  {
    id: "artur",
    author: "Artur",
    year: "2023",
    quote: "Работа выполнена вовремя и качественно. Даже было добавлено чуть больше, чем договаривались.",
  },
  {
    id: "renat",
    author: "Ренат",
    year: "2023",
    quote: "Коммуникация — 5/5. Ответственность — 5/5. Сроки — 4/5.",
  },
];
