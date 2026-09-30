import type { Metadata } from "next";

import { BlogExplorer } from "@/components/blog/blog-explorer";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { getAuthors, getBlogCategories, getBlogPosts } from "@/services/content";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Insights — engineering notes and technical analysis",
  description:
    "Articles on applied AI, architecture, cloud economics, security and delivery practice, written by the engineers doing the work.",
  path: "/insights",
});

export default async function InsightsPage() {
  const [posts, categories, authors] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
    getAuthors(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes from the engineering floor"
        description="Technical writing by our architects, platform engineers and designers. No ghostwritten thought leadership, no vendor-sponsored content."
        crumbs={[{ name: "Insights", href: "/insights" }]}
      />

      <Section>
        <div className="container-page">
          <BlogExplorer posts={posts} categories={categories} authors={authors} />
        </div>
      </Section>
    </>
  );
}
