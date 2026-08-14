import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Problem } from "@/components/sections/problem";
import { Journey } from "@/components/sections/journey";
import { OneTeam } from "@/components/sections/one-team";
import { Philosophy } from "@/components/sections/philosophy";
import { FinalCta } from "@/components/sections/final-cta";

import { getContent, getFeaturedProjects, getProjects } from "@/data";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** How many products get a full-width row. */
const IN_ROWS = 3;

/**
 * The home page: seven sections, in the order a stranger needs them.
 *
 *   claim → proof → how we decide what to build → how it gets built →
 *   why one team → why we work this way → talk to us.
 *
 * Everything else lives on the page it belongs to. The services explorer, the
 * product builder, the estimator, the complexity slider, the process timeline
 * and the industry list are all still there — on /services, /about and /work —
 * and the discipline catalogue is not repeated here at all, because /services
 * is one click away and does it properly.
 *
 * The figures and the client quotes are on /about and behind the hero's stat
 * strip rather than taking a band each. A home page that argues six times in a
 * row stops being read.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const content = getContent(locale);

  const projects = getProjects(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} services={content.services} stats={content.stats} />

      <MarqueeStrip services={content.services} />

      <FeaturedWork
        locale={locale}
        dict={dict}
        featured={getFeaturedProjects(locale, IN_ROWS)}
        total={projects.length}
      />

      <Problem dict={dict} />

      <Journey dict={dict} />

      <OneTeam dict={dict} />

      <Philosophy dict={dict} chain={content.philosophyChain} />

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
