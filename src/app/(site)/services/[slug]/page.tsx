import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ProjectCard } from "@/components/sections/project-card";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";
import { getProjectsBySlugs, getService, getServices } from "@/services/content";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return buildMetadata({ title: "Service not found", description: "", path: `/services/${slug}`, noIndex: true });

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    keywords: service.technologies,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();

  const related = await getProjectsBySlugs(service.relatedProjects);
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.title,
            description: service.summary,
            path: `/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
        ]}
      />

      <PageHeader
        eyebrow={service.shortTitle}
        title={service.heroHeadline}
        description={service.heroSubline}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.shortTitle, href: `/services/${service.slug}` },
        ]}
        meta={
          <ul className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
            {service.keyFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 bg-ink-950 p-5">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <span className="text-[0.85rem] text-ink-200">{feature}</span>
              </li>
            ))}
          </ul>
        }
      >
        <ButtonLink href="/contact" withArrow>
          Request a consultation
        </ButtonLink>
        <ButtonLink href="#process" variant="outline">
          See how we work
        </ButtonLink>
      </PageHeader>

      {/* overview */}
      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title={service.title} />
            <div className="mt-8 space-y-5">
              {service.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[1rem] leading-relaxed text-ink-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-5" direction="left">
            <div className="surface p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Technologies we use here
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="border border-ink-700 px-3 py-1.5 text-[0.8rem] text-ink-200"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-ink-800 pt-6">
                <p className="text-[0.85rem] leading-relaxed text-ink-400">
                  Technology choices are made per engagement and recorded as architecture
                  decision records. We do not standardise on a stack that does not fit your
                  team.
                </p>
                <Link
                  href="/technologies"
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-accent-300 link-underline"
                >
                  Full technology stack
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* problems */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Problems we solve"
            title="The situations that bring clients to this service"
          />
          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-3">
            {service.problems.map((problem) => (
              <StaggerItem key={problem.title} className="bg-ink-900 p-7">
                <h3 className="text-[1rem] font-semibold leading-snug text-white">
                  {problem.title}
                </h3>
                <p className="mt-3 text-[0.87rem] leading-relaxed text-ink-400">
                  {problem.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* approach + benefits */}
      <Section>
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our approach" title="How we run this work" />
            <ol className="mt-10 space-y-8">
              {service.approach.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <li className="flex gap-5 border-l border-ink-800 pl-6">
                    <div>
                      <p className="font-mono text-[0.72rem] text-accent-400">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-[0.98rem] font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-400">
                        {item.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading eyebrow="Benefits" title="What changes for your business" />
            <div className="mt-10 grid gap-px border border-ink-800 bg-ink-800">
              {service.benefits.map((benefit) => (
                <Reveal key={benefit.title} className="bg-ink-950 p-6">
                  <h3 className="text-[0.98rem] font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-400">
                    {benefit.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* process */}
      <Section tone="raised" id="process">
        <div className="container-page">
          <SectionHeading
            eyebrow="Engagement process"
            title="What the first months look like"
          />
          <div className="mt-14">
            <ProcessTimeline steps={service.process} />
          </div>
        </div>
      </Section>

      {/* related projects */}
      {related.length > 0 ? (
        <Section>
          <div className="container-page">
            <SectionHeading
              eyebrow="Related work"
              title="This capability in production"
              action={
                <ButtonLink href="/projects" variant="outline" withArrow>
                  All case studies
                </ButtonLink>
              }
            />
            <div className="mt-14 grid gap-px bg-ink-800 md:grid-cols-2">
              {related.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* faq */}
      <Section tone="raised">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="FAQ" title={`${service.shortTitle} questions`} />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={service.faqs} />
          </div>
        </div>
      </Section>

      {/* other services */}
      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="Related services" title="Capabilities we often combine" />
          <div className="mt-12 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group bg-ink-950 p-6 transition-colors hover:bg-ink-900"
              >
                <p className="text-[0.95rem] font-medium text-white">{other.shortTitle}</p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-500">
                  {other.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.78rem] text-accent-300">
                  View
                  <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
