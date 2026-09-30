import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { deliveryProcess, generalFaqs } from "@/content/company";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { getServices } from "@/services/content";

export const metadata: Metadata = buildMetadata({
  title: "Services — software engineering, cloud, AI and security",
  description:
    "Custom software, web platforms, mobile applications, product design, cloud and DevOps, applied AI, application security and technology consulting.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd data={faqSchema(generalFaqs)} />

      <PageHeader
        eyebrow="Services"
        title="Engineering capability across the full lifecycle of a system"
        description="Eight capabilities delivered by one organisation under a single engineering standard. Most engagements combine three or four of them — you get one team and one accountable delivery lead."
        crumbs={[{ name: "Services", href: "/services" }]}
      >
        <ButtonLink href="/contact" withArrow>
          Discuss your requirement
        </ButtonLink>
        <ButtonLink href="/projects" variant="outline">
          See the outcomes
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="container-page">
          <ServicesGrid services={services} />
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Delivery process"
            title="The same seven phases on every engagement"
            description="Scaled to the size of the work — a four-week audit runs the same sequence as a multi-year programme."
          />
          <div className="mt-14">
            <ProcessTimeline steps={deliveryProcess} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Common questions"
              title="Before you get in touch"
              description="If your question is not answered here, ask it directly — we answer technical questions without a discovery call first."
            />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={generalFaqs} />
          </div>
        </div>
      </Section>
    </>
  );
}
