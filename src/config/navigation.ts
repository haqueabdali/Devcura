export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/projects" },
  { label: "Technologies", href: "/technologies" },
  { label: "Engagement", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Engagement models", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Case studies", href: "/projects" },
      { label: "Technology stack", href: "/technologies" },
      { label: "Delivery process", href: "/about#process" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms" },
  { label: "Cookie policy", href: "/cookie-policy" },
];

export const budgetOptions = [
  "Under €25,000",
  "€25,000 – €75,000",
  "€75,000 – €200,000",
  "€200,000 – €500,000",
  "€500,000+",
  "Not yet defined",
];

export const timelineOptions = [
  "Immediately",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Exploring options",
];
