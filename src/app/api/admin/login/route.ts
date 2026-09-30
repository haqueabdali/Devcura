import { NextResponse } from "next/server";

import { authenticate, createSession, verifyCsrfToken } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Brute-force protection: 8 attempts per IP per 15 minutes.
  const limit = rateLimit(clientKey(request.headers, "login"), 8, 15 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  const csrfOk = await verifyCsrfToken(request.headers.get("x-csrf-token"));
  if (!csrfOk) {
    return NextResponse.json(
      { ok: false, message: "Session expired. Reload the page and try again." },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Enter a valid email address and password." },
      { status: 422 },
    );
  }

  try {
    const user = await authenticate(parsed.data.email, parsed.data.password);
    if (!user) {
      // Same message for unknown user and wrong password — no account enumeration.
      return NextResponse.json(
        { ok: false, message: "Invalid credentials." },
        { status: 401 },
      );
    }

    await createSession(user);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/login] failure", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Authentication is unavailable — the database could not be reached. See README → Database setup.",
      },
      { status: 503 },
    );
  }
}
