import { dataAdapter } from "@/data";
import type { Order, OrderFilters, Paginated } from "@/data/types";

export function getOrders(filters?: OrderFilters): Promise<Paginated<Order>> {
  return dataAdapter.listOrders(filters);
}

export function getOrder(id: string): Promise<Order | null> {
  return dataAdapter.getOrder(id);
}
