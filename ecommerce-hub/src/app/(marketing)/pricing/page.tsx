import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container, Eyebrow, SectionHeading, LinkButton } from "@/components/marketing/primitives";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { pricingPlans, pricingFaqs } from "@/data/marketing/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Ecommerce Hub is free during early access. Simple, transparent pricing built to grow with your business — no billing required today.",
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple pricing, free to start
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              The entire platform is <span className="font-semibold text-slate-900">free during early access</span>.
              Future plans are shown below to illustrate where the product is headed — no billing is active today.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-2xl border p-8",
                  plan.highlighted
                    ? "border-blue-600 bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-600"
                    : "border-slate-200 bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
                  {plan.badge && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-slate-500">{plan.period}</span>}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{plan.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <LinkButton
                    href={plan.cta.href}
                    variant={plan.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.cta.label}
                  </LinkButton>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Prices for future plans are illustrative. No payment system is active during early access.
          </p>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Pricing questions" />
          <div className="mt-10">
            <FaqAccordion items={pricingFaqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
