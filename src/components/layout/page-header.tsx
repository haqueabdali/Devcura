import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  align = "left",
  meta,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  align?: "left" | "center";
  meta?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950 pt-32 md:pt-40">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-accent-500/[0.07] blur-[120px]"
      />

      <div className="container-page relative pb-16 md:pb-20">
        <Breadcrumbs items={crumbs} />

        <div
          className={cn(
            "mt-8 max-w-4xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow ? (
            <Reveal>
              <p className="eyebrow mb-5">
                <span aria-hidden="true" className="h-px w-6 bg-accent-400" />
                {eyebrow}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.05}>
            <h1 className="text-[2.1rem] font-semibold leading-[1.1] text-white sm:text-[2.7rem] lg:text-[3.25rem]">
              {title}
            </h1>
          </Reveal>

          {description ? (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-ink-300 sm:text-[1.08rem]">
                {description}
              </p>
            </Reveal>
          ) : null}

          {children ? (
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-3">{children}</div>
            </Reveal>
          ) : null}
        </div>

        {meta ? <Reveal delay={0.2}>{meta}</Reveal> : null}
      </div>
    </section>
  );
}
