import type {
  BuilderModule,
  CapabilityBlock,
  DashboardTab,
  EstimatorStep,
  FlowStep,
} from "@/types";

export const capabilityBlocks: CapabilityBlock[] = [
  {
    id: "web",
    eyebrow: "Web development",
    title: "From a single landing page to an application people work in",
    body: "The rendering strategy is chosen per route: static where content is stable, server-rendered where it is personal, client-side only where interaction demands it. That is why a marketing page and a data-heavy dashboard can live in the same codebase without either one suffering.",
    bullets: [
      { title: "Corporate websites", description: "Next.js, structured content model, CMS, structured data, motion that respects reduced-motion." },
      { title: "E-commerce", description: "Catalog, faceted search, checkout, accounts, orders and fulfilment integration." },
      { title: "Web applications", description: "Dashboards, authentication, role-based access, real-time data and background processing." },
      { title: "SaaS", description: "Tenancy, subscriptions, billing, teams, permissions and a versioned public API." },
    ],
  },
  {
    id: "mobile",
    eyebrow: "Mobile development",
    title: "Applications that work where the phone actually is",
    body: "Cross-platform by default so one product team covers iOS and Android, with native modules wherever the hardware or the platform demands it. Offline behaviour, background work and permissions are designed up front, because none of them can be retrofitted cleanly.",
    bullets: [
      { title: "iOS & Android", description: "React Native with native modules; Swift and Kotlin where a platform surface requires it." },
      { title: "Offline-first", description: "Local write queues, client-generated IDs and explicit server-side merge rules." },
      { title: "Device integration", description: "Camera, scanning, background location, biometrics, secure storage." },
      { title: "Release pipeline", description: "Store submission, staged rollout, crash and performance monitoring." },
    ],
  },
  {
    id: "systems",
    eyebrow: "CRM · ERP · Internal systems",
    title: "We build the systems your business actually runs on",
    body: "When an off-the-shelf product needs a dozen custom fields and a shadow spreadsheet, the configuration path has run out. We model the real objects a business works with — not contacts and deals — and build the interface around the work rather than the database.",
    bullets: [
      { title: "CRM", description: "Pipelines, records, tasks, quoting, permissions and reporting modelled on your process." },
      { title: "ERP modules", description: "Inventory, orders, procurement, production and finance integration with a full audit trail." },
      { title: "Internal tools", description: "Admin consoles, approval flows, document handling and operational dashboards." },
      { title: "Migration", description: "Moving from spreadsheets or legacy systems with reconciliation, not a big-bang cutover." },
    ],
  },
  {
    id: "automation",
    eyebrow: "Bots & automation",
    title: "Connect what you already run, and make failure visible",
    body: "Automation is easy to start and hard to trust. Every workflow we build has retries, a dead-letter queue, alerting and a per-run trace, so a silent failure is structurally impossible — which is the difference between automation that survives and automation that gets switched off.",
    bullets: [
      { title: "Messaging channels", description: "Telegram, WhatsApp, Discord and Slack bots wired into real systems." },
      { title: "Workflow engine", description: "Composable steps with conditionals, delays, retries and compensation." },
      { title: "Integrations", description: "Webhooks, APIs, scheduled sync and file-based exchange with idempotent writes." },
      { title: "Operations console", description: "Run history, failure reasons and one-click safe retry." },
    ],
  },
  {
    id: "ai",
    eyebrow: "AI",
    title: "AI as an engineering problem, not a demo",
    body: "The interesting work is not calling a model — it is grounding it in your data, deciding when it must not answer, and proving a change did not make things worse. We build the retrieval, the gates, the human review step and the evaluation suite around the model.",
    bullets: [
      { title: "Assistants & support", description: "Grounded answers with citations, confidence gating and human approval." },
      { title: "Document processing", description: "Extraction, classification and summarisation into structured fields." },
      { title: "Semantic search", description: "Embeddings and hybrid retrieval over your own content." },
      { title: "Workflow intelligence", description: "Routing, prioritisation and drafting inside existing processes." },
    ],
  },
  {
    id: "backend",
    eyebrow: "Backend & infrastructure",
    title: "The part nobody sees and everything depends on",
    body: "Relational until proven otherwise, boring where boring works, observable everywhere. We design for the load you will actually have and leave a written record of why the system is shaped the way it is.",
    bullets: [
      { title: "Services & data", description: "Domain modelling, PostgreSQL with real constraints, reviewable migrations." },
      { title: "Async work", description: "Queues, background jobs, scheduling, retries and dead letters." },
      { title: "Real-time", description: "WebSockets and event streams where polling would not hold up." },
      { title: "Delivery", description: "Docker, CI/CD, preview environments, infrastructure as code, OpenTelemetry." },
    ],
  },
];

