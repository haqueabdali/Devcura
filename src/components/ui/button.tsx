import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none rounded-[3px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-500 text-white hover:bg-accent-400 shadow-[0_0_0_0_rgba(59,130,246,0)] hover:shadow-[0_0_28px_-4px_rgba(59,130,246,0.7)]",
  secondary: "bg-white text-ink-950 hover:bg-ink-100",
  outline:
    "border border-ink-600 text-ink-100 hover:border-accent-400 hover:text-white bg-transparent",
  ghost: "text-ink-200 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.82rem]",
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-13 px-7 text-[0.95rem] py-3.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow = false,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow = false,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
}
