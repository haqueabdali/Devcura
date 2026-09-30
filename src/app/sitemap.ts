import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getBlogPosts, getIndustries, getProjects, getServices } from "@/services/content";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: { path: string; priority: number; frequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, frequency: "weekly" },
    { path: "/services", priority: 0.9, frequency: "monthly" },
    { path: "/industries", priority: 0.8, frequency: "monthly" },
    { path: "/projects", priority: 0.9, frequency: "weekly" },
    { path: "/technologies", priority: 0.7, frequency: "monthly" },
    { path: "/pricing", priority: 0.8, frequency: "monthly" },
    { path: "/about", priority: 0.8, frequency: "monthly" },
    { path: "/insights", priority: 0.8, frequency: "weekly" },
    { path: "/careers", priority: 0.6, frequency: "weekly" },
    { path: "/contact", priority: 0.9, frequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, frequency: "yearly" },
    { path: "/terms", priority: 0.3, frequency: "yearly" },
    { path: "/cookie-policy", priority: 0.3, frequency: "yearly" },
  ];

  const [services, industries, projects, posts] = await Promise.all([
    getServices(),
    getIndustries(),
    getProjects(),
    getBlogPosts(),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: route.frequency,
      priority: route.priority,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industries.map((i) => ({
      url: `${base}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...posts.map((p) => ({
      url: `${base}/insights/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
