import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";

export interface ContentRow {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  href?: string;
  status?: string;
}

/**
 * Read-only content listing.
 *
 * Write operations (create / edit / delete) are deliberately NOT stubbed with
 * fake buttons. The data layer (src/services/content.ts) and the tables in
 * src/db/schema.ts already support them — the editing forms are the next
 * implementation phase, or the project can be pointed at a headless CMS.
 */
export function ContentTable({
  rows,
  source,
  entity,
}: {
  rows: ContentRow[];
  source: "database" | "seed content";
  entity: string;
}) {
  return (
    <div>
      <div className="mb-6 flex items-start gap-3 border border-ink-800 bg-ink-900 p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
        <p className="text-[0.84rem] leading-relaxed text-ink-400">
          Showing {rows.length} {entity} from <strong className="text-ink-200">{source}</strong>.
          {source === "seed content"
            ? " The database has no rows yet — run `npx tsx src/db/seed.ts` to import this content so it becomes editable."
            : " These records are served from PostgreSQL."}{" "}
          Editing forms are the next implementation phase; the schema and repository layer
          already support writes.
        </p>
      </div>

      <div className="overflow-x-auto border border-ink-800">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink-800 bg-ink-900">
              <th scope="col" className="px-4 py-3 text-[0.72rem] uppercase tracking-[0.12em] text-ink-500">
                Title
              </th>
              <th scope="col" className="px-4 py-3 text-[0.72rem] uppercase tracking-[0.12em] text-ink-500">
                Detail
              </th>
              <th scope="col" className="px-4 py-3 text-[0.72rem] uppercase tracking-[0.12em] text-ink-500">
                Meta
              </th>
              <th scope="col" className="px-4 py-3 text-right text-[0.72rem] uppercase tracking-[0.12em] text-ink-500">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-ink-800/70 last:border-0">
                <td className="px-4 py-3.5">
                  <p className="text-[0.88rem] font-medium text-white">{row.title}</p>
                  <p className="font-mono text-[0.72rem] text-ink-600">{row.id}</p>
                </td>
                <td className="px-4 py-3.5 text-[0.82rem] text-ink-400">{row.subtitle ?? "—"}</td>
                <td className="px-4 py-3.5 text-[0.82rem] text-ink-400">{row.meta ?? "—"}</td>
                <td className="px-4 py-3.5 text-right">
                  {row.href ? (
                    <Link
                      href={row.href}
                      className="inline-flex items-center gap-1.5 text-[0.8rem] text-accent-300 hover:text-accent-200"
                    >
                      Open
                      <ExternalLink className="size-3" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span className="text-[0.8rem] text-ink-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminPageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8">
      <h1 className="text-[1.5rem] font-semibold text-white">{title}</h1>
      <p className="mt-2 max-w-3xl text-[0.9rem] leading-relaxed text-ink-400">{description}</p>
    </header>
  );
}
