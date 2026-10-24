import type { DataAdapter } from "@/data/adapters/types";
import type {
  AnalyticsData,
  Customer,
  CustomerActivity,
  CustomerFilters,
  DashboardData,
  Integration,
  InventoryFilters,
  InventoryItem,
  InventorySummary,
  Order,
  OrderFilters,
  Paginated,
  Product,
  ProductFilters,
  CurrentUser,
  NotificationItem,
  Workspace,
} from "@/data/types";

/**
 * ApiAdapter — the future implementation.
 *
 * This talks to the FastAPI backend over HTTP. It is written but NOT wired in
 * yet (the app uses `DummyAdapter` during this frontend-only phase). When the
 * backend is ready, flip `NEXT_PUBLIC_DATA_SOURCE=api` and the entire app
 * switches over with no component changes.
 *
 * Note how every endpoint maps 1:1 to a `DataAdapter` method — e.g.
 * `listProducts()` -> `GET /api/v1/products`.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/v1";

async function http<T>(path: string, params?: object): Promise<T> {
  const url = new URL(`${API_BASE}${path}`, "http://localhost");
  if (params) {
    for (const [k, v] of Object.entries(params as Record<string, unknown>)) {
      if (v !== undefined && v !== null && v !== "all") url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.pathname + url.search, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export class ApiAdapter implements DataAdapter {
  getDashboard(): Promise<DashboardData> {
    return http<DashboardData>("/dashboard");
  }

  listProducts(filters?: ProductFilters): Promise<Paginated<Product>> {
    return http<Paginated<Product>>("/products", filters);
  }
  getProduct(id: string): Promise<Product | null> {
    return http<Product | null>(`/products/${id}`);
  }

  listOrders(filters?: OrderFilters): Promise<Paginated<Order>> {
    return http<Paginated<Order>>("/orders", filters);
  }
  getOrder(id: string): Promise<Order | null> {
    return http<Order | null>(`/orders/${id}`);
  }

  listCustomers(filters?: CustomerFilters): Promise<Paginated<Customer>> {
    return http<Paginated<Customer>>("/customers", filters);
  }
  getCustomer(id: string): Promise<Customer | null> {
    return http<Customer | null>(`/customers/${id}`);
  }
  getCustomerOrders(customerId: string): Promise<Order[]> {
    return http<Order[]>(`/customers/${customerId}/orders`);
  }
  getCustomerActivity(customerId: string): Promise<CustomerActivity[]> {
    return http<CustomerActivity[]>(`/customers/${customerId}/activity`);
  }

  getInventorySummary(): Promise<InventorySummary> {
    return http<InventorySummary>("/inventory/summary");
  }
  listInventory(filters?: InventoryFilters): Promise<Paginated<InventoryItem>> {
    return http<Paginated<InventoryItem>>("/inventory", filters);
  }

  listIntegrations(): Promise<Integration[]> {
    return http<Integration[]>("/integrations");
  }

  getAnalytics(): Promise<AnalyticsData> {
    return http<AnalyticsData>("/analytics");
  }

  getWorkspaces(): Promise<Workspace[]> {
    return http<Workspace[]>("/workspaces");
  }
  getCurrentUser(): Promise<CurrentUser> {
    return http<CurrentUser>("/me");
  }
  getNotifications(): Promise<NotificationItem[]> {
    return http<NotificationItem[]>("/notifications");
  }
}
