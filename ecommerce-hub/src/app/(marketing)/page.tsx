import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Layers,
  Unplug,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { Container, Eyebrow, SectionHeading, LinkButton } from "@/components/marketing/primitives";
import { ProductMock } from "@/components/marketing/product-mock";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import {
  brand,
  supportedChannels,
  capabilities,
  omnichannelFlow,
  benefits,
  useCases,
  howItWorks,
  faqs,
  trustPoints,
} from "@/data/marketing/site";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
        </div>
        <Container className="pb-16 pt-16 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5" /> Free during early access
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              One platform to run your eCommerce business across{" "}
              <span className="text-blue-600">every channel</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {brand.subheadline}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/signup" size="lg">
                Get Started <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/product" size="lg" variant="outline">
                Explore Product
              </LinkButton>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              No credit card required · Built for brands, retailers & agencies
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <ProductMock />
          </div>
        </Container>
      </section>

      {/* 2. Supported channels */}
      <section className="border-y border-slate-200 bg-slate-50 py-10">
        <Container>
          <p className="text-center text-sm font-medium text-slate-500">
            Built to connect the channels modern brands sell on
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {supportedChannels.map((c) => (
              <span key={c} className="text-base font-semibold text-slate-400">
                {c}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Problem */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title="Selling everywhere shouldn't mean managing everything separately"
            description="Every new channel adds another dashboard, another export and another place where inventory drifts out of sync. Growth gets harder, not easier."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                icon: Unplug,
                title: "Disconnected tools",
                text: "Products, orders and stock live in separate systems that were never meant to talk.",
              },
              {
                icon: AlertTriangle,
                title: "Costly errors",
                text: "Overselling, delays and manual re-keying lead to cancellations and returns.",
              },
              {
                icon: Layers,
                title: "No single source of truth",
                text: "Reporting never quite reconciles, so decisions are made on partial data.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Solution */}
      <section className="bg-slate-950 py-20 text-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow className="text-blue-400">The solution</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One operating system for commerce
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Smartify Commerce centralizes the operations layer of your business. Every product,
                order, unit of inventory and customer lives in one workspace — and every channel
                reads from that shared foundation.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Connect storefronts, marketplaces and logistics partners",
                  "Manage catalog, orders, inventory and customers in one place",
                  "Automate operations and report across every channel",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-sm text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <LinkButton href="/product" variant="primary">
                  See how it works <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {trustPoints.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.title}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 first:col-span-2"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-white">{t.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{t.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5 + 6. Product overview & core capabilities */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Product overview"
            title="Everything you need to operate commerce"
            description="A complete, connected toolkit — so your team works from one system instead of many."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
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

      {/* 7. Omnichannel workflow */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Omnichannel workflow"
            title="Your commerce, connected end to end"
            description="Smartify Commerce sits at the center, coordinating every step from store to analytics."
          />
          <div className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-center">
            {omnichannelFlow.map((step, i) => {
              const Icon = step.icon;
              const isHub = step.label === "Smartify Commerce";
              return (
                <div key={step.label} className="flex items-center gap-3 lg:flex-col">
                  <div
                    className={`flex flex-1 items-center gap-3 rounded-xl border p-4 lg:w-40 lg:flex-col lg:text-center ${
                      isHub
                        ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isHub ? "bg-white/15 text-white" : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{step.label}</p>
                      <p className={`text-xs ${isHub ? "text-blue-100" : "text-slate-500"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {i < omnichannelFlow.length - 1 && (
                    <ChevronRight className="hidden h-5 w-5 shrink-0 text-slate-300 lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 8. Dashboard preview */}
      <section className="py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <ProductMock />
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>A workspace built for operators</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                See your whole business at a glance
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Revenue, orders, inventory and customers — unified in one clean dashboard. Drill
                into any module without ever leaving the platform.
              </p>
              <div className="mt-6">
                <LinkButton href="/dashboard" variant="secondary">
                  Open the product <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. Benefits */}
      <section className="bg-slate-950 py-20 text-white">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title={<span className="text-white">Run leaner, sell on more channels</span>}
            description={
              <span className="text-slate-300">
                Consolidating operations into one platform pays off across the whole business.
              </span>
            }
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center"
              >
                <p className="text-2xl font-bold text-blue-400">{b.stat}</p>
                <p className="mt-2 text-sm font-semibold text-white">{b.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. Use cases */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Use cases"
            title="Made for how modern brands sell"
            description="From first channel to full omnichannel — Smartify Commerce fits the way you operate."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.title} className="rounded-xl border border-slate-200 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{u.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 11. How it works */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Live in three steps"
            description="Connect, centralize, automate — then scale without re-tooling."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {howItWorks.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative rounded-xl border border-slate-200 bg-white p-6">
                  <span className="text-sm font-bold text-blue-600">{s.step}</span>
                  <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 12. Pricing CTA */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Free while we're in early access
            </h2>
            <p className="mt-3 text-slate-600">
              Get the full core platform at no cost. Future plans are designed to slot in without
              disrupting how you work today.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/pricing">View pricing</LinkButton>
              <LinkButton href="/signup" variant="outline">
                Get Started
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 13. FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      {/* 14. Final CTA */}
      <section className="bg-blue-600 py-20 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bring your commerce together
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Start running your products, orders, inventory and channels from one platform today.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-blue-400 px-6 text-base font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Open Product
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
