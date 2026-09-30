import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/legal-document";
import { cookiePolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie policy",
  description:
    "Every cookie this site may set, why it exists and how long it lasts. No advertising or profiling cookies are used.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return <LegalDocumentPage document={cookiePolicy} href="/cookie-policy" />;
}
