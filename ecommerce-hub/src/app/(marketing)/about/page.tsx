import type { Metadata } from "next";
import { Globe, Target, Eye, Sparkles } from "lucide-react";
import { Container, Eyebrow, SectionHeading, LinkButton } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Smartify Commerce is a technology platform helping brands simplify omnichannel commerce — our mission, vision and long-term view of global commerce.",
};

const values = [
  {
    icon: Target,
    title: "Mission",
    text: "To give every brand a single, dependable operating system for commerce — so growing across channels makes operations simpler, not harder.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "A world where a small team can run a global, omnichannel business as easily as a single storefront, with one platform coordinating it all.",
  },
  {
    icon: Sparkles,
    title: "Why Smartify Commerce",
    text: "Brands are forced to stitch together disconnected tools as they scale. We believe the operations layer should be unified, modular and built to extend.",
  },
  {
    icon: Globe,
    title: "Global Commerce",
    text: "Commerce is increasingly borderless and multi-channel. Our platform is designed for brands selling everywhere, to anyone, from one workspace.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-950 py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-blue-400">About us</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Building the operating system for global commerce
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Smartify Commerce is a technology platform helping brands simplify omnichannel commerce.
              We bring the fragmented tools of modern selling into one coordinated system.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-xl border border-slate-200 bg-white p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-slate-900">{v.title}</h2>
                  <p className="mt-2 leading-relaxed text-slate-600">{v.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Long-term vision"
            title="A platform that grows with commerce"
            description="We're starting with the core operations layer and expanding through independent modules — products, orders, inventory, integrations, analytics, automation and beyond — without ever rewriting the foundation brands depend on."
          />
          <div className="mt-10 text-center">
            <LinkButton href="/signup" size="lg">
              Join us during early access
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
