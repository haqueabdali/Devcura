import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/legal-document";
import { termsAndConditions } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & conditions",
  description: "Terms governing the use of this website and its content.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocumentPage document={termsAndConditions} href="/terms" />;
}
