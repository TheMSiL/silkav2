# Silka

Website for a digital product engineering studio.

**Built to carry weight.** — [docs/concept.md](docs/concept.md) holds the brand
and architecture decisions this build was made from.

## Stack

Next.js 16 (App Router, RSC) · React 19 · TypeScript strict · Tailwind CSS v4 ·
Motion · React Hook Form + Zod · Vitest · Playwright

Three locales: Ukrainian (primary), English, Russian.

## Getting started

```bash
npm install
cp .env.example .env.local     # all values optional for local development
npm run dev                    # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (46 static routes) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end journeys (Playwright, desktop + mobile) |
| `npm run check:mobile` | Fails if any page overflows a 390px viewport |
| `npm run capture:work` | Re-capture portfolio screenshots from the live sites |
| `npm run verify` | typecheck → lint → test → build |

`npm run test:e2e` needs browsers once: `npx playwright install`.

## Project layout

```
src/
  app/          Routes, metadata, sitemap, robots, OG images
  components/   ui · motion · layout · sections · seo
  features/     Self-contained interactive features
  server/       Server actions, services, validators
  lib/          site config · analytics · seo · i18n
  data/         Content (CMS-ready)
  types/        Domain contracts
prisma/         Lead schema for the Postgres swap
scripts/        Screenshot capture
docs/           Brand and architecture concept
tests/          unit (Vitest) · e2e (Playwright)
```

## Content

All content lives in `src/data/` behind the access layer in
`src/data/index.ts` (`getProjects`, `getProject`, `getInsights`, …). Pages and
components never import the data modules directly, so moving to a CMS means
making those functions async fetches — nothing else changes.
`src/types/index.ts` is the contract to implement against.

### Portfolio screenshots

`public/work/<slug>/` holds images captured from the live builds. They are
committed, so the build never depends on a remote site being up. Re-capture
after a project ships a visual change:

```bash
npm run capture:work            # all twelve
npm run capture:work crashatlas # one
```

## Leads

```
LeadForm → submitLead() → Zod + honeypot + rate limit
        → LeadRepository.create()   (file-backed; Prisma-ready)
        → Notifier.notify()         (Telegram; non-blocking)
```

By default leads append to `.data/leads.jsonl`, falling back to a structured
log on read-only filesystems. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
to enable notifications; a failed notification never fails a submission.

To move to Postgres: implement `PrismaLeadRepository` against
`prisma/schema.prisma` and return it from `getLeadRepository()` when
`DATABASE_URL` is set. Nothing above that file changes.

## Localisation

Three locales: **Ukrainian** (primary, served at `/`), **English** (`/en`) and
**Russian** (`/ru`). `middleware.ts` rewrites unprefixed paths to `/uk/…`
internally, so pages live once under `app/[locale]/` and Ukrainian URLs stay
clean.

- UI copy and page-level text: `src/lib/i18n/dictionaries/{uk,en,ru}.ts`.
  Ukrainian defines the shape; the other two are typed against it, so a missing
  key is a compile error.
- Long-form content: `src/data/{uk,en,ru}/`, one file per content type.
  Structural fields (slugs, URLs, image paths, architecture graphs) must match
  across locales — `tests/unit/content.test.ts` fails the build if they drift.
- Build links with `localizeHref(path, locale)`, never by concatenation.

## Accessibility

Semantic landmarks, one `h1` per page, a skip link as the first tab stop,
keyboard-operable tabs and disclosures, focus trapping in the mobile menu, and
`aria-live` on anything that updates in place.

`prefers-reduced-motion: reduce` is a designed path rather than a switch-off:
the custom cursor does not mount, the hero ecosystem renders static, the process
rail becomes a grid, flows become ordered lists, and counters print their final
value.

## Analytics

UI calls `track(EVENTS.x, props)` — never a vendor SDK. Events are pushed to
`window.dataLayer`, so any tag manager can consume them. Swapping in PostHog or
GA means adding a provider in `src/lib/analytics/index.ts`.
