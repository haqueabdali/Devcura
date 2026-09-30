import { AdminPageHeading, ContentTable } from "@/components/admin/content-table";
import { getContentSources } from "@/services/admin";
import { getProjects } from "@/services/content";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const [projects, sources] = await Promise.all([getProjects(), getContentSources()]);

  return (
    <>
      <AdminPageHeading
        title="Projects & case studies"
        description="Case study records powering the work listing, filtering and each /projects/[slug] page."
      />
      <ContentTable
        entity="case studies"
        source={sources.projects.source}
        rows={projects.map((project) => ({
          id: project.slug,
          title: project.name,
          subtitle: `${project.client} · ${project.industryLabel}`,
          meta: `${project.year} · ${project.categories.join(", ")}${project.featured ? " · featured" : ""}`,
          href: `/projects/${project.slug}`,
        }))}
      />
    </>
  );
}
