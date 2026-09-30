/**
 * Notification transport.
 *
 * ⚠️ NOT CONNECTED YET — no SMTP credentials are configured in this
 * environment, so we do not pretend to send email. Inquiries are persisted to
 * PostgreSQL and surfaced in /admin/inquiries, which is the current source of
 * truth.
 *
 * To enable email delivery:
 *   1. Set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD / CONTACT_EMAIL
 *   2. `npm install nodemailer`
 *   3. Replace the body of `sendInquiryNotification` with a real transport call.
 */

export interface InquiryNotification {
  id: number;
  fullName: string;
  email: string;
  company?: string | null;
  service?: string | null;
  message: string;
}

export function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.CONTACT_EMAIL,
  );
}

export async function sendInquiryNotification(
  notification: InquiryNotification,
): Promise<{ delivered: boolean; reason?: string }> {
  if (!isMailConfigured()) {
    // Explicitly log instead of silently succeeding.
    console.info(
      `[mailer] SMTP not configured — inquiry #${notification.id} stored in database only.`,
    );
    return { delivered: false, reason: "smtp_not_configured" };
  }

  // TODO: implement with nodemailer once SMTP credentials exist.
  console.info(`[mailer] SMTP configured but transport not implemented (inquiry #${notification.id}).`);
  return { delivered: false, reason: "transport_not_implemented" };
}
