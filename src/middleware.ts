import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

/**
 * Ukrainian is served unprefixed. A request for `/work` is rewritten — not
 * redirected — to `/uk/work`, so the visitor keeps the clean URL while every
 * page lives once under `app/[locale]/`.
 *
 * `/en/...` and `/ru/...` already carry their locale and pass straight through.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [first] = pathname.split("/").filter(Boolean);

  if (first && isLocale(first)) {
    // `/uk/...` is the internal form; expose the clean URL instead.
    if (first === defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(`/${defaultLocale}`, "") || "/";
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /*
   * Everything except Next internals, the metadata routes that are not
   * locale-scoped, and anything with a file extension (images, fonts).
   */
  matcher: ["/((?!_next/|api/|sitemap\\.xml|robots\\.txt|icon\\.svg|.*\\.[\\w]+$).*)"],
};
