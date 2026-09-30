import type { ReactNode } from "react";

import { CtaBand } from "@/components/layout/cta-band";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollEffects } from "@/components/ui/scroll-effects";
import { JsonLd } from "@/components/ui/json-ld";
import { getIndustries, getServices } from "@/services/content";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [services, industries] = await Promise.all([getServices(), getIndustries()]);

  const serviceItems = services.map((s) => ({
    label: s.shortTitle,
    href: `/services/${s.slug}`,
    description: s.summary.split(".")[0] ?? s.summary,
  }));

  const industryItems = industries.slice(0, 8).map((i) => ({
    label: i.name,
    href: `/industries/${i.slug}`,
    description: i.summary.split(".")[0] ?? i.summary,
  }));

  return (
    <>
      <ScrollEffects />
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Navbar serviceItems={serviceItems} industryItems={industryItems} />
      <main id="main">{children}</main>
      <CtaBand />
      <Footer
        services={serviceItems.map((s) => ({ label: s.label, href: s.href }))}
        industries={industryItems.map((i) => ({ label: i.label, href: i.href }))}
      />
    </>
  );
}
