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
 * The DataAdapter is the single seam between the UI and its data source.
 *
 * Today it is implemented by `DummyAdapter` (in-memory dummy data). Later a
 * `ApiAdapter` implementation will call FastAPI over HTTP. Because feature
 * `api.ts` modules only ever talk to this interface, swapping the adapter
 * requires zero changes in components.
 */
export interface DataAdapter {
  // Dashboard
  getDashboard(): Promise<DashboardData>;

  // Products
  listProducts(filters?: ProductFilters): Promise<Paginated<Product>>;
  getProduct(id: string): Promise<Product | null>;

  // Orders
  listOrders(filters?: OrderFilters): Promise<Paginated<Order>>;
  getOrder(id: string): Promise<Order | null>;

  // Customers
  listCustomers(filters?: CustomerFilters): Promise<Paginated<Customer>>;
  getCustomer(id: string): Promise<Customer | null>;
  getCustomerOrders(customerId: string): Promise<Order[]>;
  getCustomerActivity(customerId: string): Promise<CustomerActivity[]>;

  // Inventory
  getInventorySummary(): Promise<InventorySummary>;
  listInventory(filters?: InventoryFilters): Promise<Paginated<InventoryItem>>;

  // Integrations
  listIntegrations(): Promise<Integration[]>;

  // Analytics
  getAnalytics(): Promise<AnalyticsData>;

  // App context
  getWorkspaces(): Promise<Workspace[]>;
  getCurrentUser(): Promise<CurrentUser>;
  getNotifications(): Promise<NotificationItem[]>;
}
