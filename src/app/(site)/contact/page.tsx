import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { getServices } from "@/services/content";

export const metadata: Metadata = buildMetadata({
  title: "Contact — start a project",
  description:
    "Tell us about your system, your constraints and your timeline. A senior engineer responds within one business day.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; model?: string }>;
}) {
  const [services, query] = await Promise.all([getServices(), searchParams]);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you are trying to change"
        description="The more context you give, the more useful our first response will be. Architecture questions get an architecture answer — we do not gate technical discussion behind a sales call."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm
              services={services.map((s) => ({ slug: s.slug, label: s.shortTitle }))}
              defaultService={query.service}
            />
          </div>

          <aside className="lg:col-span-5">
            <Reveal direction="left" className="space-y-px border border-ink-800 bg-ink-800">
              <div className="bg-ink-950 p-7">
                <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Direct contact
                </h2>
                <ul className="mt-5 space-y-4 text-[0.9rem]">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                    <div>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-ink-100 link-underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <p className="text-[0.78rem] text-ink-500">General enquiries</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                    <div>
                      <a
                        href={`mailto:${siteConfig.contact.salesEmail}`}
                        className="text-ink-100 link-underline"
                      >
                        {siteConfig.contact.salesEmail}
                      </a>
                      <p className="text-[0.78rem] text-ink-500">New business</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                    <div>
                      <a
                        href={`tel:${siteConfig.contact.phoneHref}`}
                        className="text-ink-100 link-underline"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <p className="text-[0.78rem] text-ink-500">Reception</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                    <p className="text-[0.85rem] text-ink-300">{siteConfig.contact.hours}</p>
                  </li>
                </ul>
              </div>

              {siteConfig.offices.map((office) => (
                <div key={office.city} className="bg-ink-950 p-7">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                    <div>
                      <p className="text-[0.92rem] font-medium text-white">
                        {office.city}
                        <span className="ml-2 text-[0.72rem] uppercase tracking-[0.12em] text-accent-400">
                          {office.role}
                        </span>
                      </p>
                      <address className="mt-2 text-[0.84rem] not-italic leading-relaxed text-ink-400">
                        {office.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                      <p className="mt-2 text-[0.76rem] text-ink-600">
                        Timezone {office.timezone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-ink-950 p-7">
                <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Follow
                </h2>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {siteConfig.social.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="text-[0.85rem] text-ink-300 transition-colors hover:text-accent-300"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <p className="mt-6 text-[0.78rem] leading-relaxed text-ink-600">
              All contact details above are placeholders pending confirmation of the real company
              information.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
