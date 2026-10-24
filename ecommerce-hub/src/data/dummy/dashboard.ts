import type { DashboardData, MetricCard, NamedValue, TimeseriesPoint } from "@/data/types";
import { dummyProducts } from "@/data/dummy/products";
import { dummyOrders } from "@/data/dummy/orders";
import { dummyCustomers } from "@/data/dummy/customers";
import { dummyInventorySummary } from "@/data/dummy/inventory";

// Last-14-day revenue series (deterministic, realistic shape).
export const revenueTrend: TimeseriesPoint[] = [
  { date: "2026-08-01", value: 8420 },
  { date: "2026-08-02", value: 7960 },
  { date: "2026-08-03", value: 9110 },
  { date: "2026-08-04", value: 10230 },
  { date: "2026-08-05", value: 9640 },
  { date: "2026-08-06", value: 11200 },
  { date: "2026-08-07", value: 12480 },
  { date: "2026-08-08", value: 10870 },
  { date: "2026-08-09", value: 9980 },
  { date: "2026-08-10", value: 11640 },
  { date: "2026-08-11", value: 13120 },
  { date: "2026-08-12", value: 12760 },
  { date: "2026-08-13", value: 14030 },
  { date: "2026-08-14", value: 8890 },
];

export const ordersTrend: TimeseriesPoint[] = [
  { date: "2026-08-01", value: 62 },
  { date: "2026-08-02", value: 58 },
  { date: "2026-08-03", value: 71 },
  { date: "2026-08-04", value: 80 },
  { date: "2026-08-05", value: 74 },
  { date: "2026-08-06", value: 88 },
  { date: "2026-08-07", value: 96 },
  { date: "2026-08-08", value: 83 },
  { date: "2026-08-09", value: 77 },
  { date: "2026-08-10", value: 90 },
  { date: "2026-08-11", value: 102 },
  { date: "2026-08-12", value: 98 },
  { date: "2026-08-13", value: 110 },
  { date: "2026-08-14", value: 69 },
];

const spark = (base: number, seed: number): TimeseriesPoint[] =>
  Array.from({ length: 12 }, (_, i) => ({
    date: `2026-08-${String(i + 1).padStart(2, "0")}`,
    value: Math.round(base * (0.8 + 0.05 * ((i * seed) % 7))),
  }));

export const salesByChannel: NamedValue[] = [
  { label: "Online Store", value: 486200 },
  { label: "Amazon", value: 312400 },
  { label: "Shopify", value: 198600 },
  { label: "TikTok Shop", value: 96800 },
  { label: "Etsy", value: 61300 },
  { label: "eBay", value: 44700 },
];

const totalRevenue = 1200000;
const totalOrders = 6842;
const avgOrderValue = Math.round((totalRevenue / totalOrders) * 100) / 100;

export const dashboardMetrics: MetricCard[] = [
  { key: "revenue", label: "Total Revenue", value: totalRevenue, format: "currency", deltaPct: 12.4, trend: spark(9000, 3) },
  { key: "orders", label: "Orders", value: totalOrders, format: "number", deltaPct: 8.1, trend: spark(80, 2) },
  { key: "aov", label: "Avg. Order Value", value: avgOrderValue, format: "currency", deltaPct: 3.9, trend: spark(170, 5) },
  { key: "customers", label: "Customers", value: 3241, format: "number", deltaPct: 6.7, trend: spark(30, 4) },
  { key: "products", label: "Active Products", value: dummyProducts.filter((p) => p.status === "active").length, format: "number", deltaPct: 2.2, trend: spark(20, 1) },
  { key: "inventory", label: "Inventory Value", value: dummyInventorySummary.totalValue, format: "currency", deltaPct: -1.8, trend: spark(50000, 6) },
];

export const dashboardData: DashboardData = {
  metrics: dashboardMetrics,
  revenueTrend,
  ordersTrend,
  salesByChannel,
  topProducts: [...dummyProducts]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((p) => ({ id: p.id, name: p.name, unitsSold: p.unitsSold, revenue: p.revenue, imageEmoji: p.imageEmoji, imageColor: p.imageColor })),
  recentOrders: dummyOrders.slice(0, 6),
};

void dummyCustomers;
