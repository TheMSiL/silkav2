# Silka — brand and architecture concept

This is the document the build was made from. It covers the eleven items the
brief asked for before implementation: name, tagline, positioning, visual
direction, sitemap, home structure, user flows, component architecture, data
architecture, animation system, and the implementation plan.

---

## 1. Name

**Silka**

Built from the founder's surname, and it carries a real fact: weight for weight,
silk has a higher tensile strength than steel. That is the whole positioning in
one image — light, precise, and load-bearing.

Why it works:

- Five letters. Reads at any size and sets cleanly in a wordmark.
- Not a coined tech word, not "Digital Solutions Agency", not another `-ify`
  or `-Tech`.
- Pronounceable in Ukrainian, Russian, English and German without explanation.
- The metaphor is material rather than decorative: it is about what holds.
- `silka.studio` reads naturally; the mark is a single glyph.

**Logo.** Two crossing threads — a weave that also reads as an S. Geometric
rather than calligraphic so it survives favicon size. Drawn in
`src/components/ui/icons.tsx` (`Logomark`) as geometry, not an image, so it
scales and inherits colour.

**Favicon.** `src/app/icon.svg` — the same mark in ember on near-black.

---

## 2. Tagline

**Built to carry weight.**

Secondary lines used in context:

- Section-level: *From idea to infrastructure.*
- Hero: *We build digital products businesses run on.*
- Sign-off: *Small enough to care. Senior enough to deliver.*

---

## 3. Positioning

> Silka is a digital product engineering studio. We design and build web
> platforms, mobile apps, SaaS, CRM and ERP systems, automation and AI products
> — from the first architecture sketch to the infrastructure it runs on.

**What we sell.** Not technologies. The ability to take a business problem and
return a running system, including the parts nobody demos: permissions,
migrations, retries, audit trails, handover.

**Who we are against.** The four-vendor model — a strategy consultancy, a design
studio, a dev shop and an ops contractor who never have to live with each
other's decisions. That gap is where projects die.

**Proof strategy.** Every claim is anchored to shipped work. Twelve live
products, each linked, each with the architecture and the reasoning written out.

### Tone of voice

| Do | Don't |
| --- | --- |
| Say the specific thing | "Innovative solutions" |
| Name the trade-off | Claim there wasn't one |
| Show the failure path | Hide it behind a happy demo |
| Use numbers we can defend | Invent metrics |
| Write short sentences | Write paragraphs of adjectives |

Banned: *young dynamic team*, *cutting-edge*, *we leverage*, *digital
experiences*, *synergy*, any statistic we cannot source.

Register: a senior engineer explaining something to a smart colleague who is
short on time. Confident, specific, occasionally dry. Never salesy.

---

## 4. Visual direction

**Premium digital engineering studio.** Editorial layout, brutalist type scale,
Swiss grid discipline, dark premium base, technical detailing.

### Colour

| Token | Value | Role |
| --- | --- | --- |
| `--ink-900` | `#08090a` | Primary dark surface |
| `--bone-100` | `#f4f2ec` | Light surface for alternating bands |
| `--ember-500` | `#ff4a1c` | The single accent — state, emphasis, CTA |
| `--signal-blue` | `#4d7cff` | Diagram: services |
| `--signal-green` | `#46d39a` | Diagram: data, guards |
| `--signal-amber` | `#ffb020` | Diagram: infrastructure |

Ember is used on 1–3% of any screen. Signal colours appear only inside
diagrams, where they carry meaning. Nothing decorative is coloured.

The site alternates dark and light bands as part of the design — `data-theme` on
each `<Section>` redefines the semantic variables, so a component renders
correctly on either surface without knowing which one it is on. There is no
user-facing theme toggle, because the rhythm is authored, not preference.

### Typography

- **Manrope** (variable) — display and body. Chosen over a wider grotesque
  because the site ships in Ukrainian and Russian: a display face without
  Cyrillic would silently fall back to a system font for two of three locales.
- **JetBrains Mono** — labels, metadata, figures, anything that represents a
  measurement or a system boundary. Cyrillic included.

