"use server";

import type { BudgetRange, ProjectType } from "@/types";
import {
  getLeadSchema,
  toFieldErrors,
  type LeadInput,
  type LeadResult,
} from "@/server/validators/lead";
import { getLeadRepository } from "@/server/services/lead-repository";
import { getNotifier } from "@/server/services/notifier";
import { site } from "@/lib/site";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Crude in-process throttle. Real deployments should put this at the edge. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 500) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  // Re-derive the locale server-side; the client's schema is never trusted.
  const raw = typeof input?.locale === "string" ? input.locale : defaultLocale;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const parsed = getLeadSchema(locale).safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: dict.form.errors.generic,
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const { website, locale: _submittedLocale, ...values } = parsed.data;
  void _submittedLocale;

  // Honeypot filled: accept silently so the bot does not learn anything.
  if (website) {
    return { ok: true, message: dict.form.success };
  }

  if (rateLimited(values.email.toLowerCase())) {
    return { ok: false, message: dict.form.errors.rate };
  }

  try {
    const lead = await getLeadRepository().create({
      ...values,
      projectType: values.projectType as ProjectType,
      budget: values.budget as BudgetRange | undefined,
    });

    // Notification must not be able to fail the submission.
    try {
      await getNotifier().notify(lead);
    } catch (error) {
      console.error("[lead] notification failed", error);
    }

    return { ok: true, message: dict.form.success };
  } catch (error) {
    console.error("[lead] submission failed", error);
    return {
      ok: false,
      message: `${dict.form.errors.server} ${site.email}.`,
    };
  }
}
