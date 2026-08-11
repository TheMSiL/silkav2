import type { ComplexityLevel, TechCategory } from "@/types";

/**
 * Deliberately short lists. The point is not to prove we have heard of things —
 * each entry carries the reason it is on the list.
 */
export const techCategories: TechCategory[] = [
  {
    key: "frontend",
    label: "Frontend",
    blurb: "Rendering strategy decided per route, not per framework fashion.",
    items: [
      { name: "React", note: "Component model we build every interface on" },
      { name: "Next.js", note: "Server components, streaming, route-level caching" },
      { name: "TypeScript", note: "Strict mode; the domain is typed end to end" },
      { name: "Tailwind CSS", note: "Design tokens as constraints, not utility soup" },
      { name: "Motion", note: "Interaction and scroll choreography" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    blurb: "Boring, observable services. Complexity only where the domain has it.",
    items: [
      { name: "Node.js", note: "One language across the stack, one hiring pool" },
      { name: "NestJS", note: "Module boundaries that survive a growing team" },
      { name: "PostgreSQL", note: "Default store — relational until proven otherwise" },
      { name: "Redis", note: "Cache, locks, rate limits and queue backing" },
      { name: "BullMQ", note: "Background jobs with retries and dead letters" },
    ],
  },
  {
    key: "mobile",
    label: "Mobile",
    blurb: "Cross-platform by default, native where the hardware demands it.",
    items: [
      { name: "React Native", note: "One product team covering iOS and Android" },
      { name: "Swift", note: "Native modules and platform-specific surfaces" },
      { name: "Kotlin", note: "Background work and Android integrations" },
      { name: "SQLite", note: "Local-first storage and offline write queues" },
    ],
  },
  {
    key: "data",
    label: "Data",
    blurb: "Model it once, correctly. Reporting reads projections, not production tables.",
    items: [
      { name: "PostgreSQL", note: "Constraints in the database, not just the app" },
      { name: "Prisma", note: "Typed access and reviewable migrations" },
      { name: "Redis", note: "Hot paths and ephemeral state" },
      { name: "Vector store", note: "Embeddings for semantic retrieval" },
      { name: "Object storage", note: "Documents, media and backups" },
    ],
  },
  {
    key: "ai",
    label: "AI",
    blurb: "Grounded, evaluated and gated. Providers sit behind an interface.",
    items: [
      { name: "LLM APIs", note: "Anthropic and OpenAI behind one abstraction" },
      { name: "Embeddings", note: "Semantic search over your own content" },
      { name: "RAG", note: "Retrieval with citations, thresholds and fallbacks" },
      { name: "Evaluation", note: "Regression suites over real historical cases" },
    ],
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    blurb: "Reproducible environments and a deployment anyone on the team can run.",
    items: [
      { name: "Docker", note: "Same image from local to production" },
      { name: "GitHub Actions", note: "Test, build and deploy on every push" },
      { name: "Terraform", note: "Infrastructure reviewed like application code" },
      { name: "OpenTelemetry", note: "Traces, metrics and logs that correlate" },
      { name: "Vercel / AWS", note: "Chosen per workload, not per habit" },
    ],
  },
];

/** Complexity ladder — §Complexity section. */
export const complexityLevels: ComplexityLevel[] = [
  {
    label: "Landing page",
    scale: "1 surface",
    summary: "One message, one action, measured.",
    detail:
      "A single page built for conversion and speed. Content model, analytics and A/B-ready structure from day one.",
    signals: ["Design system", "CMS-editable", "Analytics", "SEO"],
    weeks: "2–4 weeks",
  },
  {
    label: "Corporate site",
    scale: "10–40 pages",
    summary: "A content platform with a real editorial workflow.",
    detail:
      "Multi-section site with a CMS, localisation structure, structured data and a component library the marketing team can build with.",
    signals: ["CMS", "i18n structure", "Design system", "Structured data"],
    weeks: "4–8 weeks",
  },
  {
    label: "E-commerce",
    scale: "Catalog + money",
    summary: "Once payments are involved, correctness stops being optional.",
    detail:
      "Catalog, search, checkout, accounts, orders and fulfilment integration — with idempotent writes to whatever system holds stock.",
    signals: ["Catalog", "Payments", "Accounts", "ERP sync"],
    weeks: "8–16 weeks",
  },
  {
    label: "Web application",
    scale: "Roles + state",
    summary: "Real users, real permissions, real data over time.",
    detail:
      "Dashboards, authentication, role-based access, background processing and analytics — the point where architecture decisions start to bite.",
    signals: ["Auth", "Roles", "Real-time", "Jobs"],
    weeks: "10–20 weeks",
  },
  {
    label: "SaaS platform",
    scale: "Multi-tenant",
    summary: "You are now running a product, not a project.",
    detail:
      "Tenancy, subscriptions, billing, usage metering, admin tooling, a public API and an upgrade path that does not break customers.",
    signals: ["Tenancy", "Billing", "Public API", "Admin tooling"],
    weeks: "16–32 weeks",
  },
  {
    label: "CRM",
    scale: "Business process",
    summary: "The system the commercial team lives in all day.",
    detail:
      "Pipelines, records, tasks, documents, permissions, reporting and automation — modelled on the real process rather than a template.",
    signals: ["Pipelines", "Permissions", "Automation", "Reporting"],
    weeks: "16–28 weeks",
  },
  {
    label: "ERP module",
    scale: "Operations",
    summary: "Inventory, orders, people and money in one model.",
    detail:
      "Operational systems where a data error is a business error: stock, procurement, fulfilment, HR and finance integration with a full audit trail.",
    signals: ["Inventory", "Orders", "Audit trail", "Integrations"],
    weeks: "24–40 weeks",
  },
  {
    label: "AI platform",
    scale: "Probabilistic",
    summary: "Systems that must be right, built on a component that sometimes is not.",
    detail:
      "Retrieval, orchestration, human-in-the-loop review, evaluation harnesses and cost control — engineering discipline around a non-deterministic core.",
    signals: ["Retrieval", "Evaluation", "Human review", "Cost control"],
    weeks: "12–32 weeks",
  },
  {
    label: "Enterprise ecosystem",
    scale: "Many systems",
    summary: "Not one product — a set of them that must agree.",
    detail:
      "Multiple applications, shared identity, an integration layer, migration from legacy systems, and a delivery model several teams can work inside.",
    signals: ["Shared identity", "Integration layer", "Migration", "Multi-team"],
    weeks: "Programme-scale",
  },
];
