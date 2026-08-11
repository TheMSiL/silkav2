"use client";

import { useEffect } from "react";
import { EVENTS, track } from "@/lib/analytics";

/** Fires the case-study view event once per mount. Renders nothing. */
export function CaseView({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    track(EVENTS.caseStudyView, { project: slug, name });
  }, [slug, name]);

  return null;
}
