import { NextResponse } from "next/server";

import { hashIp } from "@/lib/auth";
import { sendInquiryNotification } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { contactFormSchema, formatZodErrors } from "@/lib/validation";
import { createInquiry } from "@/services/inquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // 1. Rate limit — 5 submissions per IP per 10 minutes.
  const key = clientKey(request.headers, "contact");
  const limit = rateLimit(key, 5, 10 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json(
      {
        ok: false,
        message: `Too many submissions. Please try again in ${Math.ceil(
          limit.retryAfterSeconds / 60,
        )} minutes, or email us directly.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 2. Parse body defensively.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  // 3. Server-side validation (never trust the client).
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        errors: formatZodErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // 4. Persist.
  try {
    const row = await createInquiry({ ...parsed.data, ipHash: hashIp(ip) });

    // 5. Notify (currently logs — SMTP not configured; see src/lib/mailer.ts).
    await sendInquiryNotification({
      id: row.id,
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      company: parsed.data.company,
      service: parsed.data.service,
      message: parsed.data.message,
    });

    return NextResponse.json({
      ok: true,
      reference: `INQ-${String(row.id).padStart(5, "0")}`,
    });
  } catch (error) {
    console.error("[contact] failed to store inquiry", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not store your enquiry because the database is unavailable. Please email us directly and we will respond the same day.",
      },
      { status: 503 },
    );
  }
}
