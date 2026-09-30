import { NextResponse } from "next/server";

import { getSessionUser, hasRole } from "@/lib/auth";
import { inquiryStatusSchema } from "@/lib/validation";
import { updateInquiryStatus } from "@/services/inquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!hasRole(user, "editor")) {
    return NextResponse.json({ ok: false, message: "Not authorised." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = inquiryStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Invalid status." }, { status: 422 });
  }

  try {
    await updateInquiryStatus(parsed.data.id, parsed.data.status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/inquiries] update failed", error);
    return NextResponse.json(
      { ok: false, message: "Could not update the enquiry." },
      { status: 503 },
    );
  }
}
