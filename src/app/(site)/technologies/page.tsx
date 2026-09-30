import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { technologies, technologyCategories } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technology stack",
  description:
    "The languages, frameworks, databases, cloud platforms and security tooling we run in production — with an honest maturity rating for each.",
  path: "/technologies",
});

const maturityLabels = {
  core: {
    label: "Core",
    description: "Used daily by multiple teams, internal standards and on-call experience",
    className: "border-accent-500/50 bg-accent-500/10 text-accent-200",
  },
  production: {
    label: "Production",
    description: "Running in client production systems today",
    className: "border-ink-600 bg-ink-800/60 text-ink-200",
  },
  selective: {
    label: "Selective",
    description: "Used where a specific requirement justifies it",
    className: "border-ink-700 text-ink-400",
  },
} as const;

export default function TechnologiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="What we run in production — and what we don't"
        description="Every technology below is rated honestly. We list a tool as core only when multiple teams operate it in production and we are prepared to be on call for it. Anything not on this list, we will say so."
        crumbs={[{ name: "Technologies", href: "/technologies" }]}
      >
        <ButtonLink href="/contact" withArrow>
          Ask about your stack
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="container-page">
          <Reveal className="grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-3">
            {Object.values(maturityLabels).map((level) => (
              <div key={level.label} className="bg-ink-950 p-6">
                <span
                  className={`inline-block border px-2.5 py-1 text-[0.72rem] font-medium ${level.className}`}
                >
                  {level.label}
                </span>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-400">
                  {level.description}
                </p>
              </div>
            ))}
          </Reveal>

          <div className="mt-16 space-y-16">
            {technologyCategories.map((category) => {
              const items = technologies.filter((t) => t.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category}>
                  <SectionHeading
                    eyebrow={`${items.length} technologies`}
                    title={category}
                    className="mb-10"
                  />
                  <div className="grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((tech) => (
                      <div
                        key={tech.name}
                        className="group flex items-start justify-between gap-4 bg-ink-950 p-6 transition-colors hover:bg-ink-900"
                      >
                        <div>
                          <p className="text-[0.95rem] font-medium text-white">{tech.name}</p>
                          <p className="mt-1.5 text-[0.82rem] text-ink-500">{tech.note}</p>
                        </div>
                        <span
                          className={`shrink-0 border px-2 py-0.5 text-[0.66rem] font-medium uppercase tracking-wide ${maturityLabels[tech.maturity].className}`}
                        >
                          {maturityLabels[tech.maturity].label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
