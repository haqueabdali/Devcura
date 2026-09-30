/**
 * Central company configuration.
 * ⚠️ PLACEHOLDER DATA — replace every value marked [PLACEHOLDER] with the real
 * company details once they are provided. Nothing here is hard-coded in the UI.
 */

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Devcura", // [PLACEHOLDER company name]
  legalName: "Devcura Technologies Ltd.", // [PLACEHOLDER legal entity]
  shortName: "Devcura",
  tagline: "Engineering software that compounds business value",
  description:
    "Devcura is a software engineering partner for companies that depend on their technology. We design, build and operate platforms, data systems and AI-assisted products for regulated and high-growth industries.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example-devcura.com", // [PLACEHOLDER domain]
  locale: "en_US",
  founded: 2014,
  contact: {
    email: process.env.CONTACT_EMAIL ?? "hello@example-devcura.com", // [PLACEHOLDER]
    salesEmail: "newbusiness@example-devcura.com", // [PLACEHOLDER]
    careersEmail: "careers@example-devcura.com", // [PLACEHOLDER]
    phone: "+1 (555) 014-2200", // [PLACEHOLDER]
    phoneHref: "+15550142200",
    hours: "Mon–Fri · 09:00–18:00 (CET) · Support 24/7 for managed clients",
  },
  offices: [
    {
      city: "Amsterdam",
      role: "Headquarters",
      lines: ["Keizersgracht 120", "1015 CV Amsterdam", "Netherlands"], // [PLACEHOLDER]
      timezone: "CET",
    },
    {
      city: "Austin",
      role: "North America",
      lines: ["600 Congress Ave, Suite 1400", "Austin, TX 78701", "USA"], // [PLACEHOLDER]
      timezone: "CST",
    },
    {
      city: "Kraków",
      role: "Engineering hub",
      lines: ["ul. Pawia 9", "31-154 Kraków", "Poland"], // [PLACEHOLDER]
      timezone: "CET",
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/example" }, // [PLACEHOLDER]
    { label: "GitHub", href: "https://github.com/example" }, // [PLACEHOLDER]
    { label: "X", href: "https://x.com/example" }, // [PLACEHOLDER]
    { label: "Dribbble", href: "https://dribbble.com/example" }, // [PLACEHOLDER]
  ],
  twitterHandle: "@example", // [PLACEHOLDER]
} as const;

export type SiteConfig = typeof siteConfig;

export const primaryCta = { label: "Start a project", href: "/contact" };
export const secondaryCta = { label: "Explore our work", href: "/projects" };
