"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LoginForm({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !result.ok) {
        setError(result.message ?? "Sign in failed.");
        setBusy(false);
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
      {error ? (
        <div role="alert" className="flex items-start gap-3 border border-red-500/40 bg-red-500/10 p-3.5">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-[0.84rem] text-red-200">{error}</p>
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="mb-2 block text-[0.8rem] font-medium text-ink-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          disabled={busy}
          className="h-11 w-full border border-ink-800 bg-ink-900 px-3.5 text-[0.9rem] text-ink-100 focus:border-accent-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-[0.8rem] font-medium text-ink-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="current-password"
          disabled={busy}
          className="h-11 w-full border border-ink-800 bg-ink-900 px-3.5 text-[0.9rem] text-ink-100 focus:border-accent-500"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