A fluid scale of eleven steps (`--step--2` … `--step-8`) clamped between 320px
and 1440px. Headings run at `line-height: 0.92` and `-0.035em` tracking.

### Detailing

Hairline borders, a faint technical grid, dot fields, film grain at 3.5%
opacity, and square corners nearly everywhere. Radius is reserved for pills and
the device mock.

---

## 5. Sitemap

```
/                     Home
/work                 Index, filterable by discipline
/work/[slug]          Case study  × 12
/services             Service explorer, product builder, estimator, pricing
/capabilities         Web · Mobile · CRM/ERP · Automation · AI · Backend · Stack
/about                Studio, disciplines, process, philosophy, principles
/insights             Article index
/insights/[slug]      Article  × 6
/contact              Lead form + pricing factors
/privacy  /terms      Legal
```

Machine routes: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`,
`/work/[slug]/opengraph-image`, `/icon.svg`.

**i18n.** Three locales ship. Ukrainian is primary and served unprefixed at
`/`; English and Russian are prefixed (`/en/…`, `/ru/…`). `middleware.ts`
rewrites unprefixed requests to `/uk/…` internally, so every page lives once
under `app/[locale]/` while Ukrainian URLs stay clean, and `/uk/…` redirects
(308) to the canonical form. Every page declares `hreflang` alternates plus
`x-default`.

---

## 6. Home page structure

| # | Section | Surface | What it answers |
| --- | --- | --- | --- |
| 1 | Hero + ecosystem | Dark | Who are you, what do you build |
| 2 | Proof strip + figures | Dark | Is there substance behind it |
| 3 | Selected work | Dark | Have you done this before |
| 4 | What we build | Light | Can you do the thing I need |
| 5 | Complexity slider | Dark | Can you handle something hard |
| 6 | Product builder | Dark | What would my system consist of |
| 7 | Systems in motion | Light | Do you understand automation and AI |
| 8 | Process | Dark | How do you work |
| 9 | Philosophy | Light | How do you think |
| 10 | Industries | Dark | Do you know my world |
| 11 | Principles | Light | Can I trust you |
| 12 | Insights | Dark | Do you actually know things |
| 13 | Final CTA | Dark | Let's talk |

The dark/light alternation is the page's structural rhythm.

---

## 7. User flows

The whole site is built around one question sequence:

```
Who are you? → What can you build? → Can you handle something complex?
→ Have you done something similar? → How do you work? → Can I trust you?
→ Let's talk.
```

Primary paths:

1. **Evaluate** — Home → Work → case study → next case → CTA
2. **Qualify** — Home → Services (explorer) → capability → Contact
3. **Self-serve scope** — Estimator → pre-filled Contact → submit
4. **Assemble** — Product builder → module set → pre-filled Contact
5. **Read** — Insights → article → Work → Contact

Flows 3 and 4 carry their state into the contact form through the URL, so
nothing the visitor already told us is typed twice.

---

## 8. Component architecture

```
src/
  app/                     Routes, metadata, sitemap, robots, OG images
  components/
    ui/                    Container Section SectionHeading Button Magnetic Tag icons
    motion/                Reveal TextReveal ImageReveal Counter
    layout/                Header MobileMenu Footer Cursor Konami
    sections/              Hero Proof SelectedWork Philosophy FinalCta PageHero LegalBody
    seo/                   JsonLd
  features/
    hero/                  HeroEcosystem
    projects/              ProjectCard ProjectGrid ArchitectureDiagram CaseView
    services/              ServicesExplorer ServiceVisual
    complexity/            ComplexitySlider
    builder/               ProductBuilder
    process/               ProcessTimeline
    industries/            IndustriesList
    flows/                 FlowDiagram
    technology/            TechExplorer
    dashboard/             MockDashboard
    mobile/                DeviceShowcase
    estimator/             Estimator
    lead-form/             LeadForm
  server/
    actions/               submitLead
    services/              LeadRepository Notifier
    validators/            leadSchema
  lib/                     site cn analytics/ seo/ i18n/
  data/                    projects services process technology industries insights capabilities
  types/                   Domain contracts
