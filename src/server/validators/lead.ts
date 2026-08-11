import { z } from "zod";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

export const PROJECT_TYPES = [
  "website",
  "web-app",
  "mobile-app",
  "saas",
  "crm",
  "ai",
  "automation",
  "ecommerce",
  "other",
] as const;

export const BUDGET_RANGES = [
  "under-5k",
  "5-15k",
  "15-30k",
  "30-50k",
  "50k-plus",
  "not-sure",
] as const;

/** Budget labels are currency figures, so they read the same in every locale. */
export const BUDGET_LABELS: Record<(typeof BUDGET_RANGES)[number], string> = {
  "under-5k": "< $5k",
  "5-15k": "$5k – $15k",
  "15-30k": "$15k – $30k",
  "30-50k": "$30k – $50k",
  "50k-plus": "$50k+",
  "not-sure": "?",
};

export type ValidationMessages = ReturnType<typeof getDictionary>["form"]["errors"];

/** Trims, and turns "" into undefined so optional fields stay genuinely optional. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value ? value : undefined));

/**
 * The schema is built per locale so validation messages are translated —
 * the client builds it from its dictionary, the server rebuilds it from the
 * submitted locale and re-validates. Never trust the client's copy.
 */
export function createLeadSchema(m: ValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, m.name).max(100, m.nameLong),
    email: z.string().trim().min(1, m.email).max(200).email(m.emailInvalid),
    company: optionalText(120),
    projectType: z.enum(PROJECT_TYPES, { message: m.projectType }),
    // An unselected <select> submits "", which is not a member of the enum.
    budget: z
      .union([z.enum(BUDGET_RANGES), z.literal("")])
      .optional()
      .transform((value) => (value ? value : undefined)),
    message: z.string().trim().min(20, m.message).max(4000, m.messageLong),

    /** Which language the visitor was reading. */
    locale: z.enum(locales).default(defaultLocale),

    /* Attribution — filled by the client, never required. */
    source: optionalText(120),
    pageUrl: optionalText(500),
    utmSource: optionalText(120),
    utmMedium: optionalText(120),
    utmCampaign: optionalText(120),

    /* Honeypot: bots fill hidden fields, humans cannot see this one. */
    website: z.string().max(0, m.rejected).optional(),
  });
}

export function getLeadSchema(locale: Locale = defaultLocale) {
  return createLeadSchema(getDictionary(locale).form.errors);
}

export type LeadSchema = ReturnType<typeof createLeadSchema>;
export type LeadInput = z.input<LeadSchema>;
export type LeadValues = z.output<LeadSchema>;

export type LeadFieldErrors = Partial<Record<keyof LeadValues, string>>;

export interface LeadResult {
  ok: boolean;
  message: string;
  fieldErrors?: LeadFieldErrors;
}

/** Flattens a ZodError into the shape the form renders. */
export function toFieldErrors(error: z.ZodError<LeadValues>): LeadFieldErrors {
  const result: LeadFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof LeadValues | undefined;
    if (key && !result[key]) result[key] = issue.message;
  }
  return result;
}