/** §Bots & Automation — the flow that animates on scroll. */
export const automationFlow: FlowStep[] = [
  { id: "lead", label: "New lead", kind: "trigger", detail: "Website form · Telegram · WhatsApp · Email" },
  { id: "normalise", label: "Normalise", kind: "step", detail: "One typed event, whatever the channel" },
  { id: "enrich", label: "Enrich & score", kind: "step", detail: "Company lookup, routing rules, priority" },
  { id: "crm", label: "Write to CRM", kind: "system", detail: "Idempotency key — a retry can't duplicate" },
  { id: "notify", label: "Notify owner", kind: "system", detail: "Telegram to the assigned manager, instantly" },
  { id: "followup", label: "Scheduled follow-up", kind: "step", detail: "Email sequence, cancelled on reply" },
  { id: "trace", label: "Trace & alert", kind: "guard", detail: "Every run logged; failures hit the dead-letter queue" },
];

/** §AI — the workflow that animates on scroll. */
export const aiFlow: FlowStep[] = [
  { id: "message", label: "Customer message", kind: "trigger", detail: "Arrives from any channel" },
  { id: "intent", label: "Intent detection", kind: "step", detail: "Classify before you generate" },
  { id: "retrieve", label: "Retrieval", kind: "step", detail: "Hybrid search over versioned knowledge" },
  { id: "gate", label: "Confidence gate", kind: "guard", detail: "Below threshold → route to a human" },
  { id: "draft", label: "Grounded draft", kind: "step", detail: "Answer with citations attached" },
  { id: "human", label: "Human approval", kind: "guard", detail: "Agent approves, edits or rejects" },
  { id: "act", label: "Send & record", kind: "system", detail: "Reply sent, CRM updated, edit stored as an eval case" },
];

