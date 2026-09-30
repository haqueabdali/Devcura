"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with a real error reporting sink (Sentry / OpenTelemetry) in production.
    console.error("[app] unhandled error", error);
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center bg-ink-950">
      <div className="container-page">
        <div className="max-w-2xl">
          <AlertTriangle className="size-8 text-amber-400" aria-hidden="true" />
          <h1 className="mt-6 text-[2rem] font-semibold text-white sm:text-[2.4rem]">
            Something went wrong on our side
          </h1>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink-400">
            The page failed to render. The error has been logged. You can retry immediately —
            transient failures usually resolve on a second attempt.
          </p>
          {error.digest ? (
            <p className="mt-4 font-mono text-[0.78rem] text-ink-600">
              Reference: {error.digest}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="h-11 bg-accent-500 px-5 text-[0.9rem] font-medium text-ink-950 transition-colors hover:bg-accent-400"
            >
              Try again
            </button>
            <a
              href="/"
              className="grid h-11 place-items-center border border-ink-600 px-5 text-[0.9rem] font-medium text-ink-100 transition-colors hover:border-accent-400"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
