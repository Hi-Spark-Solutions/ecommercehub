import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Store,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Zap,
  Plug,
  LayoutDashboard,
  Warehouse,
  Truck,
  Globe,
} from "lucide-react";

export interface MenuItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Marketing "Solutions" mega-menu. These are outcome-oriented marketing
 * entries (not real app routes yet) and map to /solutions/* placeholders.
 * Add new solutions here — the mega-menu renders from this array.
 */
export const solutionsMenu: MenuItem[] = [
  {
    title: "Commerce Operations",
    description: "Run daily operations across every channel from one workspace.",
    href: "/solutions/commerce-operations",
    icon: LayoutDashboard,
  },
  {
    title: "Marketplace Management",
    description: "List, sync and manage inventory across marketplaces.",
    href: "/solutions/marketplace-management",
    icon: Store,
  },
  {
    title: "Product Management",
    description: "A single source of truth for catalog, variants and pricing.",
    href: "/solutions/product-management",
    icon: Package,
  },
  {
    title: "Order Management",
    description: "Capture, verify and fulfill orders from all channels.",
    href: "/solutions/order-management",
    icon: ShoppingCart,
  },
  {
    title: "Inventory Management",
    description: "Real-time stock across warehouses and sales channels.",
    href: "/solutions/inventory-management",
    icon: Boxes,
  },
  {
    title: "Analytics",
    description: "Understand performance with unified commerce reporting.",
    href: "/solutions/analytics",
    icon: BarChart3,
  },
  {
    title: "Automation",
    description: "Automate repetitive workflows with simple rules.",
    href: "/solutions/automation",
    icon: Zap,
  },
  {
    title: "Integrations",
    description: "Connect storefronts, marketplaces and logistics partners.",
    href: "/solutions/integrations",
    icon: Plug,
  },
];

/**
 * Product mega-menu — links to the actual application modules.
 * "Hub" opens the authenticated dashboard.
 */
export const productMenu: MenuItem[] = [
  {
    title: "Hub",
    description: "Open your commerce operations dashboard.",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    description: "Manage your catalog across channels.",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    description: "Track and fulfill orders in one place.",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    description: "A unified view of every customer.",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Inventory",
    description: "Keep stock accurate everywhere.",
    href: "/dashboard/inventory",
    icon: Boxes,
  },
  {
    title: "Analytics",
    description: "Measure what matters across commerce.",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Automation",
    description: "Put commerce operations on autopilot.",
    href: "/dashboard/automation",
    icon: Zap,
  },
  {
    title: "Integrations",
    description: "Connect the tools and channels you use.",
    href: "/dashboard/integrations",
    icon: Plug,
  },
];

export interface HeaderLink {
  label: string;
  href: string;
  megaMenu?: "solutions" | "product";
}

export const headerLinks: HeaderLink[] = [
  { label: "Solutions", href: "/solutions", megaMenu: "solutions" },
  // { label: "Product", href: "/product", megaMenu: "product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Hub", href: "/dashboard" },
      { label: "Products", href: "/dashboard/products" },
      { label: "Orders", href: "/dashboard/orders" },
      { label: "Analytics", href: "/dashboard/analytics" },
      { label: "Automation", href: "/dashboard/automation" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Commerce Operations", href: "/solutions/commerce-operations" },
      { label: "Marketplace Management", href: "/solutions/marketplace-management" },
      { label: "Inventory", href: "/solutions/inventory-management" },
      { label: "Analytics", href: "/solutions/analytics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/blog" },
      { label: "Help Center", href: "/contact" },
      { label: "API", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export const solutionTools = {
  "commerce-operations": [
    {
      title: "Profit Margin Calculator",
      description:
        "Calculate product profit, profit margins, and markup to make informed pricing decisions.",
      href: "/solutions/commerce-operations/profit-margin-calculator",
      icon: "calculator",
    },
    {
      title: "Barcode Generator",
      description:
        "Generate customizable product barcodes and download them as PNG or SVG files.",
      href: "/solutions/commerce-operations/barcode-generator",
      icon: "barcode",
    },
    {
      title: "Custom QR Code Generator",
      description:
        "Create branded QR codes for product pages, promotions, websites, and text. Download PNG or SVG.",
      href: "/solutions/commerce-operations/qr-code-generator",
      icon: "qr-code",
    },
  ],
} as const;

/** Small icon set reused by home-page channel/logistics strips. */
export const marketingIcons = { Warehouse, Truck, Globe };
