import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/features/projects/project-card";
import { ArrowRight } from "@/components/ui/icons";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Project } from "@/types";

export function SelectedWork({
  locale,
  dict,
  featured,
  total,
}: {
  locale: Locale;
  dict: Dictionary;
  featured: Project[];
  total: number;
}) {
  const [lead, ...rest] = featured;

  return (
    <Section id="work" theme="dark" label={dict.home.workEyebrow}>
      <SectionHeading
        eyebrow={dict.home.workEyebrow}
        title={dict.home.workTitle}
        accent={dict.home.workAccent}
        align="between"
      >
        <Link
          href={localizeHref("/work", locale)}
          className="mono group inline-flex items-center gap-2 text-fg"
          data-cursor="view"
        >
          {dict.cta.viewAll} ({total})
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </SectionHeading>

      <div className="mt-14 flex flex-col gap-14">
        <ProjectCard project={lead} locale={locale} layout="feature" priority />
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} locale={locale} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
