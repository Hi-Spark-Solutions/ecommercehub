import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Boxes,
  Plug,
  Radio,
  BarChart3,
  FileBarChart,
  Zap,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * Primary application (dashboard) navigation. Every route is namespaced
 * under /dashboard so the authenticated app is cleanly separated from the
 * public marketing site. New commerce modules are added here without
 * touching the shell.
 */
export const navSections: NavSection[] = [
  {
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Commerce",
    items: [
      { label: "Products", href: "/dashboard/products", icon: Package },
      { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart, badge: "3" },
      { label: "Customers", href: "/dashboard/customers", icon: Users },
      { label: "Inventory", href: "/dashboard/inventory", icon: Boxes },
    ],
  },
  {
    title: "Channels",
    items: [
      { label: "Integrations", href: "/dashboard/integrations", icon: Plug },
      { label: "Connected Channels", href: "/dashboard/channels", icon: Radio },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Overview", href: "/dashboard/analytics/overview", icon: BarChart3 },
      { label: "Reports", href: "/dashboard/analytics/reports", icon: FileBarChart },
    ],
  },
  {
    items: [
      { label: "Automation", href: "/dashboard/automation", icon: Zap },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

/** Flat lookup used by breadcrumbs & page metadata. */
export const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/products": "Products",
  "/dashboard/orders": "Orders",
  "/dashboard/customers": "Customers",
  "/dashboard/inventory": "Inventory",
  "/dashboard/integrations": "Integrations",
  "/dashboard/channels": "Connected Channels",
  "/dashboard/analytics": "Analytics",
  "/dashboard/analytics/overview": "Overview",
  "/dashboard/analytics/reports": "Reports",
  "/dashboard/automation": "Automation",
  "/dashboard/settings": "Settings",
};
