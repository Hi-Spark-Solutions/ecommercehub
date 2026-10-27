import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, SectionHeading } from "@/components/marketing/primitives";
import { solutionsMenu } from "@/config/marketing-nav";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore how Smartify Commerce supports commerce operations, marketplace and inventory management, analytics, automation and more.",
};

export default function SolutionsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="Built for every part of commerce operations"
          description="A modular platform that grows with your business. Explore where Smartify Commerce fits today — and where it's headed."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutionsMenu.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
