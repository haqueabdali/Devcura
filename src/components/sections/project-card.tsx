import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  priority = false,
  variant = "default",
}: {
  project: Project;
  priority?: boolean;
  variant?: "default" | "compact";
}) {
  return (
    <article className="group relative h-full border border-ink-800 bg-ink-950 transition-colors duration-300 hover:border-ink-700">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
          <Image
            src={project.heroImage}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            className="object-cover opacity-70 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            <span className="border border-ink-700 bg-ink-950/80 px-2 py-1 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-ink-300 backdrop-blur">
              {project.industryLabel}
            </span>
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col p-6", variant === "compact" && "p-5")}>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-accent-400">
            {project.client}
          </p>
          <h3 className="mt-2.5 text-[1.08rem] font-semibold leading-snug text-white">
            {project.name}
          </h3>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-400">
            {project.summary}
          </p>

          {variant === "default" ? (
            <dl className="mt-6 grid grid-cols-2 gap-px border border-ink-800 bg-ink-800">
              {project.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label} className="bg-ink-900/70 px-4 py-3">
                  <dt className="text-[0.68rem] uppercase tracking-[0.1em] text-ink-500">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-[0.95rem] font-semibold text-accent-300">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="border border-ink-800 px-2 py-1 text-[0.68rem] text-ink-500"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-auto flex items-center gap-1.5 pt-6 text-[0.8rem] font-medium text-ink-300 transition-colors group-hover:text-accent-300">
            View case study
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
