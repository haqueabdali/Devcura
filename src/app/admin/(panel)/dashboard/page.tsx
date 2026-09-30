import Link from "next/link";
import { AlertTriangle, Database, Inbox } from "lucide-react";

import { AdminPageHeading } from "@/components/admin/content-table";
import { getSessionUser } from "@/lib/auth";
import { formatDateTime } from "@/lib/utils";
import { getContentSources } from "@/services/admin";
import { getInquiryStats, listInquiries } from "@/services/inquiries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  const sources = await getContentSources();

  let stats: { total: number; byStatus: Record<string, number> } = {
    total: 0,
    byStatus: {},
  };
  let recent: Awaited<ReturnType<typeof listInquiries>> = [];
  let dbError = false;

  try {
    [stats, recent] = await Promise.all([getInquiryStats(), listInquiries(6)]);
  } catch {
    dbError = true;
  }

  return (
    <>
      <AdminPageHeading
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        description="Operational overview of website enquiries and the current source of each content type."
      />

      {dbError ? (
        <div className="mb-8 flex items-start gap-3 border border-amber-500/40 bg-amber-500/[0.07] p-4">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden="true" />
          <p className="text-[0.85rem] leading-relaxed text-amber-200/90">
            The database could not be reached, so enquiry data is unavailable. Check{" "}
            <code className="font-mono">DATABASE_URL</code> and run{" "}
            <code className="font-mono">npx drizzle-kit push</code>. See README → Troubleshooting.
          </p>
        </div>
      ) : null}

      <section aria-labelledby="inquiry-stats">
        <h2 id="inquiry-stats" className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-500">
          Contact enquiries
        </h2>
        <div className="mt-4 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total", value: stats.total },
            { label: "New", value: stats.byStatus.new ?? 0 },
            { label: "Contacted", value: stats.byStatus.contacted ?? 0 },
            { label: "Qualified", value: stats.byStatus.qualified ?? 0 },
            { label: "Archived", value: stats.byStatus.archived ?? 0 },
          ].map((item) => (
            <div key={item.label} className="bg-ink-900 p-5">
              <p className="text-[1.6rem] font-semibold leading-none text-white">{item.value}</p>
              <p className="mt-2 text-[0.8rem] text-ink-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="content-sources" className="mt-12">
        <h2 id="content-sources" className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-500">
          Content sources
        </h2>
        <div className="mt-4 grid gap-px border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(sources)
            .filter(([key]) => key !== "databaseReachable")
            .map(([key, value]) => {
              const entry = value as { count: number | null; source: string };
              return (
                <div key={key} className="flex items-start justify-between gap-4 bg-ink-900 p-5">
                  <div>
                    <p className="text-[0.9rem] font-medium capitalize text-white">{key}</p>
                    <p className="mt-1 text-[0.78rem] text-ink-500">
                      {entry.count === null ? "unavailable" : `${entry.count} rows in database`}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 border px-2 py-0.5 text-[0.66rem] uppercase tracking-wide ${
                      entry.source === "database"
                        ? "border-accent-500/50 bg-accent-500/10 text-accent-200"
                        : "border-ink-700 text-ink-400"
                    }`}
                  >
                    {entry.source}
                  </span>
                </div>
              );
            })}
        </div>
        <p className="mt-4 flex items-start gap-2 text-[0.82rem] text-ink-500">
          <Database className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Content falls back to the typed seed files in <code className="mx-1 font-mono">src/content/</code>
          whenever a table is empty, so the public site always renders.
        </p>
      </section>

      <section aria-labelledby="recent-inquiries" className="mt-12">
        <div className="flex items-center justify-between">
          <h2 id="recent-inquiries" className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-500">
            Recent enquiries
          </h2>
          <Link href="/admin/inquiries" className="text-[0.8rem] text-accent-300 hover:text-accent-200">
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="mt-4 border border-dashed border-ink-800 p-12 text-center">
            <Inbox className="mx-auto size-7 text-ink-600" aria-hidden="true" />
            <p className="mt-4 text-[0.92rem] text-white">No enquiries yet</p>
            <p className="mt-1.5 text-[0.82rem] text-ink-500">
              Submissions from the public contact form will appear here immediately.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-ink-800 border border-ink-800">
            {recent.map((inquiry) => (
              <li key={inquiry.id} className="flex flex-wrap items-center justify-between gap-3 bg-ink-900 p-4">
                <div className="min-w-0">
                  <p className="text-[0.88rem] font-medium text-white">
                    {inquiry.fullName}
                    {inquiry.company ? (
                      <span className="text-ink-500"> · {inquiry.company}</span>
                    ) : null}
                  </p>
                  <p className="mt-1 truncate text-[0.8rem] text-ink-500">{inquiry.email}</p>
                </div>
                <p className="text-[0.76rem] text-ink-600">{formatDateTime(inquiry.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
