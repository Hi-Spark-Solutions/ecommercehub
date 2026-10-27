/**
 * Central domain types for Smartify Commerce.
 *
 * These types are the contract between the data layer and the UI. They are
 * intentionally backend-agnostic: the same shapes are produced today by the
 * dummy adapter and, later, by the FastAPI-backed API adapter.
 */

// ----------------------------------------------------------------------------
// Shared / query primitives
// ----------------------------------------------------------------------------

export type SortDirection = "asc" | "desc";

export interface PaginatedQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDir?: SortDirection;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type ChannelName =
  | "Online Store"
  | "Shopify"
  | "Amazon"
  | "Etsy"
  | "eBay"
  | "TikTok Shop"
  | "WooCommerce"
  | "Google Merchant";

export interface TimeseriesPoint {
  date: string; // ISO date
  value: number;
}

export interface NamedValue {
  label: string;
  value: number;
}

// ----------------------------------------------------------------------------
// Products
// ----------------------------------------------------------------------------

export type ProductStatus = "active" | "draft" | "archived";

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  options: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  category: string;
  vendor: string;
  status: ProductStatus;
  price: number;
  compareAtPrice?: number;
  cost: number;
  stock: number;
  reorderPoint: number;
  imageColor: string; // used for the placeholder swatch
  imageEmoji: string; // lightweight visual stand-in for a product photo
  tags: string[];
  variants: ProductVariant[];
  channels: ChannelName[];
  unitsSold: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductFilters = PaginatedQuery & {
  status?: ProductStatus | "all";
  category?: string | "all";
  channel?: ChannelName | "all";
};

// ----------------------------------------------------------------------------
// Orders
// ----------------------------------------------------------------------------

export type OrderStatus =
  | "pending"
  | "processing"
  | "fulfilled"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "paid" | "pending" | "refunded" | "partially_refunded";
export type FulfillmentStatus = "unfulfilled" | "partial" | "fulfilled";

export interface OrderLineItem {
  id: string;
  productId: string;
  name: string;
  variant?: string;
  sku: string;
  quantity: number;
  price: number;
  imageEmoji: string;
  imageColor: string;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderTimelineEvent {
  id: string;
  label: string;
  description?: string;
  timestamp: string;
  type: "created" | "payment" | "fulfillment" | "shipping" | "note" | "delivered";
}

export interface Order {
  id: string;
  number: string; // e.g. #1042
  customerId: string;
  customerName: string;
  customerEmail: string;
  channel: ChannelName;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  trackingNumber?: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export type OrderFilters = PaginatedQuery & {
  status?: OrderStatus | "all";
  channel?: ChannelName | "all";
  paymentStatus?: PaymentStatus | "all";
};

// ----------------------------------------------------------------------------
// Customers
// ----------------------------------------------------------------------------

export type CustomerSegment = "vip" | "returning" | "new" | "at_risk";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: CustomerSegment;
  location: string;
  country: string;
  ordersCount: number;
  totalSpend: number;
  averageOrderValue: number;
  lastOrderAt: string;
  createdAt: string;
  acceptsMarketing: boolean;
  tags: string[];
  note?: string;
}

export type CustomerFilters = PaginatedQuery & {
  segment?: CustomerSegment | "all";
};

export interface CustomerActivity {
  id: string;
  type: "order" | "account" | "email" | "note";
  label: string;
  description?: string;
  timestamp: string;
}

// ----------------------------------------------------------------------------
// Inventory
// ----------------------------------------------------------------------------

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface InventoryItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  category: string;
  location: string;
  onHand: number;
  committed: number;
  available: number;
  reorderPoint: number;
  unitCost: number;
  inventoryValue: number;
  status: StockStatus;
  imageEmoji: string;
  imageColor: string;
  updatedAt: string;
}

export interface InventorySummary {
  totalSkus: number;
  totalUnits: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  inStockCount: number;
}

export type InventoryFilters = PaginatedQuery & {
  status?: StockStatus | "all";
  location?: string | "all";
};

// ----------------------------------------------------------------------------
// Integrations / Channels
// ----------------------------------------------------------------------------

export type IntegrationStatus = "connected" | "not_connected" | "error" | "syncing";
export type IntegrationCategory =
  | "Marketplace"
  | "Store Platform"
  | "Shipping"
  | "Marketing"
  | "Feed"
  | "Messaging";

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  status: IntegrationStatus;
  logoColor: string;
  logoInitials: string;
  lastSync?: string;
  productsSynced?: number;
  ordersSynced?: number;
  syncHealth?: number; // 0-100
  popular?: boolean;
}

// ----------------------------------------------------------------------------
// Dashboard
// ----------------------------------------------------------------------------

export interface MetricCard {
  key: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent";
  deltaPct: number; // vs previous period
  trend: TimeseriesPoint[];
}

export interface DashboardData {
  metrics: MetricCard[];
  revenueTrend: TimeseriesPoint[];
  ordersTrend: TimeseriesPoint[];
  salesByChannel: NamedValue[];
  topProducts: { id: string; name: string; unitsSold: number; revenue: number; imageEmoji: string; imageColor: string }[];
  recentOrders: Order[];
}

// ----------------------------------------------------------------------------
// Analytics
// ----------------------------------------------------------------------------

export interface AnalyticsData {
  metrics: MetricCard[];
  revenueVsTarget: { date: string; revenue: number; target: number }[];
  conversionFunnel: NamedValue[];
  trafficSources: NamedValue[];
  salesByCategory: NamedValue[];
  cohortRetention: NamedValue[];
}

// ----------------------------------------------------------------------------
// App-level (notifications / workspace / user)
// ----------------------------------------------------------------------------

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "order" | "inventory" | "integration" | "system";
}

export interface Workspace {
  id: string;
  name: string;
  plan: "Starter" | "Growth" | "Scale";
  logoColor: string;
  initials: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarColor: string;
}