```

Rules that hold the thing together:

- **Server by default.** A component becomes `"use client"` only when it needs
  interaction. The hero, work grid and case studies are server-rendered; the
  interactive parts are islands inside them.
- **One primitive per job.** All entry animation goes through `Reveal`, all
  headings through `TextReveal`, all bands through `Section`. Timing is
  consistent because there is one place to change it.
- **Features own their state.** Nothing in `features/` reaches into another
  feature. Shared shapes live in `types/`.
- **No vendor in the UI.** Analytics goes through `AnalyticsService`; lead
  storage through `LeadRepository`; notification through `Notifier`.

---

## 9. Data architecture

`src/types/index.ts` is the contract. `src/data/*` is the MVP implementation of
it, and `src/data/index.ts` is the only access layer — `getProjects()`,
`getProject(slug)`, `getInsights()`, `filterProjects()` and so on.

Moving to a CMS means making those functions async fetches. No page and no
component changes, because nothing imports the data modules directly.

Lead capture:

```
LeadForm (RHF + Zod)
      ↓  submitLead()   server action
leadSchema  →  honeypot  →  rate limit
      ↓
LeadRepository.create()      file → console fallback  (Prisma-ready)
      ↓
Notifier.notify()            Telegram, non-blocking
```

`Lead` matches the brief exactly, including attribution, and
`prisma/schema.prisma` already models it for Postgres.

---

## 10. Animation system

One easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`), four durations, and a rule:
every animation must communicate something — arrival, hierarchy, state, or
depth. Nothing moves for decoration.

| Effect | Where | How |
| --- | --- | --- |
| Text reveal | Every heading | Word-by-word rise, orchestrated by the container |
| Image reveal | Case media | `clip-path` wipe with counter-scale |
| Entry | Cards, lists, blocks | `Reveal`, 0.65s, staggered by index |
| Counters | Figures | rAF ease-out, triggered on first view |
| Horizontal scroll | Process timeline | Scroll-linked rail, desktop only |
| Magnetic | Primary CTAs | Spring toward pointer, fine pointers only |
| Cursor | Desktop | State from `data-cursor`, mix-blend-difference |
| Depth | Hero ecosystem | Perspective projection on a rotating ring |

**Reduced motion is a first-class path, not a switch-off.** Under
`prefers-reduced-motion: reduce`: the cursor does not mount, the ecosystem
renders static, the process rail becomes a grid, flows become ordered lists,
counters print their final value, and every reveal renders in place. Nothing
is lost — only the pacing.

---

## 11. Implementation plan

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Foundation: tokens, design system, primitives | Done |
| 2 | Navigation, hero, ecosystem visual | Done |
| 3 | Work index and twelve case studies | Done |
| 4 | Services explorer and capabilities | Done |
| 5 | Process, complexity, product builder | Done |
| 6 | Estimator, lead form, server action | Done |
| 7 | About, insights, legal | Done |
| 8 | Motion polish, cursor, depth | Done |
| 9 | SEO, structured data, OG images, analytics | Done |
| 10 | Performance, accessibility, tests | Done |

---

## Decisions worth knowing about

**No GSAP.** The brief listed it. Motion's `useScroll` covers the horizontal
timeline and the scroll-linked effects, and running two animation engines in one
codebase costs bundle size and consistency for no gain. One engine, one easing
curve.

**No Three.js in the hero.** The brief asked for subtle 3D and warned against a
heavy toy. The ecosystem uses real perspective projection — depth-sorted nodes,
scale by z, tilted ring — rendered as DOM and SVG. It reads as 3D, costs nothing
extra to load, and each node is a real focusable button that a screen reader can
announce. A WebGL blob would have added ~600KB to do less.

**Prisma is modelled, not wired.** `LeadRepository` writes to a file by default
so the build has no database dependency. The schema is written and the swap is
one class.

**Mobile has no published case study yet.** The service is offered and the
capability is described, but the explorer says so plainly instead of implying
work that does not exist.

**Figures are qualitative where a number would be invented.** "12 products
shipped" and "12 industries" are counted from the portfolio. "End to end" and
"∞" sit in the same row rather than a fabricated client count — `Counter`
handles both.
