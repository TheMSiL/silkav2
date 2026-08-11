import type { PhilosophyLink, ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    summary: "Understand the business before the brief.",
    detail:
      "We sit with the people who will use the thing. What does a day look like, where does work stall, what is the spreadsheet everyone actually relies on? Requirements written without that are guesses.",
    outputs: ["Stakeholder interviews", "Process map", "Constraints & risks", "Success criteria"],
    duration: "1–2 weeks",
  },
  {
    index: "02",
    title: "Define",
    summary: "Turn the problem into a scope you can commit to.",
    detail:
      "We cut the work into what must exist for the product to be useful and what can wait. Every item has an owner, an estimate and a reason. Scope you cannot defend is scope that will slip.",
    outputs: ["Domain model", "Prioritised scope", "Architecture direction", "Timeline & budget"],
    duration: "1–2 weeks",
  },
  {
    index: "03",
    title: "Design",
    summary: "Design the flows first, the pixels second.",
    detail:
      "Wireframes and prototypes against the real jobs, tested with the people who do them. Then a design system rather than a folder of screens — components, states, tokens and rules.",
    outputs: ["Flows & prototypes", "Design system", "UI for critical screens", "Content model"],
    duration: "3–6 weeks",
  },
  {
    index: "04",
    title: "Build",
    summary: "Ship in vertical slices, not layers.",
    detail:
      "Every two weeks something works end to end and is deployed to a real environment. You use it, not review a screenshot of it. Architecture decisions are written down as they are made.",
    outputs: ["Working increments", "Preview environments", "Decision records", "API documentation"],
    duration: "6–20 weeks",
  },
  {
    index: "05",
    title: "Test",
    summary: "Prove it works where it matters.",
    detail:
      "Automated coverage on the paths that cost money if they break, plus performance, accessibility and security review. Manual testing goes to the things automation cannot judge.",
    outputs: ["Test suites", "Performance budget", "Accessibility audit", "Security review"],
    duration: "Continuous",
  },
  {
    index: "06",
    title: "Launch",
    summary: "A release, not an event.",
    detail:
      "Staged rollout, migrations rehearsed on production-shaped data, monitoring and alerting live before the first real user. Rollback is planned before it is needed.",
    outputs: ["Migration plan", "Monitoring & alerts", "Runbook", "Team handover"],
    duration: "1–2 weeks",
  },
  {
    index: "07",
    title: "Scale",
    summary: "The product starts here.",
    detail:
      "Instrumentation tells you what people actually do. We iterate against that, keep dependencies current, and expand the system as the business changes shape.",
    outputs: ["Product analytics", "Iteration roadmap", "Maintenance & SLAs", "Capacity planning"],
    duration: "Ongoing",
  },
];

/** The "we don't start with code" chain — §Philosophy. */
export const philosophyChain: PhilosophyLink[] = [
  { label: "Business", note: "What is the company actually trying to change?" },
  { label: "Problem", note: "Where does the work break down today?" },
  { label: "Strategy", note: "What is worth building, and in what order?" },
  { label: "UX", note: "How does a person get the job done?" },
  { label: "Architecture", note: "What must be true for this to hold up?" },
  { label: "Design", note: "How does it look, read and feel?" },
  { label: "Development", note: "Building it, in working slices" },
  { label: "Launch", note: "Into production, with a way back" },
  { label: "Growth", note: "Iterate against what people really do" },
];
