import { AdminPageHeading, ContentTable } from "@/components/admin/content-table";
import { getContentSources } from "@/services/admin";
import { getServices } from "@/services/content";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const [services, sources] = await Promise.all([getServices(), getContentSources()]);

  return (
    <>
      <AdminPageHeading
        title="Services"
        description="The service catalogue that generates every /services/[slug] page, the navigation dropdown and the homepage grid."
      />
      <ContentTable
        entity="services"
        source={sources.services.source}
        rows={services.map((service) => ({
          id: service.slug,
          title: service.title,
          subtitle: service.summary,
          meta: `${service.faqs.length} FAQs · ${service.technologies.length} technologies`,
          href: `/services/${service.slug}`,
        }))}
      />
    </>
  );
}
