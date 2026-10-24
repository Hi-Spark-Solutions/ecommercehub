import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, LinkButton } from "@/components/marketing/primitives";
import { solutionsMenu } from "@/config/marketing-nav";

function findSolution(slug: string) {
  return solutionsMenu.find((s) => s.href === `/solutions/${slug}`);
}

export function generateStaticParams() {
  return solutionsMenu.map((s) => ({ slug: s.href.replace("/solutions/", "") }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const solution = findSolution(params.slug);
  if (!solution) return { title: "Solution" };
  return { title: solution.title, description: solution.description };
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = findSolution(params.slug);
  if (!solution) notFound();
  const Icon = solution.icon;

  return (
    <section className="py-20">
      <Container className="max-w-3xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-7 w-7" />
        </span>
        <Eyebrow className="mt-6 block">Solution</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {solution.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">{solution.description}</p>
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8">
          <p className="text-sm font-medium text-slate-600">
            Detailed content for this solution is coming soon. Ecommerce Hub is built so this
            capability plugs into the core platform without redesigning the application.
          </p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/signup" size="lg">
            Get Started <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton href="/product" size="lg" variant="outline">
            Explore Product
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
