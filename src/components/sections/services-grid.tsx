import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ContentIcon } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import type { Service } from "@/types/content";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <Stagger className="grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <StaggerItem key={service.slug} className="bg-ink-950">
          <Link
            href={`/services/${service.slug}`}
            className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-ink-900 lg:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent-400 transition-transform duration-500 group-hover:scale-x-100"
            />

            <ContentIcon
              name={service.icon}
              className="size-6 text-accent-400 transition-transform duration-300 group-hover:-translate-y-0.5"
            />

            <h3 className="mt-6 text-[1.05rem] font-semibold leading-snug text-white">
              {service.shortTitle}
            </h3>
            <p className="mt-3 text-[0.87rem] leading-relaxed text-ink-400">
              {service.summary}
            </p>

            <ul className="mt-5 space-y-1.5">
              {service.keyFeatures.slice(0, 3).map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-[0.78rem] text-ink-500"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.5rem] h-px w-2.5 shrink-0 bg-ink-600 transition-colors group-hover:bg-accent-500"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <span className="mt-auto flex items-center gap-1.5 pt-7 text-[0.8rem] font-medium text-ink-300 transition-colors group-hover:text-accent-300">
              Explore service
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
