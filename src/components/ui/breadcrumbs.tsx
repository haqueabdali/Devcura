import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="w-full">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.78rem] text-ink-400">
          {all.map((crumb, index) => {
            const isLast = index === all.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight className="size-3.5 text-ink-600" aria-hidden="true" />
                ) : null}
                {isLast ? (
                  <span className="text-ink-200" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="link-underline hover:text-accent-300">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
