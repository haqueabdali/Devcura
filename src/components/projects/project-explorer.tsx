"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SearchX } from "lucide-react";

import { ProjectCard } from "@/components/sections/project-card";
import { projectCategories } from "@/content/projects";
import type { Project, ProjectCategory } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProjectExplorer({
  projects,
  industries,
}: {
  projects: Project[];
  industries: { slug: string; name: string }[];
}) {
  const [category, setCategory] = useState<string>("all");
  const [industry, setIndustry] = useState<string>("all");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory =
          category === "all" || project.categories.includes(category as ProjectCategory);
        const matchesIndustry = industry === "all" || project.industrySlug === industry;
        return matchesCategory && matchesIndustry;
      }),
    [projects, category, industry],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-ink-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter by project type"
          className="-mx-1 flex flex-wrap gap-1 overflow-x-auto"
        >
          {projectCategories.map((option) => {
            const isActive = category === option.value;
            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setCategory(option.value)}
                className={cn(
                  "whitespace-nowrap border px-4 py-2 text-[0.82rem] font-medium transition-colors",
                  isActive
                    ? "border-accent-500 bg-accent-500/10 text-accent-200"
                    : "border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-100",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="industry-filter" className="text-[0.78rem] text-ink-500">
            Industry
          </label>
          <select
            id="industry-filter"
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
            className="h-10 min-w-48 border border-ink-800 bg-ink-900 px-3 text-[0.85rem] text-ink-100 focus:border-accent-500"
          >
            <option value="all">All industries</option>
            {industries.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-[0.8rem] text-ink-500" aria-live="polite">
        Showing {filtered.length} of {projects.length} case studies
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 border border-dashed border-ink-800 p-14 text-center">
          <SearchX className="mx-auto size-8 text-ink-600" aria-hidden="true" />
          <p className="mt-5 text-[1rem] font-medium text-white">
            No case studies match that combination
          </p>
          <p className="mx-auto mt-2 max-w-md text-[0.87rem] text-ink-400">
            Not every engagement is published — many are covered by confidentiality
            agreements. Ask us directly about work in this area.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setIndustry("all");
            }}
            className="mt-6 border border-ink-700 px-4 py-2 text-[0.82rem] text-ink-200 transition-colors hover:border-accent-500 hover:text-white"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-10 grid gap-px bg-ink-800 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
