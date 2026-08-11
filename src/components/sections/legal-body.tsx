import { Reveal } from "@/components/motion/reveal";

interface LegalBodyProps {
  sections: { heading: string; paragraphs: string[] }[];
  updated: string;
  updatedLabel: string;
}

export function LegalBody({ sections, updated, updatedLabel }: LegalBodyProps) {
  return (
    <div>
      <p className="mono-sm text-faint">{updatedLabel} — {updated}</p>
      <div className="mt-10 flex flex-col gap-10">
        {sections.map((section) => (
          <Reveal key={section.heading}>
            <section>
              <h2 className="font-display text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-lg leading-[1.65] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
