import type { Industry, Principle, Stat } from "@/types";

/**
 * Industries we have shipped in. Each key maps to `Project.industryKey`, so the
 * industries section can surface the real work behind every claim.
 */
export const industries: Industry[] = [
  {
    key: "saas",
    label: "SaaS",
    blurb: "Multi-tenant products where the unglamorous parts — auth, billing, admin tooling — decide whether you can support what you sold.",
    systems: ["Product platforms", "Interactive demos", "Admin consoles", "Public APIs"],
  },
  {
    key: "aviation",
    label: "Aviation data",
    blurb: "A century of accident records, geocoded and mapped — where the interface has to hold eighteen thousand points and still be indexable.",
    systems: ["Data pipelines", "Interactive maps", "Programmatic archives", "Subscriptions"],
  },
  {
    key: "logistics",
    label: "Logistics",
    blurb: "Freight sells on certainty. Route, transit time and cost belong on the site, not three days into an email thread.",
    systems: ["Route planners", "Rate engines", "Shipment tracking", "Multi-locale platforms"],
  },
  {
    key: "real-estate",
    label: "Real Estate",
    blurb: "Inventory that changes daily, sold through material that used to be updated monthly.",
    systems: ["Apartment catalogs", "Inventory sync", "Progress reporting", "CRM integration"],
  },
  {
    key: "ai",
    label: "AI & automation",
    blurb: "The interesting work is not calling a model. It is grounding it, gating it, and proving a change did not make things worse.",
    systems: ["Workflow automation", "Document processing", "Support systems", "Integrations"],
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    blurb: "Catalog, checkout, accounts — and everything that happens after the order is placed.",
    systems: ["Storefronts", "Digital delivery", "Accounts & entitlements", "Payments"],
  },
  {
    key: "marketing",
    label: "Marketing",
    blurb: "Agencies live or die on evidence. The job was to make the case library the architecture rather than a section.",
    systems: ["Case libraries", "Multi-locale sites", "Lead routing", "Editorial"],
  },
  {
    key: "healthcare",
    label: "Healthcare",
    blurb: "Patients arrive with a worry, not a procedure code. Being explicit about what happens is the strongest trust signal available.",
    systems: ["Clinic platforms", "Treatment paths", "Booking flows", "Structured data"],
  },
  {
    key: "legal",
    label: "Legal",
    blurb: "A business calling a law firm is already on a deadline. Response time is the product, so it has to be wired, not promised.",
    systems: ["Practice platforms", "Situation-led navigation", "Instant notification", "Intake"],
  },
  {
    key: "energy",
    label: "Energy",
    blurb: "Everyone is asking one question — what does it cost and when does it pay back. Most sites answer it with a contact form.",
    systems: ["Savings calculators", "Versioned models", "Lead capture with context"],
  },
  {
    key: "architecture",
    label: "Architecture",
    blurb: "A three-year project cycle makes conventional conversion design counterproductive. Restraint is the message.",
    systems: ["Portfolio platforms", "Editorial content", "Media pipelines"],
  },
  {
    key: "marine",
    label: "Marine technology",
    blurb: "Hardware, sensors and software sold as one capability to buyers who evaluate each of them differently.",
    systems: ["Product platforms", "Specification surfaces", "Related content models"],
  },
  {
    key: "mobility",
    label: "Mobility",
    blurb: "A premium object sells on restraint, and restraint is the hardest thing to hold on a page that also has to quote a price.",
    systems: [
      "Product configurators",
      "Specification surfaces",
      "Long-form product narrative",
      "Activity and route tracking",
    ],
  },
];

/** §What we care about — principles in place of testimonials we have not collected. */
export const principles: Principle[] = [
  {
    title: "We say what something will cost before you commit",
    body: "Estimates come with the assumptions they rest on. When an assumption breaks, you hear about it that week — not at the deadline.",
  },
  {
    title: "Senior people do the work",
    body: "There is no layer of juniors behind the people you meet. The engineer in the kickoff call is the engineer writing the code.",
  },
  {
    title: "Architecture is a decision, not a default",
    body: "We write down why a system is shaped the way it is. If a choice turns out wrong, the record tells you what to change and what it affects.",
  },
  {
    title: "You own everything we build",
    body: "Code, infrastructure, accounts, documentation. No proprietary runtime, no hostage keys, no dependency on us to keep running.",
  },
  {
    title: "Working software beats status reports",
    body: "Every increment is deployed somewhere you can use it. Progress is something you click, not something you read about.",
  },
  {
    title: "We tell you when not to build",
    body: "Sometimes the answer is a configuration change, a different tool, or nothing at all. Saying so costs us a project and keeps a relationship.",
  },
];

/**
 * Headline figures.
 *
 * Every one is counted from something on this site — the portfolio, the
 * industry list, the disciplines on /about, the public review profile. Nothing
 * here is a figure we would have to defend from memory.
 */
export const stats: Stat[] = [
  { value: "16", label: "Products shipped", note: "Every one live and linked", href: "/work" },
  { value: "13", label: "Industries", note: "Aviation data to dentistry", href: "/work#industries" },
  { value: "8", label: "Disciplines in-house", note: "Strategy through infrastructure", href: "/about#team" },
  { value: "34", label: "Client reviews", note: "Public, since 2023", href: "https://freelance.ua/user/msil/opinions/" },
];
