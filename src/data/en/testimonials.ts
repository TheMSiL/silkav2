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
 * Quotes are excerpted, never rewritten. All four were written in Ukrainian or
 * Russian and are translated here, with the source linked so the translation
 * can be checked.
 */
export const testimonials: Testimonial[] = [
  {
    id: "syvolap",
    author: "Serhii Syvolap",
    year: "2023",
    quote:
      "He listened carefully to my requirements and proposed a whole set of improvements to the user experience and the functionality of the site.",
  },
  {
    id: "artur",
    author: "Artur",
    year: "2023",
    quote: "Delivered on time and done well. He even added a little more than we agreed.",
  },
  {
    id: "renat",
    author: "Renat",
    year: "2023",
    quote: "Communication — 5/5. Accountability — 5/5. Deadlines — 4/5.",
  },
  {
    id: "mark",
    author: "Mark",
    year: "2026",
    quote:
      "Every agreement was met precisely and on time, with excellent time management and schedules kept.",
  },
];