/** §CRM — interactive mock dashboard tabs. */
export const dashboardTabs: DashboardTab[] = [
  {
    key: "sales",
    label: "Sales",
    headline: "Pipeline health at a glance",
    metrics: [
      { label: "Open pipeline", value: "€1.24M", delta: "+8.2%" },
      { label: "Weighted", value: "€412K", delta: "+3.1%" },
      { label: "Avg. cycle", value: "34 days", delta: "−4 days" },
      { label: "Win rate", value: "31%", delta: "+2pt" },
    ],
    rows: [
      ["Northwind retrofit", "Proposal", "€180,000", "12 days"],
      ["Halden logistics", "Discovery", "€64,000", "3 days"],
      ["Arbor Health portal", "Negotiation", "€245,000", "21 days"],
      ["Vela commerce", "Qualified", "€38,000", "1 day"],
    ],
    columns: ["Opportunity", "Stage", "Value", "In stage"],
    chart: [34, 41, 38, 52, 47, 63, 58, 71, 66, 78, 74, 86],
  },
  {
    key: "customers",
    label: "Customers",
    headline: "Every account, one record",
    metrics: [
      { label: "Active accounts", value: "1,284", delta: "+41" },
      { label: "At risk", value: "17", delta: "−5" },
      { label: "NPS responses", value: "312", delta: "+28" },
      { label: "Avg. tenure", value: "2.7 yrs", delta: "+0.2" },
    ],
    rows: [
      ["Arbor Health", "Enterprise", "4 contacts", "Active"],
      ["Halden Logistics", "Mid-market", "2 contacts", "Active"],
      ["Vela Commerce", "SMB", "1 contact", "At risk"],
      ["Northwind Group", "Enterprise", "9 contacts", "Active"],
    ],
    columns: ["Account", "Segment", "Contacts", "Status"],
    chart: [62, 58, 65, 61, 70, 68, 74, 72, 79, 77, 83, 88],
  },
  {
    key: "orders",
    label: "Orders",
    headline: "From order to fulfilment, tracked",
    metrics: [
      { label: "Open orders", value: "342", delta: "+19" },
      { label: "Awaiting approval", value: "12", delta: "−3" },
      { label: "Fulfilment SLA", value: "98.2%", delta: "+0.4pt" },
      { label: "Returns", value: "1.8%", delta: "−0.3pt" },
    ],
    rows: [
      ["#48213", "Awaiting approval", "€12,400", "Northwind"],
      ["#48214", "Picking", "€3,180", "Vela"],
      ["#48215", "Dispatched", "€27,900", "Arbor"],
      ["#48216", "Delivered", "€1,240", "Halden"],
    ],
    columns: ["Order", "State", "Value", "Account"],
    chart: [44, 49, 46, 55, 61, 58, 66, 72, 69, 75, 81, 84],
  },
  {
    key: "analytics",
    label: "Analytics",
    headline: "Numbers that come from the same source as the ledger",
    metrics: [
      { label: "Revenue MTD", value: "€318K", delta: "+11.4%" },
      { label: "Gross margin", value: "42.6%", delta: "+1.2pt" },
      { label: "Cost to win", value: "€2,140", delta: "−€180" },
      { label: "Forecast", value: "€402K", delta: "±6%" },
    ],
    rows: [
      ["Inbound", "38%", "€121K", "31% win"],
      ["Referral", "27%", "€86K", "44% win"],
      ["Outbound", "21%", "€67K", "18% win"],
      ["Partner", "14%", "€44K", "36% win"],
    ],
    columns: ["Source", "Share", "Revenue", "Conversion"],
    chart: [30, 36, 44, 42, 51, 58, 55, 64, 70, 68, 77, 82],
  },
  {
    key: "team",
    label: "Team",
    headline: "Workload and permissions in one place",
    metrics: [
      { label: "Active users", value: "48", delta: "+3" },
      { label: "Roles", value: "7", delta: "0" },
      { label: "Open tasks", value: "126", delta: "−14" },
      { label: "Overdue", value: "9", delta: "−6" },
    ],
    rows: [
      ["Sales — West", "12 people", "38 tasks", "Manager"],
      ["Sales — East", "9 people", "27 tasks", "Manager"],
      ["Delivery", "18 people", "44 tasks", "Lead"],
      ["Finance", "5 people", "17 tasks", "Restricted"],
    ],
    columns: ["Team", "Size", "Workload", "Access"],
    chart: [55, 52, 58, 54, 60, 57, 62, 59, 65, 63, 68, 66],
  },
  {
    key: "automation",
    label: "Automation",
    headline: "What the system does without anyone asking",
    metrics: [
      { label: "Active rules", value: "34", delta: "+2" },
      { label: "Runs / 24h", value: "4,182", delta: "+312" },
      { label: "Failed", value: "3", delta: "−7" },
      { label: "Manual hours saved", value: "Tracked", delta: "per rule" },
    ],
    rows: [
      ["Lead routing", "Enabled", "1,204 runs", "0 failed"],
      ["Quote follow-up", "Enabled", "862 runs", "1 failed"],
      ["Stock reorder", "Enabled", "318 runs", "0 failed"],
      ["Invoice reminder", "Dry run", "— ", "preview"],
    ],
    columns: ["Rule", "State", "Volume", "Health"],
    chart: [40, 47, 53, 50, 59, 65, 62, 70, 76, 73, 80, 87],
  },
];

