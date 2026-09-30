import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";

import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/layout/logo";
import { CSRF_COOKIE, getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Administrator sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin/dashboard");

  // Minted by middleware (cookies cannot be written during a render).
  const csrfToken = (await cookies()).get(CSRF_COOKIE)?.value ?? "";

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-ink-950 px-5 py-16">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]"
      />

      <div className="relative w-full max-w-md">
        <Logo />

        <div className="surface mt-10 p-8">
          <h1 className="text-[1.4rem] font-semibold text-white">Content dashboard</h1>
          <p className="mt-2 text-[0.87rem] leading-relaxed text-ink-400">
            Authorised staff only. Sessions last 8 hours and are bound to an httpOnly cookie.
          </p>

          <LoginForm csrfToken={csrfToken} />
        </div>

        <p className="mt-6 text-[0.78rem] leading-relaxed text-ink-600">
          No account yet? Create the first administrator with{" "}
          <code className="font-mono text-ink-500">npx tsx src/db/seed.ts</code> after setting
          ADMIN_EMAIL and ADMIN_PASSWORD in <code className="font-mono text-ink-500">.env</code>.
          See README → Admin setup.
        </p>
      </div>
    </div>
  );
}
