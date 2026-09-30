export default function SiteLoading() {
  return (
    <div className="container-page pt-40" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading content…</span>

      <div className="h-3 w-28 animate-pulse bg-ink-800" />
      <div className="mt-8 h-10 w-3/4 animate-pulse bg-ink-800 md:h-14 md:w-2/3" />
      <div className="mt-4 h-10 w-1/2 animate-pulse bg-ink-800 md:h-14 md:w-1/3" />
      <div className="mt-8 h-4 w-full max-w-xl animate-pulse bg-ink-900" />
      <div className="mt-3 h-4 w-full max-w-md animate-pulse bg-ink-900" />

      <div className="mt-20 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4 bg-ink-950 p-7">
            <div className="size-6 animate-pulse bg-ink-800" />
            <div className="h-4 w-2/3 animate-pulse bg-ink-800" />
            <div className="h-3 w-full animate-pulse bg-ink-900" />
            <div className="h-3 w-4/5 animate-pulse bg-ink-900" />
          </div>
        ))}
      </div>
    </div>
  );
}
