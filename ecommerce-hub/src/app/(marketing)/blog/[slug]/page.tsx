import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/primitives";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
  type BlogBlock,
} from "@/data/marketing/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-10 text-2xl font-bold tracking-tight text-slate-900">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-blue-600 bg-blue-50/60 py-4 pl-5 pr-4 text-lg font-medium italic text-slate-800">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-5 leading-relaxed text-slate-700">{block.text}</p>;
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug);

  return (
    <article className="py-14 sm:py-16">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <div className="mt-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            {post.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {post.author.initials}
            </span>
            <div className="text-sm">
              <p className="font-medium text-slate-900">{post.author.name}</p>
              <p className="text-slate-500">
                {formatDate(post.date)} · {post.readingMinutes} min read
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-8 h-56 rounded-2xl bg-gradient-to-br sm:h-72 ${post.cover}`} />

        <div className="mt-8 text-[17px]">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </Container>

      {/* Related */}
      <Container className="mt-16 max-w-5xl">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Related articles</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className={`h-28 bg-gradient-to-br ${r.cover}`} />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                  {r.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </article>
  );
}
