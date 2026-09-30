import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { getIndustries, getProjects } from "@/services/content";

export const metadata: Metadata = buildMetadata({
  title: "Case studies & client work",
  description:
    "Selected software engineering case studies with measured outcomes across FinTech, logistics, e-commerce, healthcare, energy and manufacturing.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, industries] = await Promise.all([getProjects(), getIndustries()]);

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Case studies with the numbers left in"
        description="Each case study states the problem, the architecture, the constraints and the measured result. Where a client cannot be named, the engagement is described without identifying details or not published at all."
        crumbs={[{ name: "Work", href: "/projects" }]}
      >
        <ButtonLink href="/contact" withArrow>
          Discuss your project
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="container-page">
          <ProjectExplorer
            projects={projects}
            industries={industries.map((i) => ({ slug: i.slug, name: i.name }))}
          />
        </div>
      </Section>
    </>
  );
}
