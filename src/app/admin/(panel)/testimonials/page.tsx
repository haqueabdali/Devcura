import { AdminPageHeading, ContentTable } from "@/components/admin/content-table";
import { getContentSources } from "@/services/admin";
import { getTestimonials } from "@/services/content";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const [testimonials, sources] = await Promise.all([getTestimonials(), getContentSources()]);

  return (
    <>
      <AdminPageHeading
        title="Testimonials"
        description="Client quotes used in the homepage carousel and on related case studies."
      />
      <ContentTable
        entity="testimonials"
        source={sources.testimonials.source}
        rows={testimonials.map((testimonial) => ({
          id: testimonial.id,
          title: testimonial.name,
          subtitle: `${testimonial.position} · ${testimonial.company}`,
          meta: `${testimonial.rating}/5${testimonial.projectSlug ? ` · ${testimonial.projectSlug}` : ""}`,
          href: testimonial.projectSlug ? `/projects/${testimonial.projectSlug}` : undefined,
        }))}
      />
    </>
  );
}
