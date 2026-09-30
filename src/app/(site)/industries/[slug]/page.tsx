import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import {
  getIndustries,
  getIndustry,
  getProjectsByIndustry,
  getProjectsBySlugs,
} from "@/services/content";

export const revalidate = 3600;

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry)
    return buildMetadata({
      title: "Industry not found",
      description: "",
      path: `/industries/${slug}`,
      noIndex: true,
    });

  return buildMetadata({
    title: `${industry.name} software engineering`,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [industry, allIndustries] = await Promise.all([getIndustry(slug), getIndustries()]);
  if (!industry) notFound();

  const byIndustry = await getProjectsByIndustry(industry.slug);
  const explicit = await getProjectsBySlugs(industry.relatedProjects);
  const related = [...new Map([...byIndustry, ...explicit].map((p) => [p.slug, p])).values()];
  const others = allIndustries.filter((i) => i.slug !== industry.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${industry.name} software engineering`,
          description: industry.summary,
          path: `/industries/${industry.slug}`,
        })}
      />

      <PageHeader
        eyebrow="Industry"
        title={industry.name}
        description={industry.summary}
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ]}
        meta={
          <div className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2">
            <div className="bg-ink-950 p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-600">
                Typical technologies
              </p>
              <p className="mt-3 text-[0.87rem] text-ink-200">
                {industry.technologies.join(" · ")}
              </p>
            </div>
            <div className="bg-ink-950 p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-600">
                Regulatory context
              </p>
              <p className="mt-3 text-[0.87rem] text-ink-200">
                {industry.compliance.join(" · ")}
              </p>
            </div>
          </div>
        }
      >
        <ButtonLink href="/contact" withArrow>
          Talk to an expert
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title={`Working in ${industry.name.toLowerCase()}`} />
            <div className="mt-8 space-y-5">
              {industry.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[1rem] leading-relaxed text-ink-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <Reveal className="lg:col-span-5" direction="left">
            <div className="surface p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Engagement note
              </p>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-300">
                Sector experience shortens discovery, it does not replace it. We still map your
                specific processes, constraints and systems before proposing an architecture.
              </p>
              <ButtonLink href="/contact" variant="outline" size="sm" className="mt-6" withArrow>
                Request a consultation
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Challenges" title="What usually goes wrong" />
            <div className="mt-10 grid gap-px border border-ink-800 bg-ink-800">
              {industry.challenges.map((item) => (
                <Reveal key={item.title} className="bg-ink-900 p-6">
                  <h3 className="text-[0.98rem] font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-400">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Solutions" title="How we address it" />
            <div className="mt-10 grid gap-px border border-ink-800 bg-ink-800">
              {industry.solutions.map((item) => (
                <Reveal key={item.title} className="bg-ink-900 p-6">
                  <h3 className="text-[0.98rem] font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-400">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section>
          <div className="container-page">
            <SectionHeading eyebrow="Related work" title={`${industry.name} case studies`} />
            <div className="mt-14 grid gap-px bg-ink-800 md:grid-cols-2">
              {related.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section tone="raised">
        <div className="container-page">
          <SectionHeading eyebrow="Other industries" title="Explore adjacent sectors" />
          <Stagger className="mt-12 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <StaggerItem key={other.slug} className="bg-ink-900">
                <Link
                  href={`/industries/${other.slug}`}
                  className="block h-full p-6 transition-colors hover:bg-ink-800/60"
                >
                  <p className="text-[0.95rem] font-medium text-white">{other.name}</p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-500">
                    {other.summary}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
