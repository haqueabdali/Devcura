/**
 * Idempotent database seed.
 *
 * Run:  npx tsx src/db/seed.ts
 *
 * It does two things:
 *   1. Imports the typed seed content from src/content/* into PostgreSQL so it
 *      becomes editable through the admin dashboard.
 *   2. Creates the first administrator from ADMIN_EMAIL / ADMIN_PASSWORD.
 *
 * Running it repeatedly is safe — rows are matched on their natural key.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db, pool } from "@/db";
import {
  authorRecords,
  blogCategoryRecords,
  blogPostRecords,
  faqRecords,
  industryRecords,
  projectRecords,
  serviceRecords,
  teamMemberRecords,
  testimonialRecords,
  users,
} from "@/db/schema";
import { authors, blogCategories, blogPosts } from "@/content/blog";
import { generalFaqs, pricingFaqs, teamMembers, testimonials } from "@/content/company";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

async function seedServices() {
  for (const service of services) {
    const values = {
      slug: service.slug,
      title: service.title,
      shortTitle: service.shortTitle,
      icon: service.icon,
      summary: service.summary,
      payload: service,
      sortOrder: service.order,
      updatedAt: new Date(),
    };
    await db
      .insert(serviceRecords)
      .values(values)
      .onConflictDoUpdate({ target: serviceRecords.slug, set: values });
  }
  console.log(`✔ services: ${services.length}`);
}

async function seedIndustries() {
  for (const industry of industries) {
    const values = {
      slug: industry.slug,
      name: industry.name,
      icon: industry.icon,
      summary: industry.summary,
      payload: industry,
      sortOrder: industry.order,
      updatedAt: new Date(),
    };
    await db
      .insert(industryRecords)
      .values(values)
      .onConflictDoUpdate({ target: industryRecords.slug, set: values });
  }
  console.log(`✔ industries: ${industries.length}`);
}

async function seedProjects() {
  for (const project of projects) {
    const values = {
      slug: project.slug,
      name: project.name,
      client: project.client,
      industrySlug: project.industrySlug,
      categories: project.categories,
      technologies: project.technologies,
      summary: project.summary,
      payload: project,
      featured: project.featured,
      sortOrder: project.order,
      updatedAt: new Date(),
    };
    await db
      .insert(projectRecords)
      .values(values)
      .onConflictDoUpdate({ target: projectRecords.slug, set: values });
  }
  console.log(`✔ projects: ${projects.length}`);
}

async function seedBlog() {
  for (const category of blogCategories) {
    await db
      .insert(blogCategoryRecords)
      .values(category)
      .onConflictDoUpdate({ target: blogCategoryRecords.slug, set: category });
  }

  for (const author of authors) {
    await db
      .insert(authorRecords)
      .values(author)
      .onConflictDoUpdate({ target: authorRecords.slug, set: author });
  }

  for (const post of blogPosts) {
    const values = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      categorySlug: post.categorySlug,
      authorSlug: post.authorSlug,
      coverImage: post.coverImage,
      coverAlt: post.coverAlt,
      body: post.body,
      tags: post.tags,
      readingMinutes: post.readingMinutes,
      featured: post.featured,
      status: "published",
      publishedAt: new Date(post.publishedAt),
      updatedAt: new Date(),
    };
    await db
      .insert(blogPostRecords)
      .values(values)
      .onConflictDoUpdate({ target: blogPostRecords.slug, set: values });
  }
  console.log(
    `✔ blog: ${blogCategories.length} categories, ${authors.length} authors, ${blogPosts.length} posts`,
  );
}

async function seedTestimonials() {
  for (const [index, testimonial] of testimonials.entries()) {
    const values = {
      externalId: testimonial.id,
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.company,
      avatar: testimonial.avatar,
      rating: testimonial.rating,
      quote: testimonial.quote,
      projectSlug: testimonial.projectSlug ?? null,
      sortOrder: index,
    };
    await db
      .insert(testimonialRecords)
      .values(values)
      .onConflictDoUpdate({ target: testimonialRecords.externalId, set: values });
  }
  console.log(`✔ testimonials: ${testimonials.length}`);
}

async function seedTeam() {
  for (const [index, member] of teamMembers.entries()) {
    const values = {
      slug: member.slug,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      focus: member.focus,
      linkedin: member.linkedin ?? null,
      sortOrder: index,
    };
    await db
      .insert(teamMemberRecords)
      .values(values)
      .onConflictDoUpdate({ target: teamMemberRecords.slug, set: values });
  }
  console.log(`✔ team: ${teamMembers.length}`);
}

async function seedFaqs() {
  // FAQs have no natural unique key, so reset the table before inserting.
  await db.delete(faqRecords);
  const rows = [
    ...generalFaqs.map((faq, index) => ({
      question: faq.question,
      answer: faq.answer,
      category: faq.category ?? "General",
      scope: "general",
      sortOrder: index,
    })),
    ...pricingFaqs.map((faq, index) => ({
      question: faq.question,
      answer: faq.answer,
      category: "Pricing",
      scope: "pricing",
      sortOrder: index,
    })),
    ...services.flatMap((service) =>
      service.faqs.map((faq, index) => ({
        question: faq.question,
        answer: faq.answer,
        category: service.shortTitle,
        scope: `service:${service.slug}`,
        sortOrder: index,
      })),
    ),
  ];
  await db.insert(faqRecords).values(rows);
  console.log(`✔ faqs: ${rows.length}`);
}

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Site Administrator";

  if (!email || !password) {
    console.warn(
      "⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — no administrator created. Set them in .env and re-run to enable /admin.",
    );
    return;
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existing.length > 0) {
    await db.update(users).set({ passwordHash, name, role: "admin", isActive: true }).where(eq(users.email, email));
    console.log(`✔ admin user updated: ${email}`);
  } else {
    await db.insert(users).values({ email, name, passwordHash, role: "admin" });
    console.log(`✔ admin user created: ${email}`);
  }
}

async function main() {
  console.log("Seeding database…");
  await seedServices();
  await seedIndustries();
  await seedProjects();
  await seedBlog();
  await seedTestimonials();
  await seedTeam();
  await seedFaqs();
  await seedAdminUser();
  console.log("Done.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
