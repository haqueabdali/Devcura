"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { ProcessStep } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = steps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <ol className="relative border-l border-ink-800">
          {steps.map((step, index) => {
            const isActive = index === active;
            return (
              <li key={step.step} className="relative">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "group flex w-full items-start gap-4 py-4 pl-6 pr-3 text-left transition-colors",
                    isActive ? "text-white" : "text-ink-400 hover:text-ink-200",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-px top-1/2 h-9 w-px -translate-y-1/2 transition-colors",
                      isActive ? "bg-accent-400" : "bg-transparent",
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[0.72rem] tabular-nums transition-colors",
                      isActive ? "text-accent-300" : "text-ink-600",
                    )}
                  >
                    {step.step}
                  </span>
                  <span className="text-[0.95rem] font-medium">{step.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.step}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="surface h-full p-7 md:p-9"
          >
            <p className="font-mono text-[0.75rem] text-accent-400">
              Phase {current.step} / {steps[steps.length - 1]?.step}
            </p>
            <h3 className="mt-4 text-[1.4rem] font-semibold text-white md:text-[1.6rem]">
              {current.title}
            </h3>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-300">
              {current.description}
            </p>

            <div className="mt-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Deliverables
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {current.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="border border-ink-700 bg-ink-950/60 px-3 py-1.5 text-[0.78rem] text-ink-200"
                  >
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
