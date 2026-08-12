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
    explore: "Explore our work",
    discuss: "Discuss your project",
    send: "Send project inquiry",
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
    heroTitleA: "We build digital products",
    heroTitleB: "businesses run on.",
    heroAccent: "run on.",
    heroIntro:
      "From high-performance websites and mobile apps to custom CRM platforms, automation and AI-powered systems. Strategy through to running infrastructure — one team, no handoffs.",
    ecosystemLabel: "What we build — an interactive map of the studio's capabilities",
    ecosystemIdleTitle: "The system",
    ecosystemIdleBody:
      "Eight things we build, and the connections between them. Most products need more than one — pick any node.",
    workEyebrow: "Selected work",
    workTitle: "Products that shipped, and what it took.",
    workAccent: "shipped,",
    servicesEyebrow: "What we build",
    servicesTitle: "Ten disciplines. One team that carries them end to end.",
    servicesAccent: "One team",
    servicesIntro:
      "Most products need three or four of these at once. Choosing a specialist for each is how projects end up with four systems that disagree.",
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
    systemsEyebrow: "Systems in motion",
    systemsTitle: "Automation you can trust, and AI that knows when to stop.",
    systemsAccent: "knows when to stop.",
    systemsIntro:
      "Two flows we build constantly. Both are shown with the part most demos hide: what happens when something fails or the model is unsure.",
    automationFlowTitle: "A lead arrives",
    automationFlowBody:
      "One pipeline behind every channel. A retry can never duplicate a record, and a failure is never silent.",
    aiFlowTitle: "A customer asks a question",
    aiFlowBody:
      "Retrieval, a confidence gate, and a human who keeps the send button. The system is allowed to say it does not know.",
    automationLink: "How we build automation",
    processEyebrow: "Process",
    processTitle: "Seven steps, and none of them are a surprise.",
    processAccent: "none of them",
    processIntro:
      "You always know what is happening this week, what is happening next, and what would have to change for the date to move.",
    industriesEyebrow: "Industries",
    industriesTitle: "Fourteen products. Fourteen different businesses.",
    industriesAccent: "Fourteen different",
    industriesIntro:
      "We are not a vertical studio. What transfers between an aviation archive and a dental clinic is the engineering, not the domain — but we learn the domain anyway.",
    principlesEyebrow: "What we care about",
    principlesTitle: "Small enough to care. Senior enough to deliver.",
    principlesAccent: "Senior enough",
    principlesIntro:
      "We have not collected testimonials yet, so here is something more useful: the things we will actually do, which you can hold us to.",
    insightsEyebrow: "Insights",
    insightsTitle: "What we have learned building this stuff.",
    ctaTitleA: "Have a complex idea?",
    ctaTitleB: "Let's build it.",
    ctaAccent: "build",
    ctaIntro:
      "Tell us what the business needs to do differently. We will tell you what it takes to get there — including when the answer is smaller than you expected.",
  },
  work: {
    metaTitle: "Work",
    metaDescription:
      "Fourteen shipped products — SaaS platforms, data products, e-commerce, logistics, real estate, mobility and AI automation. Every case study links to the live build.",
    title: "Fourteen products, and what each one had to solve.",
    accent: "had to solve.",
    intro:
      "Every case study links to the running build. Where a number appears, it comes from the product itself — not from a marketing deck.",
    filterLabel: "Filter projects by discipline",
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
      "In our stack and part of what we scope, but not yet represented by a published case. Ask us about it directly —",
    noProofLink: "we will tell you plainly what we have shipped",
    areas: "areas",
    builderTitle: "Assemble the product.",
    builderAccent: "Assemble",
    builderIntro:
      "Pick the parts you think you need. The right-hand column is what we would actually have to build, and roughly how long that takes.",
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
    title: "Small enough to care. Senior enough to deliver.",
    accent: "Senior enough",
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
      "We have not collected testimonials yet. Rather than borrow someone else's credibility, here is what we commit to — say it back to us if we drift.",
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
    articleOutro: "This came out of real project work.",
    articleOutroWork: "See what we built",
    articleOutroOr: "or",
    articleOutroContact: "tell us what you are working on",
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
    pricingTitle: "Every product is different.",
    pricingIntro:
      "We do not publish a price list, because 'a CRM' can mean six weeks or nine months. These are the factors that actually move the number.",
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
    note: "We reply within one business day. No sequences, no newsletter.",
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
      "We are not going to invent a price from four answers. What we will do is come back with a range, the assumptions behind it, and the two or three questions that would narrow it — usually within a day.",
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
  philosophy: {
    eyebrow: "Philosophy",
    title: "We don't start with code.",
    accent: "code.",
    intro:
      "A good product does not begin with a React component. It begins with understanding what the business is trying to change — and everything downstream is a consequence of that.",
    outro:
      "By the time anyone writes code, the hard decisions are already made — and written down. That is why the estimate holds.",
  },
  errors: {
    notFoundCode: "404",
    notFoundTitle: "This page does not exist.",
    notFoundBody:
      "Either it moved, or it never did. Both are our problem, not yours — here is everything that definitely is here.",
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
