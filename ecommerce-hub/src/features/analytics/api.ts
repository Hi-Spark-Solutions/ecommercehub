import { dataAdapter } from "@/data";
import type { AnalyticsData } from "@/data/types";

export function getAnalytics(): Promise<AnalyticsData> {
  return dataAdapter.getAnalytics();
}
