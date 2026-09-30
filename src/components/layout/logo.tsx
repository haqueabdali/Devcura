import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark placeholder. Replace the SVG mark with the real logo asset at
 * /public/images/logo.svg when brand assets are supplied.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="relative grid size-8 place-items-center border border-accent-500/60 bg-accent-500/10">
        <span className="absolute inset-[3px] border border-accent-400/40" aria-hidden="true" />
        <span className="relative text-[0.7rem] font-semibold tracking-tight text-accent-300">
          N
        </span>
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="text-[0.95rem] font-semibold tracking-tight text-white">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink-400">
            Software Engineering
          </span>
        </span>
      ) : null}
    </Link>
  );
}
