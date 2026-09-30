"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, SearchX } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import type { Author, BlogCategory, BlogPost } from "@/types/content";
import { cn, formatDate } from "@/lib/utils";

export function BlogExplorer({
  posts,
  categories,
  authors,
}: {
  posts: BlogPost[];
  categories: BlogCategory[];
  authors: Author[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const reduce = useReducedMotion();

  const authorFor = (slug: string) => authors.find((a) => a.slug === slug);

  const usedCategories = useMemo(
    () => categories.filter((c) => posts.some((p) => p.categorySlug === c.slug)),
    [categories, posts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.categorySlug === category;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  const [featured, ...rest] = filtered;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-ink-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-1">
          <FilterChip
            label="All"
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {usedCategories.map((cat) => (
            <FilterChip
              key={cat.slug}
              label={cat.name}
              active={category === cat.slug}
              onClick={() => setCategory(cat.slug)}
            />
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-600"
            aria-hidden="true"
          />
          <label htmlFor="blog-search" className="sr-only">
            Search insights
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            className="h-10 w-full border border-ink-800 bg-ink-900 pl-9 pr-3 text-[0.85rem] text-ink-100 placeholder:text-ink-600 focus:border-accent-500"
          />
        </div>
      </div>

      <p className="mt-6 text-[0.8rem] text-ink-500" aria-live="polite">
        {filtered.length} article{filtered.length === 1 ? "" : "s"}
        {category !== "all"
          ? ` in ${usedCategories.find((c) => c.slug === category)?.name}`
          : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 border border-dashed border-ink-800 p-14 text-center">
          <SearchX className="mx-auto size-8 text-ink-600" aria-hidden="true" />
          <p className="mt-5 text-[1rem] font-medium text-white">No articles found</p>
          <p className="mx-auto mt-2 max-w-md text-[0.87rem] text-ink-400">
            Try a different search term or clear the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-6 border border-ink-700 px-4 py-2 text-[0.82rem] text-ink-200 transition-colors hover:border-accent-500 hover:text-white"
          >
            Reset
          </button>
        </div>
      ) : (
        <>
          {featured ? (
            <motion.article
              layout={!reduce}
              className="mt-10 border border-ink-800 bg-ink-950 transition-colors hover:border-ink-700"
            >
              <Link href={`/insights/${featured.slug}`} className="grid gap-0 lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-900 lg:aspect-auto lg:min-h-[22rem]">
                  <Image
                    src={featured.coverImage}
                    alt={featured.coverAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover opacity-75 transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3 text-[0.74rem] text-ink-500">
                    <span className="text-accent-400">{featured.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-5 text-[1.5rem] font-semibold leading-tight text-white lg:text-[1.9rem]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-400">
                    {featured.excerpt}
                  </p>
                  <div className="mt-7 flex items-center gap-3">
                    <Avatar name={authorFor(featured.authorSlug)?.name ?? "Author"} size={36} />
                    <div>
                      <p className="text-[0.84rem] text-white">
                        {authorFor(featured.authorSlug)?.name}
                      </p>
                      <p className="text-[0.76rem] text-ink-500">
                        {authorFor(featured.authorSlug)?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ) : null}

          <div className="mt-px grid gap-px bg-ink-800 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <motion.article key={post.slug} layout={!reduce} className="bg-ink-950">
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex h-full flex-col transition-colors hover:bg-ink-900"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-70 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-[0.72rem] text-ink-500">
                      <span className="text-accent-400">{post.categoryName}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <h3 className="mt-4 text-[1rem] font-semibold leading-snug text-white">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-400">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6 text-[0.76rem] text-ink-500">
                      <span>{authorFor(post.authorSlug)?.name}</span>
                      <span>{post.readingMinutes} min read</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "border px-4 py-2 text-[0.82rem] font-medium transition-colors",
        active
          ? "border-accent-500 bg-accent-500/10 text-accent-200"
          : "border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-100",
      )}
    >
      {label}
    </button>
  );
}
