import { AdminPageHeading } from "@/components/admin/content-table";
import { InquiryList, type InquiryItem } from "@/components/admin/inquiry-list";
import { listInquiries } from "@/services/inquiries";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  let inquiries: InquiryItem[] = [];
  let failed = false;

  try {
    const rows = await listInquiries(200);
    inquiries = rows.map((row) => ({
      id: row.id,
      fullName: row.fullName,
      company: row.company,
      email: row.email,
      phone: row.phone,
      country: row.country,
      serviceSlug: row.serviceSlug,
      budget: row.budget,
      timeline: row.timeline,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    }));
  } catch {
    failed = true;
  }

  return (
    <>
      <AdminPageHeading
        title="Contact enquiries"
        description="Every submission from the public contact form, stored in PostgreSQL. Status changes are written immediately and are visible to all administrators."
      />

      {failed ? (
        <p className="border border-amber-500/40 bg-amber-500/[0.07] p-4 text-[0.85rem] text-amber-200/90">
          The database is unreachable, so enquiries cannot be listed. Check DATABASE_URL and run{" "}
          <code className="font-mono">npx drizzle-kit push</code>.
        </p>
      ) : (
        <InquiryList inquiries={inquiries} />
      )}
    </>
  );
}
