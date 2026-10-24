import { dataAdapter } from "@/data";
import type { Paginated, Product, ProductFilters } from "@/data/types";

export function getProducts(filters?: ProductFilters): Promise<Paginated<Product>> {
  return dataAdapter.listProducts(filters);
}

export function getProduct(id: string): Promise<Product | null> {
  return dataAdapter.getProduct(id);
}
