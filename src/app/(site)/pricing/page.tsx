import type { Metadata } from "next";
import { Check } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { engagementModels, pricingFaqs } from "@/content/company";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Engagement models",
  description:
    "Fixed scope, dedicated team, time & materials and enterprise programme engagement models — how we structure commercial agreements.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(pricingFaqs)} />

      <PageHeader
        eyebrow="Engagement models"
        title="Four ways to work with us"
        description="We do not publish day rates, because a rate without a team composition is meaningless. What we can be precise about is how the commercial relationship is structured, what is included and what governance you get."
        crumbs={[{ name: "Engagement", href: "/pricing" }]}
      >
        <ButtonLink href="/contact" withArrow>
          Discuss your project
        </ButtonLink>
      </PageHeader>

      <Section>
        <div className="container-page">
          <Stagger className="grid gap-px border border-ink-800 bg-ink-800 lg:grid-cols-2 xl:grid-cols-4">
            {engagementModels.map((model) => (
              <StaggerItem
                key={model.slug}
                className={cn(
                  "relative flex flex-col bg-ink-950 p-8",
                  model.highlighted && "bg-ink-900",
                )}
              >
                {model.highlighted ? (
                  <span className="absolute right-0 top-0 bg-accent-500 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink-950">
                    Most common
                  </span>
                ) : null}

                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-500">
                  {model.bestFor}
                </p>
                <h2 className="mt-4 text-[1.35rem] font-semibold text-white">{model.name}</h2>
                <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-400">
                  {model.description}
                </p>

                <dl className="mt-7 space-y-3 border-y border-ink-800 py-5 text-[0.82rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Billing</dt>
                    <dd className="text-right text-ink-200">{model.billing}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-500">Minimum</dt>
                    <dd className="text-right text-ink-200">{model.minimumEngagement}</dd>
                  </div>
                </dl>

                <ul className="mt-6 space-y-2.5">
                  {model.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent-400" aria-hidden="true" />
                      <span className="text-[0.83rem] leading-relaxed text-ink-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-ink-800 pt-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-600">
                    Choose this when
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {model.idealWhen.map((item) => (
                      <li key={item} className="text-[0.8rem] leading-relaxed text-ink-500">
                        — {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <ButtonLink
                  href={`/contact?model=${model.slug}`}
                  variant={model.highlighted ? "primary" : "outline"}
                  size="sm"
                  className="mt-8 w-full"
                  withArrow
                >
                  Discuss your project
                </ButtonLink>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-8 max-w-3xl text-[0.85rem] leading-relaxed text-ink-500">
            <strong className="text-ink-300">On pricing transparency:</strong> we publish a full
            rate card in the proposal, including seniority bands, location and any volume
            discount. Indicative budget ranges are given before you commit to a paid discovery.
          </p>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Commercial FAQ"
              title="Contracts, estimates and ownership"
            />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={pricingFaqs} />
          </div>
        </div>
      </Section>
    </>
  );
}
