"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { blogCategories, type BlogPost } from "@/data/marketing/blog";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 4;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

function Cover({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-end bg-gradient-to-br p-4",
        post.cover,
        className
      )}
    >
      <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
        {post.category}
      </span>
    </div>
  );
}

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");
  const [page, setPage] = React.useState(1);

  const featured = posts.find((p) => p.featured) ?? posts[0];

  const filtered = React.useMemo(() => {
    return posts
      .filter((p) => p.slug !== featured.slug)
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) =>
        query.trim() === ""
          ? true
          : (p.title + p.excerpt).toLowerCase().includes(query.toLowerCase())
      );
  }, [posts, featured.slug, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  React.useEffect(() => {
    setPage(1);
  }, [category, query]);

  return (
    <div>
      {/* Featured */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg lg:grid-cols-2"
      >
        <Cover post={featured} className="min-h-[220px] lg:min-h-[320px]" />
        <div className="flex flex-col justify-center p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Featured
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700">
            {featured.title}
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">{featured.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
            <span className="font-medium text-slate-700">{featured.author.name}</span>
            <span>·</span>
            <span>{formatDate(featured.date)}</span>
            <span>·</span>
            <span>{featured.readingMinutes} min read</span>
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
            Read article <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Controls */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                category === c
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>
      </div>

      {/* Grid */}
      {pageItems.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {pageItems.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
            >
              <Cover post={post} className="h-40" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{post.author.name}</span>
                  <span>·</span>
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <p className="text-sm text-slate-500">No articles match your search.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "h-9 w-9 rounded-lg text-sm font-medium transition-colors",
                current === i + 1
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
