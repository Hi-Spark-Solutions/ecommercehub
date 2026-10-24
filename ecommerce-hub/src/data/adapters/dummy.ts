import type { DataAdapter } from "@/data/adapters/types";
import type {
  Paginated,
  PaginatedQuery,
  Product,
  Order,
  Customer,
  InventoryItem,
} from "@/data/types";
import {
  dummyProducts,
  dummyOrders,
  dummyCustomers,
  dummyCustomerActivity,
  dummyInventory,
  dummyInventorySummary,
  dummyIntegrations,
  dashboardData,
  analyticsData,
  dummyWorkspaces,
  dummyCurrentUser,
  dummyNotifications,
} from "@/data/dummy";
import { delay } from "@/lib/utils";

// Toggle to simulate network latency during this frontend-only phase.
const LATENCY_MS = 250;

function paginate<T>(items: T[], query?: PaginatedQuery): Paginated<T> {
  const page = Math.max(1, query?.page ?? 1);
  const pageSize = query?.pageSize ?? 10;
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    total,
    totalPages,
  };
}

function sortBy<T>(items: T[], key?: string, dir: "asc" | "desc" = "asc"): T[] {
  if (!key) return items;
  const sorted = [...items].sort((a, b) => {
    const av = (a as Record<string, unknown>)[key];
    const bv = (b as Record<string, unknown>)[key];
    if (typeof av === "number" && typeof bv === "number") return av - bv;
    return String(av ?? "").localeCompare(String(bv ?? ""));
  });
  return dir === "desc" ? sorted.reverse() : sorted;
}

function matches(text: string, term?: string): boolean {
  if (!term) return true;
  return text.toLowerCase().includes(term.toLowerCase());
}

/** In-memory adapter backed entirely by the dummy dataset. */
export class DummyAdapter implements DataAdapter {
  private async ok<T>(value: T): Promise<T> {
    await delay(LATENCY_MS);
    return value;
  }

  getDashboard() {
    return this.ok(dashboardData);
  }

  listProducts(filters = {} as import("@/data/types").ProductFilters) {
    let items: Product[] = dummyProducts;
    if (filters.status && filters.status !== "all") items = items.filter((p) => p.status === filters.status);
    if (filters.category && filters.category !== "all") items = items.filter((p) => p.category === filters.category);
    if (filters.channel && filters.channel !== "all") items = items.filter((p) => p.channels.includes(filters.channel as never));
    items = items.filter((p) => matches(`${p.name} ${p.sku} ${p.category} ${p.vendor}`, filters.search));
    items = sortBy(items, filters.sortBy, filters.sortDir);
    return this.ok(paginate(items, { ...filters, pageSize: filters.pageSize ?? 8 }));
  }

  getProduct(id: string) {
    return this.ok(dummyProducts.find((p) => p.id === id) ?? null);
  }

  listOrders(filters = {} as import("@/data/types").OrderFilters) {
    let items: Order[] = dummyOrders;
    if (filters.status && filters.status !== "all") items = items.filter((o) => o.status === filters.status);
    if (filters.channel && filters.channel !== "all") items = items.filter((o) => o.channel === filters.channel);
    if (filters.paymentStatus && filters.paymentStatus !== "all") items = items.filter((o) => o.paymentStatus === filters.paymentStatus);
    items = items.filter((o) => matches(`${o.number} ${o.customerName} ${o.customerEmail}`, filters.search));
    items = sortBy(items, filters.sortBy, filters.sortDir);
    return this.ok(paginate(items, { ...filters, pageSize: filters.pageSize ?? 10 }));
  }

  getOrder(id: string) {
    return this.ok(dummyOrders.find((o) => o.id === id) ?? null);
  }

  listCustomers(filters = {} as import("@/data/types").CustomerFilters) {
    let items: Customer[] = dummyCustomers;
    if (filters.segment && filters.segment !== "all") items = items.filter((c) => c.segment === filters.segment);
    items = items.filter((c) => matches(`${c.name} ${c.email} ${c.location}`, filters.search));
    items = sortBy(items, filters.sortBy, filters.sortDir);
    return this.ok(paginate(items, { ...filters, pageSize: filters.pageSize ?? 10 }));
  }

  getCustomer(id: string) {
    return this.ok(dummyCustomers.find((c) => c.id === id) ?? null);
  }

  getCustomerOrders(customerId: string) {
    return this.ok(dummyOrders.filter((o) => o.customerId === customerId));
  }

  getCustomerActivity(customerId: string) {
    return this.ok(dummyCustomerActivity[customerId] ?? []);
  }

  getInventorySummary() {
    return this.ok(dummyInventorySummary);
  }

  listInventory(filters = {} as import("@/data/types").InventoryFilters) {
    let items: InventoryItem[] = dummyInventory;
    if (filters.status && filters.status !== "all") items = items.filter((i) => i.status === filters.status);
    if (filters.location && filters.location !== "all") items = items.filter((i) => i.location === filters.location);
    items = items.filter((i) => matches(`${i.name} ${i.sku} ${i.category}`, filters.search));
    items = sortBy(items, filters.sortBy, filters.sortDir);
    return this.ok(paginate(items, { ...filters, pageSize: filters.pageSize ?? 8 }));
  }

  listIntegrations() {
    return this.ok(dummyIntegrations);
  }

  getAnalytics() {
    return this.ok(analyticsData);
  }

  getWorkspaces() {
    return this.ok(dummyWorkspaces);
  }

  getCurrentUser() {
    return this.ok(dummyCurrentUser);
  }

  getNotifications() {
    return this.ok(dummyNotifications);
  }
}
