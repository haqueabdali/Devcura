/**
 * Content contracts shared by the static seed layer, the database layer and
 * the UI. Any future CMS (Sanity / Payload / Strapi) only has to satisfy these
 * types inside `src/services/*` — the UI never changes.
 */

export type IconName = string;

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string;
  heroHeadline: string;
  heroSubline: string;
  overview: string[];
  keyFeatures: string[];
  problems: FeatureItem[];
  approach: FeatureItem[];
  benefits: FeatureItem[];
  technologies: string[];
  process: ProcessStep[];
  faqs: FaqItem[];
  relatedProjects: string[];
  order: number;
}

export interface Industry {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  overview: string[];
  challenges: FeatureItem[];
  solutions: FeatureItem[];
  technologies: string[];
  compliance: string[];
  relatedProjects: string[];
  order: number;
}

export type ProjectCategory =
  | "web"
  | "mobile"
  | "saas"
  | "enterprise"
  | "ai"
  | "ecommerce";

export interface ProjectMetric {
  label: string;
  value: string;
  note?: string;
}

export interface Project {
  slug: string;
  name: string;
  client: string;
  industrySlug: string;
  industryLabel: string;
  categories: ProjectCategory[];
  projectType: string;
  summary: string;
  heroImage: string;
  imageAlt: string;
  year: number;
  duration: string;
  teamSize: string;
  services: string[];
  technologies: string[];
  challenge: string[];
  solution: string[];
  architecture: FeatureItem[];
  keyFeatures: string[];
  processNotes: FeatureItem[];
  screenshots: { src: string; alt: string; caption: string }[];
  results: string[];
  metrics: ProjectMetric[];
  testimonialId?: string;
  featured: boolean;
  order: number;
}

export interface Technology {
  name: string;
  category: TechnologyCategory;
  note: string;
  maturity: "core" | "production" | "selective";
}

export type TechnologyCategory =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Database"
  | "Cloud"
  | "DevOps"
  | "AI/ML"
  | "Infrastructure"
  | "Security";

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  projectSlug?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  focus: string[];
  linkedin?: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  categoryName: string;
  authorSlug: string;
  coverImage: string;
  coverAlt: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  featured: boolean;
  /** Lightweight markdown subset: ##, ###, -, **bold**, paragraphs */
  body: string;
}

export interface EngagementModel {
  slug: string;
  name: string;
  bestFor: string;
  description: string;
  billing: string;
  minimumEngagement: string;
  includes: string[];
  idealWhen: string[];
  highlighted: boolean;
}

export interface JobOpening {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}
