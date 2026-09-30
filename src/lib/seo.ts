import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  keywords?: string[];
  noIndex?: boolean;
}

export function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  authors,
  keywords,
  noIndex,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? absoluteUrl("/images/og-default.jpg");

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: siteConfig.twitterHandle,
    },
  };
}

/* ---------------------------------------------------- structured data */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: String(siteConfig.founded),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    sameAs: siteConfig.social.map((s) => s.href),
    address: siteConfig.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.lines[0],
      addressLocality: office.city,
      addressCountry: office.lines[office.lines.length - 1],
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.contact.salesEmail,
        telephone: siteConfig.contact.phone,
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: input.areaServed ?? ["Europe", "North America"],
    serviceType: input.name,
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedAt: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? [input.image] : undefined,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    author: { "@type": "Person", name: input.authorName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function caseStudySchema(input: {
  name: string;
  description: string;
  path: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image,
    creator: { "@type": "Organization", name: siteConfig.name },
  };
}
