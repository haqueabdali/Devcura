import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { lastUpdated } from "@/content/legal";
import { formatDate } from "@/lib/utils";

export interface LegalDocument {
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export function LegalDocumentPage({
  document,
  href,
}: {
  document: LegalDocument;
  href: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={document.title}
        description={document.intro}
        crumbs={[{ name: document.title, href }]}
      />

      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="surface sticky top-28 p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Contents
              </p>
              <ol className="mt-4 space-y-2.5">
                {document.sections.map((section, index) => (
                  <li key={section.heading} className="flex gap-3 text-[0.84rem] text-ink-400">
                    <span className="font-mono text-[0.72rem] text-ink-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-ink-800 pt-4 text-[0.78rem] text-ink-600">
                Last updated {formatDate(lastUpdated)}
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="mb-10 border border-amber-500/30 bg-amber-500/[0.06] p-5">
              <p className="text-[0.84rem] leading-relaxed text-amber-200/90">
                <strong className="font-semibold">Template notice:</strong> this document is a
                structured placeholder. It must be reviewed and approved by legal counsel, and
                every [PLACEHOLDER] marker completed, before the site goes live.
              </p>
            </div>

            <div className="space-y-12">
              {document.sections.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.04}>
                  <section>
                    <h2 className="text-[1.25rem] font-semibold text-white">
                      <span className="mr-3 font-mono text-[0.8rem] text-accent-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="text-[0.94rem] leading-relaxed text-ink-300"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
