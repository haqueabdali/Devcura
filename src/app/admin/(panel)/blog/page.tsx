import { AdminPageHeading, ContentTable } from "@/components/admin/content-table";
import { formatDate } from "@/lib/utils";
import { getContentSources } from "@/services/admin";
import { getBlogPosts } from "@/services/content";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const [posts, sources] = await Promise.all([getBlogPosts(), getContentSources()]);

  return (
    <>
      <AdminPageHeading
        title="Insights"
        description="Published articles. Bodies use a restricted markdown subset (headings, lists, bold) rendered without raw HTML injection."
      />
      <ContentTable
        entity="articles"
        source={sources.posts.source}
        rows={posts.map((post) => ({
          id: post.slug,
          title: post.title,
          subtitle: `${post.categoryName} · ${post.authorSlug}`,
          meta: `${formatDate(post.publishedAt)} · ${post.readingMinutes} min`,
          href: `/insights/${post.slug}`,
        }))}
      />
    </>
  );
}
