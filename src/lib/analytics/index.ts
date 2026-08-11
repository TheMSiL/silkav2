/**
 * Analytics abstraction.
 *
 * UI never talks to a vendor SDK. It calls `track(EVENTS.x, props)`.
 * Swapping Plausible for PostHog/GA means writing one more provider below and
 * changing `createAnalytics()` — no component changes.
 */

export interface AnalyticsService {
  track(event: string, properties?: Record<string, unknown>): void;
}

export const EVENTS = {
  heroCtaClick: "hero_cta_click",
  projectOpen: "project_open",
  caseStudyView: "case_study_view",
  serviceView: "service_view",
  estimatorStart: "estimator_start",
  estimatorComplete: "estimator_complete",
  contactFormStart: "contact_form_start",
  contactFormSubmit: "contact_form_submit",
  emailClick: "email_click",
  phoneClick: "phone_click",
  socialClick: "social_click",
  builderChange: "builder_change",
  complexityChange: "complexity_change",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

/** No-op provider — used on the server and when no vendor is configured. */
class NoopAnalytics implements AnalyticsService {
  track(): void {}
}

/** Dev provider — makes the event stream visible while building. */
class ConsoleAnalytics implements AnalyticsService {
  track(event: string, properties?: Record<string, unknown>): void {
    console.debug("[analytics]", event, properties ?? {});
  }
}

/**
 * Buffers events onto `window.dataLayer` so any tag manager or vendor script
 * can consume them without the app importing a vendor SDK.
 */
class DataLayerAnalytics implements AnalyticsService {
  track(event: string, properties: Record<string, unknown> = {}): void {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event, ...properties, ts: Date.now() });
  }
}

class CompositeAnalytics implements AnalyticsService {
  constructor(private readonly providers: AnalyticsService[]) {}
  track(event: string, properties?: Record<string, unknown>): void {
    for (const p of this.providers) p.track(event, properties);
  }
}

function createAnalytics(): AnalyticsService {
  if (typeof window === "undefined") return new NoopAnalytics();
  const providers: AnalyticsService[] = [new DataLayerAnalytics()];
  if (process.env.NODE_ENV === "development") providers.push(new ConsoleAnalytics());
  return new CompositeAnalytics(providers);
}

let instance: AnalyticsService | null = null;

export function analytics(): AnalyticsService {
  if (!instance) instance = createAnalytics();
  return instance;
}

export function track(event: string, properties?: Record<string, unknown>): void {
  analytics().track(event, properties);
}

/** Test seam — lets unit tests assert on emitted events. */
export function __setAnalytics(service: AnalyticsService | null) {
  instance = service;
}
