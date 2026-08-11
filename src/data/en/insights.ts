import type { Insight } from "@/types";

export const insights: Insight[] = [
  {
    slug: "when-off-the-shelf-crm-stops-working",
    title: "The moment an off-the-shelf CRM stops being a CRM",
    excerpt:
      "Twelve custom fields, four automations and a spreadsheet everyone actually uses. Here is how to tell when configuring is costing more than building.",
    category: "Business",
    date: "2026-05-18",
    readingTime: "7 min",
    author: "Keel",
    body: [
      {
        paragraphs: [
          "Nobody decides to outgrow their CRM. It happens gradually: a custom field here, a Zapier rule there, and eventually a spreadsheet that the team trusts more than the system of record.",
          "The tell is not the number of customisations. It is where the truth lives. When the answer to \"what is the current state of this deal?\" is in a shared sheet rather than the CRM, the CRM has already stopped being a CRM.",
        ],
      },
      {
        heading: "Four signals worth acting on",
        paragraphs: [
          "None of these are fatal on their own. Three together usually mean the configuration path has run out.",
        ],
        list: [
          "A shadow spreadsheet exists and is more accurate than the system.",
          "Onboarding a new hire requires explaining which fields to ignore.",
          "A process change requires a consultant rather than an afternoon.",
          "Reporting is exported and reassembled before anyone can read it.",
        ],
      },
      {
        heading: "What building actually costs",
        paragraphs: [
          "A custom system is not automatically more expensive. Licence fees for a large team, integration middleware and consultancy hours compound; a well-scoped internal system is a one-off build plus maintenance.",
          "The real cost difference is responsibility. Off-the-shelf means somebody else decides the roadmap. Custom means you do — including the parts you would rather not think about, like backups and access reviews.",
        ],
      },
      {
        heading: "The middle path",
        paragraphs: [
          "The most common good answer is not all-or-nothing. Keep the off-the-shelf product for what it does well, and build the one process that is genuinely specific to your business as a system beside it, connected through an integration layer you control.",
          "That keeps the surface small, and it makes the decision reversible — which is worth more than being right first time.",
        ],
      },
    ],
  },
  {
    slug: "ai-features-that-survive-contact-with-users",
    title: "AI features that survive contact with users",
    excerpt:
      "The demo works. Production is a different problem. What separates an AI feature that stays switched on from one that gets quietly disabled.",
    category: "AI",
    date: "2026-04-02",
    readingTime: "9 min",
    author: "Keel",
    body: [
      {
        paragraphs: [
          "Almost any AI feature demos well. The interesting question is what happens in month three, when the novelty is gone and someone is accountable for a wrong answer.",
          "In our experience the features that stay switched on share four properties, and none of them are about the model.",
        ],
      },
      {
        heading: "1. It can say it does not know",
        paragraphs: [
          "A system that always answers will eventually answer wrongly with full confidence. Retrieval confidence thresholds, explicit refusal paths and routing to a human are not fallbacks — they are the feature.",
        ],
      },
      {
        heading: "2. Every answer is traceable",
        paragraphs: [
          "Citations are not decoration. When a user can see which document an answer came from, verification takes two seconds instead of two minutes, and trust survives the first mistake.",
        ],
      },
      {
        heading: "3. There is an evaluation suite",
        paragraphs: [
          "Prompts are code. Changing one without a regression suite over real historical cases is deploying untested code to production, and it will silently degrade the cases you were not thinking about.",
        ],
        list: [
          "Build the eval set from real historical inputs, not synthetic ones.",
          "Include the cases where refusal is the correct answer.",
          "Run it in CI. A prompt change that drops the score does not merge.",
        ],
      },
      {
        heading: "4. Cost and latency are monitored like any other resource",
        paragraphs: [
          "Token spend behaves like a database query nobody indexed: fine in testing, alarming at volume. Track cost per resolved task from day one, not per request.",
          "And keep provider access behind an interface. Model pricing and capability move quickly enough that switching should be a configuration change.",
        ],
      },
    ],
  },
  {
    slug: "offline-first-is-an-architecture-not-a-feature",
    title: "Offline-first is an architecture, not a feature",
    excerpt:
      "You cannot add offline support to an app that assumes connectivity. What changes when the client holds authoritative state.",
    category: "Engineering",
    date: "2026-02-20",
    readingTime: "8 min",
    author: "Keel",
    body: [
      {
        paragraphs: [
          "Field apps get used in basements, lifts, warehouses and rural dead zones — which is to say, exactly where the job is. An app that treats connectivity as normal and offline as an error state fails at the moment it matters most.",
          "Retrofitting is where teams get hurt. Offline-first is not a caching layer you add later; it changes who owns the truth.",
        ],
      },
      {
        heading: "The client becomes authoritative — temporarily",
        paragraphs: [
          "In an offline-first design the device holds a durable local write queue and the UI reads from local state. The server is a synchronisation partner, not the source the interface waits on.",
          "That single change ripples through everything: identifiers must be generatable on the client, every write must be idempotent, and the server needs explicit merge rules for each entity.",
        ],
        list: [
          "Client-generated IDs (UUIDv7 keeps them sortable).",
          "Idempotency keys on every outbound operation.",
          "Per-entity merge policy — last-writer-wins, append-only, or manual resolution.",
          "Visible sync state so users trust what has landed.",
        ],
      },
      {
        heading: "Make sync state visible",
        paragraphs: [
          "The most valuable thing you can show a field user is what is queued and what has synced. Hidden sync produces defensive behaviour — re-scanning, re-submitting, double entry — that corrupts data more reliably than any bug.",
        ],
      },
      {
        heading: "Decide merge rules with the business, not in code review",
        paragraphs: [
          "When two devices disagree, someone has to decide who wins. That is a business rule. Proof of delivery should never be silently overwritten; a GPS position almost always should be. Write these down before implementation.",
        ],
      },
    ],
  },
  {
    slug: "estimating-software-without-lying",
    title: "Estimating software without lying to anyone",
    excerpt:
      "Fixed prices hide risk, hourly rates hide scope. A third option: estimate the assumptions, not the hours.",
    category: "Product",
    date: "2026-01-14",
    readingTime: "6 min",
    author: "Keel",
    body: [
      {
        paragraphs: [
          "Every estimate is a probability distribution presented as a number. The problem is not that estimates are wrong — it is that the shape of the uncertainty gets thrown away in the process.",
        ],
      },
      {
        heading: "Estimate assumptions, not tasks",
        paragraphs: [
          "\"Build the integration: 40 hours\" carries no information about risk. \"Build the integration: 40 hours, assuming their API supports webhooks and sandbox access exists\" tells the client exactly which unknown could double the number.",
          "When you list assumptions explicitly, the conversation shifts from haggling over hours to resolving unknowns — which is the work that actually reduces cost.",
        ],
      },
      {
        heading: "Ranges with reasons beat single numbers",
        paragraphs: [
          "A range communicates uncertainty honestly, but only if the endpoints are explained. What has to be true for the low end? What drives the high end? Without that, a range is just a bigger number.",
        ],
        list: [
          "Low end: every assumption holds, no scope discovery.",
          "High end: the two or three specific risks you have identified materialise.",
          "Anything outside the range: a new conversation, not a silent overrun.",
        ],
      },
      {
        heading: "Re-estimate in public",
        paragraphs: [
          "Estimates decay. The useful discipline is re-forecasting every couple of weeks against what you now know, and telling the client the same week the number moves — not at the deadline.",
        ],
      },
    ],
  },
  {
    slug: "automation-that-fails-loudly",
    title: "Automation that fails loudly",
    excerpt:
      "The dangerous automation is not the one that breaks. It is the one that stops running and nobody notices for a week.",
    category: "Automation",
    date: "2025-11-27",
    readingTime: "5 min",
    author: "Keel",
    body: [
      {
        paragraphs: [
          "Most automation projects are abandoned for the same reason: something stopped firing, nobody noticed, and by the time the gap was discovered the team no longer trusted the system.",
          "Reliability here is not about uptime. It is about observability — whether a silent failure is possible at all.",
        ],
      },
      {
        heading: "Four properties worth building in",
        paragraphs: ["None are expensive if you build them first. All are expensive to add later."],
        list: [
          "Retries with exponential backoff, so transient failures resolve themselves.",
          "A dead-letter queue, so permanent failures are collected rather than lost.",
          "Alerting on the dead-letter queue — a queue nobody watches is a bin.",
          "A per-run trace: inputs, outputs, errors, and a safe one-click retry.",
        ],
      },
      {
        heading: "Why no-code tools get abandoned",
        paragraphs: [
          "Visual builders are excellent for the first three workflows. They struggle at the point where you need version control, tests, environments and a review process — which is exactly the point where the automation has become load-bearing.",
          "The pragmatic pattern: prototype in the no-code tool, and move a workflow into code the moment the business would notice if it stopped.",
        ],
      },
      {
        heading: "Idempotency makes retries safe",
        paragraphs: [
          "If an outbound call carries an idempotency key, a retry is always safe and you can be aggressive about recovery. Without one, every retry risks a duplicate order, a double charge or a second notification — so teams disable retries and reintroduce the silent failure they were trying to avoid.",
        ],
      },
    ],
  },
  {
    slug: "design-systems-for-dense-interfaces",
    title: "Design systems for interfaces people stare at all day",
    excerpt:
      "Marketing sites are read for ninety seconds. Operational software is read for eight hours. Almost none of the usual advice transfers.",
    category: "UX",
    date: "2025-10-09",
    readingTime: "7 min",
    author: "Keel",
    body: [
      {
        paragraphs: [
          "Design guidance is mostly written for interfaces people visit. Operational software is inhabited. When someone spends their working day inside a screen, generous whitespace becomes scrolling, and a friendly illustration becomes noise.",
        ],
      },
      {
        heading: "Density is a feature",
        paragraphs: [
          "The right question is not \"does this look clean\" but \"how many decisions can someone make without scrolling\". Comfortable spacing that halves the rows on screen has a real cost measured in navigation.",
        ],
      },
      {
        heading: "Reserve colour for state",
        paragraphs: [
          "In a dense interface, colour is the fastest signal available — which means spending it on decoration wastes the only channel that scans instantly. Keep the surface near-monochrome and let colour mean something: overdue, flagged, blocked.",
          "And never let colour carry meaning alone. Shape, position and label carry it too, for accessibility and for the person on a badly calibrated monitor.",
        ],
      },
      {
        heading: "One table primitive",
        paragraphs: [
          "Most operational software is tables wearing different hats. Building one table component that handles sorting, filtering, column sets, saved views and keyboard navigation — then using it everywhere — cuts both design surface and code, and gives users one interaction model to learn.",
        ],
        list: [
          "Keyboard navigation on high-volume screens, always.",
          "Saved views instead of re-applying filters daily.",
          "Explicit empty states that suggest the nearest match.",
        ],
      },
    ],
  },
];
