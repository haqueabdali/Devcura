import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/legal-document";
import { privacyPolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "What personal data this website collects, why it is processed, how long it is retained and what rights you have.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage document={privacyPolicy} href="/privacy-policy" />;
}
