import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/marketing/primitives";

const legal: Record<string, { title: string; intro: string }> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This is placeholder content for the Smartify Commerce privacy policy. It describes, at a high level, how the platform would handle data once connected to a backend.",
  },
  terms: {
    title: "Terms of Service",
    intro:
      "This is placeholder content for the Smartify Commerce terms of service. Full legal terms will be published before general availability.",
  },
};

export function generateStaticParams() {
  return Object.keys(legal).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doc = legal[params.slug];
  return { title: doc?.title ?? "Legal" };
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = legal[params.slug];
  if (!doc) notFound();

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{doc.title}</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: August 2026</p>
        <div className="mt-8 space-y-4 leading-relaxed text-slate-700">
          <p>{doc.intro}</p>
          <p>
            Smartify Commerce is currently a frontend-only early-access product. No production data is
            collected or processed. This document is a placeholder and does not constitute legal
            advice or a binding agreement.
          </p>
          <p>
            When the platform connects to its backend services, this page will be replaced with the
            complete, current policy.
          </p>
        </div>
      </Container>
    </section>
  );
}
