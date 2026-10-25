import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Barcode, Calculator } from "lucide-react";
import Link from "next/link";
import {
  Container,
  Eyebrow,
  LinkButton,
} from "@/components/marketing/primitives";
import { solutionsMenu, solutionTools } from "@/config/marketing-nav";

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
  const tools = solutionTools[params.slug as keyof typeof solutionTools] ?? [];

  return (
    <section className="py-20">
      <Container className="max-w-screen-2xl">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-7 w-7" />
          </span>

          <Eyebrow className="mt-6 block">Solution</Eyebrow>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {solution.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {solution.description}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/signup" size="lg">
              Get Started <ArrowRight className="h-4 w-4" />
            </LinkButton>

            {/* <LinkButton href="/product" size="lg" variant="outline">
              Explore Product
            </LinkButton> */}
          </div>
        </div>

        {tools.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Explore{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Tools
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Powerful, practical tools to simplify workflows and make smarter commerce
                decisions.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
                >
                  <Calculator className="h-6 w-6 text-blue-600" />

                  <h3 className="mt-4 font-semibold text-slate-900">
                    {tool.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {tool.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Open tool <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </section>
  );
}