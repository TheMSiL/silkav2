/**
 * Domain types shared by the data layer and the UI.
 *
 * Everything the site renders is described here first. The `data/` modules are
 * the MVP implementation of these shapes; swapping them for a CMS client means
 * replacing the loader functions in `data/`, not touching a single component.
 */

export type ServiceKey =
  | "web"
  | "mobile"
  | "saas"
  | "crm"
  | "automation"
  | "ai"
  | "ecommerce"
  | "bots"
  | "backend"
  | "api";

export type Discipline =
  | "Strategy"
  | "UX"
  | "UI"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "DevOps"
  | "AI"
  | "Automation";

export type IndustryKey =
  | "saas"
  | "ecommerce"
  | "marketing"
  | "aviation"
  | "architecture"
  | "legal"
  | "healthcare"
  | "energy"
  | "ai"
  | "real-estate"
  | "logistics"
  | "marine"
  | "mobility";

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface CaseMetric {
  label: string;
  value: string;
  note?: string;
}

export interface CaseSection {
  /** Rendered as an editorial block inside the case study body. */
  heading: string;
  body: string[];
  /** Optional bullet list rendered as a technical spec table. */
  items?: { label: string; value: string }[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  /** Layer index — nodes are laid out in columns by layer. */
  layer: number;
  kind: "client" | "service" | "data" | "external" | "infra";
  detail?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureDiagram {
  caption: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface GalleryShot {
  src: string;
  alt: string;
  caption?: string;
  device: "desktop" | "mobile";
}

export interface Project {
  slug: string;
  name: string;
  /** Live URL. Every case study links to the running product. */
  url: string;
  /** One-line "what we built" used on cards. */
  summary: string;
  industry: string;
  industryKey: IndustryKey;
  year: string;
  /** Chips on the project card. */
  scope: string[];
  services: ServiceKey[];
  disciplines: Discipline[];
  featured: boolean;
  /** Accent used for card treatments and the case hero. */
  accent: string;
  /** Short strapline for the case hero. */
  strapline: string;
  duration: string;
  team: string;
  platforms: string[];
  /** Locales the product ships in. */
  locales?: string[];
  cover: { src: string; alt: string };
  challenge: CaseSection;
  solution: CaseSection;
  architecture: ArchitectureDiagram;
  ux: CaseSection;
  ui: CaseSection;
  development: CaseSection;
  features: { title: string; description: string }[];
  integrations: string[];
  stack: { group: string; items: string[] }[];
  results: CaseMetric[];
  outcome: string;
  gallery: GalleryShot[];
}

/* ------------------------------------------------------------------ */
/* Services / capabilities                                             */
/* ------------------------------------------------------------------ */

export interface Service {
  key: ServiceKey;
  label: string;
  headline: string;
  description: string;
  /** What the client actually receives. */
  deliverables: string[];
  stack: string[];
  examples: string[];
  /** Slugs of projects that evidence this service. */
  proof: string[];
  /** Visual token consumed by the services explorer. */
  visual: "grid" | "device" | "flow" | "layers" | "graph" | "nodes";
}

export interface CapabilityBlock {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: { title: string; description: string }[];
}

/* ------------------------------------------------------------------ */
/* Process / technology / industries                                   */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  index: string;
  title: string;
  summary: string;
  detail: string;
  outputs: string[];
  duration: string;
}

export interface TechCategory {
  key: string;
  label: string;
  blurb: string;
  items: { name: string; note: string }[];
}

export interface Industry {
  key: IndustryKey;
  label: string;
  blurb: string;
  systems: string[];
}

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: "Engineering" | "Product" | "AI" | "UX" | "Business" | "Automation";
  date: string;
  readingTime: string;
  author: string;
  /** Simple structured body — swap for portable text / MDX behind the CMS. */
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
}

/* ------------------------------------------------------------------ */
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export type ProjectType =
  | "website"
  | "web-app"
  | "mobile-app"
  | "saas"
  | "crm"
  | "ai"
  | "automation"
  | "ecommerce"
  | "other";

export type BudgetRange =
  | "300-1k"
  | "1k-3k"
  | "3k-8k"
  | "8k-15k"
  | "15k-30k"
  | "30k-50k"
  | "50k-plus"
  | "not-sure";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: ProjectType;
  budget?: BudgetRange;
  message: string;
  source?: string;
  pageUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: Date;
}

/* ------------------------------------------------------------------ */
/* Localised content bundle                                            */
/*                                                                     */
/* Every locale exports one of these. The shapes are explicit so a      */
/* translation that drops a field fails to compile rather than          */
/* rendering a blank.                                                   */
/* ------------------------------------------------------------------ */

export interface FlowStep {
  id: string;
  label: string;
  kind: "trigger" | "step" | "system" | "guard";
  detail: string;
}

export interface DashboardTab {
  key: string;
  label: string;
  headline: string;
  metrics: { label: string; value: string; delta: string }[];
  columns: string[];
  rows: string[][];
  chart: number[];
}

export interface BuilderModule {
  key: string;
  label: string;
  note: string;
  outputs: string[];
  weeks: number;
}

export interface EstimatorStep {
  id: string;
  question: string;
  options: { value: string; label: string; note: string }[];
}

export interface PhilosophyLink {
  label: string;
  note: string;
}

export interface ComplexityLevel {
  label: string;
  scale: string;
  summary: string;
  detail: string;
  signals: string[];
  weeks: string;
}

export interface Principle {
  title: string;
  body: string;
}

/**
 * A published client review.
 *
 * `id` and `year` are structural and must match across locales — the quote is
 * the only translated field, and the original sits behind `site.reviews.url`
 * for anyone who wants to check the translation.
 */
export interface Testimonial {
  id: string;
  /** As displayed on the source profile. */
  author: string;
  year: string;
  quote: string;
}

export interface Stat {
  value: string;
  label: string;
  note: string;
  /**
   * Where the figure can be checked.
   *
   * A number with nowhere to go is a claim. Internal paths are localised at
   * render time; anything starting with `http` opens in a new tab. Structural,
   * so it must be identical across locales.
   */
  href?: string;
}

export interface Discipline_ {
  label: string;
  note: string;
}

export interface PricingFactor {
  label: string;
  note: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LocaleContent {
  projects: Project[];
  insights: Insight[];
  services: Service[];
  capabilityBlocks: CapabilityBlock[];
  automationFlow: FlowStep[];
  aiFlow: FlowStep[];
  dashboardTabs: DashboardTab[];
  builderModules: BuilderModule[];
  estimatorSteps: EstimatorStep[];
  processSteps: ProcessStep[];
  philosophyChain: PhilosophyLink[];
  techCategories: TechCategory[];
  complexityLevels: ComplexityLevel[];
  industries: Industry[];
  principles: Principle[];
  testimonials: Testimonial[];
  stats: Stat[];
  disciplines: Discipline_[];
  pricingFactors: PricingFactor[];
  privacy: LegalSection[];
  terms: LegalSection[];
}
