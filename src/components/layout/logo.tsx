import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Devcura mark: a hexagon (platform) holding a "D" with a code chevron (dev + care). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="dc-g" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <path
        d="M32 3 57 17.5v29L32 61 7 46.5v-29L32 3Z"
        fill="#0b1220"
        stroke="url(#dc-g)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M22 19h9.5c8 0 13 5 13 13s-5 13-13 13H22V19Z"
        stroke="url(#dc-g)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="m28 27.5 6.5 4.5-6.5 4.5"
        stroke="#7db3ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
      <circle cx="50" cy="14" r="3.2" fill="#22d3ee" className="motion-safe:animate-pulse" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <LogoMark className="size-9 drop-shadow-[0_0_12px_rgba(59,130,246,0.45)]" />
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="text-[1.05rem] font-semibold tracking-tight text-white">
            Dev<span className="text-accent-400">cura</span>
          </span>
          <span className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.22em] text-ink-400">
            Software Engineering
          </span>
        </span>
      ) : null}
    </Link>
  );
}
