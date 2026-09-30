import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { careerBenefits, companyValues, jobOpenings } from "@/content/company";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers — engineering, platform and design roles",
  description:
    "Open roles for senior engineers, platform engineers, product designers and applied AI engineers across Amsterdam, Kraków, Austin and remote EU.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Work on systems that matter, at a sustainable pace"
        description="We hire experienced people, give them real ownership and protect the conditions that make good engineering possible. Applications are reviewed by the engineers you would work with, not by a keyword filter."
        crumbs={[{ name: "Careers", href: "/careers" }]}
      >
        <ButtonLink href="#openings" withArrow>
          See open roles
        </ButtonLink>
        <ButtonLink href={`mailto:${siteConfig.contact.careersEmail}`} variant="outline">
          Speculative application
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="Why here" title="What we actually offer" />
          <Stagger className="mt-14 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-2 lg:grid-cols-4">
            {careerBenefits.map((benefit) => (
              <StaggerItem key={benefit.title} className="bg-ink-950 p-7">
                <h3 className="text-[0.98rem] font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-400">
                  {benefit.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="raised" id="openings">
        <div className="container-page">
          <SectionHeading
            eyebrow={`${jobOpenings.length} open roles`}
            title="Current openings"
            description="Applications go directly to the hiring team. Expect a technical conversation, a paid or short practical exercise, and a decision within two weeks."
          />

          <div className="mt-14 divide-y divide-ink-800 border-y border-ink-800">
            {jobOpenings.map((job, index) => (
              <Reveal key={job.slug} delay={index * 0.05}>
                <article className="grid gap-6 py-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <h3 className="text-[1.1rem] font-semibold text-white">{job.title}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-ink-500">
                      <span className="text-accent-400">{job.department}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.level}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.type}</span>
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-[0.8rem] text-ink-400">
                      <MapPin className="size-3.5 text-ink-600" aria-hidden="true" />
                      {job.location}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-[0.9rem] leading-relaxed text-ink-300">{job.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {job.requirements.map((req) => (
                        <li key={req} className="text-[0.82rem] text-ink-500">
                          — {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-2 lg:text-right">
                    <ButtonLink
                      href={`mailto:${siteConfig.contact.careersEmail}?subject=${encodeURIComponent(
                        `Application: ${job.title}`,
                      )}`}
                      variant="outline"
                      size="sm"
                    >
                      Apply
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-[0.82rem] text-ink-500">
            Applications are handled over email while the applicant tracking integration is being
            configured. [PLACEHOLDER — connect ATS or add an application form with file upload.]
          </p>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="Culture" title="How we work together" />
          <div className="mt-14 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-2 lg:grid-cols-3">
            {companyValues.map((value) => (
              <div key={value.title} className="bg-ink-950 p-7">
                <h3 className="text-[0.98rem] font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