/** §53 — the product builder. */
export const builderModules: BuilderModule[] = [
  {
    key: "web",
    label: "Web platform",
    note: "Marketing site or web application",
    outputs: ["Next.js application", "Design system", "CMS-managed content"],
    weeks: 6,
  },
  {
    key: "mobile",
    label: "Mobile app",
    note: "iOS and Android",
    outputs: ["React Native app", "Store release pipeline", "Push notifications"],
    weeks: 8,
  },
  {
    key: "crm",
    label: "CRM / internal system",
    note: "The system your team works in",
    outputs: ["Pipelines & records", "Roles and permissions", "Management reporting"],
    weeks: 10,
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    note: "Catalog, checkout, accounts",
    outputs: ["Catalog & search", "Checkout & payments", "Order management"],
    weeks: 8,
  },
  {
    key: "ai",
    label: "AI layer",
    note: "Assistants, extraction, search",
    outputs: ["Retrieval over your data", "Evaluation harness", "Human-in-the-loop review"],
    weeks: 5,
  },
  {
    key: "automation",
    label: "Automation",
    note: "Workflows, bots, integrations",
    outputs: ["Workflow engine", "Messaging channels", "Operations console"],
    weeks: 4,
  },
  {
    key: "api",
    label: "API & backend",
    note: "Services, data, integrations",
    outputs: ["Versioned REST API", "Background jobs", "Observability"],
    weeks: 6,
  },
];

export type BuilderModuleKey = (typeof builderModules)[number]["key"];

/** §28 — project estimator steps. Deliberately no fake price output. */
export const estimatorSteps: EstimatorStep[] = [
  {
    id: "product",
    question: "What are you building?",
    options: [
      { value: "website", label: "Website", note: "Marketing, corporate, landing" },
      { value: "web-app", label: "Web application", note: "Dashboards, portals, tools" },
      { value: "mobile-app", label: "Mobile app", note: "iOS and / or Android" },
      { value: "saas", label: "SaaS platform", note: "Multi-tenant product" },
      { value: "crm", label: "CRM / ERP", note: "Internal business system" },
      { value: "ecommerce", label: "E-commerce", note: "Catalog and checkout" },
      { value: "ai", label: "AI product", note: "Assistant, search, extraction" },
      { value: "automation", label: "Automation", note: "Workflows, bots, integrations" },
      { value: "other", label: "Something else", note: "Tell us about it" },
    ],
  },
  {
    id: "stage",
    question: "Where are you starting from?",
    options: [
      { value: "idea", label: "An idea", note: "Nothing built yet" },
      { value: "design", label: "Designs exist", note: "Ready to build" },
      { value: "existing", label: "An existing product", note: "Extend or replace" },
      { value: "redesign", label: "A redesign", note: "It works, it shows its age" },
    ],
  },
  {
    id: "scope",
    question: "What do you need from us?",
    options: [
      { value: "design", label: "Design", note: "UX and UI only" },
      { value: "development", label: "Development", note: "Build from your designs" },
      { value: "full-cycle", label: "Full cycle", note: "Strategy through launch" },
      { value: "team", label: "An embedded team", note: "Ongoing capacity" },
    ],
  },
  {
    id: "timing",
    question: "When do you want to start?",
    options: [
      { value: "now", label: "Now", note: "Budget approved" },
      { value: "quarter", label: "This quarter", note: "Planning ahead" },
      { value: "exploring", label: "Exploring", note: "Gathering options" },
    ],
  },
];

export type EstimatorStepId = (typeof estimatorSteps)[number]["id"];
