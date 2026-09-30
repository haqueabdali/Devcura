import { AdminPageHeading, ContentTable } from "@/components/admin/content-table";
import { getContentSources } from "@/services/admin";
import { getIndustries } from "@/services/content";

export const dynamic = "force-dynamic";

export default async function AdminIndustriesPage() {
  const [industries, sources] = await Promise.all([getIndustries(), getContentSources()]);

  return (
    <>
      <AdminPageHeading
        title="Industries"
        description="Sector pages, navigation entries and the industry filter on the work listing."
      />
      <ContentTable
        entity="industries"
        source={sources.industries.source}
        rows={industries.map((industry) => ({
          id: industry.slug,
          title: industry.name,
          subtitle: industry.summary,
          meta: industry.compliance.join(" · "),
          href: `/industries/${industry.slug}`,
        }))}
      />
    </>
  );
}
