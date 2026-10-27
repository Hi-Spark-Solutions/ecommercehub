import type { Metadata } from "next";
import { Mail, Building2, LifeBuoy } from "lucide-react";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Smartify Commerce team for business inquiries, partnerships or support.",
};

const channels = [
  {
    icon: Building2,
    title: "Business inquiry",
    text: "Interested in Smartify Commerce for your brand or agency? We'd love to talk.",
    detail: "sales@ecommercehub.example",
  },
  {
    icon: LifeBuoy,
    title: "Support inquiry",
    text: "Already using the platform and need a hand? Our team is here to help.",
    detail: "support@ecommercehub.example",
  },
  {
    icon: Mail,
    title: "General",
    text: "For anything else, reach us and we'll route your message to the right place.",
    detail: "hello@ecommercehub.example",
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Let&apos;s talk commerce
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Questions about the product, pricing or partnerships? Send us a message and we&apos;ll
            get back to you.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-base font-semibold text-slate-900">{c.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{c.text}</p>
                  <p className="mt-3 text-sm font-medium text-blue-600">{c.detail}</p>
                </div>
              );
            })}
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
