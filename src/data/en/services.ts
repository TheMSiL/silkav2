import type { Service } from "@/types";

export const services: Service[] = [
  {
    key: "web",
    label: "Web",
    headline: "Sites that behave like products",
    description:
      "Marketing sites, content platforms and complex front ends built on Next.js — fast on real devices, editable by non-engineers, and instrumented so you can see what they do.",
    deliverables: [
      "Information architecture & content model",
      "Design system and component library",
      "Next.js implementation with CMS integration",
      "SEO, structured data and analytics",
      "Performance and accessibility budget",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS"],
    examples: ["Corporate sites", "Product marketing", "Content platforms", "Landing systems"],
    proof: ["oriel", "glidex", "litha"],
    visual: "grid",
  },
  {
    key: "mobile",
    label: "Mobile",
    headline: "One product team, two platforms",
    description:
      "iOS and Android applications with the native integrations the job actually needs — offline storage, background location, push, payments, biometrics.",
    deliverables: [
      "Platform strategy: native vs cross-platform",
      "Interaction design for both platforms",
      "React Native or native implementation",
      "Store submission and release pipeline",
      "Crash, performance and release monitoring",
    ],
    stack: ["React Native", "TypeScript", "Swift", "Kotlin", "SQLite"],
    examples: ["Field and driver apps", "Customer apps", "Internal tools", "Companion apps"],
    proof: ["motion"],
    visual: "device",
  },
  {
    key: "saas",
    label: "SaaS",
    headline: "From MVP to a platform that scales",
    description:
      "Multi-tenant products with the unglamorous parts done properly: authentication, roles, billing, usage metering, admin tooling and an upgrade path.",
    deliverables: [
      "Domain and tenancy model",
      "Auth, roles and permissions",
      "Subscriptions, billing and metering",
      "Admin and support tooling",
      "Public API and webhooks",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Stripe"],
    examples: ["Vertical SaaS", "Internal platforms", "Marketplaces", "Data products"],
    proof: ["aera", "crashatlas"],
    visual: "layers",
  },
  {
    key: "crm",
    label: "CRM & ERP",
    headline: "The system your business actually runs on",
    description:
      "When an off-the-shelf CRM needs twelve custom fields and a shadow spreadsheet, the tool is no longer the tool. We build systems that match how the business really operates.",
    deliverables: [
      "Process mapping and domain model",
      "Pipelines, records, tasks and documents",
      "Role and record-level permissions",
      "Reporting and management dashboards",
      "Migration from existing systems",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Queues"],
    examples: ["Sales CRM", "Inventory & orders", "HR and operations", "Custom ERP modules"],
    proof: ["oriel", "ra-agency"],
    visual: "graph",
  },
  {
    key: "automation",
    label: "Automation",
    headline: "Remove the work nobody should be doing",
    description:
      "Workflow engines, integrations and background jobs that connect the systems you already run — with retries, dead letters and traces, so failure is visible instead of silent.",
    deliverables: [
      "Process audit and automation map",
      "Workflow implementation with retries",
      "Integration layer and webhooks",
      "Operations console and alerting",
      "Runbook and handover",
    ],
    stack: ["Node.js", "TypeScript", "BullMQ", "Redis", "Webhooks"],
    examples: ["Lead routing", "Document pipelines", "Sync between systems", "Scheduled reporting"],
    proof: ["axion", "kovalov-partners", "ra-agency"],
    visual: "flow",
  },
  {
    key: "ai",
    label: "AI",
    headline: "AI where it changes the unit economics",
    description:
      "Assistants, document processing, semantic search and workflow intelligence — grounded in your data, evaluated against real cases, and gated so the system can say it does not know.",
    deliverables: [
      "Use-case selection and feasibility check",
      "Retrieval architecture over your content",
      "Evaluation harness and regression suite",
      "Human-in-the-loop interfaces",
      "Cost, latency and quality monitoring",
    ],
    stack: ["LLM APIs", "Embeddings", "Vector search", "RAG", "Evaluation harness"],
    examples: ["Support assistants", "Document extraction", "Semantic search", "Content workflows"],
    proof: ["axion", "aera"],
    visual: "nodes",
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    headline: "Catalog, checkout and everything after it",
    description:
      "Storefronts for B2C and B2B — faceted catalogs, contract pricing, checkout that converts, and the account, order and returns flows that come after the sale.",
    deliverables: [
      "Catalog and pricing model",
      "Search, facets and merchandising",
      "Checkout and payment integration",
      "Customer accounts and order management",
      "ERP / fulfilment integration",
    ],
    stack: ["Next.js", "PostgreSQL", "Search index", "Payment gateways", "ERP APIs"],
    examples: ["B2B wholesale", "D2C stores", "Configurable products", "Multi-market catalogs"],
    proof: ["tvorivo", "oriel"],
    visual: "grid",
  },
  {
    key: "bots",
    label: "Bots",
    headline: "Conversation as an interface",
    description:
      "Telegram, WhatsApp, Discord and Slack bots that do real work — booking, support, internal ops — wired into your systems rather than standing beside them.",
    deliverables: [
      "Conversation design and escalation rules",
      "Bot implementation and channel setup",
      "Backend integration and state handling",
      "Operator console and handover",
      "Monitoring and rate-limit handling",
    ],
    stack: ["Node.js", "Telegram Bot API", "WhatsApp Business API", "Redis", "Webhooks"],
    examples: ["Support bots", "Booking bots", "Internal ops bots", "Notification channels"],
    proof: ["axion", "kovalov-partners"],
    visual: "flow",
  },
  {
    key: "backend",
    label: "Backend",
    headline: "The part nobody sees and everybody depends on",
    description:
      "Services, data models, queues and infrastructure designed for the load you will have, not the load a benchmark has. Observable by default.",
    deliverables: [
      "Domain and data modelling",
      "Service architecture and boundaries",
      "Background jobs and scheduling",
      "Observability: logs, metrics, traces",
      "CI/CD and environment strategy",
    ],
    stack: ["Node.js", "NestJS", "PostgreSQL", "Redis", "Docker"],
    examples: ["Platform backends", "Data pipelines", "Real-time systems", "Legacy replacement"],
    proof: ["crashatlas", "glidex"],
    visual: "layers",
  },
  {
    key: "api",
    label: "API",
    headline: "Interfaces other people can build on",
    description:
      "REST and GraphQL APIs with versioning, idempotency, pagination, rate limits and documentation — so integrating with you is not a support ticket.",
    deliverables: [
      "API design and versioning policy",
      "Authentication and rate limiting",
      "Webhooks with delivery guarantees",
      "Reference documentation and SDK stubs",
      "Contract tests",
    ],
    stack: ["REST", "GraphQL", "OpenAPI", "WebSockets", "Webhooks"],
    examples: ["Partner APIs", "Internal service APIs", "Webhook platforms", "Public developer APIs"],
    proof: ["crashatlas", "glidex"],
    visual: "nodes",
  },
];

export const serviceByKey = Object.fromEntries(services.map((s) => [s.key, s])) as Record<
  Service["key"],
  Service
>;
