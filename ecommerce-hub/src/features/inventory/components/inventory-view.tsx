"use client";

import * as React from "react";
import { AlertTriangle, Boxes, CheckCircle2, DollarSign, Download, Layers, PackageX } from "lucide-react";
import { getInventory, getInventorySummary } from "@/features/inventory/api";
import { useAsyncData } from "@/hooks/use-async-data";
import { inventoryLocations } from "@/data";
import type { InventoryFilters, StockStatus } from "@/data/types";
import { PageHeader, TableToolbar } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SearchInput, useDebouncedValue } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";
import { Table, THead, TBody, TR, TH, TD, SortableTH } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { ProductThumb } from "@/components/ui/avatar";
import { StockStatusBadge } from "@/components/ui/status-badge";
import { TableSkeleton, KpiCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

const statusTabs = [
  { value: "all", label: "All" },
  { value: "in_stock", label: "In stock" },
  { value: "low_stock", label: "Low stock" },
  { value: "out_of_stock", label: "Out of stock" },
];

function StatCard({
  label,
  value,
  icon,
  valueClassName,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={cn("mt-2 text-2xl font-semibold tracking-tight text-foreground", valueClassName)}>{value}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function InventoryView() {
  const { data: summary, loading: summaryLoading } = useAsyncData(() => getInventorySummary(), []);

  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<StockStatus | "all">("all");
  const [location, setLocation] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<string>("inventoryValue");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const debouncedSearch = useDebouncedValue(search);

  const filters: InventoryFilters = React.useMemo(
    () => ({ search: debouncedSearch, status, location, page, sortBy, sortDir, pageSize: 8 }),
    [debouncedSearch, status, location, page, sortBy, sortDir]
  );

  const { data, loading, error, reload } = useAsyncData(() => getInventory(filters), [filters]);

  React.useEffect(() => setPage(1), [debouncedSearch, status, location]);

  const onSort = (key: string) => {
    if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Track stock levels, availability and inventory value across every location."
        actions={
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {summaryLoading || !summary ? (
          Array.from({ length: 6 }).map((_, i) => <KpiCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total SKUs" value={formatNumber(summary.totalSkus)} icon={<Layers className="h-4 w-4" />} />
            <StatCard label="Total units" value={formatNumber(summary.totalUnits)} icon={<Boxes className="h-4 w-4" />} />
            <StatCard
              label="Inventory value"
              value={formatCurrency(summary.totalValue, { compact: summary.totalValue >= 100000 })}
              icon={<DollarSign className="h-4 w-4" />}
            />
            <StatCard
              label="In stock"
              value={formatNumber(summary.inStockCount)}
              icon={<CheckCircle2 className="h-4 w-4" />}
              valueClassName="text-success"
            />
            <StatCard
              label="Low stock"
              value={formatNumber(summary.lowStockCount)}
              icon={<AlertTriangle className="h-4 w-4" />}
              valueClassName="text-warning"
            />
            <StatCard
              label="Out of stock"
              value={formatNumber(summary.outOfStockCount)}
              icon={<PackageX className="h-4 w-4" />}
              valueClassName="text-danger"
            />
          </>
        )}
      </div>

      <Card className="overflow-hidden">
        <div className="px-4 pt-2">
          <Tabs tabs={statusTabs} value={status} onValueChange={(v) => setStatus(v as StockStatus | "all")} />
        </div>

        <TableToolbar>
          <SearchInput value={search} onChange={setSearch} placeholder="Search products, SKU…" className="w-full sm:w-72" />
          <div className="flex items-center gap-2">
            <Select
              className="w-52"
              value={location}
              onValueChange={setLocation}
              options={[{ label: "All locations", value: "all" }, ...inventoryLocations.map((l) => ({ label: l, value: l }))]}
            />
          </div>
        </TableToolbar>

        {error ? (
          <ErrorState onRetry={reload} />
        ) : loading || !data ? (
          <TableSkeleton rows={8} cols={8} />
        ) : data.items.length === 0 ? (
          <EmptyState
            icon={<Boxes className="h-6 w-6" />}
            title="No inventory found"
            description="Try adjusting your search or filters to find stock across your locations."
          />
        ) : (
          <>
            <Table>
              <THead>
                <TR className="hover:bg-transparent">
                  <SortableTH label="Product" sortKey="name" activeKey={sortBy} direction={sortDir} onSort={onSort} />
                  <TH>Location</TH>
                  <SortableTH label="On hand" sortKey="onHand" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                  <SortableTH label="Available" sortKey="available" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                  <TH className="text-right">Reorder point</TH>
                  <TH className="text-right">Unit cost</TH>
                  <SortableTH label="Inventory value" sortKey="inventoryValue" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                  <TH>Status</TH>
                </TR>
              </THead>
              <TBody>
                {data.items.map((item) => (
                  <TR key={item.id}>
                    <TD>
                      <div className="flex items-center gap-3">
                        <ProductThumb emoji={item.imageEmoji} color={item.imageColor} />
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.sku}</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="text-muted-foreground">{item.location}</TD>
                    <TD className="text-right">{formatNumber(item.onHand)}</TD>
                    <TD className="text-right">
                      <span className={item.available === 0 ? "text-danger" : item.available <= item.reorderPoint ? "text-warning" : "text-foreground"}>
                        {formatNumber(item.available)}
                      </span>
                    </TD>
                    <TD className="text-right text-muted-foreground">{formatNumber(item.reorderPoint)}</TD>
                    <TD className="text-right text-muted-foreground">{formatCurrency(item.unitCost)}</TD>
                    <TD className="text-right font-medium">{formatCurrency(item.inventoryValue)}</TD>
                    <TD><StockStatusBadge status={item.status} /></TD>
                  </TR>
                ))}
              </TBody>
            </Table>
            <Pagination page={data.page} totalPages={data.totalPages} total={data.total} pageSize={data.pageSize} onPageChange={setPage} />
          </>
        )}
      </Card>
    </div>
  );
}
