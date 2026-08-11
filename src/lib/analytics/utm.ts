/**
 * UTM / attribution parsing. Pure functions so they are trivially unit-testable
 * and reusable on both client (form hydration) and server (action fallback).
 */

export interface Attribution {
  pageUrl?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function parseUtm(input: string | URLSearchParams): Attribution {
  let params: URLSearchParams;

  if (typeof input === "string") {
    try {
      params = new URL(input, "https://placeholder.local").searchParams;
    } catch {
      params = new URLSearchParams(input.startsWith("?") ? input.slice(1) : input);
    }
  } else {
    params = input;
  }

  const get = (k: string) => {
    const v = params.get(k)?.trim();
    return v ? v : undefined;
  };

  const [utmSource, utmMedium, utmCampaign] = UTM_KEYS.map(get);

  return {
    utmSource,
    utmMedium,
    utmCampaign,
    source: get("source") ?? utmSource,
  };
}

/** Reads attribution from the live browser location. Safe to call on server. */
export function readAttribution(fallbackSource?: string): Attribution {
  if (typeof window === "undefined") return { source: fallbackSource };
  const attribution = parseUtm(window.location.search);
  return {
    ...attribution,
    pageUrl: window.location.href,
    source: attribution.source ?? fallbackSource ?? inferSource(document.referrer),
  };
}

export function inferSource(referrer: string | undefined): string | undefined {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (!host) return "direct";
    if (typeof window !== "undefined" && host === window.location.hostname) return "internal";
    return host;
  } catch {
    return undefined;
  }
}
