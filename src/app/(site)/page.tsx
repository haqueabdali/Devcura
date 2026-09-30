import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Hero } from "@/components/home/hero";
import { TrustSection } from "@/components/home/trust-section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ProjectCard } from "@/components/sections/project-card";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { ButtonLink } from "@/components/ui/button";
import { ContentIcon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { deliveryProcess, differentiators, technologies } from "@/content/company";
import {
  getBlogPosts,
  getFeaturedProjects,
  getIndustries,
  getServices,
  getTestimonials,
} from "@/services/content";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [services, industries, featuredProjects, testimonials, posts] = await Promise.all([
    getServices(),
    getIndustries(),
    getFeaturedProjects(3),
    getTestimonials(),
    getBlogPosts(),
  ]);

  const heroStats = [
    { value: "11 yrs", label: "In operation" },
    { value: "150+", label: "Projects" },
    { value: "68", label: "Specialists" },
    { value: "99.98%", label: "Uptime" },
  ];

  const coreTech = technologies.filter((t) => t.maturity === "core").slice(0, 14);

  return (
    <>
      <Hero stats={heroStats} />
      <TrustSection />

      {/* ------------------------------------------------------ services */}
      <Section id="services">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Eight capabilities, one delivery standard"
            description="We work across the full lifecycle of a system — from the first architecture decision to the production runbook. Every engagement uses the same engineering handbook regardless of which capability leads."
            action={
              <ButtonLink href="/services" variant="outline" withArrow>
                All services
              </ButtonLink>
            }
          />
          <div className="mt-14">
            <ServicesGrid services={services} />
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- work */}
      <Section tone="raised" id="work">
        <div className="container-page">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems in production, with numbers attached"
            description="Every case study states the measured outcome, the architecture and the constraints. Client names are used with permission."
            action={
              <ButtonLink href="/projects" variant="outline" withArrow>
                All case studies
              </ButtonLink>
            }
          />
          <div className="mt-14 grid gap-px bg-ink-800 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------- industries */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Industries"
            title="Domain context changes the architecture"
            description="We work in sectors where regulation, data volume or operational risk shape the technical decisions — and we bring the relevant compliance context with us."
            action={
              <ButtonLink href="/industries" variant="outline" withArrow>
                All industries
              </ButtonLink>
            }
          />

          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
            {industries.slice(0, 6).map((industry) => (
              <StaggerItem key={industry.slug} className="bg-ink-950">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-ink-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <ContentIcon name={industry.icon} className="size-6 text-accent-400" />
                    <ArrowUpRight
                      className="size-4 text-ink-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-[1rem] font-semibold text-white">{industry.name}</h3>
                  <p className="text-[0.85rem] leading-relaxed text-ink-400">
                    {industry.summary}
                  </p>
                  <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3 text-[0.7rem] text-ink-600">
                    {industry.compliance.slice(0, 3).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ------------------------------------------------------- process */}
      <Section tone="raised" id="process">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we deliver"
            title="A seven-phase process you can audit"
            description="Select a phase to see what happens and what you receive. Nothing here is optional — the same sequence runs on a four-week audit and a three-year programme, scaled appropriately."
          />
          <div className="mt-14">
            <ProcessTimeline steps={deliveryProcess} />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- why us */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Why teams choose us"
            title="Specific commitments, not adjectives"
            description="These are the operating standards written into our engagement agreements."
          />
          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, index) => (
              <StaggerItem key={item.title} className="bg-ink-950 p-7">
                <p className="font-mono text-[0.72rem] text-accent-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-[0.98rem] font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-400">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* -------------------------------------------------- testimonials */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client perspective"
            title="What the people who signed the contract say"
          />
          <div className="mt-12">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------- technology */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Technology"
            title="A deliberately narrow core stack"
            description="We standardise on a small set of technologies we operate in production every day, and add others only when a project genuinely requires it."
            action={
              <ButtonLink href="/technologies" variant="outline" withArrow>
                Full stack
              </ButtonLink>
            }
          />
          <Reveal className="mt-12 flex flex-wrap gap-2">
            {coreTech.map((tech) => (
              <span
                key={tech.name}
                className="border border-ink-800 bg-ink-900/60 px-4 py-2.5 text-[0.85rem] text-ink-200 transition-colors hover:border-accent-500/60 hover:text-white"
              >
                {tech.name}
              </span>
            ))}
            <Link
              href="/technologies"
              className="border border-accent-500/40 bg-accent-500/5 px-4 py-2.5 text-[0.85rem] text-accent-300 transition-colors hover:bg-accent-500/10"
            >
              + {technologies.length - coreTech.length} more
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------ insights */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Insights"
            title="Notes from the engineering floor"
            description="Written by the people doing the work — no ghostwritten thought leadership."
            action={
              <ButtonLink href="/insights" variant="outline" withArrow>
                All insights
              </ButtonLink>
            }
          />
          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <StaggerItem key={post.slug} className="bg-ink-950">
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-ink-900"
                >
                  <div className="flex items-center gap-3 text-[0.72rem] text-ink-500">
                    <span className="text-accent-400">{post.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </div>
                  <h3 className="mt-5 text-[1.02rem] font-semibold leading-snug text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-400">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-7 text-[0.78rem] text-ink-500">
                    {post.readingMinutes} min read
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
