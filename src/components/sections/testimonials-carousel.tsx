"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import type { Testimonial } from "@/types/content";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = testimonials.length;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused || reduce || total <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 8000);
    return () => clearInterval(timer);
  }, [paused, reduce, total]);

  if (total === 0) return null;
  const active = testimonials[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div className="surface relative overflow-hidden p-8 md:p-12 lg:p-14">
        <Quote
          className="absolute right-8 top-8 size-16 text-ink-800 md:size-24"
          aria-hidden="true"
          strokeWidth={1}
        />

        <AnimatePresence mode="wait">
          <motion.figure
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            aria-live="polite"
          >
            <div className="flex gap-1" aria-label={`${active.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    i < active.rating ? "fill-accent-400 text-accent-400" : "text-ink-700",
                  )}
                />
              ))}
            </div>

            <blockquote className="mt-7 max-w-3xl text-[1.15rem] font-medium leading-relaxed text-white md:text-[1.45rem] md:leading-[1.5]">
              “{active.quote}”
            </blockquote>

            <figcaption className="mt-9 flex flex-wrap items-center gap-4">
              <Avatar name={active.name} src={active.avatar || undefined} size={46} />
              <div>
                <p className="text-[0.92rem] font-medium text-white">{active.name}</p>
                <p className="text-[0.82rem] text-ink-400">
                  {active.position} · {active.company}
                </p>
              </div>
              {active.projectSlug ? (
                <Link
                  href={`/projects/${active.projectSlug}`}
                  className="ml-auto text-[0.8rem] font-medium text-accent-300 link-underline"
                >
                  Read the case study
                </Link>
              ) : null}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <ul className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}: ${t.company}`}
                onClick={() => go(i)}
                className={cn(
                  "h-1 w-8 transition-colors",
                  i === index ? "bg-accent-400" : "bg-ink-700 hover:bg-ink-600",
                )}
              />
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="grid size-10 place-items-center border border-ink-700 text-ink-300 transition-colors hover:border-accent-500 hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="grid size-10 place-items-center border border-ink-700 text-ink-300 transition-colors hover:border-accent-500 hover:text-white"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
