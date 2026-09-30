"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, CircleCheck, GitBranch, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { LiveMetric } from "@/components/home/live-metric";
import { NetworkCanvas } from "@/components/home/network-canvas";
import { TypedHeadline } from "@/components/home/typed-headline";
import { primaryCta, secondaryCta } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const trustPoints = [
  { icon: ShieldCheck, label: "Security reviewed by default" },
  { icon: GitBranch, label: "You own every commit" },
  { icon: Activity, label: "SLO-backed operations" },
];

const phrases = ["business runs on", "customers trust", "growth depends on", "teams rely on"];

const buildLog = [
  { label: "terraform apply", status: "ok", detail: "42 resources unchanged" },
  { label: "test suite", status: "ok", detail: "1,284 passed · 0 failed" },
  { label: "security scan", status: "ok", detail: "SAST · SCA · secrets clean" },
  { label: "deploy · canary 10%", status: "run", detail: "p95 184ms · errors 0.00%" },
];

export function Hero({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-950 pt-32 md:pt-40 lg:pt-44">
      {/* Subtle animated background: grid + slow accent bloom */}
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(85%_70%_at_50%_0%,black,transparent)]"
      />
      <NetworkCanvas />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-56 right-[-10%] size-[46rem] rounded-full bg-accent-500/[0.09] blur-[140px]"
        animate={reduce ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-16 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2.5 border border-ink-700 bg-ink-900/70 px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-ink-200"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
              </span>
              Accepting new engagements for Q2
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
              className="mt-7 text-[2.4rem] font-semibold leading-[1.06] text-white sm:text-[3.1rem] lg:text-[3.4rem] xl:text-[3.8rem]"
            >
              Engineering the systems your{" "}
              <span className="text-gradient relative block min-h-[1.1em]">
                <TypedHeadline phrases={phrases} />
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
              className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink-300 sm:text-[1.1rem]"
            >
              We design, build and operate software platforms for companies where
              downtime, audit failures and slow delivery carry a real cost. Senior
              engineers, a fixed two-week cadence, and architecture you can defend.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href={primaryCta.href} size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} size="lg" variant="outline">
                {secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
            >
              {trustPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-2 text-[0.82rem] text-ink-400">
                  <point.icon className="size-4 text-accent-400" aria-hidden="true" strokeWidth={1.6} />
                  {point.label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Technology-focused visual: a live-looking delivery pipeline panel */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-px bg-gradient-to-b from-accent-500/25 via-transparent to-transparent"
              />
              <div className="surface relative p-1">
                <div className="flex items-center justify-between border-b border-ink-800 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-ink-600" />
                    <span className="size-2 rounded-full bg-ink-600" />
                    <span className="size-2 rounded-full bg-accent-500/70" />
                  </div>
                  <p className="font-mono text-[0.68rem] tracking-wide text-ink-500">
                    devcura/delivery-pipeline · production
                  </p>
                </div>

                <div className="space-y-px bg-ink-800/40">
                  {buildLog.map((line, index) => (
                    <motion.div
                      key={line.label}
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.12, ease: EASE }}
                      className="flex items-center justify-between gap-4 bg-ink-900 px-4 py-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {line.status === "ok" ? (
                          <CircleCheck
                            className="size-4 shrink-0 text-accent-400"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="size-4 shrink-0 rounded-full border-2 border-accent-500/30 border-t-accent-400 motion-safe:animate-spin"
                          />
                        )}
                        <span className="truncate font-mono text-[0.78rem] text-ink-100">
                          {line.label}
                        </span>
                      </div>
                      <span className="hidden truncate font-mono text-[0.72rem] text-ink-500 sm:block">
                        {line.status === "run" ? <LiveMetric /> : line.detail}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-px border-t border-ink-800 bg-ink-800/40 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-ink-900 px-4 py-5">
                      <p className="text-[1.15rem] font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-ink-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-right text-[0.7rem] text-ink-600">
                Illustrative pipeline view — not a live client environment
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
