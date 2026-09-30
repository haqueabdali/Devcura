import Link from "next/link";
import type { Metadata } from "next";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const suggestions = [
  { label: "Services", href: "/services", description: "Eight engineering capabilities" },
  { label: "Case studies", href: "/projects", description: "Work with measured outcomes" },
  { label: "Insights", href: "/insights", description: "Technical writing from our team" },
  { label: "Contact", href: "/contact", description: "Start a conversation" },
];

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-ink-950">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />

      <header className="container-page relative py-8">
        <Logo />
      </header>

      <main className="container-page relative flex flex-1 items-center py-16">
        <div className="w-full max-w-3xl">
          <p className="font-mono text-[0.8rem] tracking-[0.2em] text-accent-400">
            ERROR 404
          </p>
          <h1 className="mt-6 text-[2.2rem] font-semibold leading-tight text-white sm:text-[3rem]">
            That page does not exist
          </h1>
          <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-ink-400">
            The URL may have changed, or the page may have been retired. Nothing is broken on
            your side — here are the sections people usually want.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" withArrow>
              Back to homepage
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Report a broken link
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2">
            {suggestions.map((item) => (
              <li key={item.href} className="bg-ink-950">
                <Link
                  href={item.href}
                  className="block p-6 transition-colors hover:bg-ink-900"
                >
                  <p className="text-[0.95rem] font-medium text-white">{item.label}</p>
                  <p className="mt-1.5 text-[0.82rem] text-ink-500">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
