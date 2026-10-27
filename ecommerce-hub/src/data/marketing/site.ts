import type { LucideIcon } from "lucide-react";
import {
  Package,
  ShoppingCart,
  Boxes,
  Users,
  Plug,
  BarChart3,
  Zap,
  Store,
  Megaphone,
  Truck,
  LineChart,
  ShieldCheck,
  Layers,
  RefreshCw,
} from "lucide-react";

/** Brand-level positioning reused across marketing pages. */
export const brand = {
  name: "Smartify Commerce",
  tagline: "One platform to run your eCommerce business across every channel.",
  subheadline:
    "Smartify Commerce is the commerce operating system for modern brands — connect your storefronts, marketplaces and logistics, then manage products, orders, inventory and customers from a single workspace.",
};

/** Logos strip — "supported commerce channels" placeholders. */
export const supportedChannels: string[] = [
  "Online Store",
  "Marketplaces",
  "Retail POS",
  "Social Commerce",
  "Wholesale",
  "Mobile App",
];

export interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Core capabilities grid (home + product page). */
export const capabilities: Capability[] = [
  {
    title: "Product Management",
    description:
      "Manage catalog, variants, media and pricing once, then publish everywhere with a single source of truth.",
    icon: Package,
  },
  {
    title: "Order Management",
    description:
      "Capture, verify and fulfill orders from every channel in one queue — no more switching between panels.",
    icon: ShoppingCart,
  },
  {
    title: "Inventory Management",
    description:
      "Keep stock accurate across warehouses and channels with real-time sync that prevents overselling.",
    icon: Boxes,
  },
  {
    title: "Customers",
    description:
      "A unified customer view across channels so you can build loyalty and understand lifetime value.",
    icon: Users,
  },
  {
    title: "Integrations",
    description:
      "Connect storefronts, marketplaces and logistics partners. The architecture is built to extend.",
    icon: Plug,
  },
  {
    title: "Analytics",
    description:
      "Unified commerce reporting turns fragmented channel data into decisions you can act on.",
    icon: BarChart3,
  },
  {
    title: "Automation",
    description:
      "Put repetitive operations on autopilot with simple, rule-based workflows that scale with you.",
    icon: Zap,
  },
];

export interface Step {
  label: string;
  description: string;
  icon: LucideIcon;
}

/** Omnichannel workflow strip: Store → Hub → Marketplaces → Marketing → Shipping → Analytics */
export const omnichannelFlow: Step[] = [
  { label: "Store", description: "Your storefront and sales channels", icon: Store },
  { label: "Smartify Commerce", description: "The central commerce workspace", icon: Layers },
  { label: "Marketplaces", description: "List and sync everywhere", icon: Store },
  { label: "Marketing", description: "Reach customers across channels", icon: Megaphone },
  { label: "Shipping", description: "Fulfill with logistics partners", icon: Truck },
  { label: "Analytics", description: "Measure and improve", icon: LineChart },
];

export interface Benefit {
  stat: string;
  label: string;
  description: string;
}

/**
 * Outcome-oriented benefits. Figures are illustrative placeholders that
 * position the platform the way modern commerce operations tools do.
 */
export const benefits: Benefit[] = [
  {
    stat: "1 workspace",
    label: "Every channel, unified",
    description:
      "Replace a patchwork of disconnected tools with one operating system for commerce.",
  },
  {
    stat: "Real-time",
    label: "Inventory accuracy",
    description:
      "Stock stays in sync across channels so you stop overselling and cancelling orders.",
  },
  {
    stat: "Hours saved",
    label: "Operational efficiency",
    description:
      "Automate manual steps in order processing, listing and fulfillment.",
  },
  {
    stat: "Fewer errors",
    label: "Reliable fulfillment",
    description:
      "Standardized workflows reduce mistakes that lead to returns and unhappy customers.",
  },
];

export interface UseCase {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const useCases: UseCase[] = [
  {
    title: "Growing eCommerce brands",
    description:
      "Scale operations without adding tools or headcount for every new channel.",
    icon: LineChart,
  },
  {
    title: "D2C brands",
    description:
      "Own the customer relationship across your store, marketplaces and social.",
    icon: Store,
  },
  {
    title: "Multi-channel retailers",
    description:
      "Sell on many channels while keeping inventory and orders in one place.",
    icon: Layers,
  },
  {
    title: "Agencies",
    description:
      "Operate commerce for multiple clients from separate, isolated workspaces.",
    icon: Users,
  },
  {
    title: "Manufacturers",
    description:
      "Move from wholesale to direct selling with an operations layer that keeps up.",
    icon: Boxes,
  },
];

export interface HowStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const howItWorks: HowStep[] = [
  {
    step: "01",
    title: "Connect your channels",
    description:
      "Bring your storefronts, marketplaces and logistics partners into one workspace.",
    icon: Plug,
  },
  {
    step: "02",
    title: "Centralize operations",
    description:
      "Manage products, orders, inventory and customers from a single source of truth.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Automate and scale",
    description:
      "Turn on workflows and reporting, then grow to new channels without re-tooling.",
    icon: RefreshCw,
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What is Smartify Commerce?",
    answer:
      "Smartify Commerce is an omnichannel commerce platform — a single operating system where brands manage products, orders, inventory, customers and every sales channel.",
  },
  {
    question: "Is it a marketplace or an online store builder?",
    answer:
      "No. Smartify Commerce is not a marketplace, a store builder, an ERP or an accounting system. It is the operations layer that connects and coordinates the channels you already sell on.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Smartify Commerce is free during early access. The pricing architecture is designed so future plans can be added without changing how you work today.",
  },
  {
    question: "Which channels and integrations are supported?",
    answer:
      "The platform is built to connect storefronts, marketplaces and logistics partners. Integrations are added as independent modules so coverage keeps expanding.",
  },
  {
    question: "Can it grow with my business?",
    answer:
      "Yes. The architecture is modular — new commerce capabilities are added as modules without rewriting the core, so the platform scales as you add channels and volume.",
  },
];

/** Trust points used near CTAs and in the "why" section. */
export const trustPoints: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Workspace isolation",
    description: "Every brand's data lives in its own secure, multi-tenant workspace.",
    icon: ShieldCheck,
  },
  {
    title: "Built to extend",
    description: "A modular core means new commerce modules slot in cleanly.",
    icon: Layers,
  },
  {
    title: "Real-time by design",
    description: "Inventory and orders stay in sync across every connected channel.",
    icon: RefreshCw,
  },
];
