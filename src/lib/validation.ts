import { z } from "zod";

/** Strips control characters and trims — first line of defence before storage. */
export const sanitize = (value: string) =>
  value.replace(/[\u0000-\u001F\u007F]/g, " ").trim();

const nameRule = z
  .string()
  .trim()
  .min(2, "Please enter your full name")
  .max(120, "Name is too long")
  .transform(sanitize);

export const contactFormSchema = z.object({
  fullName: nameRule,
  company: z.string().trim().max(160).transform(sanitize).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(5, "Email is required")
    .max(255)
    .email("Enter a valid business email"),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+0-9()\-\s.]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  country: z.string().trim().max(120).transform(sanitize).optional().or(z.literal("")),
  service: z.string().trim().max(140).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(30, "Please describe your project in at least 30 characters")
    .max(4000, "Message is too long")
    .transform(sanitize),
  /** Honeypot — must remain empty. Bots fill it in. */
  website: z.string().max(0, "Submission rejected").optional().or(z.literal("")),
  consent: z
    .union([z.boolean(), z.literal("on"), z.literal("true")])
    .transform((v) => v === true || v === "on" || v === "true")
    .refine((v) => v, "Please accept the privacy policy to continue"),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

export const inquiryStatusSchema = z.object({
  id: z.coerce.number().int().positive(),
  status: z.enum(["new", "contacted", "qualified", "archived"]),
});

/** Formats a ZodError into a field → message map for form rendering. */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
