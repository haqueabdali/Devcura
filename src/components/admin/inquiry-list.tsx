"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface InquiryItem {
  id: number;
  fullName: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  serviceSlug: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: string;
  createdAt: string;
}

const statuses = ["new", "contacted", "qualified", "archived"] as const;

const statusStyles: Record<string, string> = {
  new: "border-accent-500/50 bg-accent-500/10 text-accent-200",
  contacted: "border-ink-600 text-ink-200",
  qualified: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  archived: "border-ink-800 text-ink-500",
};

export function InquiryList({ inquiries }: { inquiries: InquiryItem[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const visible = inquiries.filter((i) => filter === "all" || i.status === filter);

  async function changeStatus(id: number, status: string) {
    setError(null);
    const response = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      setError(data.message ?? "Could not update the enquiry.");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {["all", ...statuses].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={cn(
              "border px-3 py-1.5 text-[0.8rem] capitalize transition-colors",
              filter === option
                ? "border-accent-500 bg-accent-500/10 text-accent-200"
                : "border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-100",
            )}
          >
            {option}
          </button>
        ))}
        {pending ? <span className="text-[0.78rem] text-ink-500">Updating…</span> : null}
      </div>

      {error ? (
        <p role="alert" className="mb-4 border border-red-500/40 bg-red-500/10 p-3 text-[0.84rem] text-red-200">
          {error}
        </p>
      ) : null}

      {visible.length === 0 ? (
        <div className="border border-dashed border-ink-800 p-12 text-center">
          <p className="text-[0.92rem] text-white">No enquiries in this view</p>
          <p className="mt-1.5 text-[0.82rem] text-ink-500">
            Submissions from the contact form appear here in real time.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-ink-800 border border-ink-800">
          {visible.map((inquiry) => {
            const open = expanded === inquiry.id;
            return (
              <li key={inquiry.id} className="bg-ink-900">
                <div className="flex flex-wrap items-start justify-between gap-4 p-4">
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : inquiry.id)}
                    aria-expanded={open}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <ChevronDown
                      className={cn(
                        "mt-1 size-4 shrink-0 text-ink-500 transition-transform",
                        open && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-[0.9rem] font-medium text-white">
                        {inquiry.fullName}
                        {inquiry.company ? (
                          <span className="text-ink-500"> · {inquiry.company}</span>
                        ) : null}
                      </span>
                      <span className="mt-1 block truncate text-[0.8rem] text-ink-500">
                        {inquiry.email} · {formatDateTime(inquiry.createdAt)}
                      </span>
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "border px-2 py-0.5 text-[0.68rem] uppercase tracking-wide",
                        statusStyles[inquiry.status] ?? statusStyles.contacted,
                      )}
                    >
                      {inquiry.status}
                    </span>
                    <label className="sr-only" htmlFor={`status-${inquiry.id}`}>
                      Change status for {inquiry.fullName}
                    </label>
                    <select
                      id={`status-${inquiry.id}`}
                      value={inquiry.status}
                      onChange={(event) => changeStatus(inquiry.id, event.target.value)}
                      className="h-8 border border-ink-700 bg-ink-950 px-2 text-[0.78rem] text-ink-200 focus:border-accent-500"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {open ? (
                  <div className="border-t border-ink-800 bg-ink-950/60 p-5">
                    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        { label: "Phone", value: inquiry.phone },
                        { label: "Country", value: inquiry.country },
                        { label: "Service", value: inquiry.serviceSlug },
                        { label: "Budget", value: inquiry.budget },
                        { label: "Timeline", value: inquiry.timeline },
                      ].map((item) => (
                        <div key={item.label}>
                          <dt className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-600">
                            {item.label}
                          </dt>
                          <dd className="mt-1 text-[0.84rem] text-ink-200">
                            {item.value || "—"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-5 border-t border-ink-800 pt-4">
                      <p className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-600">
                        Message
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-[0.88rem] leading-relaxed text-ink-300">
                        {inquiry.message}
                      </p>
                    </div>
                    <a
                      href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Re: your enquiry")}`}
                      className="mt-5 inline-block border border-ink-700 px-3 py-1.5 text-[0.8rem] text-ink-200 transition-colors hover:border-accent-500 hover:text-white"
                    >
                      Reply by email
                    </a>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
