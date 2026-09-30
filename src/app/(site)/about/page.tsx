import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  companyStats,
  companyTimeline,
  companyValues,
  deliveryProcess,
  differentiators,
  globalPresence,
  missionVision,
  technologies,
} from "@/content/company";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { getTeamMembers } from "@/services/content";

export const metadata: Metadata = buildMetadata({
  title: "About us — engineering team, values and delivery method",
  description:
    "Who we are, how we work and why clients stay. Founded in 2014, 68 specialists across Amsterdam, Kraków and Austin.",
  path: "/about",
});

export default async function AboutPage() {
  const team = await getTeamMembers();
  const coreCount = technologies.filter((t) => t.maturity === "core").length;

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="An engineering company, not a resourcing agency"
        description={`${siteConfig.name} was founded in ${siteConfig.founded} to do one thing properly: build software that keeps working after the launch party. We are ${"68"} specialists across three locations, and we are accountable for what runs in production.`}
        crumbs={[{ name: "About", href: "/about" }]}
        meta={
          <div className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="bg-ink-950 p-6">
                <p className="text-[1.9rem] font-semibold leading-none text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[0.86rem] text-ink-200">{stat.label}</p>
              </div>
            ))}
          </div>
        }
      >
        <ButtonLink href="/careers" withArrow>
          Join the team
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Work with us
        </ButtonLink>
      </PageHeader>

      {/* mission / vision */}
      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal className="surface p-8 md:p-10">
            <p className="eyebrow mb-5">
              <span aria-hidden="true" className="h-px w-6 bg-accent-400" />
              Mission
            </p>
            <p className="text-[1.15rem] leading-relaxed text-white md:text-[1.3rem]">
              {missionVision.mission}
            </p>
          </Reveal>
          <Reveal className="surface p-8 md:p-10" delay={0.08}>
            <p className="eyebrow mb-5">
              <span aria-hidden="true" className="h-px w-6 bg-accent-400" />
              Vision
            </p>
            <p className="text-[1.15rem] leading-relaxed text-white md:text-[1.3rem]">
              {missionVision.vision}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* values */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Values"
            title="Six principles that decide arguments"
            description="These are used in practice — in code review, in estimation and in the difficult conversations with clients."
          />
          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-2 lg:grid-cols-3">
            {companyValues.map((value) => (
              <StaggerItem key={value.title} className="bg-ink-900 p-7">
                <h3 className="text-[1rem] font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-[0.87rem] leading-relaxed text-ink-400">
                  {value.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* story timeline */}
      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="Our story" title="Eleven years, deliberately unglamorous growth" />
          <ol className="mt-14 border-l border-ink-800">
            {companyTimeline.map((entry, index) => (
              <Reveal key={entry.year} delay={index * 0.05} as="li">
                <li className="relative grid gap-2 py-7 pl-8 md:grid-cols-12 md:gap-8">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[4.5px] top-[2.35rem] size-2 rounded-full bg-accent-400"
                  />
                  <p className="font-mono text-[0.85rem] text-accent-300 md:col-span-2">
                    {entry.year}
                  </p>
                  <h3 className="text-[1rem] font-semibold text-white md:col-span-3">
                    {entry.title}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed text-ink-400 md:col-span-7">
                    {entry.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* leadership */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeading
            eyebrow="Leadership"
            title="The people accountable for your engagement"
            description="Photography placeholders are shown as monograms until brand photography is supplied."
          />
          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <StaggerItem key={member.slug} className="bg-ink-900 p-7">
                <Avatar name={member.name} src={member.image || undefined} size={56} />
                <h3 className="mt-5 text-[1rem] font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-[0.82rem] text-accent-300">{member.role}</p>
                <p className="mt-4 text-[0.86rem] leading-relaxed text-ink-400">{member.bio}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {member.focus.map((item) => (
                    <li
                      key={item}
                      className="border border-ink-700 px-2.5 py-1 text-[0.72rem] text-ink-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* methodology */}
      <Section id="process">
        <div className="container-page">
          <SectionHeading
            eyebrow="Methodology"
            title="How an engagement actually runs"
            description="Two-week increments, working software in a real environment, and a written report on scope, spend and risk at the end of each one."
          />
          <div className="mt-14">
            <ProcessTimeline steps={deliveryProcess} />
          </div>
        </div>
      </Section>

      {/* global presence + capability */}
      <Section tone="raised">
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Global presence" title="Where we work" />
            <div className="mt-10 grid gap-px border border-ink-800 bg-ink-800">
              {globalPresence.map((region) => (
                <div key={region.region} className="flex items-center justify-between gap-6 bg-ink-900 p-5">
                  <div>
                    <p className="text-[0.95rem] font-medium text-white">{region.region}</p>
                    <p className="mt-1 text-[0.8rem] text-ink-500">{region.detail}</p>
                  </div>
                  <p className="shrink-0 text-[0.85rem] text-accent-300">
                    {region.clients} clients
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-3">
              {siteConfig.offices.map((office) => (
                <div key={office.city} className="bg-ink-900 p-5">
                  <p className="text-[0.9rem] font-medium text-white">{office.city}</p>
                  <p className="mt-1 text-[0.74rem] uppercase tracking-[0.12em] text-accent-400">
                    {office.role}
                  </p>
                  <address className="mt-3 text-[0.8rem] not-italic leading-relaxed text-ink-500">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Capability"
              title="What we can actually staff"
              description={`${coreCount} technologies are core — used in production by multiple teams, with internal standards and on-call experience behind them.`}
            />
            <div className="mt-10 grid gap-px border border-ink-800 bg-ink-800">
              {differentiators.slice(0, 5).map((item) => (
                <div key={item.title} className="bg-ink-900 p-6">
                  <h3 className="text-[0.95rem] font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <ButtonLink href="/technologies" variant="outline" className="mt-8" withArrow>
              Full technology stack
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
