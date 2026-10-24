import { dataAdapter } from "@/data";
import type { Integration } from "@/data/types";

export function getIntegrations(): Promise<Integration[]> {
  return dataAdapter.listIntegrations();
}
