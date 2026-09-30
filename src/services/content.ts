import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  authorRecords,
  blogCategoryRecords,
  blogPostRecords,
  industryRecords,
  projectRecords,
  serviceRecords,
  teamMemberRecords,
  testimonialRecords,
} from "@/db/schema";
import { authors as seedAuthors, blogCategories as seedCategories, blogPosts as seedPosts } from "@/content/blog";
import { teamMembers as seedTeam, testimonials as seedTestimonials } from "@/content/company";
import { industries as seedIndustries } from "@/content/industries";
import { projects as seedProjects } from "@/content/projects";
import { services as seedServices } from "@/content/services";
import type {
  Author,
  BlogCategory,
  BlogPost,
  Industry,
  Project,
  Service,
  TeamMember,
  Testimonial,
} from "@/types/content";

/**
 * Repository layer.
 *
 * Every read tries PostgreSQL first and transparently falls back to the typed
 * seed content in `src/content/*`. That keeps the site fully renderable during
 * a build with no database (and in preview environments), while letting the
 * admin dashboard manage live content once the database is seeded.
 *
 * ▸ To move to a headless CMS later, replace only the bodies of these
 *   functions. No UI component imports content directly.
 */

async function withFallback<T>(query: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  try {
    const rows = await query();
    return rows.length > 0 ? rows : fallback;
  } catch {
    // Database unavailable (build time / fresh environment) — use seed content.
    return fallback;
  }
}

/* ------------------------------------------------------------- services */

export async function getServices(): Promise<Service[]> {
  const rows = await withFallback(
    async () => {
      const result = await db
        .select()
        .from(serviceRecords)
        .where(eq(serviceRecords.isPublished, true))
        .orderBy(asc(serviceRecords.sortOrder));
      return result.map((r) => r.payload as Service);
    },
    seedServices,
  );
  return [...rows].sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

/* ----------------------------------------------------------- industries */

export async function getIndustries(): Promise<Industry[]> {
  const rows = await withFallback(
    async () => {
      const result = await db
        .select()
        .from(industryRecords)
        .where(eq(industryRecords.isPublished, true))
        .orderBy(asc(industryRecords.sortOrder));
      return result.map((r) => r.payload as Industry);
    },
    seedIndustries,
  );
  return [...rows].sort((a, b) => a.order - b.order);
}

export async function getIndustry(slug: string): Promise<Industry | null> {
  const all = await getIndustries();
  return all.find((i) => i.slug === slug) ?? null;
}

/* ------------------------------------------------------------- projects */

export async function getProjects(): Promise<Project[]> {
  const rows = await withFallback(
    async () => {
      const result = await db
        .select()
        .from(projectRecords)
        .where(eq(projectRecords.isPublished, true))
        .orderBy(asc(projectRecords.sortOrder));
      return result.map((r) => r.payload as Project);
    },
    seedProjects,
  );
  return [...rows].sort((a, b) => a.order - b.order);
}

export async function getProject(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export async function getProjectsBySlugs(slugs: string[]): Promise<Project[]> {
  const all = await getProjects();
  return slugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
}

export async function getProjectsByIndustry(industrySlug: string): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.industrySlug === industrySlug);
}

/* --------------------------------------------------------------- blog */

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return withFallback(
    async () => {
      const result = await db.select().from(blogCategoryRecords).orderBy(asc(blogCategoryRecords.name));
      return result.map((r) => ({ slug: r.slug, name: r.name, description: r.description }));
    },
    seedCategories,
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const categories = await getBlogCategories();
  const rows = await withFallback(
    async () => {
      const result = await db
        .select()
        .from(blogPostRecords)
        .where(eq(blogPostRecords.status, "published"))
        .orderBy(desc(blogPostRecords.publishedAt));
      return result.map<BlogPost>((r) => ({
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        categorySlug: r.categorySlug,
        categoryName:
          categories.find((c) => c.slug === r.categorySlug)?.name ?? r.categorySlug,
        authorSlug: r.authorSlug,
        coverImage: r.coverImage,
        coverAlt: r.coverAlt,
        publishedAt: r.publishedAt.toISOString().slice(0, 10),
        readingMinutes: r.readingMinutes,
        tags: (r.tags as string[]) ?? [],
        featured: r.featured,
        body: r.body,
      }));
    },
    seedPosts,
  );
  return [...rows].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const all = await getBlogPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameCategory = all.filter((p) => p.slug !== slug && p.categorySlug === current.categorySlug);
  const others = all.filter((p) => p.slug !== slug && p.categorySlug !== current.categorySlug);
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getAuthors(): Promise<Author[]> {
  return withFallback(
    async () => {
      const result = await db.select().from(authorRecords).orderBy(asc(authorRecords.name));
      return result.map((r) => ({
        slug: r.slug,
        name: r.name,
        role: r.role,
        avatar: r.avatar,
        bio: r.bio,
      }));
    },
    seedAuthors,
  );
}

export async function getAuthor(slug: string): Promise<Author | null> {
  const all = await getAuthors();
  return all.find((a) => a.slug === slug) ?? null;
}

/* ------------------------------------------------------- testimonials */

export async function getTestimonials(): Promise<Testimonial[]> {
  return withFallback(
    async () => {
      const result = await db
        .select()
        .from(testimonialRecords)
        .where(eq(testimonialRecords.isPublished, true))
        .orderBy(asc(testimonialRecords.sortOrder));
      return result.map<Testimonial>((r) => ({
        id: r.externalId,
        name: r.name,
        position: r.position,
        company: r.company,
        avatar: r.avatar,
        rating: r.rating,
        quote: r.quote,
        projectSlug: r.projectSlug ?? undefined,
      }));
    },
    seedTestimonials,
  );
}

export async function getTestimonialById(id?: string): Promise<Testimonial | null> {
  if (!id) return null;
  const all = await getTestimonials();
  return all.find((t) => t.id === id) ?? null;
}

/* ------------------------------------------------------------ team */

export async function getTeamMembers(): Promise<TeamMember[]> {
  return withFallback(
    async () => {
      const result = await db
        .select()
        .from(teamMemberRecords)
        .where(eq(teamMemberRecords.isPublished, true))
        .orderBy(asc(teamMemberRecords.sortOrder));
      return result.map<TeamMember>((r) => ({
        slug: r.slug,
        name: r.name,
        role: r.role,
        bio: r.bio,
        image: r.image,
        focus: (r.focus as string[]) ?? [],
        linkedin: r.linkedin ?? undefined,
      }));
    },
    seedTeam,
  );
}
