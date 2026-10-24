import type { DataAdapter } from "@/data/adapters/types";
import { DummyAdapter } from "@/data/adapters/dummy";
import { ApiAdapter } from "@/data/adapters/api";

/**
 * Single place that decides where data comes from.
 *
 *   NEXT_PUBLIC_DATA_SOURCE=dummy  (default, this phase)  -> DummyAdapter
 *   NEXT_PUBLIC_DATA_SOURCE=api    (once FastAPI is live)  -> ApiAdapter
 *
 * Nothing else in the app references a concrete adapter — features import the
 * `dataAdapter` singleton (or their own `api.ts` wrappers around it).
 */
const source = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "dummy";

export const dataAdapter: DataAdapter =
  source === "api" ? new ApiAdapter() : new DummyAdapter();
