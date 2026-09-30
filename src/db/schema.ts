import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ auth */

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 32 }).notNull().default("editor"), // admin | editor | viewer
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);

/* -------------------------------------------------------------- content */

export const serviceRecords = pgTable(
  "services",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    shortTitle: varchar("short_title", { length: 120 }).notNull(),
    icon: varchar("icon", { length: 64 }).notNull().default("Code2"),
    summary: text("summary").notNull(),
    /** Full Service payload (see src/types/content.ts) */
    payload: jsonb("payload").notNull(),
    isPublished: boolean("is_published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("services_slug_idx").on(t.slug), index("services_order_idx").on(t.sortOrder)],
);

export const industryRecords = pgTable(
  "industries",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    icon: varchar("icon", { length: 64 }).notNull().default("Building2"),
    summary: text("summary").notNull(),
    payload: jsonb("payload").notNull(),
    isPublished: boolean("is_published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("industries_slug_idx").on(t.slug)],
);

export const projectRecords = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    client: varchar("client", { length: 200 }).notNull(),
    industrySlug: varchar("industry_slug", { length: 140 }).notNull(),
    categories: jsonb("categories").notNull(),
    technologies: jsonb("technologies").notNull(),
    summary: text("summary").notNull(),
    payload: jsonb("payload").notNull(),
    featured: boolean("featured").notNull().default(false),
    isPublished: boolean("is_published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("projects_slug_idx").on(t.slug),
    index("projects_industry_idx").on(t.industrySlug),
    index("projects_featured_idx").on(t.featured),
  ],
);

export const blogCategoryRecords = pgTable(
  "blog_categories",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull(),
    name: varchar("name", { length: 140 }).notNull(),
    description: text("description").notNull().default(""),
  },
  (t) => [uniqueIndex("blog_categories_slug_idx").on(t.slug)],
);

export const authorRecords = pgTable(
  "authors",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    role: varchar("role", { length: 160 }).notNull().default(""),
    avatar: text("avatar").notNull().default(""),
    bio: text("bio").notNull().default(""),
  },
  (t) => [uniqueIndex("authors_slug_idx").on(t.slug)],
);

export const blogPostRecords = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 180 }).notNull(),
    title: varchar("title", { length: 240 }).notNull(),
    excerpt: text("excerpt").notNull(),
    categorySlug: varchar("category_slug", { length: 140 }).notNull(),
    authorSlug: varchar("author_slug", { length: 140 }).notNull(),
    coverImage: text("cover_image").notNull().default(""),
    coverAlt: text("cover_alt").notNull().default(""),
    body: text("body").notNull(),
    tags: jsonb("tags").notNull(),
    readingMinutes: integer("reading_minutes").notNull().default(5),
    featured: boolean("featured").notNull().default(false),
    status: varchar("status", { length: 24 }).notNull().default("published"), // draft | published
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("blog_posts_slug_idx").on(t.slug),
    index("blog_posts_category_idx").on(t.categorySlug),
    index("blog_posts_published_idx").on(t.status, t.publishedAt),
  ],
);

export const testimonialRecords = pgTable(
  "testimonials",
  {
    id: serial("id").primaryKey(),
    externalId: varchar("external_id", { length: 140 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    position: varchar("position", { length: 180 }).notNull(),
    company: varchar("company", { length: 180 }).notNull(),
    avatar: text("avatar").notNull().default(""),
    rating: integer("rating").notNull().default(5),
    quote: text("quote").notNull(),
    projectSlug: varchar("project_slug", { length: 140 }),
    isPublished: boolean("is_published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [uniqueIndex("testimonials_external_idx").on(t.externalId)],
);

export const teamMemberRecords = pgTable(
  "team_members",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    role: varchar("role", { length: 180 }).notNull(),
    bio: text("bio").notNull().default(""),
    image: text("image").notNull().default(""),
    focus: jsonb("focus").notNull(),
    linkedin: text("linkedin"),
    isPublished: boolean("is_published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [uniqueIndex("team_members_slug_idx").on(t.slug)],
);

export const faqRecords = pgTable(
  "faqs",
  {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    category: varchar("category", { length: 80 }).notNull().default("General"),
    scope: varchar("scope", { length: 80 }).notNull().default("general"), // general | pricing | service:<slug>
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("faqs_scope_idx").on(t.scope)],
);

/* ------------------------------------------------------------- inquiries */

export const contactInquiries = pgTable(
  "contact_inquiries",
  {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    company: varchar("company", { length: 180 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 60 }),
    country: varchar("country", { length: 120 }),
    serviceSlug: varchar("service_slug", { length: 140 }),
    budget: varchar("budget", { length: 80 }),
    timeline: varchar("timeline", { length: 80 }),
    message: text("message").notNull(),
    status: varchar("status", { length: 32 }).notNull().default("new"), // new | contacted | qualified | archived
    source: varchar("source", { length: 80 }).notNull().default("website"),
    ipHash: varchar("ip_hash", { length: 128 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("inquiries_status_idx").on(t.status),
    index("inquiries_created_idx").on(t.createdAt),
  ],
);

export type UserRow = typeof users.$inferSelect;
export type ContactInquiryRow = typeof contactInquiries.$inferSelect;
