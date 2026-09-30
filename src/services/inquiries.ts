import { desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { contactInquiries } from "@/db/schema";
import type { ContactFormValues } from "@/lib/validation";

export interface CreateInquiryInput extends ContactFormValues {
  ipHash?: string;
  source?: string;
}

export async function createInquiry(input: CreateInquiryInput) {
  const [row] = await db
    .insert(contactInquiries)
    .values({
      fullName: input.fullName,
      company: input.company || null,
      email: input.email.toLowerCase(),
      phone: input.phone || null,
      country: input.country || null,
      serviceSlug: input.service || null,
      budget: input.budget || null,
      timeline: input.timeline || null,
      message: input.message,
      ipHash: input.ipHash ?? null,
      source: input.source ?? "website",
    })
    .returning({ id: contactInquiries.id, createdAt: contactInquiries.createdAt });

  return row;
}

export async function listInquiries(limit = 100) {
  return db
    .select()
    .from(contactInquiries)
    .orderBy(desc(contactInquiries.createdAt))
    .limit(limit);
}

export async function getInquiryStats() {
  const rows = await db
    .select({
      status: contactInquiries.status,
      count: sql<number>`count(*)::int`,
    })
    .from(contactInquiries)
    .groupBy(contactInquiries.status);

  const byStatus = Object.fromEntries(rows.map((r) => [r.status, r.count]));
  const total = rows.reduce((sum, r) => sum + r.count, 0);
  return { total, byStatus };
}

export async function updateInquiryStatus(id: number, status: string) {
  await db.update(contactInquiries).set({ status }).where(eq(contactInquiries.id, id));
}
