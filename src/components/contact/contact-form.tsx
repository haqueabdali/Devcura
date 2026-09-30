"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { budgetOptions, timelineOptions } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface ServiceOption {
  slug: string;
  label: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "h-11 w-full border border-ink-800 bg-ink-900 px-3.5 text-[0.9rem] text-ink-100 placeholder:text-ink-600 transition-colors focus:border-accent-500 disabled:opacity-60";

export function ContactForm({
  services,
  defaultService,
}: {
  services: ServiceOption[];
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        ok: boolean;
        reference?: string;
        errors?: Record<string, string>;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setFormError(
          data.message ??
            "We could not submit your message. Please try again or email us directly.",
        );
        setStatus("error");
        return;
      }

      setReference(data.reference ?? null);
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setFormError(
        "Network error — your message was not sent. Please check your connection or email us directly.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="surface flex flex-col items-start gap-5 p-8 md:p-10"
        aria-live="polite"
      >
        <CheckCircle2 className="size-8 text-accent-400" aria-hidden="true" />
        <div>
          <h2 className="text-[1.3rem] font-semibold text-white">Message received</h2>
          <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-ink-300">
            Thank you. Your enquiry has been recorded
            {reference ? (
              <>
                {" "}
                under reference{" "}
                <span className="font-mono text-accent-300">{reference}</span>
              </>
            ) : null}
            . A senior engineer or delivery lead will respond within one business day.
          </p>
          <p className="mt-4 max-w-lg text-[0.82rem] leading-relaxed text-ink-500">
            Note: email notifications are not yet configured in this environment, so your
            enquiry is stored securely in the database and visible in the admin dashboard.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="border border-ink-700 px-4 py-2 text-[0.82rem] text-ink-200 transition-colors hover:border-accent-500 hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="surface p-7 md:p-9">
      {formError ? (
        <div
          role="alert"
          className="mb-7 flex items-start gap-3 border border-red-500/40 bg-red-500/10 p-4"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-[0.85rem] text-red-200">{formError}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            disabled={busy}
            aria-invalid={Boolean(errors.fullName)}
            className={fieldClass}
            placeholder="Jane Whitmore"
          />
        </Field>

        <Field label="Company" name="company" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            disabled={busy}
            className={fieldClass}
            placeholder="Company name"
          />
        </Field>

        <Field label="Business email" name="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={busy}
            aria-invalid={Boolean(errors.email)}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Phone" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={busy}
            className={fieldClass}
            placeholder="+31 20 000 0000"
          />
        </Field>

        <Field label="Country" name="country" error={errors.country}>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            disabled={busy}
            className={fieldClass}
            placeholder="Netherlands"
          />
        </Field>

        <Field label="Service of interest" name="service" error={errors.service}>
          <select
            id="service"
            name="service"
            defaultValue={defaultService ?? ""}
            disabled={busy}
            className={cn(fieldClass, "pr-8")}
          >
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Indicative budget" name="budget" error={errors.budget}>
          <select id="budget" name="budget" defaultValue="" disabled={busy} className={cn(fieldClass, "pr-8")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Timeline" name="timeline" error={errors.timeline}>
          <select id="timeline" name="timeline" defaultValue="" disabled={busy} className={cn(fieldClass, "pr-8")}>
            <option value="">Not defined</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What are you trying to achieve?" name="message" required error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            disabled={busy}
            aria-invalid={Boolean(errors.message)}
            minLength={30}
            className="w-full resize-y border border-ink-800 bg-ink-900 p-3.5 text-[0.9rem] leading-relaxed text-ink-100 placeholder:text-ink-600 transition-colors focus:border-accent-500 disabled:opacity-60"
            placeholder="Describe the system, the problem and any constraints — the more context, the more useful our first reply will be."
          />
        </Field>
      </div>

      {/* Honeypot — visually hidden, must stay empty */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          disabled={busy}
          aria-invalid={Boolean(errors.consent)}
          className="mt-1 size-4 shrink-0 accent-[#2bb3a3]"
        />
        <label htmlFor="consent" className="text-[0.82rem] leading-relaxed text-ink-400">
          I agree that my details may be stored and used to respond to this enquiry, as
          described in the{" "}
          <Link href="/privacy-policy" className="text-accent-300 link-underline">
            privacy policy
          </Link>
          .
        </label>
      </div>
      {errors.consent ? (
        <p className="mt-2 text-[0.78rem] text-red-400">{errors.consent}</p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={busy} withArrow={!busy}>
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="text-[0.78rem] text-ink-500">
          Response within one business day · Mutual NDA available on request
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[0.8rem] font-medium text-ink-300">
        {label}
        {required ? (
          <span className="ml-1 text-accent-400" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.72rem] text-ink-600">optional</span>
        )}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[0.78rem] text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
