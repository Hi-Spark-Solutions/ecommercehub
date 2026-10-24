import type { AnalyticsData, MetricCard, NamedValue } from "@/data/types";

const spark = (base: number) =>
  Array.from({ length: 10 }, (_, i) => ({
    date: `2026-08-${String(i + 1).padStart(2, "0")}`,
    value: Math.round(base * (0.85 + 0.03 * ((i * 3) % 6))),
  }));

const analyticsMetrics: MetricCard[] = [
  { key: "conversion", label: "Conversion Rate", value: 3.42, format: "percent", deltaPct: 0.4, trend: spark(3) },
  { key: "sessions", label: "Sessions", value: 128420, format: "number", deltaPct: 14.2, trend: spark(12000) },
  { key: "aov", label: "Avg. Order Value", value: 175.4, format: "currency", deltaPct: 3.9, trend: spark(170) },
  { key: "repeat", label: "Repeat Purchase Rate", value: 38.6, format: "percent", deltaPct: 2.1, trend: spark(38) },
];

export const analyticsData: AnalyticsData = {
  metrics: analyticsMetrics,
  revenueVsTarget: [
    { date: "Mar", revenue: 168000, target: 160000 },
    { date: "Apr", revenue: 182000, target: 175000 },
    { date: "May", revenue: 176000, target: 185000 },
    { date: "Jun", revenue: 204000, target: 195000 },
    { date: "Jul", revenue: 231000, target: 210000 },
    { date: "Aug", revenue: 248000, target: 230000 },
  ],
  conversionFunnel: [
    { label: "Sessions", value: 128420 },
    { label: "Product Views", value: 74210 },
    { label: "Add to Cart", value: 21860 },
    { label: "Checkout", value: 9420 },
    { label: "Purchased", value: 6842 },
  ],
  trafficSources: [
    { label: "Organic Search", value: 42 },
    { label: "Paid Social", value: 24 },
    { label: "Direct", value: 16 },
    { label: "Email", value: 12 },
    { label: "Referral", value: 6 },
  ],
  salesByCategory: [
    { label: "Audio", value: 396136 },
    { label: "Wearables", value: 267924 },
    { label: "Apparel", value: 198960 },
    { label: "Home & Kitchen", value: 156198 },
    { label: "Footwear", value: 178608 },
    { label: "Electronics", value: 220525 },
  ],
  cohortRetention: [
    { label: "Month 0", value: 100 },
    { label: "Month 1", value: 46 },
    { label: "Month 2", value: 34 },
    { label: "Month 3", value: 28 },
    { label: "Month 4", value: 24 },
    { label: "Month 5", value: 21 },
  ],
};

export const reportsList: { id: string; name: string; description: string; category: string; updatedAt: string }[] = [
  { id: "rep_1", name: "Sales over time", description: "Revenue, orders and AOV by day, week or month.", category: "Sales", updatedAt: "2026-08-14T08:00:00Z" },
  { id: "rep_2", name: "Sales by product", description: "Units sold and revenue for each product and variant.", category: "Sales", updatedAt: "2026-08-13T08:00:00Z" },
  { id: "rep_3", name: "Sales by channel", description: "Compare performance across all connected channels.", category: "Sales", updatedAt: "2026-08-13T08:00:00Z" },
  { id: "rep_4", name: "Customer cohorts", description: "Retention and repeat behavior by acquisition month.", category: "Customers", updatedAt: "2026-08-12T08:00:00Z" },
  { id: "rep_5", name: "Inventory valuation", description: "On-hand value and sell-through by SKU.", category: "Inventory", updatedAt: "2026-08-11T08:00:00Z" },
  { id: "rep_6", name: "Discounts & promotions", description: "Redemptions, revenue impact and margin by promo.", category: "Marketing", updatedAt: "2026-08-10T08:00:00Z" },
];
