import { dataAdapter } from "@/data";
import type { InventoryFilters, InventoryItem, InventorySummary, Paginated } from "@/data/types";

export function getInventorySummary(): Promise<InventorySummary> {
  return dataAdapter.getInventorySummary();
}

export function getInventory(filters?: InventoryFilters): Promise<Paginated<InventoryItem>> {
  return dataAdapter.listInventory(filters);
}
