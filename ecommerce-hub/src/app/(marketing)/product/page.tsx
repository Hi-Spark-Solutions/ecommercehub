import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container, Eyebrow, SectionHeading, LinkButton } from "@/components/marketing/primitives";
import { ProductMock } from "@/components/marketing/product-mock";
import { capabilities } from "@/data/marketing/site";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Ecommerce Hub is the commerce operating system for modern brands — unified product, order, inventory, customer, integration, analytics and automation management.",
};

const sections = [
  {
    title: "Unified Commerce",
    text: "Bring every channel into one workspace. Ecommerce Hub is the operations layer that connects your storefronts, marketplaces and logistics so your team works from a single source of truth.",
  },
  {
    title: "Product Management",
    text: "Model each product once — with variants, media and pricing — and publish everywhere. A clean catalog is the foundation of scalable multi-channel selling.",
  },
  {
    title: "Order Management",
    text: "Capture, verify and fulfill orders from every channel in one queue. Standardized workflows reduce the manual steps that lead to errors and returns.",
  },
  {
    title: "Inventory",
    text: "Keep stock accurate across warehouses and channels with real-time sync, so you can sell confidently on more channels without overselling.",
  },
  {
    title: "Customers",
    text: "A unified customer view across channels helps you understand lifetime value and build lasting relationships.",
  },
  {
    title: "Integrations",
    text: "Connect the storefronts, marketplaces and logistics partners you already use. Integrations are added as independent modules, so coverage keeps expanding.",
  },
  {
    title: "Analytics",
    text: "Turn fragmented channel data into unified reporting you can act on — across products, orders and customers.",
  },
  {
    title: "Automation",
    text: "Put repetitive operations on autopilot with simple, rule-based workflows that scale as your volume grows.",
  },
];

export default function ProductPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Product</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              The commerce operating system for modern brands
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              One platform to manage products, orders, inventory, customers and every channel —
              designed so new capabilities slot in as your business grows.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/signup" size="lg">
                Get Started <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/dashboard" size="lg" variant="secondary">
                Open Product
              </LinkButton>
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-5xl">
            <ProductMock />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="A connected toolkit"
            description="Everything your team needs to operate commerce, in one place."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.title} className="rounded-xl border border-slate-200 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-blue-600 py-16 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-bold">Ready to bring your commerce together?</h2>
              <p className="mt-2 text-blue-100">Free during early access — no credit card required.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/signup" variant="outline" className="border-white bg-white text-blue-700 hover:bg-blue-50">
                Get Started
              </LinkButton>
              <LinkButton href="/dashboard" variant="ghost" className="text-white hover:bg-blue-500">
                Open Product <Check className="h-4 w-4" />
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
