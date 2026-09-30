import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { ContentIcon } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { getIndustries } from "@/services/content";

export const metadata: Metadata = buildMetadata({
  title: "Industries we work in",
  description:
    "Sector experience across FinTech, e-commerce, healthcare, logistics, manufacturing, education, real estate, retail, energy and professional services.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Sector context shapes every architecture decision"
        description="Regulation, data volume and operational risk differ by industry, and so do the correct technical trade-offs. These are the sectors where we already carry the domain and compliance context."
        crumbs={[{ name: "Industries", href: "/industries" }]}
      >
        <ButtonLink href="/contact" withArrow>
          Discuss your sector
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="container-page">
          <Stagger className="grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <StaggerItem key={industry.slug} className="bg-ink-950">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-ink-900 lg:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <ContentIcon name={industry.icon} className="size-6 text-accent-400" />
                    <ArrowUpRight
                      className="size-4 text-ink-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-400"
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="mt-6 text-[1.05rem] font-semibold leading-snug text-white">
                    {industry.name}
                  </h2>
                  <p className="mt-3 text-[0.87rem] leading-relaxed text-ink-400">
                    {industry.summary}
                  </p>

                  <div className="mt-6 border-t border-ink-800 pt-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-600">
                      Compliance context
                    </p>
                    <p className="mt-2 text-[0.78rem] text-ink-500">
                      {industry.compliance.join(" · ")}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
