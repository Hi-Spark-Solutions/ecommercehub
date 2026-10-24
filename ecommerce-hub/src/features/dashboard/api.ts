import { dataAdapter } from "@/data";
import type { DashboardData } from "@/data/types";

/**
 * Feature API. Components call these functions — never the adapter or dummy
 * data directly. Swapping the adapter (dummy -> FastAPI) leaves this untouched.
 */
export function getDashboard(): Promise<DashboardData> {
  return dataAdapter.getDashboard();
}
