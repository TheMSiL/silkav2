import type { Project } from "@/types";

/**
 * PORTFOLIO
 * ---------
 * Fifteen shipped products, newest first. Every entry links to the live build,
 * and the screenshots in `public/work/<slug>/` are captured from it
 * (`node scripts/capture-work.mjs`).
 *
 * Editorial rule: describe what was built and what the system does. No
 * invented commercial outcomes — the `results` field carries build facts, not
 * marketing numbers. Where a client has published real metrics, replace them.
 *
 * Moving to a CMS: implement `getProjects()` / `getProject(slug)` in
 * `data/index.ts` against the CMS client. The `Project` type is the contract.
 */
export const projects: Project[] = [
  {
    slug: "ra-agency",
    name: "RA Agency",
    url: "https://raagency.tech/en",
    summary: "A trilingual performance-marketing site built around case evidence",
    industry: "Performance marketing",
    industryKey: "marketing",
    year: "2025",
    scope: ["Website", "i18n", "Case studies", "SEO"],
    services: ["web", "automation"],
    disciplines: ["Strategy", "UX", "UI", "Frontend"],
    featured: true,
    accent: "#2119f0",
    strapline:
      "Three ad platforms, a large case library and a hard positioning line — \"We don't buy clicks. We take minds.\"",
    duration: "8 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Marketing site", "Case library", "Blog"],
    locales: ["EN", "UA", "RU"],
    cover: { src: "/work/ra-agency/cover.jpg", alt: "RA Agency homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "Performance agencies all publish the same page: a hero claim, three service tiles, some logos. The differentiator RA had was evidence — a large body of campaign results across Telegram, Meta and Google — and it was invisible.",
        "The site needed to make that evidence the structure rather than a section, in two languages, without turning into a case-study archive nobody reads.",
      ],
      items: [
        { label: "Channels", value: "Telegram Ads · Meta Ads · Google Ads" },
        { label: "Content", value: "Case library, reviews, blog" },
        { label: "Locales", value: "English and Ukrainian" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Cases are a first-class content type with structured fields — channel, vertical, spend band, outcome — so they can be surfaced contextually rather than only in an archive.",
        "Each service page pulls the cases that prove that specific channel, which means the proof appears at the moment a visitor is deciding, not three clicks later.",
        "Locales are routed segments with independent metadata, so each language ranks on its own terms instead of competing with itself.",
      ],
      items: [
        { label: "Cases", value: "Structured, contextually surfaced" },
        { label: "Service pages", value: "Proof attached per channel" },
        { label: "i18n", value: "Routed locales with per-locale metadata" },
      ],
    },
    architecture: {
      caption: "Content-driven static site with typed content models and per-locale routing.",
      nodes: [
        { id: "en", label: "/en", layer: 0, kind: "client" },
        { id: "ua", label: "/ua", layer: 0, kind: "client" },
        { id: "router", label: "Locale router", layer: 1, kind: "service" },
        { id: "content", label: "Content models", layer: 2, kind: "data", detail: "Cases, services, posts" },
        { id: "pages", label: "Static generation", layer: 3, kind: "service", detail: "Per locale" },
        { id: "lead", label: "Lead capture", layer: 3, kind: "service" },
        { id: "crm", label: "CRM / Telegram", layer: 4, kind: "external" },
        { id: "analytics", label: "Analytics", layer: 4, kind: "external" },
      ],
      edges: [
        { from: "en", to: "router" },
        { from: "ua", to: "router" },
        { from: "router", to: "content" },
        { from: "content", to: "pages" },
        { from: "pages", to: "lead" },
        { from: "lead", to: "crm" },
        { from: "pages", to: "analytics" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The page order follows the buying question: which channel do I need, has this agency done it in my vertical, what happened, who says so.",
        "Case cards lead with the result and the constraint it was achieved under, because a result without its context is exactly the kind of claim this industry has trained buyers to discount.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Confident and typographic. The positioning line carries the hero rather than a stock image, and numbers are set large enough to be the visual.",
        "Client and partner logos are treated as a quiet band rather than a wall — presence, not volume.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Everything is statically generated per locale with typed content models, so adding a case is a data change and the pages that reference it update on rebuild.",
        "Lead submissions go through a server action into the CRM with an instant Telegram notification to the responsible manager.",
      ],
    },
    features: [
      { title: "Channel service pages", description: "Telegram, Meta and Google Ads, each with its own proof set." },
      { title: "Case library", description: "Structured cases filterable by channel and vertical." },
      { title: "Metrics band", description: "Headline agency figures presented as data, not decoration." },
      { title: "Testimonials", description: "Client reviews attributed to named people and companies." },
      { title: "Blog", description: "Editorial content supporting search visibility per locale." },
      { title: "Trilingual routing", description: "English, Ukrainian and Russian as independent routed locales." },
    ],
    integrations: ["CRM", "Telegram notifications", "Analytics", "Email"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"] },
      { group: "Platform", items: ["i18n routing", "Static generation", "Server actions"] },
    ],
    results: [
      { label: "Ad channels", value: "3", note: "Telegram Ads · Meta Ads · Google Ads — each with its own page" },
      { label: "Locales", value: "EN · UA · RU", note: "Independent metadata per language" },
      { label: "Content model", value: "Typed", note: "A new case is a data change" },
      { label: "Lead routing", value: "Instant", note: "CRM plus Telegram to the owner" },
    ],
    outcome:
      "The evidence became the architecture. A visitor decides on a channel and the proof for that channel is already on screen.",
    gallery: [
      { src: "/work/ra-agency/01.jpg", alt: "RA Agency services", caption: "Channel services", device: "desktop" },
      { src: "/work/ra-agency/02.jpg", alt: "RA Agency case studies", caption: "Case library", device: "desktop" },
      { src: "/work/ra-agency/03.jpg", alt: "RA Agency testimonials", caption: "Client reviews", device: "desktop" },
      { src: "/work/ra-agency/mobile.jpg", alt: "RA Agency on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "crashatlas",
    name: "CrashAtlas",
    url: "https://crashatlas.com/",
    summary: "An aviation accident database and interactive crash map covering a century of flight",
    industry: "Aviation data",
    industryKey: "aviation",
    year: "2026",
    scope: ["Data platform", "Web App", "Backend", "SEO", "Subscriptions"],
    services: ["saas", "web", "backend", "api"],
    disciplines: ["Strategy", "UX", "UI", "Frontend", "Backend", "DevOps"],
    featured: true,
    accent: "#2119f0",
    strapline:
      "18,243 accidents from 1919 to 2026, placed where they happened — so a century of aviation history can be read geographically instead of as a list.",
    duration: "Ongoing",
    team: "1 designer · 2 engineers",
    platforms: ["Interactive map", "Archive pages", "Premium tier", "Editorial"],
    locales: ["EN"],
    cover: { src: "/work/crashatlas/cover.jpg", alt: "CrashAtlas homepage with the aviation accident map" },
    challenge: {
      heading: "Challenge",
      body: [
        "Aviation accident data exists in public sources, but it is scattered, inconsistently formatted and almost never geocoded. Turning it into something you can explore means solving ingestion and normalisation before you can even think about the interface.",
        "The map is the product, and a map with eighteen thousand markers is a performance problem, an accessibility problem and an SEO problem at the same time: search engines cannot read a canvas.",
      ],
      items: [
        { label: "Records", value: "18,243 accidents, 1919–2026" },
        { label: "Fatalities recorded", value: "127,254" },
        { label: "Coverage", value: "108 years" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "A normalisation pipeline turns heterogeneous public sources into one record shape — date, operator, airframe, location, cause, fatalities — with geocoding and de-duplication as explicit, reviewable steps.",
        "The map clusters server-side by region and streams only what the current viewport needs, so panning stays smooth at full archive scale.",
        "Every dimension of the data is also a set of ordinary, crawlable pages: by country, by year, by airline, by aircraft, by cause. The map is the experience; the pages are the index — and they are the fallback when the map cannot load.",
      ],
      items: [
        { label: "Ingestion", value: "Normalise · geocode · de-duplicate" },
        { label: "Map", value: "Server-side clustering, viewport streaming" },
        { label: "Discoverability", value: "Five programmatic archive dimensions" },
      ],
    },
    architecture: {
      caption:
        "An ingestion pipeline feeds a normalised store; the map reads a clustered tile API, the archive reads statically generated pages.",
      nodes: [
        { id: "sources", label: "Public sources", layer: 0, kind: "external", detail: "Heterogeneous" },
        { id: "ingest", label: "Ingestion", layer: 1, kind: "infra", detail: "Normalise + geocode" },
        { id: "db", label: "PostgreSQL", layer: 2, kind: "data", detail: "Canonical records" },
        { id: "tiles", label: "Cluster API", layer: 3, kind: "service", detail: "Viewport queries" },
        { id: "pages", label: "Archive pages", layer: 3, kind: "service", detail: "ISR by dimension" },
        { id: "map", label: "Interactive map", layer: 4, kind: "client" },
        { id: "browse", label: "Browse & search", layer: 4, kind: "client" },
        { id: "billing", label: "Premium", layer: 4, kind: "external", detail: "Subscriptions" },
      ],
      edges: [
        { from: "sources", to: "ingest" },
        { from: "ingest", to: "db" },
        { from: "db", to: "tiles" },
        { from: "db", to: "pages", label: "generate" },
        { from: "tiles", to: "map" },
        { from: "pages", to: "browse" },
        { from: "browse", to: "billing", label: "gated records" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "Two audiences share the site: someone following a specific historical accident, and someone exploring patterns. The map serves the second, the archive pages serve the first, and every marker has a permanent page behind it.",
        "The map's loading state is not a spinner — it explains what the map does and links straight into the browsable archive, so a slow connection never becomes a dead end.",
      ],
      items: [
        { label: "Entry points", value: "Map for exploration · pages for lookup" },
        { label: "Degradation", value: "Loading state links to the full archive" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "The subject matter sets the tone: factual, restrained, no dramatisation. Records are presented as archive entries with their sources attributable.",
        "Density is deliberate — the deadliest-accidents list, statistics and browse dimensions are all readable above the fold on a laptop.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Archive pages are statically generated per dimension and revalidated on ingestion, so tens of thousands of pages stay fast and current without a rebuild.",
        "The map library is code-split and loaded only when the viewport reaches it, keeping the initial page weight independent of the heaviest component on the site.",
        "Premium records sit behind a subscription check enforced on the server, never in the client — the paywall is not a CSS class.",
      ],
    },
    features: [
      { title: "Interactive crash map", description: "Regional clustering, airport and route overlays, viewport-scoped queries." },
      { title: "Archive by country", description: "Where accidents cluster geographically, as crawlable pages." },
      { title: "Archive by year", description: "How the accident record changes decade by decade." },
      { title: "Archive by airline & aircraft", description: "Operator and airframe records, with the full history behind Premium." },
      { title: "Archive by cause", description: "Recurring failure patterns across the record." },
      { title: "Statistics", description: "Countries, aircraft, deadliest years and cumulative totals." },
      { title: "Premium tier", description: "Subscription access to rankings and complete crash records, enforced server-side." },
      { title: "Corrections", description: "A structured route for readers to submit a correction to any record." },
    ],
    integrations: ["Geocoding", "Subscription billing", "Analytics", "Email", "Status monitoring"],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Map rendering"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL", "Ingestion pipeline", "ISR"] },
      { group: "Platform", items: ["Subscriptions", "CDN", "Monitoring"] },
    ],
    results: [
      { label: "Records mapped", value: "18,243", note: "1919 – 2026" },
      { label: "Archive dimensions", value: "5", note: "Country · year · airline · aircraft · cause" },
      { label: "Map fallback", value: "Full archive", note: "Site works without the map" },
      { label: "Paywall", value: "Server-enforced", note: "Premium records never reach the client" },
    ],
    outcome:
      "A reference work rather than a data dump: the same archive is explorable as a map, browsable as pages, and indexable as a century of records.",
    gallery: [
      { src: "/work/crashatlas/01.jpg", alt: "CrashAtlas accident map", caption: "The interactive map", device: "desktop" },
      { src: "/work/crashatlas/02.jpg", alt: "CrashAtlas records listing", caption: "Deadliest accidents on record", device: "desktop" },
      { src: "/work/crashatlas/03.jpg", alt: "CrashAtlas archive browse", caption: "Browse the archive", device: "desktop" },
      { src: "/work/crashatlas/mobile.jpg", alt: "CrashAtlas on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "glidex",
    name: "GLIDEX",
    url: "https://glidex-theta.vercel.app/ua",
    summary: "A multimodal logistics platform with routing, tracking and instant quoting",
    industry: "Logistics",
    industryKey: "logistics",
    year: "2026",
    scope: ["Web App", "Calculator", "Tracking", "i18n"],
    services: ["web", "backend", "automation", "api"],
    disciplines: ["Strategy", "UX", "UI", "Frontend", "Backend"],
    featured: true,
    accent: "#46d39a",
    strapline:
      "Sea, air, road, rail and multimodal freight across 74 countries — with a route planner, a live quote and shipment tracking on the public site.",
    duration: "14 weeks",
    team: "1 designer · 2 engineers",
    platforms: ["Public platform", "Route planner", "Pricing calculator", "Tracking"],
    locales: ["UA", "EN"],
    cover: { src: "/work/glidex/cover.jpg", alt: "GLIDEX logistics platform homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "Freight forwarding sells on certainty, but the industry's websites sell on brochure copy: a form, a phone number, and a quote three days later.",
        "The brief was to move the first three steps of the sales conversation — is this route possible, how long does it take, what does it cost — onto the site itself, in two languages, without oversimplifying a genuinely complex pricing model.",
      ],
      items: [
        { label: "Coverage", value: "74 countries · 42 terminals" },
        { label: "Modes", value: "Sea · air · road · rail · multimodal · warehousing" },
        { label: "Locales", value: "Ukrainian and English" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "An interactive corridor selector lets a visitor pick origin and destination and see the viable modes, transit times and constraints for that lane before any contact happens.",
        "The pricing calculator produces a transparent breakdown rather than a single figure — freight, handling, customs, surcharges — because in this industry a number without its components is not trusted.",
        "Tracking exposes shipment status with a real timeline, and compliance requirements surface before booking rather than after, which is where they usually derail a shipment.",
      ],
      items: [
        { label: "Route planner", value: "Corridor → modes → transit time" },
        { label: "Quoting", value: "Itemised breakdown, not a single number" },
        { label: "Compliance", value: "Surfaced before booking" },
      ],
    },
    architecture: {
      caption:
        "Localised static shell with dynamic route, rate and tracking services behind a single API layer.",
      nodes: [
        { id: "site", label: "Localised site", layer: 0, kind: "client", detail: "/ua · /en" },
        { id: "planner", label: "Route planner", layer: 0, kind: "client" },
        { id: "calc", label: "Rate calculator", layer: 0, kind: "client" },
        { id: "api", label: "API layer", layer: 1, kind: "service" },
        { id: "routes", label: "Route service", layer: 2, kind: "service", detail: "Corridors, transit" },
        { id: "rates", label: "Rate engine", layer: 2, kind: "service", detail: "Itemised pricing" },
        { id: "track", label: "Tracking", layer: 2, kind: "service", detail: "Status timeline" },
        { id: "db", label: "PostgreSQL", layer: 3, kind: "data" },
        { id: "crm", label: "CRM / enquiries", layer: 4, kind: "external" },
        { id: "carriers", label: "Carrier data", layer: 4, kind: "external" },
      ],
      edges: [
        { from: "site", to: "api" },
        { from: "planner", to: "api" },
        { from: "calc", to: "api" },
        { from: "api", to: "routes" },
        { from: "api", to: "rates" },
        { from: "api", to: "track" },
        { from: "routes", to: "db" },
        { from: "rates", to: "db" },
        { from: "track", to: "carriers" },
        { from: "api", to: "crm", label: "qualified enquiry" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The site is organised around the question a shipper actually starts with — a lane, not a service. Mode, terminal and vertical content all hang off the corridor they picked.",
        "Language is a routed segment, not a client-side toggle, so every localised page is independently linkable, cacheable and indexable.",
      ],
      items: [
        { label: "Primary axis", value: "Route first, service second" },
        { label: "i18n", value: "Routed locales, not a client switch" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Operational rather than glossy: schedules, transit times and cost components are typeset as data, with tabular figures that align down a column.",
        "Industry verticals — retail, e-commerce, automotive, pharma — each get their own constraints surfaced, because a pharma cold chain and a retail container are not the same sale.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Route and rate data are modelled as versioned reference data, so a tariff change is a dated record rather than a deploy.",
        "The calculator runs its arithmetic server-side and returns the breakdown, which keeps commercially sensitive pricing rules out of the browser bundle.",
      ],
    },
    features: [
      { title: "Corridor selector", description: "Interactive route planner across 74 countries with transit times." },
      { title: "Six transport modes", description: "Sea, air, road, rail, multimodal and warehousing, each with its own constraints." },
      { title: "Pricing calculator", description: "Itemised cost breakdown per shipment rather than a single opaque figure." },
      { title: "Shipment tracking", description: "Status timeline with detailed updates." },
      { title: "Compliance checks", description: "Documentation requirements surfaced before booking." },
      { title: "Industry verticals", description: "Retail, e-commerce, automotive and pharma with cold-chain handling." },
      { title: "Locations & terminals", description: "Office and terminal network with contact routing." },
      { title: "Bilingual", description: "Ukrainian and English as routed locales." },
    ],
    integrations: ["Carrier data", "CRM", "Tracking feeds", "Email notifications", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "Interactive maps"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL", "Rate engine", "REST API"] },
      { group: "Platform", items: ["i18n routing", "ISR", "CDN"] },
    ],
    results: [
      { label: "Sales conversation", value: "Starts on the site", note: "Route, time and cost before contact" },
      { label: "Quotes", value: "Itemised", note: "Freight, handling, customs, surcharges" },
      { label: "Locales", value: "UA + EN", note: "Routed, indexable, cacheable" },
      { label: "Pricing rules", value: "Server-side", note: "Never shipped to the browser" },
    ],
    outcome:
      "A forwarder's website that behaves like the operations platform behind it: a shipper can qualify their own lane before anyone picks up the phone.",
    gallery: [
      { src: "/work/glidex/01.jpg", alt: "GLIDEX route planner", caption: "Corridor selector", device: "desktop" },
      { src: "/work/glidex/02.jpg", alt: "GLIDEX services and modes", caption: "Transport modes", device: "desktop" },
      { src: "/work/glidex/03.jpg", alt: "GLIDEX tracking and pricing", caption: "Tracking and quoting", device: "desktop" },
      { src: "/work/glidex/mobile.jpg", alt: "GLIDEX on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "nova",
    name: "NOVA",
    url: "https://nova-ai-preview.vercel.app/",
    summary: "An AI research workspace where every answer leads back to the page it came from",
    industry: "AI & research",
    industryKey: "ai",
    year: "2026",
    scope: ["SaaS","Product UI","AI","Design system"],
    services: ["saas", "ai"],
    disciplines: ["Strategy", "UX", "UI", "Frontend", "AI"],
    featured: true,
    accent: "#e0703f",
    strapline:
      "Seven surfaces in one workspace and 149 citations across 24 sources — no answer you cannot open and check.",
    duration: "Ongoing",
    team: "1 designer · 1 engineer",
    platforms: ["Web app","Chat","Document library","Workspace search"],
    locales: ["EN"],
    cover: { src: "/work/nova/cover.jpg", alt: "NOVA home screen with chats, documents and the credit meter" },
    challenge: {
      heading: "Challenge",
      body: [
        "An assistant that answers confidently without showing where the answer came from is useless for research. You cannot quote it in a report, you cannot check it, and six months later you will not remember whether it was in a document or the model decided it.",
        "NOVA had to be a place of work rather than a chat with files attached: documents go in, questions get asked, and what comes out stays — as a saved insight, as a project with open questions, as a source carrying a count of how often it has been leaned on.",
      ],
      items: [
        { label: "Corpus", value: "24 documents · 421 pages · 37 MB" },
        { label: "Surfaces", value: "7" },
        { label: "Hard part", value: "The answer has to be checkable, not persuasive" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The citation became the unit of the interface. 149 references across 24 sources get a surface of their own: every source shows how many times it has been cited and in which conversations. “What is this based on” is a screen, not a search through chat history.",
        "The chat shows what it actually read: “4 in context” sits beside the answer — not a metaphor, the number of documents that went in. The model budget is in plain sight too, in the sidebar: 18,420 of 25,000 credits. A product that spends money per call should not hide the meter.",
      ],
    },
    architecture: {
      caption: "Everything the chat shows comes out of the same index the library fills — and comes back with a citation.",
      nodes: [
        { id: "workspace", label: "Workspace", layer: 0, kind: "client" },
        { id: "chat", label: "Chat", layer: 1, kind: "service" },
        { id: "library", label: "Library", layer: 1, kind: "service" },
        { id: "search", label: "Search", layer: 1, kind: "service" },
        { id: "context", label: "Context assembly", layer: 2, kind: "service" },
        { id: "index", label: "Document index", layer: 2, kind: "data" },
        { id: "citations", label: "Citations", layer: 3, kind: "data" },
        { id: "model", label: "Model", layer: 3, kind: "external" },
      ],
      edges: [
        { from: "workspace", to: "chat" },
        { from: "workspace", to: "library" },
        { from: "workspace", to: "search" },
        { from: "chat", to: "context" },
        { from: "library", to: "index" },
        { from: "search", to: "index" },
        { from: "context", to: "index" },
        { from: "context", to: "model" },
        { from: "model", to: "citations" },
        { from: "citations", to: "chat" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "Research does not fit in one list, so the workspace is split into seven surfaces: a home for what has been happening, chat, library, insights, search, projects and sources. Each answers a different question — what do I already know, what did I ask, what is it standing on.",
        "A project here is a set of open questions rather than a folder: “2 of 4 research questions answered” sits on the card. That framing is what stops research turning into an archive of conversations with nothing finished.",
      ],
      items: [
        { label: "Search", value: "Ctrl K — documents, chats, insights, projects" },
        { label: "New chat", value: "Ctrl N" },
        { label: "Projects", value: "8, four of them active" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "A dark surface and one warm accent. Orange marks exactly what starts work — “New chat” and the active section; everything else lives on greys, so an hour inside it does not tire the eye.",
        "Density is set for reading: document and source rows carry format, size, page count and date on one line, with none of the air a card grid would demand. This is somewhere a shift gets worked, not a showroom.",
      ],
    },
    development: {
      heading: "Build",
      body: [
        "All seven surfaces are assembled from one component library: the list row, the metadata card, the counter, the tag filter and the detail panel repeat everywhere. Adding an eighth surface is assembly, not another screen drawn from scratch.",
        "The states usually left until last are in from the start: an empty library, pinned conversations, the archive, a document still processing, and the credit budget run out.",
      ],
    },
    features: [
      { title: "Sources with counts", description: "24 sources, 149 citations: each one shows how often it is cited and where." },
      { title: "Context in the open", description: "The number of documents that actually went into context sits beside the answer." },
      { title: "Projects as questions", description: "Research runs as a list of questions with answered/open state, not a folder of files." },
      { title: "Search across everything", description: "Ctrl K searches documents, conversations, insights and projects at once." },
      { title: "Saved insights", description: "31 findings with tags — what is left once a conversation is closed." },
      { title: "A visible budget", description: "Model credit usage is in the sidebar, not buried in billing." },
    ],
    integrations: ["PDF","DOCX","CSV","Markdown","Web pages"],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "AI", items: ["Retrieval", "Citations", "Context assembly"] },
      { group: "Product", items: ["Design system", "Keyboard shortcuts", "Workspace search"] },
    ],
    results: [
      { label: "Workspace surfaces", value: "7", note: "Home · chat · documents · insights · search · projects · sources" },
      { label: "Citations across 24 sources", value: "149", note: "Every one opens the page it came from" },
      { label: "Indexed", value: "421 pages", note: "24 files, 37 MB" },
      { label: "Model budget", value: "In plain sight", note: "18,420 / 25,000 credits in the sidebar" },
    ],
    outcome:
      "An AI workspace you can argue with: any statement is one click from the page that produced it — which is the whole difference between a research tool and a persuasive chat.",
    gallery: [
      { src: "/work/nova/01.jpg", alt: "NOVA conversation list with pinned chats", caption: "Conversations", device: "desktop" },
      { src: "/work/nova/02.jpg", alt: "NOVA sources with citation counts", caption: "Sources and citations", device: "desktop" },
      { src: "/work/nova/03.jpg", alt: "NOVA research projects with progress", caption: "Projects", device: "desktop" },
      { src: "/work/nova/mobile.jpg", alt: "NOVA on mobile", caption: "Mobile", device: "mobile" },
    ],
  },
  {
    slug: "motion",
    name: "MOTION",
    url: "https://motion-app-check.vercel.app/",
    summary: "A mobility and activity app for rides, routes and weekly goals",
    industry: "Mobility & fitness",
    industryKey: "mobility",
    year: "2026",
    scope: ["Mobile app", "Product UI", "Charts", "Design system"],
    services: ["mobile", "web"],
    disciplines: ["Strategy", "UX", "UI", "Mobile", "Frontend"],
    featured: true,
    accent: "#d4fb3c",
    strapline:
      "Five screens on a single 390 × 844 canvas — where the first second answers “how is today going”, and fifty sessions sit one tap underneath.",
    duration: "6 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Mobile application", "Route explorer", "Goal tracking", "Device-frame web demo"],
    locales: ["EN"],
    cover: { src: "/work/motion/cover.jpg", alt: "MOTION home screen in its device frame" },
    challenge: {
      heading: "Challenge",
      body: [
        "Activity apps fail in one of two directions. Either the number you opened the app for is buried under a dashboard, or it is the only thing there and you cannot do anything with it. MOTION had to answer “how is today going” in the first second and still hold fifty sessions, thirty places and nine goals behind that answer.",
        "It is also a phone app that lives in a browser. Everything is drawn on one 390 × 844 canvas with no desktop layout to escape into, so every list, sheet and chart has to work at the width of a hand — including the places where a wider column would usually solve the problem.",
      ],
      items: [
        { label: "Canvas", value: "390 × 844, no desktop rewrite" },
        { label: "Content", value: "50 sessions · 30 places · 9 goals" },
        { label: "Core difficulty", value: "One glance first, depth underneath" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The home screen answers and then stops: today's distance, the share of the daily goal it covers, and the change against last week. The four tiles, the week chart and the last three sessions are all deliberately read second.",
        "Depth is one tap away across the other four screens, and detail opens as a bottom sheet rather than a new page — so opening a route or a session never costs you your position in the list you were reading.",
        "Every figure comes from one local store. The week total on the home chart, the 538 km on Activity and the progress on a weekly goal are the same sessions counted once, which is what stops the app disagreeing with itself while it is offline.",
      ],
      items: [
        { label: "Home", value: "One number, then the rest" },
        { label: "Depth", value: "Bottom sheets, not new pages" },
        { label: "Figures", value: "One store, counted once" },
      ],
    },
    architecture: {
      caption:
        "A local-first client. Screens read a single store, the store derives every total from the same session log, and the log persists to the device.",
      nodes: [
        { id: "shell", label: "Vite + React shell", layer: 0, kind: "client", detail: "390 × 844" },
        { id: "screens", label: "Five screens", layer: 1, kind: "client", detail: "Home → Profile" },
        { id: "sheets", label: "Bottom sheets", layer: 1, kind: "client", detail: "Gesture-driven" },
        { id: "store", label: "App state", layer: 2, kind: "service", detail: "One store" },
        { id: "derived", label: "Derived totals", layer: 3, kind: "service", detail: "Weeks, streaks, goals" },
        { id: "sessions", label: "Session log", layer: 4, kind: "data", detail: "50 sessions" },
        { id: "places", label: "Places & routes", layer: 4, kind: "data", detail: "30 entries" },
        { id: "goals", label: "Goal model", layer: 4, kind: "data", detail: "9 active" },
        { id: "local", label: "Device storage", layer: 5, kind: "data", detail: "Offline-first" },
        { id: "prefs", label: "System preferences", layer: 5, kind: "external", detail: "Theme · reduced motion" },
      ],
      edges: [
        { from: "shell", to: "screens" },
        { from: "shell", to: "sheets" },
        { from: "screens", to: "store" },
        { from: "sheets", to: "store" },
        { from: "store", to: "derived" },
        { from: "derived", to: "sessions" },
        { from: "derived", to: "goals" },
        { from: "store", to: "places" },
        { from: "sessions", to: "local", label: "persist" },
        { from: "goals", to: "local" },
        { from: "shell", to: "prefs", label: "theme & motion" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "Navigation is a five-item bar within thumb reach, and the app opens on the screen people actually come back for. Filters on Activity, Explore and Goals are chips rather than menus, because a menu costs two taps to reveal what a chip states outright.",
        "The weekly chart is not only a picture. Every bar carries its own sentence — “Thursday: 12.4 kilometres over 3 trips” — so the same information exists for a screen reader and for anyone who cannot judge a bar height at a glance.",
      ],
      items: [
        { label: "Reach", value: "Five-item bar at thumb height" },
        { label: "Filtering", value: "Chips, not menus" },
        { label: "Charts", value: "Every bar readable as a sentence" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Near-monochrome with a single acid-lime accent that marks progress and the primary action and nothing else — the goal ring, the active tab, the Start ride button. When the accent means “this is your progress”, it cannot also mean decoration.",
        "Numbers are the typography: distance is set large with its unit small beside it, so 12.4 KM reads as one measurement rather than a number and a word. Light and dark are designed as a pair, not one inverted into the other.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "State is local-first. Sessions, saved places and goal progress live in one store that persists to the device, so the app opens with your data already in it rather than waiting for a network to answer.",
        "Charts are Recharts driven by the app's own tokens instead of the library's defaults, and route lines are drawn with Framer Motion — a route card animates its own path rather than loading a map tile.",
        "Every animation has a still state. Under prefers-reduced-motion the sheets, the progress ring and the drawn routes resolve instantly to their end position instead of being switched off into blankness.",
      ],
    },
    features: [
      { title: "Today's activity", description: "Distance against the daily goal with a progress ring and the change on last week." },
      { title: "Weekly chart", description: "Seven days of distance and trips, each bar also written out as a sentence." },
      { title: "Session history", description: "Fifty sessions grouped by day and filterable by ride, run or walk, with distance and duration on every row." },
      { title: "Explore", description: "Thirty routes and places filtered by coffee, parks, restaurants and scenic, each with rating, distance, duration and district." },
      { title: "Animated routes", description: "Route cards draw their own line instead of fetching a map tile." },
      { title: "Goals", description: "Nine active goals across daily, weekly and monthly horizons, each with what is left and how long there is to do it." },
      { title: "Bottom sheets", description: "Detail opens as a draggable sheet, so you never lose your place in the list behind it." },
      { title: "Profile", description: "Streak, month and all-time totals, units, theme, notifications and a local data reset." },
    ],
    integrations: ["Device storage", "System theme", "Reduced-motion preference"],
    stack: [
      { group: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
      { group: "Motion & charts", items: ["Framer Motion", "Recharts"] },
      { group: "State", items: ["Local-first store", "Persisted session log"] },
    ],
    results: [
      { label: "Screens", value: "5", note: "Home · Activity · Explore · Goals · Profile" },
      { label: "Canvas", value: "390 × 844", note: "No desktop rewrite" },
      { label: "State", value: "Local-first", note: "Opens with your data, network or not" },
      { label: "Motion", value: "Fully reducible", note: "Every animation has a still state" },
    ],
    outcome:
      "A phone app that behaves like one inside a browser tab: it opens on the number you came for, and everything else is one tap and one store away.",
    gallery: [
      { src: "/work/motion/01.jpg", alt: "MOTION activity history grouped by day", caption: "Session history", device: "desktop" },
      { src: "/work/motion/02.jpg", alt: "MOTION explore screen with routes and places", caption: "Routes and places", device: "desktop" },
      { src: "/work/motion/03.jpg", alt: "MOTION goals screen with progress", caption: "Goals", device: "desktop" },
      { src: "/work/motion/mobile.jpg", alt: "MOTION on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "noir",
    name: "NOIR X1",
    url: "https://noir-electric.vercel.app/",
    summary: "Product site and configurator for a premium electric bicycle",
    industry: "Electric mobility",
    industryKey: "mobility",
    year: "2026",
    scope: ["Website", "Product", "Configurator", "Editorial"],
    services: ["web", "ecommerce"],
    disciplines: ["Strategy", "UX", "UI", "Frontend"],
    featured: true,
    accent: "#c2703f",
    strapline:
      "Eleven sections, one machine, and a configurator that has to name a price — on a page whose entire argument is restraint.",
    duration: "9 weeks",
    team: "1 designer · 2 engineers",
    platforms: ["Marketing site", "Interactive configurator", "Specification surfaces"],
    locales: ["EN"],
    cover: { src: "/work/noir/cover.jpg", alt: "NOIR X1 homepage with the bicycle in profile" },
    challenge: {
      heading: "Challenge",
      body: [
        "NOIR's entire claim is subtraction: every part that did not earn its place was removed rather than styled. A site for that product cannot sell with ornament, because the ornament would contradict the thing it is selling.",
        "The commercial problem sits underneath it. Electric bicycles are bought on three numbers — range, power, weight — and every competitor prints the same three. Repeating them proves nothing; the site had to make them mean something, and then quote a real price without turning into a shop.",
      ],
      items: [
        { label: "Product", value: "140 km · 750 W · 19.8 kg" },
        { label: "Range", value: "X1 · X1 S · X1 Carbon, €3,490 – €5,490" },
        { label: "Core difficulty", value: "Restraint that still has to sell" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The page is eleven numbered sections read as one continuous argument, each doing exactly one job: what the object is for, what was removed, what the numbers mean, how it behaves, what it costs.",
        "Specifications are presented one at a time rather than as a table. Choosing 'range' fills the screen with 140 km and the conditions it was measured under — mixed urban loop, Tour mode, 75 kg rider, 18 °C. A number with its conditions attached is a different claim from a number on its own.",
        "The configurator is four decisions — model, finish, accessories, extras — with the total recalculating as each is made, and it ends in a configuration request rather than a checkout, because this is a bike that gets delivered and assembled per city.",
      ],
      items: [
        { label: "Narrative", value: "Eleven sections, one argument" },
        { label: "Specifications", value: "One metric at a time, with its conditions" },
        { label: "Configurator", value: "Four decisions, live total" },
      ],
    },
    architecture: {
      caption:
        "A static shell with interactive islands. Model, finish and accessory pricing live in one module that both the models section and the configurator read.",
      nodes: [
        { id: "site", label: "Next.js App Router", layer: 0, kind: "client", detail: "Static shell" },
        { id: "sections", label: "Section islands", layer: 1, kind: "client", detail: "Scroll-linked" },
        { id: "config", label: "Configurator", layer: 1, kind: "client", detail: "Four steps" },
        { id: "catalog", label: "Product model", layer: 2, kind: "data", detail: "Models, finishes, extras" },
        { id: "pricing", label: "Pricing module", layer: 2, kind: "service", detail: "Running total" },
        { id: "request", label: "Configuration request", layer: 3, kind: "service", detail: "Server action" },
        { id: "crm", label: "CRM / email", layer: 4, kind: "external" },
        { id: "analytics", label: "Analytics", layer: 4, kind: "external" },
      ],
      edges: [
        { from: "site", to: "sections" },
        { from: "site", to: "config" },
        { from: "sections", to: "catalog" },
        { from: "config", to: "catalog" },
        { from: "config", to: "pricing", label: "recalculate" },
        { from: "config", to: "request", label: "with the build attached" },
        { from: "request", to: "crm" },
        { from: "site", to: "analytics" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The reading order is the buying order: what this is for, what was taken out, what the numbers mean, how it rides, what it costs. Someone who only wants the price can reach the configurator from the header in one click and skip the argument entirely.",
        "Every interactive block — the specification switcher, the riding modes, the configurator — has a readable static state, so the whole page still makes its case without JavaScript and under reduced motion.",
      ],
      items: [
        { label: "Reading order", value: "Purpose → subtraction → numbers → price" },
        { label: "Shortcut", value: "Configurator reachable from the header" },
        { label: "Fallback", value: "Every island degrades to static text" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Near-monochrome, with a single copper accent that appears once per section — on the section number and nowhere else. When the accent is that scarce, it works as punctuation instead of decoration.",
        "Display type is set very large and very tight, and every measurement uses tabular figures with the unit typeset smaller alongside it, so 140 KM and 19.8 KG align down a column without the units competing with the numbers.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Prices exist once. The models section and the configurator both read the same pricing module, so a surcharge cannot be right in one place and stale in the other.",
        "Twenty viewports of scroll-linked motion run off a single shared observer rather than per-section listeners, and the entire choreography collapses to instant state changes under prefers-reduced-motion.",
        "The bicycle is vector rather than photography — it stays sharp at any density, recolours with the finish selection, and costs a fraction of the weight a hero photograph would.",
      ],
    },
    features: [
      { title: "Eleven-section narrative", description: "Philosophy, object, technology, specifications, modes, app, performance, sustainability, models, gallery, configurator." },
      { title: "Specification switcher", description: "Range, power, weight, top speed and charge shown one at a time, each with its measurement conditions." },
      { title: "Riding modes", description: "City, Tour and Sport compared on range, power, acceleration and assisted top speed." },
      { title: "Model comparison", description: "X1, X1 S and X1 Carbon with three finishes and per-model figures." },
      { title: "Four-step configurator", description: "Model, finish, accessories and range extender, with the total updating as you decide." },
      { title: "Connected-ride section", description: "Dashboard, ride statistics, navigation and bike settings shown as the app surfaces them." },
      { title: "Sustainability facts", description: "91% drive efficiency, 1,200 cycles to 80% capacity, single-material recycling streams." },
      { title: "Configuration request", description: "The finished build submitted through a server action rather than a cart." },
    ],
    integrations: ["Configuration request routing", "Email notifications", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"] },
      { group: "Platform", items: ["Static generation", "Server actions", "Vercel"] },
    ],
    results: [
      { label: "Sections", value: "11", note: "One argument, not a brochure" },
      { label: "Specifications", value: "One at a time", note: "Each with its measurement conditions" },
      { label: "Pricing", value: "On the page", note: "From €3,490, VAT included" },
      { label: "Hero imagery", value: "Vector", note: "Recolours with the finish, weighs nothing" },
    ],
    outcome:
      "A product page that practises what the product claims. Nothing on it is decoration, and the price is reached by argument rather than by a button.",
    gallery: [
      { src: "/work/noir/01.jpg", alt: "NOIR X1 specifications section showing range", caption: "Specifications, one at a time", device: "desktop" },
      { src: "/work/noir/02.jpg", alt: "NOIR X1 model comparison with finishes", caption: "Three models", device: "desktop" },
      { src: "/work/noir/03.jpg", alt: "NOIR X1 configurator with a running total", caption: "The configurator", device: "desktop" },
      { src: "/work/noir/mobile.jpg", alt: "NOIR X1 on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "pulse",
    name: "PULSE",
    url: "https://pulse-rose-one.vercel.app/",
    summary: "A business intelligence workspace for revenue, cash flow, projects and goals",
    industry: "Business intelligence",
    industryKey: "saas",
    year: "2026",
    scope: ["SaaS", "Product UI", "Web App", "Design system"],
    services: ["saas", "web", "backend"],
    disciplines: ["Strategy", "UX", "UI", "Frontend", "Backend"],
    featured: true,
    accent: "#6b62e8",
    strapline:
      "Eight workspaces over one ledger — so revenue on the overview and revenue in the analytics breakdown are the same number, computed once.",
    duration: "12 weeks",
    team: "1 designer · 2 engineers",
    platforms: ["Web application", "Analytics workspace", "Transaction ledger"],
    locales: ["EN"],
    cover: { src: "/work/pulse/cover.jpg", alt: "PULSE overview workspace with revenue and cash flow" },
    challenge: {
      heading: "Challenge",
      body: [
        "Business intelligence tools split into two useless halves: a chart library with a login, which asks you to build the report yourself, and a fixed report pack, which answers a question you did not have. The person in the middle — an owner who wants to know how the month is actually going — is served by neither.",
        "The hard engineering problem is agreement. Revenue appears on the overview tile, in the revenue chart, in the by-customer breakdown, in the month-over-month series and as progress against a goal. If those are five calculations, they will disagree, and the first disagreement a user notices ends their trust in the whole product.",
      ],
      items: [
        { label: "Surfaces", value: "8 workspaces over one ledger" },
        { label: "Ledger", value: "168 transactions, filtered and paginated" },
        { label: "Core difficulty", value: "One number, five places, no drift" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "A single derived-metrics layer computes every figure once from the ledger, and every surface reads it. A KPI tile and the chart beside it are not two implementations of the same idea — they are one result rendered twice.",
        "The transaction table is the primitive the rest of the product is built from: search, filters, column control, sorting and pagination. Every aggregate elsewhere is a view over it, and every aggregate links back to the rows that produced it, so a surprising number is one click from its explanation.",
        "Charts use a fixed six-series palette applied identically everywhere, so a category is the same colour on every surface, and status is always carried by a label as well as a colour rather than by colour alone.",
      ],
      items: [
        { label: "Metrics", value: "Derived once, read everywhere" },
        { label: "Primitive", value: "The ledger; everything else is a view" },
        { label: "Encoding", value: "Status by label, not by colour alone" },
      ],
    },
    architecture: {
      caption:
        "Every surface reads the derived-metrics layer rather than the tables directly, which is what keeps a tile and a chart from disagreeing.",
      nodes: [
        { id: "app", label: "Next.js App Router", layer: 0, kind: "client", detail: "Workspace shell" },
        { id: "surfaces", label: "Eight workspaces", layer: 1, kind: "client", detail: "Overview → settings" },
        { id: "charts", label: "SVG charts", layer: 1, kind: "client", detail: "No chart library" },
        { id: "api", label: "API layer", layer: 2, kind: "service" },
        { id: "metrics", label: "Derived metrics", layer: 3, kind: "service", detail: "Computed once" },
        { id: "ledger", label: "Transaction ledger", layer: 4, kind: "data" },
        { id: "entities", label: "Customers · projects · team", layer: 4, kind: "data" },
        { id: "db", label: "PostgreSQL", layer: 5, kind: "data" },
        { id: "auth", label: "Auth & seats", layer: 5, kind: "external", detail: "Plan limits" },
        { id: "export", label: "CSV export", layer: 5, kind: "external" },
      ],
      edges: [
        { from: "app", to: "surfaces" },
        { from: "surfaces", to: "charts" },
        { from: "surfaces", to: "api" },
        { from: "api", to: "metrics" },
        { from: "metrics", to: "ledger" },
        { from: "metrics", to: "entities" },
        { from: "ledger", to: "db" },
        { from: "entities", to: "db" },
        { from: "api", to: "auth", label: "seats & roles" },
        { from: "api", to: "export", label: "filtered rows" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The workspace opens on the question people actually arrive with — how is this period going — and everything else is one move away: a command palette for people who know what they want, a sidebar for people who are browsing.",
        "Every total is a link. A cash-flow figure goes to the transactions that produced it with the filter already applied, which turns the dashboard from something you read into something you can interrogate.",
        "Nothing is encoded by colour alone. 'At risk' says at risk, deltas carry a direction arrow, and an increase in expenses is styled as bad even though it is an increase.",
      ],
      items: [
        { label: "Entry", value: "How is this period going" },
        { label: "Every aggregate", value: "Links to the rows behind it" },
        { label: "Accessibility", value: "Status by label, direction by glyph" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Light and dark are both designed rather than one derived from the other — the palettes are paired token for token, including the chart series, so neither theme is the compromise.",
        "Money is typeset as data: tabular figures, right-aligned, consistent precision, and a sign that never has to be inferred from a colour.",
        "Density is deliberate. Four KPI tiles, the revenue chart and the start of cash flow all sit above the fold on a laptop, because scrolling to compare two numbers is how a dashboard fails.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Metrics are computed server-side from the ledger and cached per period, so a tile and a chart physically cannot take different code paths to the same figure.",
        "Charts are hand-rendered SVG with no charting dependency. That keeps the bundle small, makes both themes a pure token swap, and means the axis and grid respect the same line tokens as the rest of the interface.",
        "Filtering, sorting and pagination happen server-side against indexed columns, so the ledger behaves the same at a hundred and sixty-eight rows as it will at a hundred and sixty-eight thousand.",
      ],
    },
    features: [
      { title: "Overview workspace", description: "Revenue, expenses, net profit and cash flow with sparklines and period-over-period comparison." },
      { title: "Analytics", description: "Revenue by month and by customer, expense categories, customer growth, profit margin against target." },
      { title: "Conversion funnel", description: "Visitors through signups, activation and trials to paying customers, with the drop-off at each stage." },
      { title: "Transaction ledger", description: "Search, filters, column control, sorting, server-side pagination and export." },
      { title: "Projects", description: "Delivery status, budget burn and deadlines, as a board or a table, with at-risk projects surfaced." },
      { title: "Goals", description: "Quarterly targets with progress and an honest on-track or behind status." },
      { title: "Command palette", description: "K navigation and search across every workspace." },
      { title: "Light and dark themes", description: "Paired token for token, chart series included." },
    ],
    integrations: ["Payment and payroll feeds", "CSV export", "Email notifications", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SVG charts"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL", "Derived-metrics layer"] },
      { group: "Platform", items: ["Auth & seats", "Role-based access", "CDN"] },
    ],
    results: [
      { label: "Workspaces", value: "8", note: "One ledger underneath all of them" },
      { label: "Figures", value: "Derived once", note: "A tile and a chart share the code path" },
      { label: "Charts", value: "No library", note: "SVG, themed by token" },
      { label: "Themes", value: "Light + dark", note: "Paired, neither one derived" },
    ],
    outcome:
      "A dashboard you can argue with. Every number on it is one click from the rows that produced it, which is the difference between a report and a tool.",
    gallery: [
      { src: "/work/pulse/01.jpg", alt: "PULSE analytics workspace with revenue breakdowns", caption: "Analytics", device: "desktop" },
      { src: "/work/pulse/02.jpg", alt: "PULSE transaction ledger with filters", caption: "The transaction ledger", device: "desktop" },
      { src: "/work/pulse/03.jpg", alt: "PULSE projects board with budget and deadlines", caption: "Projects", device: "desktop" },
      { src: "/work/pulse/mobile.jpg", alt: "PULSE on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "aera",
    name: "AERA Systems",
    url: "https://aera-phi.vercel.app/",
    summary: "Product site and interface system for an operational intelligence platform",
    industry: "B2B SaaS",
    industryKey: "saas",
    year: "2026",
    scope: ["SaaS", "Product UI", "Web App", "Design system"],
    services: ["saas", "web", "ai"],
    disciplines: ["Strategy", "UX", "UI", "Frontend"],
    featured: true,
    accent: "#4d7cff",
    strapline:
      "An intelligence layer that sits between the tools a company already runs — and a product site that has to explain that in one screen.",
    duration: "10 weeks",
    team: "1 designer · 2 engineers",
    platforms: ["Marketing site", "Interactive product demo", "Command palette"],
    locales: ["EN"],
    cover: { src: "/work/aera/cover.jpg", alt: "AERA Systems homepage with the signal field visual" },
    challenge: {
      heading: "Challenge",
      body: [
        "AERA is not a dashboard and not a replacement for anything — it is a layer between existing systems. That is a genuinely hard thing to explain, and the category is crowded with products that all claim to turn data into decisions.",
        "A conventional SaaS marketing page would have flattened it into the same promises as everyone else. The site had to demonstrate the product's behaviour, not describe it.",
      ],
      items: [
        { label: "Category", value: "Operational intelligence" },
        { label: "Core difficulty", value: "The product is a layer, not a screen" },
        { label: "Requirement", value: "Show the mechanism, not the claim" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "We built the page as a sequence that walks the product's own pipeline: the signal field where data arrives, the decision engine that resolves it, the living workspace where a person acts, and the timeline that records what happened.",
        "Each stage is an interactive component rather than an illustration, so a visitor reads the argument by using a small version of the product.",
        "A K command palette runs across the whole site — the same interaction pattern the product uses, which makes the interface itself part of the pitch.",
      ],
      items: [
        { label: "Narrative", value: "Six stages mirroring the product pipeline" },
        { label: "Interaction", value: "K palette shared with the product" },
        { label: "Rendering", value: "Server components with client islands" },
      ],
    },
    architecture: {
      caption:
        "Static shell with interactive islands. Nothing heavy loads until the section it belongs to is in view.",
      nodes: [
        { id: "page", label: "Next.js App Router", layer: 0, kind: "client", detail: "RSC shell" },
        { id: "islands", label: "Client islands", layer: 1, kind: "client", detail: "Per-section" },
        { id: "palette", label: "Command palette", layer: 1, kind: "client", detail: "K, site-wide" },
        { id: "motion", label: "Motion layer", layer: 2, kind: "service", detail: "Scroll-linked" },
        { id: "content", label: "Content model", layer: 2, kind: "data", detail: "Typed objects" },
        { id: "lead", label: "Access request", layer: 3, kind: "service", detail: "Server action" },
        { id: "analytics", label: "Analytics", layer: 3, kind: "external" },
      ],
      edges: [
        { from: "page", to: "islands", label: "hydrate on view" },
        { from: "page", to: "palette" },
        { from: "islands", to: "motion" },
        { from: "page", to: "content" },
        { from: "palette", to: "lead" },
        { from: "islands", to: "analytics" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The page answers the three questions a technical buyer asks in order: what does it sit on top of, what does it actually do to a signal, and what changes in my day.",
        "Every interactive section is usable with a keyboard and degrades to a static, readable state — the argument survives without JavaScript, which also means it survives for a crawler.",
      ],
      items: [
        { label: "Reading order", value: "Where it sits → what it does → what changes" },
        { label: "Fallback", value: "Every interactive block has a static state" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Instrument-panel restraint: near-monochrome surfaces, one signal colour, monospace for anything that represents a measurement.",
        "Numbers are typeset as data, not as decoration — figures share a tabular alignment across the page so they read as a system.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Next.js App Router with server components by default; interactive sections are isolated client islands loaded when they enter the viewport, which keeps the initial payload small despite the density of the page.",
        "Scroll-linked motion is driven by a single shared observer rather than per-component listeners, and the whole choreography collapses to instant state changes under prefers-reduced-motion.",
      ],
    },
    features: [
      { title: "Signal field", description: "Interactive visual of data arriving from across a company's stack." },
      { title: "Decision engine", description: "Step-through of how a raw signal becomes a recommended action." },
      { title: "Living workspace", description: "A working miniature of the product's adaptive dashboard." },
      { title: "Operational timeline", description: "Decision history rendered as a scrubable sequence." },
      { title: "Command palette", description: "Site-wide K navigation using the product's own interaction model." },
      { title: "Access request", description: "Short qualified form wired to a server action." },
    ],
    integrations: ["Analytics", "Access-request pipeline", "Email notifications"],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"] },
      { group: "Platform", items: ["Server actions", "Edge rendering", "Vercel"] },
    ],
    results: [
      { label: "Product story", value: "Six interactive stages", note: "Mechanism shown, not claimed" },
      { label: "Interaction parity", value: "K", note: "Site uses the product's own pattern" },
      { label: "Payload", value: "Islands only", note: "Interactive code loads on view" },
      { label: "Fallback", value: "Fully static", note: "Readable without JavaScript" },
    ],
    outcome:
      "A product site that argues by demonstration. The interface is the evidence for the claim the copy makes.",
    gallery: [
      { src: "/work/aera/01.jpg", alt: "AERA signal field section", caption: "The signal field", device: "desktop" },
      { src: "/work/aera/02.jpg", alt: "AERA decision engine section", caption: "Decision engine", device: "desktop" },
      { src: "/work/aera/03.jpg", alt: "AERA workspace and metrics", caption: "Living workspace", device: "desktop" },
      { src: "/work/aera/mobile.jpg", alt: "AERA on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "oriel",
    name: "ORIEL Development",
    url: "https://oriel-peach.vercel.app/",
    summary: "A residential developer platform with a live apartment catalog across four complexes",
    industry: "Real Estate",
    industryKey: "real-estate",
    year: "2026",
    scope: ["Web App", "Catalog", "Backend", "CRM integration"],
    services: ["web", "backend", "crm", "ecommerce"],
    disciplines: ["Strategy", "UX", "UI", "Frontend", "Backend"],
    featured: true,
    accent: "#ffb020",
    strapline:
      "Four residential complexes, 522 apartments, monthly construction progress — one platform where availability and price are always the live ones.",
    duration: "12 weeks",
    team: "1 designer · 2 engineers",
    platforms: ["Public platform", "Apartment catalog", "Progress reporting"],
    locales: ["UA"],
    cover: { src: "/work/oriel/cover.jpg", alt: "ORIEL Development homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "A developer selling four complexes at once has an inventory problem disguised as a marketing problem. Five hundred apartments across four projects change status daily, and a PDF price list is out of date the week it is published.",
        "Buyers also need to trust that a building under construction will be finished — which is a communication problem no amount of rendering solves.",
      ],
      items: [
        { label: "Projects", value: "VERDE · SOLEA · CORTE · RIVA" },
        { label: "Inventory", value: "522 apartments" },
        { label: "Price range", value: "₴1.78M – ₴7.93M" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "A single normalised inventory model behind all four complexes — project, building, floor, apartment, layout, status — so one catalog serves every project and a new complex is data rather than a new site section.",
        "Monthly construction reports with photography and completion percentages are a first-class content type, not a news post. Progress is something a buyer can check, which is what actually builds confidence.",
        "Purchase options — full payment, instalments, mortgage, trade-in — are modelled per apartment, so the financing conversation starts from what is genuinely available for that unit.",
      ],
      items: [
        { label: "Inventory model", value: "Project → building → floor → apartment" },
        { label: "Progress", value: "Dated reports with completion %" },
        { label: "Financing", value: "Options resolved per unit" },
      ],
    },
    architecture: {
      caption:
        "Read-optimised inventory cache in front of the developer's sales system, with statically generated project and unit pages.",
      nodes: [
        { id: "site", label: "Public site", layer: 0, kind: "client", detail: "ISR" },
        { id: "catalog", label: "Apartment catalog", layer: 0, kind: "client", detail: "Filters" },
        { id: "api", label: "API layer", layer: 1, kind: "service" },
        { id: "inv", label: "Inventory service", layer: 2, kind: "service", detail: "Status + pricing" },
        { id: "content", label: "Content", layer: 2, kind: "data", detail: "Projects, progress" },
        { id: "db", label: "PostgreSQL", layer: 3, kind: "data" },
        { id: "crm", label: "Sales CRM", layer: 4, kind: "external", detail: "Source of truth" },
        { id: "maps", label: "Map provider", layer: 4, kind: "external" },
        { id: "notify", label: "Lead notifications", layer: 4, kind: "external" },
      ],
      edges: [
        { from: "site", to: "api" },
        { from: "catalog", to: "api", label: "availability" },
        { from: "api", to: "inv" },
        { from: "api", to: "content" },
        { from: "inv", to: "db" },
        { from: "inv", to: "crm", label: "sync" },
        { from: "api", to: "notify", label: "enquiry" },
        { from: "site", to: "maps" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "People shop for apartments by constraint — budget, rooms, floor, completion date — so the catalog leads with filters and the marketing narrative sits alongside rather than in front of it.",
        "Every apartment and filter combination is addressable by URL, so a sales agent can send a link to exactly the unit they discussed.",
      ],
      items: [
        { label: "Entry", value: "Filter-first catalog" },
        { label: "Sharing", value: "Every unit has a permanent URL" },
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Architectural restraint — the buildings are the visual material, the interface stays quiet around them. Typography carries the hierarchy, not colour.",
        "The design philosophy content (sound insulation, natural light, material longevity) is treated as editorial rather than as feature bullets, because that is the register the buyer responds to.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Project and unit pages are statically generated and revalidated when inventory changes, so a five-hundred-unit catalog stays fast without a rebuild per status change.",
        "Availability reads come from a cache that is reconciled against the sales system on a schedule, so a missed webhook costs freshness rather than correctness.",
      ],
    },
    features: [
      { title: "Four project sites in one", description: "VERDE, SOLEA, CORTE and RIVA share an inventory model and a component system." },
      { title: "Apartment catalog", description: "522 units filterable by project, rooms, floor, area, price and status." },
      { title: "Construction progress", description: "Monthly dated reports with photography and completion percentages." },
      { title: "Purchase options", description: "Full payment, instalments, mortgage and trade-in resolved per apartment." },
      { title: "Location map", description: "All projects with surrounding infrastructure context." },
      { title: "Commercial spaces", description: "Separate inventory track for commercial units." },
      { title: "Lead capture", description: "Enquiries routed to the sales team with the unit context attached." },
    ],
    integrations: ["Sales CRM", "Map provider", "Email + messenger notifications", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "next/image"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL", "ISR revalidation"] },
      { group: "Platform", items: ["CDN", "Image optimisation", "Analytics"] },
    ],
    results: [
      { label: "Complexes", value: "4", note: "One platform, one inventory model" },
      { label: "Units published", value: "522", note: "Filterable and individually addressable" },
      { label: "Progress reporting", value: "Monthly", note: "Photography and completion %" },
      { label: "New project", value: "Data, not a rebuild" },
    ],
    outcome:
      "Marketing and sales work from the same inventory. Adding the fifth complex is a content operation, not a project.",
    gallery: [
      { src: "/work/oriel/01.jpg", alt: "ORIEL project listing", caption: "Four complexes", device: "desktop" },
      { src: "/work/oriel/02.jpg", alt: "ORIEL apartment catalog", caption: "Apartment catalog", device: "desktop" },
      { src: "/work/oriel/03.jpg", alt: "ORIEL construction progress", caption: "Construction progress", device: "desktop" },
      { src: "/work/oriel/mobile.jpg", alt: "ORIEL on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "tvorivo",
    name: "Tvorivo",
    url: "https://tvorivo.vercel.app/",
    summary: "A digital-product store with a catalog, accounts and instant delivery",
    industry: "E-commerce",
    industryKey: "ecommerce",
    year: "2026",
    scope: ["E-commerce", "Web App", "Accounts", "Payments"],
    services: ["ecommerce", "web", "backend"],
    disciplines: ["UX", "UI", "Frontend", "Backend"],
    featured: false,
    accent: "#4d7cff",
    strapline:
      "Templates, UI kits, guides and work systems — a storefront for products that are delivered the moment they are bought.",
    duration: "7 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Storefront", "Customer account", "Category hubs"],
    locales: ["UA"],
    cover: { src: "/work/tvorivo/cover.jpg", alt: "Tvorivo digital product store homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "Selling digital products removes shipping and stock but adds a different problem: nothing is physical, so every purchase decision rests entirely on how well the product is demonstrated before payment.",
        "The catalog also spans four unrelated categories — design, marketing, productivity, development — which pull in different directions if you let them share one generic template.",
      ],
      items: [
        { label: "Catalog", value: "Templates · UI kits · guides · work systems" },
        { label: "Categories", value: "Design · Marketing · Productivity · Development" },
        { label: "Delivery", value: "Instant, on payment" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Each category gets its own hub with a presentation model suited to what it sells — a UI kit is shown as components, a Notion system as a structure, a guide as a table of contents.",
        "Purchase is deliberately short: no cart ritual for single-item buys, payment, and access granted to the account immediately.",
        "The account area is the delivery mechanism — every purchase stays available for re-download, including updated versions.",
      ],
      items: [
        { label: "Presentation", value: "Per-category product model" },
        { label: "Checkout", value: "Short path, instant access" },
        { label: "Delivery", value: "Account library with updates" },
      ],
    },
    architecture: {
      caption: "Storefront over a product catalog, with payment-gated access to files held in object storage.",
      nodes: [
        { id: "store", label: "Storefront", layer: 0, kind: "client", detail: "ISR" },
        { id: "account", label: "Account", layer: 0, kind: "client", detail: "Purchases" },
        { id: "api", label: "API", layer: 1, kind: "service" },
        { id: "catalog", label: "Catalog", layer: 2, kind: "data", detail: "Products, categories" },
        { id: "orders", label: "Orders & access", layer: 2, kind: "service" },
        { id: "db", label: "PostgreSQL", layer: 3, kind: "data" },
        { id: "files", label: "Object storage", layer: 3, kind: "data", detail: "Signed URLs" },
        { id: "pay", label: "Payments", layer: 4, kind: "external" },
        { id: "mail", label: "Email", layer: 4, kind: "external" },
      ],
      edges: [
        { from: "store", to: "api" },
        { from: "account", to: "api" },
        { from: "api", to: "catalog" },
        { from: "api", to: "orders" },
        { from: "orders", to: "db" },
        { from: "orders", to: "pay" },
        { from: "orders", to: "files", label: "signed URL" },
        { from: "orders", to: "mail", label: "receipt + access" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "Product pages answer one question first — what exactly do I get — with contents, format and preview above anything persuasive.",
        "Category hubs act as landing pages in their own right, so search traffic arrives at a curated shelf rather than a generic catalog.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Clean, product-forward and quiet: the goods are visual, so the interface stays out of their way.",
        "Prices are set in hryvnia with consistent tabular figures, and every product card carries the same four facts in the same place.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Catalog pages are statically generated and revalidated on content change; only the account area and checkout are dynamic.",
        "File access is granted through short-lived signed URLs issued after a verified purchase, so a shared link expires rather than leaking a product.",
      ],
    },
    features: [
      { title: "Category hubs", description: "Design, marketing, productivity and development, each with a tailored product model." },
      { title: "Product previews", description: "Contents, format and preview before any persuasion." },
      { title: "Short checkout", description: "Single-item purchase without a cart ritual." },
      { title: "Account library", description: "Every purchase re-downloadable, including updated versions." },
      { title: "Signed delivery", description: "Short-lived signed URLs issued only after a verified purchase." },
      { title: "Featured products", description: "Editorial merchandising across the catalog." },
    ],
    integrations: ["Payment provider", "Object storage", "Email receipts", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "next/image"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL", "Object storage", "Signed URLs"] },
      { group: "Commerce", items: ["Payments", "Order & entitlement model"] },
    ],
    results: [
      { label: "Delivery", value: "Instant", note: "Access granted on payment" },
      { label: "File security", value: "Signed URLs", note: "Shared links expire" },
      { label: "Category model", value: "Per-type presentation" },
      { label: "Catalog pages", value: "Static", note: "Dynamic only where it must be" },
    ],
    outcome:
      "A store where the product does the selling: what you get is visible before checkout, and you have it before you close the tab.",
    gallery: [
      { src: "/work/tvorivo/01.jpg", alt: "Tvorivo catalog", caption: "Catalog", device: "desktop" },
      { src: "/work/tvorivo/02.jpg", alt: "Tvorivo category hub", caption: "Category hub", device: "desktop" },
      { src: "/work/tvorivo/03.jpg", alt: "Tvorivo product detail", caption: "Product detail", device: "desktop" },
      { src: "/work/tvorivo/mobile.jpg", alt: "Tvorivo on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "axion",
    name: "AXION",
    url: "https://axion-six-bay.vercel.app/",
    summary: "Positioning site for an AI implementation and process-automation practice",
    industry: "AI & automation",
    industryKey: "ai",
    year: "2026",
    scope: ["Website", "AI", "Automation", "Lead capture"],
    services: ["ai", "automation", "web"],
    disciplines: ["Strategy", "UX", "UI", "Frontend"],
    featured: true,
    accent: "#46d39a",
    strapline:
      "AI systems for sales, support, document handling, CRM and analytics — sold as engineering rather than as a demo.",
    duration: "6 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Marketing site", "Interactive workflow explainers"],
    locales: ["UA"],
    cover: { src: "/work/axion/cover.jpg", alt: "AXION AI automation homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "Every company in this category says the same sentence about turning chaos into a managed system. The word \"AI\" has been devalued to the point where using it prominently now costs credibility with the exact technical buyer AXION needs.",
        "The site had to show specific mechanics — what gets automated, where the model sits in the process, what happens when it is wrong — without becoming documentation.",
      ],
      items: [
        { label: "Domains", value: "Sales · support · documents · CRM · analytics" },
        { label: "Buyer", value: "Technical, sceptical, has seen the demos" },
        { label: "Requirement", value: "Mechanics over adjectives" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Each capability is presented as a workflow you can step through: the trigger, the classification, the retrieval, the decision point where a human is involved, and the system the result is written to.",
        "The failure path is shown deliberately — what happens when confidence is low — because that is the question a serious buyer asks, and answering it first is the strongest possible signal.",
      ],
      items: [
        { label: "Format", value: "Step-through workflows per capability" },
        { label: "Emphasis", value: "The failure path is shown, not hidden" },
      ],
    },
    architecture: {
      caption: "Static content shell with client-side workflow components; leads routed straight to messaging.",
      nodes: [
        { id: "site", label: "Site", layer: 0, kind: "client", detail: "Static" },
        { id: "flows", label: "Workflow components", layer: 1, kind: "client", detail: "Step-through" },
        { id: "content", label: "Capability model", layer: 2, kind: "data" },
        { id: "lead", label: "Lead capture", layer: 2, kind: "service", detail: "Server action" },
        { id: "tg", label: "Telegram", layer: 3, kind: "external" },
        { id: "crm", label: "CRM", layer: 3, kind: "external" },
      ],
      edges: [
        { from: "site", to: "flows" },
        { from: "site", to: "content" },
        { from: "flows", to: "content" },
        { from: "site", to: "lead" },
        { from: "lead", to: "tg" },
        { from: "lead", to: "crm" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The visitor picks the process they recognise — inbound leads, support volume, document handling — and the site explains automation in the vocabulary of that process rather than in the vocabulary of AI.",
        "Every workflow can be read as static text; the interaction adds pacing, not information, so nothing is lost without JavaScript.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Technical and dark, with monospace labelling for anything that represents a system boundary or a state.",
        "Flow diagrams are typeset rather than illustrated — nodes are text, edges are rules, which reads as engineering rather than as marketing.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "The workflow components share one data-driven renderer, so a new capability is a data entry rather than a new component.",
        "Motion is scroll-linked and fully disabled under reduced-motion, where the flows render as ordinary ordered lists.",
      ],
    },
    features: [
      { title: "Capability workflows", description: "Step-through explainers for sales, support, documents, CRM and analytics." },
      { title: "Failure paths", description: "What happens on low confidence, shown rather than omitted." },
      { title: "Process-first navigation", description: "Entry by the business process, not by the technology." },
      { title: "Instant lead routing", description: "Enquiries to Telegram and the CRM through a server action." },
      { title: "Static fallback", description: "Every flow readable as text without JavaScript." },
    ],
    integrations: ["Telegram", "CRM", "Analytics", "Email"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"] },
      { group: "Platform", items: ["Static generation", "Server actions"] },
    ],
    results: [
      { label: "Pitch", value: "Mechanism-first", note: "Workflows, not adjectives" },
      { label: "Trust signal", value: "Failure path shown" },
      { label: "New capability", value: "A data entry" },
      { label: "Reduced motion", value: "Flows become lists" },
    ],
    outcome:
      "A site that survives a sceptical technical read, because it leads with how the system behaves when it is uncertain.",
    gallery: [
      { src: "/work/axion/01.jpg", alt: "AXION capability section", caption: "Capabilities", device: "desktop" },
      { src: "/work/axion/02.jpg", alt: "AXION workflow explainer", caption: "Workflow explainer", device: "desktop" },
      { src: "/work/axion/03.jpg", alt: "AXION process section", caption: "Process", device: "desktop" },
      { src: "/work/axion/mobile.jpg", alt: "AXION on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "pelagion",
    name: "Pelagion",
    url: "https://deep-chi-six.vercel.app/",
    summary: "Brand and product site for autonomous marine systems and mission software",
    industry: "Marine technology",
    industryKey: "marine",
    year: "2026",
    scope: ["Website", "Product", "Hardware + software"],
    services: ["web", "saas"],
    disciplines: ["Strategy", "UX", "UI", "Frontend"],
    featured: false,
    accent: "#4d7cff",
    strapline:
      "Autonomous marine systems, oceanographic sensors and mission software — one story across hardware and the software that flies it.",
    duration: "8 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Marketing site", "Product pages", "Technical specifications"],
    locales: ["EN"],
    cover: { src: "/work/pelagion/cover.jpg", alt: "Pelagion homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "Pelagion sells hardware, sensors and software as one capability, to buyers who evaluate each of those things differently. A site organised by product line would have hidden the thing that makes the company credible: that the three are designed together.",
        "The audience is technical and the claims are operational — decisions at sea, in conditions where a wrong reading has consequences — so the register had to be sober without being dull.",
      ],
      items: [
        { label: "Portfolio", value: "Autonomous systems · sensors · mission software" },
        { label: "Audience", value: "Technical and operational buyers" },
        { label: "Claim", value: "Safer, clearer decisions at sea" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The site is organised by mission rather than by product line: what you are trying to find out, and which combination of platform, sensor and software answers it.",
        "Specifications are treated as a designed surface rather than a PDF — comparable, scannable and linkable — because in this market the spec table is the sales material.",
      ],
      items: [
        { label: "Organising axis", value: "Mission, not product line" },
        { label: "Specifications", value: "Designed, linkable, comparable" },
      ],
    },
    architecture: {
      caption: "Content-modelled product site: platforms, sensors and software as related entities.",
      nodes: [
        { id: "site", label: "Site", layer: 0, kind: "client", detail: "Static" },
        { id: "products", label: "Product model", layer: 1, kind: "data", detail: "Platforms · sensors · software" },
        { id: "specs", label: "Specification model", layer: 1, kind: "data", detail: "Comparable fields" },
        { id: "pages", label: "Generated pages", layer: 2, kind: "service" },
        { id: "lead", label: "Enquiry", layer: 2, kind: "service" },
        { id: "mail", label: "Email / CRM", layer: 3, kind: "external" },
      ],
      edges: [
        { from: "site", to: "products" },
        { from: "products", to: "specs" },
        { from: "products", to: "pages" },
        { from: "specs", to: "pages" },
        { from: "pages", to: "lead" },
        { from: "lead", to: "mail" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "A visitor can enter from the mission, the platform or the sensor and reach the same coherent set of pages — the relationships between entities are modelled, so navigation never dead-ends at a leaf.",
        "Technical detail is progressive: an operational summary first, full specification one interaction away, never both competing for the same screen.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Cold, precise and high contrast, with imagery given full width and typography kept tight around it.",
        "Specification tables use tabular figures and consistent units so two products can be compared by eye without a converter.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Products, sensors and software are separate content models with explicit relations, so a new platform automatically appears everywhere it is relevant.",
        "Fully statically generated with optimised imagery — the site is heavy on photography and still has to load on a ship's connection.",
      ],
    },
    features: [
      { title: "Mission-led navigation", description: "Enter by what you need to find out, not by product line." },
      { title: "Related product model", description: "Platforms, sensors and software modelled as connected entities." },
      { title: "Designed specifications", description: "Comparable, scannable and individually linkable spec surfaces." },
      { title: "Progressive detail", description: "Operational summary first, full specification on demand." },
      { title: "Optimised imagery", description: "Heavy photography delivered at usable weights." },
    ],
    integrations: ["Email / CRM enquiry routing", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "next/image"] },
      { group: "Platform", items: ["Static generation", "Image optimisation", "CDN"] },
    ],
    results: [
      { label: "Organising axis", value: "Mission-led" },
      { label: "Entity model", value: "Related", note: "A new platform propagates automatically" },
      { label: "Specifications", value: "Linkable", note: "The spec table is the sales material" },
      { label: "Delivery", value: "Static + optimised media" },
    ],
    outcome:
      "Hardware, sensors and software read as one capability, which is the actual product Pelagion sells.",
    gallery: [
      { src: "/work/pelagion/01.jpg", alt: "Pelagion systems section", caption: "Systems", device: "desktop" },
      { src: "/work/pelagion/02.jpg", alt: "Pelagion sensors and software", caption: "Sensors and software", device: "desktop" },
      { src: "/work/pelagion/03.jpg", alt: "Pelagion specifications", caption: "Specifications", device: "desktop" },
      { src: "/work/pelagion/mobile.jpg", alt: "Pelagion on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "litha",
    name: "LITHA°",
    url: "https://litha.vercel.app/",
    summary: "A portfolio platform for an architecture studio built around atmosphere",
    industry: "Architecture",
    industryKey: "architecture",
    year: "2025",
    scope: ["Website", "Portfolio", "Editorial"],
    services: ["web"],
    disciplines: ["UX", "UI", "Frontend"],
    featured: false,
    accent: "#c3bdac",
    strapline:
      "\"We do not design objects. We compose atmospheres.\" A studio site where the pacing carries as much meaning as the images.",
    duration: "6 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Marketing site", "Project pages", "Material studies"],
    locales: ["EN"],
    cover: { src: "/work/litha/cover.jpg", alt: "LITHA architecture studio homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "An architecture practice with a twenty-four to thirty-six month project cycle is not selling a service you buy this week. The site's job is to attract a very small number of the right clients and repel everyone else.",
        "That makes conventional conversion design actively counterproductive: friction, restraint and slowness are the message.",
      ],
      items: [
        { label: "Projects shown", value: "Three, in full" },
        { label: "Typical cycle", value: "24–36 months" },
        { label: "Goal", value: "Fewer, better enquiries" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Three projects presented completely rather than a grid of twelve — Casa Sombra, Horizon House, Still Forest — each with the reasoning, the site conditions and the material decisions.",
        "A material studies section treats limestone, smoked oak and blackened steel as subjects in their own right, which is how the practice actually talks about its work.",
        "The five-phase process section sets expectations about duration and involvement before a conversation starts, which filters enquiries in exactly the way the studio wanted.",
      ],
      items: [
        { label: "Structure", value: "Philosophy → works → materials → process" },
        { label: "Filtering", value: "Duration and involvement stated up front" },
      ],
    },
    architecture: {
      caption: "Static, media-heavy site with a content model for projects and material studies.",
      nodes: [
        { id: "site", label: "Site", layer: 0, kind: "client", detail: "Static" },
        { id: "projects", label: "Project model", layer: 1, kind: "data" },
        { id: "materials", label: "Material studies", layer: 1, kind: "data" },
        { id: "media", label: "Image pipeline", layer: 2, kind: "infra", detail: "AVIF/WebP, responsive" },
        { id: "pages", label: "Generated pages", layer: 2, kind: "service" },
        { id: "contact", label: "Enquiry", layer: 3, kind: "service" },
      ],
      edges: [
        { from: "site", to: "projects" },
        { from: "site", to: "materials" },
        { from: "projects", to: "media" },
        { from: "projects", to: "pages" },
        { from: "materials", to: "pages" },
        { from: "pages", to: "contact" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "Deliberate pacing: long scroll distances, few decisions per screen, no competing calls to action. The reading rhythm is the argument.",
        "Contact sits at the end rather than everywhere, because a practice with a three-year cycle does not need a sticky button.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Photography at full bleed, typography set small and precise against it, and generous negative space that would be wasteful on any other kind of site.",
        "Material and light are the palette — the interface contributes almost no colour of its own.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Media-heavy pages with responsive image generation and modern formats, so full-bleed photography loads quickly on a phone.",
        "Reveal choreography is scroll-linked and short; under reduced-motion, images simply appear.",
      ],
    },
    features: [
      { title: "Philosophy", description: "The practice's position stated before any work is shown." },
      { title: "Selected works", description: "Three residential projects presented in full, with site and material reasoning." },
      { title: "Material studies", description: "Limestone, smoked oak and blackened steel as subjects in their own right." },
      { title: "Process", description: "Five phases with realistic durations, stated before contact." },
      { title: "Studio", description: "Practice information and enquiry routing." },
    ],
    integrations: ["Email enquiry", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "next/image"] },
      { group: "Platform", items: ["Static generation", "Responsive images", "CDN"] },
    ],
    results: [
      { label: "Projects shown", value: "3, in full", note: "Rather than a grid of twelve" },
      { label: "Filtering", value: "Built into the structure" },
      { label: "Media", value: "Full-bleed, optimised" },
      { label: "Motion", value: "Short, reduced-motion safe" },
    ],
    outcome:
      "A site that behaves like the practice: slow, precise, and uninterested in everyone.",
    gallery: [
      { src: "/work/litha/01.jpg", alt: "LITHA selected works", caption: "Selected works", device: "desktop" },
      { src: "/work/litha/02.jpg", alt: "LITHA material studies", caption: "Material studies", device: "desktop" },
      { src: "/work/litha/03.jpg", alt: "LITHA process", caption: "Process", device: "desktop" },
      { src: "/work/litha/mobile.jpg", alt: "LITHA on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "aureon",
    name: "AUREON",
    url: "https://aureon-two-eta.vercel.app/",
    summary: "A solar installer platform with a personal savings calculator",
    industry: "Energy",
    industryKey: "energy",
    year: "2026",
    scope: ["Website", "Calculator", "Lead capture"],
    services: ["web", "automation"],
    disciplines: ["UX", "UI", "Frontend"],
    featured: false,
    accent: "#ffb020",
    strapline:
      "Solar plants and storage for homes and businesses — with the payback calculation people actually came for, on the page.",
    duration: "5 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Marketing site", "Savings calculator"],
    locales: ["UA"],
    cover: { src: "/work/aureon/cover.jpg", alt: "AUREON solar energy homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "Everyone considering solar is asking one question: what will this cost me and how long until it pays for itself. Most installer sites answer it with a contact form.",
        "The honest version of that answer depends on roof, consumption, tariff and storage — which is a real model, not a slider that multiplies two numbers.",
      ],
      items: [
        { label: "Offer", value: "Design and installation, home and business" },
        { label: "Scope", value: "Generation plus energy storage" },
        { label: "Core question", value: "Cost and payback period" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "A calculator that takes the inputs which genuinely change the answer — consumption, roof orientation and area, tariff, whether storage is included — and returns a range with the assumptions attached.",
        "It produces an estimate, clearly labelled as one, and hands over to a real survey rather than pretending precision it cannot have. That framing is what makes the number trustworthy.",
        "The result is carried into the enquiry, so the first conversation starts from the visitor's own numbers instead of from scratch.",
      ],
      items: [
        { label: "Model inputs", value: "Consumption · orientation · area · tariff · storage" },
        { label: "Output", value: "A range with stated assumptions" },
        { label: "Handover", value: "Calculation attached to the enquiry" },
      ],
    },
    architecture: {
      caption: "Static content site with a calculation module and enquiry routing that carries the result.",
      nodes: [
        { id: "site", label: "Site", layer: 0, kind: "client", detail: "Static" },
        { id: "calc", label: "Savings calculator", layer: 1, kind: "client", detail: "Model inputs" },
        { id: "model", label: "Calculation model", layer: 2, kind: "service", detail: "Assumptions versioned" },
        { id: "lead", label: "Enquiry", layer: 2, kind: "service", detail: "Carries result" },
        { id: "crm", label: "CRM / messaging", layer: 3, kind: "external" },
        { id: "analytics", label: "Analytics", layer: 3, kind: "external" },
      ],
      edges: [
        { from: "site", to: "calc" },
        { from: "calc", to: "model" },
        { from: "calc", to: "lead", label: "attach result" },
        { from: "lead", to: "crm" },
        { from: "calc", to: "analytics", label: "funnel events" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The calculator opens with sensible defaults so a visitor sees a plausible answer before touching anything — the first interaction is a correction, not a blank form.",
        "Assumptions are visible next to the result rather than buried in a footnote, because a number you cannot interrogate is a number you do not believe.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Warm and daylight-led, with the calculator given the visual weight of the primary product it effectively is.",
        "Results are typeset as figures with units and ranges, never as a single triumphant number.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "The calculation model is a pure, versioned module with unit tests — the assumptions are data, so updating a tariff is a data change and the tests catch anything that shifts unexpectedly.",
        "Funnel events are emitted at each step, so it is possible to see where people stop.",
      ],
    },
    features: [
      { title: "Savings calculator", description: "Consumption, roof, tariff and storage inputs producing a payback range." },
      { title: "Visible assumptions", description: "Every assumption shown next to the result it drives." },
      { title: "Residential and commercial", description: "Two paths with different scale and financing considerations." },
      { title: "Storage systems", description: "Energy storage modelled as part of the calculation, not an upsell." },
      { title: "Enquiry with context", description: "The visitor's own calculation attached to the enquiry." },
    ],
    integrations: ["CRM / messaging", "Analytics", "Email"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { group: "Logic", items: ["Versioned calculation module", "Unit tests"] },
    ],
    results: [
      { label: "Core question", value: "Answered on page", note: "Before any form" },
      { label: "Output", value: "A range", note: "With assumptions attached" },
      { label: "Model", value: "Versioned and tested" },
      { label: "Enquiries", value: "Arrive with numbers" },
    ],
    outcome:
      "The sales conversation starts after the payback question, not before it — which changes who gets in touch.",
    gallery: [
      { src: "/work/aureon/01.jpg", alt: "AUREON calculator", caption: "Savings calculator", device: "desktop" },
      { src: "/work/aureon/02.jpg", alt: "AUREON solutions", caption: "Home and business", device: "desktop" },
      { src: "/work/aureon/03.jpg", alt: "AUREON process", caption: "Process", device: "desktop" },
      { src: "/work/aureon/mobile.jpg", alt: "AUREON on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "elara-dental",
    name: "ELARA Dental Studio",
    url: "https://clinic-elara.vercel.app/",
    summary: "A dental clinic platform built around treatment paths and booking",
    industry: "Healthcare",
    industryKey: "healthcare",
    year: "2026",
    scope: ["Website", "Booking", "Services", "SEO"],
    services: ["web", "automation"],
    disciplines: ["UX", "UI", "Frontend"],
    featured: false,
    accent: "#46d39a",
    strapline:
      "Diagnostics, treatment, implants, veneers and aligners — organised by what the patient is worried about, not by what the clinic is equipped with.",
    duration: "5 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Marketing site", "Service pages", "Booking flow"],
    locales: ["UA"],
    cover: { src: "/work/elara-dental/cover.jpg", alt: "ELARA dental clinic homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "Clinic websites are organised the way clinics are organised — by department and procedure. Patients do not arrive with a procedure in mind; they arrive with a problem and a fear.",
        "Dental care in particular is chosen on trust, and trust is built by being specific about what happens, what it costs and what it feels like — the three things most clinic sites avoid.",
      ],
      items: [
        { label: "Services", value: "Diagnostics · treatment · implants · veneers · aligners" },
        { label: "Decision basis", value: "Trust, not price comparison" },
        { label: "Positioning", value: "Without pain or unnecessary prescriptions" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Entry points are patient-shaped — a problem, a concern, a goal — and each one leads into the relevant treatment path with the procedure, the stages and the time it takes.",
        "Each service page states what actually happens step by step. Being explicit about the process is the single most effective anxiety reducer available, and almost nobody does it.",
        "Booking is short and reachable from every service page, carrying the treatment context with it so the clinic knows why someone is coming.",
      ],
      items: [
        { label: "Navigation", value: "By patient concern, not department" },
        { label: "Content", value: "Explicit stages and durations" },
        { label: "Booking", value: "Context-carrying, always one step away" },
      ],
    },
    architecture: {
      caption: "Statically generated service pages with a booking flow that carries treatment context.",
      nodes: [
        { id: "site", label: "Site", layer: 0, kind: "client", detail: "Static" },
        { id: "services", label: "Service model", layer: 1, kind: "data", detail: "Stages, duration" },
        { id: "booking", label: "Booking flow", layer: 1, kind: "client" },
        { id: "action", label: "Booking action", layer: 2, kind: "service", detail: "Server action" },
        { id: "clinic", label: "Clinic scheduling", layer: 3, kind: "external" },
        { id: "notify", label: "Notifications", layer: 3, kind: "external", detail: "SMS / messenger" },
      ],
      edges: [
        { from: "site", to: "services" },
        { from: "services", to: "booking", label: "context" },
        { from: "booking", to: "action" },
        { from: "action", to: "clinic" },
        { from: "action", to: "notify" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "The reading order matches the patient's: what is wrong, what is done about it, what it involves, what it costs, who does it.",
        "Nothing is gated behind a phone call. The information a patient needs to decide is on the page, which is what makes the booking step feel small.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Calm and clinical without being cold — generous spacing, soft contrast, and photography of people rather than equipment.",
        "Prices and durations are stated plainly in a consistent format wherever they appear.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Service pages are generated from a content model with structured data, so each treatment page is individually indexable for the searches patients actually run.",
        "Booking submissions go through a server action with validation, delivering to clinic scheduling and notifying staff immediately.",
      ],
    },
    features: [
      { title: "Concern-led navigation", description: "Entry by the patient's problem rather than the clinic's departments." },
      { title: "Treatment paths", description: "Stages, durations and what actually happens, stated explicitly." },
      { title: "Transparent pricing", description: "Costs presented consistently rather than on request." },
      { title: "Contextual booking", description: "Booking carries the treatment the patient was reading about." },
      { title: "Structured data", description: "Per-treatment markup for the searches patients run." },
    ],
    integrations: ["Clinic scheduling", "SMS / messenger notifications", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "next/image"] },
      { group: "Platform", items: ["Static generation", "Server actions", "Structured data"] },
    ],
    results: [
      { label: "Navigation", value: "Patient-shaped" },
      { label: "Process", value: "Stated explicitly", note: "Stages and durations on every service" },
      { label: "Booking", value: "Carries context" },
      { label: "Indexing", value: "Per-treatment" },
    ],
    outcome:
      "A clinic site that answers the questions people are too uncomfortable to ask on the phone.",
    gallery: [
      { src: "/work/elara-dental/01.jpg", alt: "ELARA services", caption: "Services", device: "desktop" },
      { src: "/work/elara-dental/02.jpg", alt: "ELARA treatment detail", caption: "Treatment paths", device: "desktop" },
      { src: "/work/elara-dental/03.jpg", alt: "ELARA booking", caption: "Booking", device: "desktop" },
      { src: "/work/elara-dental/mobile.jpg", alt: "ELARA on mobile", caption: "Mobile", device: "mobile" },
    ],
  },

  {
    slug: "kovalov-partners",
    name: "Kovalov & Partners",
    url: "https://kovalev-mu.vercel.app/",
    summary: "A law firm platform organised by legal situation and response time",
    industry: "Legal",
    industryKey: "legal",
    year: "2026",
    scope: ["Website", "Practice areas", "Lead capture", "SEO"],
    services: ["web", "automation"],
    disciplines: ["UX", "UI", "Frontend"],
    featured: false,
    accent: "#c3bdac",
    strapline:
      "Corporate law, commercial disputes, tax inspections, insolvency and asset protection — with a fifteen-minute response commitment on the page.",
    duration: "5 weeks",
    team: "1 designer · 1 engineer",
    platforms: ["Marketing site", "Practice area pages", "Consultation flow"],
    locales: ["UA"],
    cover: { src: "/work/kovalov-partners/cover.jpg", alt: "Kovalov & Partners law firm homepage" },
    challenge: {
      heading: "Challenge",
      body: [
        "A business calling a law firm is usually already in trouble, and often on a deadline — a tax inspection has started, a claim has arrived, an account has been frozen. Speed of response is the differentiator, not the practice-area list.",
        "Law firm sites are written for other lawyers. This one had to be written for a director who has twenty minutes and a problem.",
      ],
      items: [
        { label: "Practice", value: "Corporate · disputes · tax · insolvency · asset protection" },
        { label: "Track record", value: "20 years · 1,240 completed cases" },
        { label: "Commitment", value: "Response within 15 minutes" },
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "Navigation is by situation — an inspection has started, a claim has arrived, a partner is leaving — with the relevant practice area behind each one.",
        "The response commitment is treated as the primary product claim: stated in the hero, repeated at every decision point, and wired to instant notification so it is operationally true.",
        "The firm's track record is presented as verifiable specifics rather than adjectives, which is the only kind of credibility that transfers in this market.",
      ],
      items: [
        { label: "Navigation", value: "By situation, not by practice area" },
        { label: "Primary claim", value: "15-minute response, wired end to end" },
        { label: "Credibility", value: "Specifics rather than adjectives" },
      ],
    },
    architecture: {
      caption: "Static practice-area pages with an urgent-path enquiry that notifies immediately.",
      nodes: [
        { id: "site", label: "Site", layer: 0, kind: "client", detail: "Static" },
        { id: "areas", label: "Practice areas", layer: 1, kind: "data", detail: "Situation-mapped" },
        { id: "consult", label: "Consultation form", layer: 1, kind: "client" },
        { id: "action", label: "Server action", layer: 2, kind: "service", detail: "Validated" },
        { id: "notify", label: "Instant notification", layer: 3, kind: "external", detail: "Messenger + email" },
        { id: "crm", label: "Case intake", layer: 3, kind: "external" },
      ],
      edges: [
        { from: "site", to: "areas" },
        { from: "areas", to: "consult", label: "context" },
        { from: "consult", to: "action" },
        { from: "action", to: "notify" },
        { from: "action", to: "crm" },
      ],
    },
    ux: {
      heading: "UX",
      body: [
        "Written for someone under pressure: short paragraphs, situation-first headings, and a consultation route visible from every screen without a modal interrupting the reading.",
        "The form is deliberately minimal — under time pressure, every extra field is a reason to close the tab.",
      ],
    },
    ui: {
      heading: "UI",
      body: [
        "Serious and quiet, closer to institutional than corporate. Typography does the work; there is almost no ornament.",
        "The response commitment is the one element allowed visual emphasis, because it is the one thing the visitor is deciding on.",
      ],
    },
    development: {
      heading: "Development",
      body: [
        "Practice-area pages are generated from a content model with structured data, so each area is independently indexable for the queries a business in trouble actually types.",
        "Enquiries route through a validated server action to instant messenger notification — the response promise is enforced by the plumbing, not by good intentions.",
      ],
    },
    features: [
      { title: "Situation-led entry", description: "Navigation by what has happened rather than by practice area." },
      { title: "Practice areas", description: "Corporate, disputes, tax, insolvency and asset protection." },
      { title: "Response commitment", description: "Fifteen-minute reply stated and wired to instant notification." },
      { title: "Minimal consultation form", description: "Short by design, carrying the situation context." },
      { title: "Verifiable track record", description: "Specific figures rather than adjectives." },
    ],
    integrations: ["Messenger notifications", "Email", "Case intake", "Analytics"],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { group: "Platform", items: ["Static generation", "Server actions", "Structured data"] },
    ],
    results: [
      { label: "Navigation", value: "Situation-led" },
      { label: "Response promise", value: "Wired", note: "Instant notification on submit" },
      { label: "Form", value: "Minimal by design" },
      { label: "Indexing", value: "Per practice area" },
    ],
    outcome:
      "A site built for the twenty minutes a director has when something has already gone wrong.",
    gallery: [
      { src: "/work/kovalov-partners/01.jpg", alt: "Kovalov & Partners practice areas", caption: "Practice areas", device: "desktop" },
      { src: "/work/kovalov-partners/02.jpg", alt: "Kovalov & Partners track record", caption: "Track record", device: "desktop" },
      { src: "/work/kovalov-partners/03.jpg", alt: "Kovalov & Partners consultation", caption: "Consultation", device: "desktop" },
      { src: "/work/kovalov-partners/mobile.jpg", alt: "Kovalov & Partners on mobile", caption: "Mobile", device: "mobile" },
    ],
  },
];
