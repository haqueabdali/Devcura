import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { siteConfig } from "@/config/site";

export function CtaBand({
  eyebrow = "Next step",
  title = "Let's scope the problem before we talk about the solution",
  description = "Tell us what you are trying to change. We will respond within one business day with an initial technical view and a suggested next step — no obligation, no scripted sales call.",
  primaryLabel = "Start a project",
  primaryHref = "/contact",
  secondaryLabel = "Talk to an engineer",
  secondaryHref,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="border-y border-ink-800 bg-ink-900">
      <div className="container-page py-16 md:py-20">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">
              <span aria-hidden="true" className="h-px w-6 bg-accent-400" />
              {eyebrow}
            </p>
            <h2 className="max-w-2xl text-[1.7rem] font-semibold leading-tight text-white sm:text-[2.1rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-ink-300">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href={primaryHref} size="lg" withArrow>
                {primaryLabel}
              </ButtonLink>
              <ButtonLink
                href={secondaryHref ?? `mailto:${siteConfig.contact.salesEmail}`}
                size="lg"
                variant="outline"
              >
                {secondaryLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <p className="text-[0.78rem] text-ink-500 lg:text-right">
              Typical response time: under 1 business day · {siteConfig.contact.hours}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
