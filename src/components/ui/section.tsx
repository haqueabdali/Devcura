import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/motion";

export function Section({
  children,
  className,
  id,
  tone = "default",
  as: Comp = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "raised" | "contrast";
  as?: "section" | "div";
}) {
  const tones = {
    default: "bg-ink-950",
    raised: "bg-ink-900",
    contrast: "bg-ink-900/60",
  } as const;

  return (
    <Comp
      id={id}
      className={cn("py-20 md:py-28 lg:py-32", tones[tone], className)}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex w-full flex-col gap-5",
        align === "center" ? "items-center text-center" : "",
        action ? "lg:flex-row lg:items-end lg:justify-between lg:gap-12" : "",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="eyebrow mb-4">
            <span aria-hidden="true" className="h-px w-6 bg-accent-400" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-[1.85rem] leading-[1.15] font-semibold text-white sm:text-[2.25rem] lg:text-[2.75rem]">
          {title}
        </h2>
        {description ? (
          <div className="mt-5 text-[1rem] leading-relaxed text-ink-300 sm:text-[1.05rem]">
            {description}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
