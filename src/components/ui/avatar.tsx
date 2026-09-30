import Image from "next/image";

import { cn, initials } from "@/lib/utils";

/**
 * Monogram avatar. Real photography is intentionally not faked — supply an
 * image path (e.g. /images/team/e-van-dijk.webp) and it will be used instead.
 */
export function Avatar({
  name,
  src,
  size = 48,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-ink-700 bg-ink-800 font-medium tracking-wide text-accent-300",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
