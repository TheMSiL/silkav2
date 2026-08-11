import { NotFoundContent } from "@/components/sections/not-found-content";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * In-locale 404: rendered when a page calls `notFound()`. It sits inside the
 * locale layout, so header, footer and fonts are already there.
 * `notFound()` carries no params, so it falls back to the primary language.
 */
export default function NotFound() {
  return <NotFoundContent locale={defaultLocale} dict={getDictionary(defaultLocale)} />;
}
