import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import { BlogIndex } from "@/components/marketing/blog-index";
import { blogPosts } from "@/data/marketing/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on omnichannel commerce, operations, product and growth from the Smartify Commerce team.",
};

export default function BlogPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Ideas for modern commerce
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Practical thinking on omnichannel operations, product, and growth.
          </p>
        </div>
        <div className="mt-12">
          <BlogIndex posts={blogPosts} />
        </div>
      </Container>
    </section>
  );
}
