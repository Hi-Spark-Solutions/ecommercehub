export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  highlighted?: boolean;
  badge?: string;
  cta: { label: string; href: string };
  features: string[];
}

/**
 * Pricing is UI-only. The whole platform is FREE during early access.
 * Future paid tiers are shown for architecture/positioning but have no
 * billing wired up. Add plans here — the pricing page renders from this array.
 */
export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "Everything you need to run commerce operations during early access.",
    highlighted: true,
    badge: "Free during early access",
    cta: { label: "Get started", href: "/signup" },
    features: [
      "Core dashboard",
      "Products",
      "Orders",
      "Customers",
      "Basic inventory",
      "One workspace",
      "Basic commerce management",
    ],
  },
  {
    name: "Growth",
    price: "Coming soon",
    period: "",
    description: "For growing brands that need automation and deeper analytics.",
    cta: { label: "Join the waitlist", href: "/contact" },
    features: [
      "Everything in Free",
      "Advanced automation",
      "Multi-channel integrations",
      "Advanced analytics & reports",
      "Multiple workspaces",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    period: "",
    description: "For established brands and agencies with custom requirements.",
    cta: { label: "Contact sales", href: "/contact" },
    features: [
      "Everything in Growth",
      "Custom integrations",
      "Dedicated onboarding",
      "Advanced roles & permissions",
      "SLA & security review",
      "Dedicated account team",
    ],
  },
];

export const pricingFaqs: { question: string; answer: string }[] = [
  {
    question: "Is it really free?",
    answer:
      "Yes — Ecommerce Hub is completely free during early access. There is no payment required to use the core platform.",
  },
  {
    question: "Will I be charged later?",
    answer:
      "Future plans may be introduced, but the pricing architecture is designed so you can keep using what you rely on. We'll communicate changes well in advance.",
  },
  {
    question: "Do I need a credit card?",
    answer: "No credit card is required to get started during early access.",
  },
];
