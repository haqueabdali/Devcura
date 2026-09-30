/**
 * Legal copy placeholders.
 * ⚠️ These documents are templates and have NOT been reviewed by a lawyer.
 * Replace with counsel-approved text before going live.
 */

export const lastUpdated = "2026-01-05";

export const privacyPolicy = {
  title: "Privacy policy",
  intro:
    "This policy explains what personal data we collect through this website, why we collect it, how long we keep it and what rights you have. It covers the website only; client project data is governed by the data processing agreement in the relevant contract.",
  sections: [
    {
      heading: "Data we collect",
      body: [
        "Enquiry data you submit through the contact form: name, company, email address, telephone number, country, service interest, indicative budget, timeline and the message itself.",
        "Technical data required to operate and protect the site: a one-way hash of your IP address for abuse prevention, plus standard server logs.",
        "We do not use third-party advertising trackers and we do not sell personal data under any circumstances.",
      ],
    },
    {
      heading: "Why we process it",
      body: [
        "To respond to your enquiry and, where relevant, prepare a proposal. The legal basis is our legitimate interest in responding to business enquiries, and steps taken at your request prior to entering a contract.",
        "To protect the service against automated abuse. The legal basis is our legitimate interest in security.",
      ],
    },
    {
      heading: "Retention",
      body: [
        "Enquiries that do not lead to a commercial relationship are deleted after 24 months.",
        "Enquiries that lead to a contract are retained for the duration of the relationship plus the statutory retention period applicable to business records.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You may request access, correction, deletion, restriction or portability of your personal data, and you may object to processing based on legitimate interest.",
        "Requests are handled within 30 days. You also have the right to lodge a complaint with your national data protection authority.",
      ],
    },
    {
      heading: "Processors and transfers",
      body: [
        "[PLACEHOLDER] List the hosting provider, email provider and any analytics processor here, together with their locations and the transfer mechanism used for any processing outside the EEA.",
      ],
    },
    {
      heading: "Contact",
      body: [
        "Data protection enquiries should be sent to the address on the contact page. [PLACEHOLDER — appoint and name a data protection contact.]",
      ],
    },
  ],
};

export const termsAndConditions = {
  title: "Terms & conditions",
  intro:
    "These terms govern your use of this website. Services we deliver are governed separately by a master services agreement and a statement of work signed by both parties.",
  sections: [
    {
      heading: "Use of this website",
      body: [
        "You may view, download and print content from this site for your own internal business purposes.",
        "You may not use the site in any way that is unlawful, that interferes with its operation, or that attempts to gain unauthorised access to any part of it.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "All content on this site, including text, design, code and imagery, is owned by the company or its licensors unless stated otherwise.",
        "Client names, logos and trade marks shown in case studies remain the property of their respective owners and are used with permission.",
      ],
    },
    {
      heading: "Accuracy of information",
      body: [
        "Case study figures are drawn from client reporting or platform telemetry at the time of publication and are not a guarantee of comparable results in other engagements.",
        "Nothing on this site constitutes a binding offer, a fixed price or professional advice.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "To the fullest extent permitted by law, we exclude liability for any indirect or consequential loss arising from use of this website.",
        "Nothing in these terms limits liability for death or personal injury caused by negligence, or for fraud.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "[PLACEHOLDER] These terms are governed by the laws of the jurisdiction in which the company is registered, and the courts of that jurisdiction have exclusive jurisdiction.",
      ],
    },
  ],
};

export const cookiePolicy = {
  title: "Cookie policy",
  intro:
    "This site is built to work without advertising or profiling cookies. The table below describes every cookie that may be set and why.",
  sections: [
    {
      heading: "Strictly necessary cookies",
      body: [
        "nb_admin_session — an httpOnly, SameSite=Lax session token, set only when an authorised administrator signs in to the content dashboard. Expires after 8 hours.",
        "nb_csrf — a CSRF protection token used alongside the admin session. Expires after 8 hours.",
        "No cookies are set for anonymous visitors browsing the public website.",
      ],
    },
    {
      heading: "Analytics",
      body: [
        "[PLACEHOLDER] No analytics provider is currently configured. If one is added, it must be documented here with its retention period, and a consent banner must be implemented before any non-essential cookie is set.",
      ],
    },
    {
      heading: "Managing cookies",
      body: [
        "Because the only cookies used are strictly necessary for the administrator area, no consent banner is shown to public visitors.",
        "You can delete or block cookies through your browser settings. Blocking them prevents administrator sign-in but does not affect public pages.",
      ],
    },
  ],
};
