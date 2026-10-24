import type { InventoryItem, InventorySummary, StockStatus } from "@/data/types";
import { dummyProducts } from "@/data/dummy/products";

const locations = ["Austin, TX — DC1", "Reno, NV — DC2", "Newark, NJ — DC3"];

function statusFor(available: number, reorderPoint: number): StockStatus {
  if (available <= 0) return "out_of_stock";
  if (available <= reorderPoint) return "low_stock";
  return "in_stock";
}

export const dummyInventory: InventoryItem[] = dummyProducts.map((p, i) => {
  const committed = Math.min(p.stock, Math.round(p.stock * 0.08) + (i % 5));
  const available = Math.max(0, p.stock - committed);
  return {
    id: `inv_${p.id}`,
    productId: p.id,
    name: p.name,
    sku: p.sku,
    category: p.category,
    location: locations[i % locations.length],
    onHand: p.stock,
    committed,
    available,
    reorderPoint: p.reorderPoint,
    unitCost: p.cost,
    inventoryValue: Math.round(p.stock * p.cost * 100) / 100,
    status: statusFor(available, p.reorderPoint),
    imageEmoji: p.imageEmoji,
    imageColor: p.imageColor,
    updatedAt: p.updatedAt,
  };
});

export const dummyInventorySummary: InventorySummary = {
  totalSkus: dummyInventory.length,
  totalUnits: dummyInventory.reduce((s, i) => s + i.onHand, 0),
  totalValue: Math.round(dummyInventory.reduce((s, i) => s + i.inventoryValue, 0) * 100) / 100,
  lowStockCount: dummyInventory.filter((i) => i.status === "low_stock").length,
  outOfStockCount: dummyInventory.filter((i) => i.status === "out_of_stock").length,
  inStockCount: dummyInventory.filter((i) => i.status === "in_stock").length,
};

export const inventoryLocations = locations;
