import type { Dictionary } from "./uk";

export const en: Dictionary = {
  nav: {
    work: "Work",
    services: "Services",
    capabilities: "Capabilities",
    process: "Process",
    about: "About",
    insights: "Insights",
    contact: "Contact",
  },
  cta: {
    start: "Start a project",
    explore: "See the work",
    discuss: "Discuss your project",
    send: "Send it over",
    build: "Let's build it",
    talk: "Let's talk",
    viewAll: "All projects",
    allInsights: "All insights",
    next: "Next project",
    readCase: "Read the case",
    back: "Back",
    startOver: "Start over",
    sendAnother: "Send another",
    seeDetail: "See the detail",
    fullCapabilities: "Full capabilities",
    visitSite: "Visit the live site",
    homepage: "Back to the homepage",
    tryAgain: "Try again",
    discussIt: "Let's discuss it",
  },
  common: {
    skipToContent: "Skip to content",
    home: "Home",
    loading: "Loading",
    project: "project",
    projects: "projects",
    projectsMany: "projects",
    capability: "Capability",
    optional: "Optional",
    language: "Language",
    industry: "Industry",
    engagement: "Engagement",
    team: "Team",
    platforms: "Platforms",
    stack: "Stack",
    integrations: "Integrations",
    typicalDelivery: "Typical delivery",
    mobile: "Mobile",
    connections: "Connections",
    all: "All",
  },
  /** Labels for Insight.category keys. */
  categories: {
    Engineering: "Engineering",
    Product: "Product",
    AI: "AI",
    UX: "UX",
    Business: "Business",
    Automation: "Automation",
  },
  /** Node kinds in architecture diagrams. */
  diagram: {
      "client": "Client",
      "service": "Service",
      "data": "Data",
      "infra": "Infra",
      "external": "External"
  },
  /** Step kinds in workflow diagrams. */
  flow: {
      "trigger": "Trigger",
      "step": "Step",
      "system": "System",
      "guard": "Guard"
  },
  /** Screens in the mobile showcase. */
  device: [
      {
          "title": "Onboarding",
          "body": "Permissions are asked for in the moment they are needed, with the reason attached. A permission prompt with no context is a permission that gets denied.",
          "rows": [
              "Welcome",
              "Why we need location",
              "Notifications",
              "Ready"
          ]
      },
      {
          "title": "Dashboard",
          "body": "The primary action stays in the thumb zone. Everything a user does twenty times a day is reachable one-handed.",
          "rows": [
              "Today",
              "3 tasks open",
              "Next: 14:20",
              "Start"
          ]
      },
      {
          "title": "Offline state",
          "body": "Sync state is shown, never hidden. When people cannot see what has landed, they re-enter data defensively — which corrupts it more reliably than any bug.",
          "rows": [
              "Offline",
              "4 queued",
              "Last sync 12:04",
              "Retry"
          ]
      },
      {
          "title": "Payments & auth",
          "body": "Biometrics, secure storage and platform payment sheets. Native where it matters, shared everywhere else.",
          "rows": [
              "Confirm",
              "Face ID",
              "€142.00",
              "Pay"
          ]
      }
  ],
  /** Labels for the ProjectType keys used by the lead form. */
  projectTypes: {
      "website": "Website",
      "web-app": "Web App",
      "mobile-app": "Mobile App",
      "saas": "SaaS",
      "crm": "CRM",
      "ai": "AI",
      "automation": "Automation",
      "ecommerce": "E-commerce",
      "other": "Other"
  },
  menu: {
    open: "Open menu",
    close: "Close menu",
    label: "Main menu",
  },
  home: {
    metaTitle: "Digital product engineering studio",
    metaDescription:
      "Silka is a digital product engineering studio. We design and build web platforms, mobile apps, SaaS, CRM and ERP systems, automation and AI products — from first architecture sketch to running infrastructure.",
    heroTitleA: "Complex digital products.",
    heroTitleB: "Without the chaos around them.",
    heroAccent: "Without the chaos",
    heroIntro:
      "Strategy, design, engineering and infrastructure in one team — from the first sketch to production.",
    ecosystemLabel: "What we build — an interactive map of the studio's capabilities",
    ecosystemIdleTitle: "The system",
    ecosystemIdleBody:
      "Eight things we build, and the connections between them. Most products need more than one — pick any node.",
    workEyebrow: "Work",
    workTitle: "Products that are running right now.",
    workAccent: "right now.",
    workIntro:
      "Every case study links to the live build. Every number comes from the product itself, not from a deck.",

    problemEyebrow: "Approach",
    problemTitle: "Not every product needs to be built.",
    problemAccent: "needs to be built.",
    problemLines: [
      "Sometimes it is a website.",
      "Sometimes it is an internal system.",
      "Sometimes it is two days of automation.",
      "Sometimes nothing needs building at all.",
    ],
    problemOutro:
      "We work out the problem first and decide what to build second. Saying “you don't need this” costs us the project and keeps the relationship.",

    journeyEyebrow: "Idea to production",
    journeyTitle: "An idea does not become a product in one jump.",
    journeyAccent: "in one jump.",
    journeyIntro:
      "Here is the same product at every stage — from a problem written down to a system that holds under load.",
    journeyStages: [
      {
        label: "Idea",
        title: "A problem, not a brief",
        body: "First we write down what has to change in the business. If it does not fit in one sentence, it is too early to build.",
      },
      {
        label: "Structure",
        title: "Skeleton and boundaries",
        body: "Flows, screens, data — and what the first version will not have. Deleting a feature is cheapest right here.",
      },
      {
        label: "Interface",
        title: "A design system, not a folder of screens",
        body: "Components, states, tokens. Every next screen is assembled from what already exists, which is why the second one costs less than the first.",
      },
      {
        label: "System",
        title: "What sits under the interface",
        body: "Data model, services, queues, integrations. Architecture decisions are written down as they are made — with the reason attached.",
      },
      {
        label: "Production",
        title: "A release, not an event",
        body: "Deploys, migrations, monitoring and alerts are working before the first real user. The rollback is planned before it is needed.",
      },
    ],
    journeyHint: "Scroll",

    oneTeamEyebrow: "Why Silka",
    oneTeamTitle: "You don't have to assemble a team of five suppliers.",
    oneTeamAccent: "of five suppliers.",
    oneTeamIntro:
      "Every handoff between suppliers is a place where a decision loses the reason it was made for.",
    oneTeamSplitLabel: "The usual way",
    oneTeamSplitNote:
      "Five contracts, five schedules, and nobody who owns the outcome end to end.",
    oneTeamUnifiedLabel: "Our way",
    oneTeamUnifiedNote:
      "One contract. Whoever designed the data model also owns what the interface looks like three months later.",
    oneTeamVendors: ["Designer", "Frontend", "Backend", "AI contractor", "DevOps"],
    oneTeamRoles: ["Strategy", "Design", "Engineering", "AI", "Infrastructure", "Launch"],
    oneTeamHandoff: "handoffs",
    oneTeamClient: "Client",
    oneTeamOutro: "One product. One team. One line of accountability.",

    complexityEyebrow: "Complexity",
    complexityTitle: "From simple to insanely complex.",
    complexityAccent: "insanely complex.",
    complexityIntro:
      "The same team builds the landing page and the enterprise ecosystem. What changes is the architecture, the timeline and how much of it we have to get right before anyone writes code.",
    builderEyebrow: "Tell us what you need",
    builderTitle: "Assemble the product. We'll tell you what it takes.",
    builderAccent: "Assemble",
    builderIntro:
      "Real systems are made of parts. Pick the ones you think you need — the list on the right is what we would actually have to build.",
    processEyebrow: "Process",
    processTitle: "Seven steps, and none of them are a surprise.",
    processAccent: "none of them",
    processIntro:
      "You always know what is happening this week, what is happening next, and what would have to change for the date to move.",
    industriesEyebrow: "Industries",
    industriesTitle: "Thirteen industries. None of them our niche.",
    industriesAccent: "our niche.",
    industriesIntro:
      "What transfers between an aviation archive and a dental clinic is the engineering, not the domain. We learn the domain anyway.",
    principlesEyebrow: "What we care about",
    ctaTitleA: "Got a product that should exist by now?",
    ctaTitleB: "Tell us about it.",
    ctaAccent: "Tell us about it.",
    ctaIntro:
      "Describe what has to change in your business. We will work out what that actually takes — including when it takes less than you think.",
  },
  work: {
    metaTitle: "Work",
    metaDescription:
      "Fifteen shipped products — SaaS platforms, data products, e-commerce, logistics, real estate, mobility and AI automation. Every case study links to the live build.",
    title: "Fifteen products, and what each one had to solve.",
    accent: "had to solve.",
    intro:
      "Every case study links to the running build. Where a number appears, it comes from the product itself — not from a marketing deck.",
    filterLabel: "Filter projects by service",
    empty:
      "Nothing published in that discipline yet — which is not the same as nothing built. Ask us.",
  },
  caseStudy: {
    challenge: "Challenge",
    solution: "Solution",
    architecture: "Architecture",
    ux: "UX",
    ui: "UI",
    development: "Development",
    features: "What it does",
    integrationsStack: "Integrations & stack",
    results: "Where it landed",
    gallery: "Gallery",
    nextProject: "Next project",
    mobileNote:
      "Every build is designed for the phone as its own experience, not as a narrowed desktop layout.",
  },
  services: {
    metaTitle: "Services",
    metaDescription:
      "Web, mobile, SaaS, CRM and ERP, automation, AI, e-commerce, bots, backend and APIs — ten disciplines carried end to end by one team.",
    title: "What we build, and what you actually get.",
    accent: "actually get.",
    intro:
      "Ten disciplines. Most projects need three or four of them at the same time — which is the whole reason to work with one team instead of four vendors.",
    tablistLabel: "What we build",
    whatYouGet: "What you get",
    typicalWork: "Typical work",
    proofTitle: "Work that shows it",
    noProofTitle: "Capability",
    noProofBody:
      "It is in our stack and in everything we scope — there is simply no published case for it yet. Ask us directly and",
    noProofLink: "we will tell you exactly what we have shipped",
    areas: "areas",
    builderTitle: "Assemble the product.",
    builderAccent: "Assemble",
    builderIntro:
      "Pick the parts. The right-hand column is what that turns into on our side, and roughly how long it runs.",
    estimatorEyebrow: "Estimator",
    estimatorTitle: "Four questions, then a real conversation.",
    estimatorAccent: "a real conversation.",
    estimatorIntro:
      "This does not produce a price. Nobody can price a product from four answers honestly — what it does is get us to a useful first reply faster.",
    pricingEyebrow: "Pricing",
    pricingTitle: "Every product is different.",
    pricingAccent: "different.",
    pricingIntro:
      "We do not publish a price list, because 'a CRM' can mean six weeks or nine months. These are the factors that genuinely move the number.",
    pricingNote:
      "What you will get from us is a range with the assumptions written next to it, and the two or three unknowns that would move it. When an assumption breaks, you hear about it that week.",
  },
  capabilities: {
    metaTitle: "Capabilities",
    metaDescription:
      "How we build: web platforms, mobile applications, CRM and ERP systems, automation with visible failure, AI with a confidence gate, and the backend everything depends on.",
    title: "How the work is actually done.",
    accent: "actually done.",
    intro:
      "Not a feature list. This is the reasoning behind the decisions that decide whether a system holds up after launch.",
    automationTitle: "Automation — a lead arrives",
    automationBody: "One pipeline behind every channel, with the failure path built in from the start.",
    aiTitle: "AI — a customer asks a question",
    aiBody:
      "Retrieval, a confidence gate, a human with the send button, and every correction fed back as an evaluation case.",
    architectureNote: "A real one — the architecture behind CrashAtlas",
    architectureLink: "Read that case study",
    techEyebrow: "Technology",
    techTitle: "The stack, with reasons attached.",
    techAccent: "with reasons attached.",
    techIntro:
      "A logo wall tells you nothing. Every entry below carries why it is on the list — and we will happily argue about any of them.",
    techTablistLabel: "Technology categories",
    dashboardChrome: "Operations console — illustrative data",
    dashboardTablistLabel: "Dashboard sections",
    dashboardPeriods: "Trailing 12 periods",
    dashboardChartLabel: "Trend over the last twelve periods",
  },
  about: {
    metaTitle: "About",
    metaDescription:
      "A small senior team that designs and builds digital products end to end — strategy, UX, engineering and the infrastructure underneath.",
    title: "We learn the detail. We see it through.",
    accent: "see it through.",
    intro:
      "There is no layer of juniors behind the people you meet. The engineer in the kickoff call is the engineer writing the code, and they are still there at launch.",
    story1:
      "We started building things for other people because we kept seeing the same failure: a product that was designed well, built badly, and abandoned quietly a year later — or the reverse.",
    story2:
      "The gap is almost never talent. It is that strategy, design, engineering and operations were handled by four groups who never had to live with each other's decisions. So we do all four, and we live with them.",
    story3:
      "That constrains how much work we take on at once, deliberately. It also means the person who decided how the data model works is the person who has to answer for how the interface feels three months later.",
    workingSince: "Working since",
    teamEyebrow: "The team",
    teamTitle: "Eight disciplines, held by a small group of people.",
    teamAccent: "a small group",
    teamIntro:
      "We are not going to put stock photographs and invented job titles on this page. Here is what is genuinely in-house — and when something is not, we say so and bring in someone who does it properly.",
    teamOutro: "Want to meet the people rather than the list?",
    teamOutroLink: "Ask for a call",
    teamOutroEnd: "— you will be talking to whoever would actually do the work.",
    principlesTitle: "Things you can hold us to.",
    principlesAccent: "hold us to.",
    principlesIntro:
      "Praise is easy to collect and hard to act on. These are the commitments underneath it — say them back to us if we drift.",
    principlesLink: "See what that produced",
  },
  insights: {
    metaTitle: "Insights",
    metaDescription:
      "Notes on engineering, product, AI, automation and UX — written from things we have actually had to solve.",
    title: "Things we had to work out the hard way.",
    accent: "the hard way.",
    intro:
      "No trend commentary. Each of these came out of a decision we had to make on a real project, usually after getting it wrong once.",
    keepReading: "Keep reading",
    articleOutro: "We wrote this because we had to solve it.",
    articleOutroWork: "See what we built",
    articleOutroOr: "or",
    articleOutroContact: "tell us what you're working on",
  },
  contact: {
    metaTitle: "Start a project",
    metaDescription:
      "Tell us what your business needs to do differently. We reply within one business day with a range, the assumptions behind it, and the questions that would narrow it.",
    title: "Tell us what you're building.",
    accent: "building.",
    intro:
      "The more concrete the problem, the more useful our first reply. Rough ideas are welcome too — we will tell you what we would need to know.",
    direct: "Direct",
    pricingTitle: "What moves the number.",
    pricingIntro:
      "We price from the shape of the problem, not from a rate card. These are the things that decide where in a range you land.",
    nextTitle: "What happens next",
    next: [
      "We read it properly — a person, not a router.",
      "You get a reply within one business day.",
      "If it is a fit, a 45-minute call to understand the problem.",
      "Then a written scope with a range and its assumptions.",
    ],
  },
  form: {
    name: "Name",
    email: "Email",
    company: "Company",
    projectType: "Project type",
    budget: "Budget",
    budgetPlaceholder: "Select a range",
    message: "Message",
    messageHint: "What are you trying to change?",
    optional: "Optional",
    sending: "Sending…",
    successTitle: "Thank you — that landed.",
    successUrgent: "If it is urgent, email",
    note: "No sequences, no newsletter.",
    errors: {
      name: "Tell us what to call you",
      nameLong: "That name is suspiciously long",
      email: "We need an email to reply to",
      emailInvalid: "That does not look like an email address",
      projectType: "Pick the closest match",
      message: "A couple of sentences is enough — but we do need a couple",
      messageLong: "Please keep it under 4000 characters",
      rejected: "Rejected",
      generic: "Some fields need attention.",
      rate: "That is a few submissions in a row — give it a minute, or email us directly.",
      server: "Something went wrong on our side. Email us directly at",
    },
    success: "Received. We'll reply within one business day.",
  },
  /** Line prefixes for the brief handed to the contact form. */
  brief: {
      "product": "We are building",
      "stage": "Starting from",
      "scope": "We need",
      "timing": "Timing",
      "context": "Context"
  },
  estimator: {
    yourBrief: "Your brief",
    heard: "Here is what we heard.",
    note:
      "Send it as it stands. We come back within a day with the questions that actually change the answer.",
  },
  builder: {
    pickParts: "Pick the parts",
    yourProduct: "Your product",
    empty: "Select at least one part. Most real projects are three or four.",
    outputs: "What that means we build",
    window: "Rough delivery window",
    weeks: "weeks",
    assumption:
      "Assumes decisions inside two working days and no unresolved third-party integrations. Not a quote — a starting point for one.",
  },
  complexity: {
    drag: "Drag to change scale",
    outro:
      "The interesting question is never whether we can build it. It is what it should cost and how long it should take.",
  },
  process: {
    scrollHint: "Scroll to advance",
  },
  testimonials: {
    eyebrow: "Client reviews",
    link: "Read all the reviews",
  },
  philosophy: {
    eyebrow: "Philosophy",
    title: "We don't start with code.",
    accent: "code.",
    intro:
      "A good product does not begin with a React component. It begins with understanding what the business is trying to change — and everything downstream is a consequence of that.",
    codeNote: "Code is the seventh link. Everything before it decides whether the product holds.",
    outro:
      "By the time anyone writes code, the hard decisions are already made — and written down. That is why the estimate holds.",
  },
  errors: {
    notFoundCode: "404",
    notFoundTitle: "This page does not exist.",
    notFoundBody:
      "Either it moved, or it never existed. Both are our problem, not yours — here is everything that definitely is here.",
    sectionsLabel: "Site sections",
    errorEyebrow: "Error",
    errorTitle: "Something on our side broke.",
    errorBody:
      "Not your fault, and not something you should have to work around. Try again — if it keeps happening, tell us and we will fix it properly.",
    reference: "Reference:",
  },
  legal: {
    eyebrow: "Legal",
    updated: "Last updated",
    privacyTitle: "Privacy",
    privacyIntro: "Short, because we do not do very much with your data.",
    termsTitle: "Terms",
    termsIntro: "What applies when you use this site.",
  },
};
