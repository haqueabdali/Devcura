import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { extractHeadings, renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import {
  getAuthor,
  getBlogPost,
  getBlogPosts,
  getRelatedPosts,
} from "@/services/content";

export const revalidate = 1800;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post)
    return buildMetadata({
      title: "Article not found",
      description: "",
      path: `/insights/${slug}`,
      noIndex: true,
    });

  const author = await getAuthor(post.authorSlug);
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    image: post.coverImage,
    type: "article",
    publishedTime: post.publishedAt,
    authors: author ? [author.name] : undefined,
    keywords: post.tags,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const [author, related] = await Promise.all([
    getAuthor(post.authorSlug),
    getRelatedPosts(post.slug, 3),
  ]);

  const headings = extractHeadings(post.body);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path: `/insights/${post.slug}`,
          image: post.coverImage,
          publishedAt: post.publishedAt,
          authorName: author?.name ?? "Editorial team",
        })}
      />

      <PageHeader
        eyebrow={post.categoryName}
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { name: "Insights", href: "/insights" },
          { name: post.title, href: `/insights/${post.slug}` },
        ]}
        meta={
          <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-ink-800 pt-8">
            <div className="flex items-center gap-3">
              <Avatar name={author?.name ?? "Author"} src={author?.avatar || undefined} size={44} />
              <div>
                <p className="text-[0.88rem] text-white">{author?.name}</p>
                <p className="text-[0.78rem] text-ink-500">{author?.role}</p>
              </div>
            </div>
            <div className="text-[0.8rem] text-ink-500">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true" className="px-2">
                ·
              </span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        }
      />

      <div className="border-b border-ink-800 bg-ink-950">
        <div className="container-page py-12">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden border border-ink-800 bg-ink-900">
              <Image
                src={post.coverImage}
                alt={post.coverAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-75"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="prose-article lg:col-span-8">
            {renderMarkdown(post.body)}

            <div className="mt-14 flex flex-wrap gap-2 border-t border-ink-800 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-ink-800 px-3 py-1.5 text-[0.76rem] text-ink-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {headings.length > 0 ? (
                <nav aria-label="On this page" className="surface p-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                    On this page
                  </p>
                  <ol className="mt-4 space-y-2.5">
                    {headings.map((heading, index) => (
                      <li key={heading} className="flex gap-3 text-[0.83rem] text-ink-400">
                        <span className="font-mono text-[0.72rem] text-ink-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {heading}
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}

              {author ? (
                <div className="surface p-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Author
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar name={author.name} src={author.avatar || undefined} size={44} />
                    <div>
                      <p className="text-[0.88rem] text-white">{author.name}</p>
                      <p className="text-[0.76rem] text-ink-500">{author.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[0.83rem] leading-relaxed text-ink-400">{author.bio}</p>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <SectionHeading eyebrow="Keep reading" title="Related articles" />
          <div className="mt-12 grid gap-px border border-ink-800 bg-ink-800 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="group flex h-full flex-col bg-ink-900 p-7 transition-colors hover:bg-ink-800/60"
              >
                <span className="text-[0.72rem] text-accent-400">{item.categoryName}</span>
                <h3 className="mt-4 text-[1rem] font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-400">{item.excerpt}</p>
                <span className="mt-auto pt-6 text-[0.76rem] text-ink-500">
                  {item.readingMinutes} min read
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
