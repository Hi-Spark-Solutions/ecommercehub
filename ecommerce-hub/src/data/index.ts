/**
 * Public entry point for the data layer.
 * Import the adapter and types from here rather than reaching into `dummy/`.
 */
export * from "@/data/types";
export type { DataAdapter } from "@/data/adapters/types";
export { dataAdapter } from "@/data/adapters";

// Static reference lists that are safe to import directly in the UI (filters).
export { productCategories } from "@/data/dummy/products";
export { inventoryLocations } from "@/data/dummy/inventory";
