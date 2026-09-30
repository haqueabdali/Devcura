import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { footerNav, legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

interface FooterProps {
  services: { label: string; href: string }[];
  industries: { label: string; href: string }[];
}

export function Footer({ services, industries }: FooterProps) {
  const year = new Date().getFullYear();
  const hq = siteConfig.offices[0];

  return (
    <footer className="border-t border-ink-800 bg-ink-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.9rem] leading-relaxed text-ink-400">
              {siteConfig.description}
            </p>

            <ul className="mt-8 space-y-3 text-[0.875rem]">
              <li className="flex items-start gap-3 text-ink-300">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="link-underline hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink-300">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="link-underline hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink-300">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <address className="not-italic">
                  {hq.lines.join(", ")}
                </address>
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            <FooterColumn title="Services" links={services.slice(0, 8)} />
            <FooterColumn title="Industries" links={industries.slice(0, 8)} />
            {footerNav.map((column) => (
              <FooterColumn
                key={column.title}
                title={column.title}
                links={column.links.map((l) => ({ label: l.label, href: l.href }))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.78rem] text-ink-500">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem]">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-4 text-[0.78rem]">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-ink-400 transition-colors hover:text-accent-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.85rem] text-ink-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
