"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Briefcase,
  Building2,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Users,
  Wrench,
  X,
} from "lucide-react";

import { Logo } from "@/components/layout/logo";
import type { SessionUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Projects", href: "/admin/projects", icon: Briefcase },
  { label: "Industries", href: "/admin/industries", icon: Building2 },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Team", href: "/admin/team", icon: Users },
];

export function AdminShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-ink-950 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-ink-800 bg-ink-900 transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-ink-800 px-5">
          <Logo compact />
          <span className="ml-3 text-[0.72rem] uppercase tracking-[0.16em] text-ink-500">
            Admin
          </span>
        </div>

        <nav aria-label="Admin sections" className="p-3">
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-[0.86rem] transition-colors",
                      active
                        ? "bg-ink-800 text-white"
                        : "text-ink-400 hover:bg-ink-800/60 hover:text-ink-100",
                    )}
                  >
                    <item.icon className="size-4" aria-hidden="true" strokeWidth={1.6} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-ink-800 p-4">
          <p className="text-[0.82rem] text-white">{user.name}</p>
          <p className="text-[0.74rem] text-ink-500">
            {user.email} · {user.role}
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-3 flex w-full items-center gap-2 border border-ink-700 px-3 py-2 text-[0.8rem] text-ink-300 transition-colors hover:border-accent-500 hover:text-white"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-ink-800 px-5 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            className="grid size-9 place-items-center border border-ink-700 text-ink-200"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link href="/" className="text-[0.8rem] text-ink-400 hover:text-white">
            View site →
          </Link>
        </header>

        <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
