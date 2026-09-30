import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Star } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { buildMetadata, caseStudySchema } from "@/lib/seo";
import {
  getProject,
  getProjects,
  getServices,
  getTestimonialById,
} from "@/services/content";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project)
    return buildMetadata({
      title: "Case study not found",
      description: "",
      path: `/projects/${slug}`,
      noIndex: true,
    });

  return buildMetadata({
    title: `${project.name} — ${project.client}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.heroImage,
    keywords: project.technologies,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects, allServices] = await Promise.all([
    getProject(slug),
    getProjects(),
    getServices(),
  ]);
  if (!project) notFound();

  const testimonial = await getTestimonialById(project.testimonialId);
  const related = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const serviceLinks = allServices.filter((s) => project.services.includes(s.slug));

  return (
    <>
      <JsonLd
        data={caseStudySchema({
          name: project.name,
          description: project.summary,
          path: `/projects/${project.slug}`,
          image: project.heroImage,
        })}
      />

      <PageHeader
        eyebrow={`${project.industryLabel} · ${project.year}`}
        title={project.name}
        description={project.summary}
        crumbs={[
          { name: "Work", href: "/projects" },
          { name: project.name, href: `/projects/${project.slug}` },
        ]}
        meta={
          <dl className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Client", value: project.client },
              { label: "Industry", value: project.industryLabel },
              { label: "Duration", value: project.duration },
              { label: "Team", value: project.teamSize },
            ].map((item) => (
              <div key={item.label} className="bg-ink-950 p-5">
                <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-600">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[0.88rem] text-ink-100">{item.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* hero image */}
      <div className="border-b border-ink-800 bg-ink-950">
        <div className="container-page py-12">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden border border-ink-800 bg-ink-900">
              <Image
                src={project.heroImage}
                alt={project.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-80"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* challenge / solution */}
      <Section>
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="The challenge" title="Where the client started" />
            <div className="mt-8 space-y-5">
              {project.challenge.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[1rem] leading-relaxed text-ink-300">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-16">
              <SectionHeading eyebrow="The solution" title="What we built" />
              <div className="mt-8 space-y-5">
                {project.solution.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-[1rem] leading-relaxed text-ink-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="surface sticky top-28 p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Engagement type
              </p>
              <p className="mt-3 text-[0.9rem] text-ink-100">{project.projectType}</p>

              <p className="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Services applied
              </p>
              <ul className="mt-3 space-y-2">
                {serviceLinks.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-[0.86rem] text-accent-300 link-underline"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Technology stack
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="border border-ink-700 px-2.5 py-1 text-[0.75rem] text-ink-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <ButtonLink href="/contact" size="sm" className="mt-8 w-full" withArrow>
                Discuss a similar project
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      {/* architecture */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Architecture"
            title="The structural decisions"
            description="Each decision below was recorded as an architecture decision record with the alternatives considered."
          />
          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-2">
            {project.architecture.map((item, index) => (
              <StaggerItem key={item.title} className="bg-ink-900 p-7">
                <p className="font-mono text-[0.72rem] text-accent-400">
                  ADR-{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-[1rem] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-400">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* process + features */}
      <Section>
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Delivery process" title="How the work was sequenced" />
            <ol className="mt-10 space-y-8">
              {project.processNotes.map((note, index) => (
                <Reveal key={note.title} delay={index * 0.06}>
                  <li className="border-l border-ink-800 pl-6">
                    <p className="font-mono text-[0.72rem] text-accent-400">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-[0.98rem] font-semibold text-white">{note.title}</h3>
                    <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-400">
                      {note.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading eyebrow="Key features" title="What shipped" />
            <ul className="mt-10 grid gap-px border border-ink-800 bg-ink-800">
              {project.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 bg-ink-950 p-4">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                  <span className="text-[0.88rem] text-ink-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* screenshots */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Interface"
            title="Selected screens"
            description="Representative views. Production screenshots are redacted or recreated where client data is involved."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {project.screenshots.map((shot) => (
              <Reveal key={shot.src}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden border border-ink-800 bg-ink-950">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-80 transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.8rem] text-ink-500">
                    {shot.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* results */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Results"
            title="Measured outcomes"
            description="Figures are taken from the client's own reporting where available, and from platform telemetry otherwise."
          />

          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((metric) => (
              <StaggerItem key={metric.label} className="bg-ink-950 p-7">
                <p className="text-[1.7rem] font-semibold leading-none text-accent-300">
                  {metric.value}
                </p>
                <p className="mt-4 text-[0.88rem] font-medium text-white">{metric.label}</p>
                {metric.note ? (
                  <p className="mt-1.5 text-[0.76rem] text-ink-500">{metric.note}</p>
                ) : null}
              </StaggerItem>
            ))}
          </Stagger>

          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {project.results.map((result) => (
              <li key={result} className="flex items-start gap-3">
                <Check className="mt-1 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <span className="text-[0.92rem] leading-relaxed text-ink-300">{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* testimonial */}
      {testimonial ? (
        <Section tone="raised">
          <div className="container-page">
            <Reveal className="surface p-8 md:p-12">
              <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent-400 text-accent-400" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-7 max-w-3xl text-[1.15rem] font-medium leading-relaxed text-white md:text-[1.4rem]">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <Avatar name={testimonial.name} src={testimonial.avatar || undefined} size={46} />
                <div>
                  <p className="text-[0.92rem] font-medium text-white">{testimonial.name}</p>
                  <p className="text-[0.82rem] text-ink-400">
                    {testimonial.position} · {testimonial.company}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {/* related */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="More work"
            title="Related case studies"
            action={
              <ButtonLink href="/projects" variant="outline" withArrow>
                All case studies
              </ButtonLink>
            }
          />
          <div className="mt-14 grid gap-px bg-ink-800 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} variant="compact" />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
