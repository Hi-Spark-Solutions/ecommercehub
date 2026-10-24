"use client";

import * as React from "react";
import Link from "next/link";
import { Download, Package, Plus, SlidersHorizontal } from "lucide-react";
import { getProducts } from "@/features/products/api";
import { useAsyncData } from "@/hooks/use-async-data";
import { productCategories } from "@/data";
import type { ProductFilters, ProductStatus } from "@/data/types";
import { PageHeader, TableToolbar } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SearchInput, useDebouncedValue } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";
import { Table, THead, TBody, TR, TH, TD, SortableTH } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { ProductThumb } from "@/components/ui/avatar";
import { ProductStatusBadge } from "@/components/ui/status-badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { formatCurrency, formatNumber } from "@/lib/utils";

const statusTabs = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

export function ProductsView() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<ProductStatus | "all">("all");
  const [category, setCategory] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<string>("name");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const debouncedSearch = useDebouncedValue(search);

  const filters: ProductFilters = React.useMemo(
    () => ({ search: debouncedSearch, status, category, page, sortBy, sortDir, pageSize: 8 }),
    [debouncedSearch, status, category, page, sortBy, sortDir]
  );

  const { data, loading, error, reload } = useAsyncData(() => getProducts(filters), [filters]);

  React.useEffect(() => setPage(1), [debouncedSearch, status, category]);

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
        title="Products"
        description="Manage your catalog, pricing and inventory across all channels."
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>Add product</Button>
          </>
        }
      />

      <Card className="overflow-hidden">
        <div className="px-4 pt-2">
          <Tabs tabs={statusTabs} value={status} onValueChange={(v) => setStatus(v as ProductStatus | "all")} />
        </div>

        <TableToolbar>
          <SearchInput value={search} onChange={setSearch} placeholder="Search products, SKU…" className="w-full sm:w-72" />
          <div className="flex items-center gap-2">
            <Select
              className="w-40"
              value={category}
              onValueChange={setCategory}
              options={[{ label: "All categories", value: "all" }, ...productCategories.map((c) => ({ label: c, value: c }))]}
            />
            <Button variant="outline" size="sm" leftIcon={<SlidersHorizontal className="h-4 w-4" />}>Filters</Button>
          </div>
        </TableToolbar>

        {error ? (
          <ErrorState onRetry={reload} />
        ) : loading || !data ? (
          <TableSkeleton rows={8} cols={6} />
        ) : data.items.length === 0 ? (
          <EmptyState
            icon={<Package className="h-6 w-6" />}
            title="No products found"
            description="Try adjusting your search or filters, or add your first product."
            action={<Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>Add product</Button>}
          />
        ) : (
          <>
            <Table>
              <THead>
                <TR className="hover:bg-transparent">
                  <SortableTH label="Product" sortKey="name" activeKey={sortBy} direction={sortDir} onSort={onSort} />
                  <TH>Status</TH>
                  <TH>Category</TH>
                  <SortableTH label="Price" sortKey="price" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                  <SortableTH label="Stock" sortKey="stock" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                  <SortableTH label="Sold" sortKey="unitsSold" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                </TR>
              </THead>
              <TBody>
                {data.items.map((p) => (
                  <TR key={p.id}>
                    <TD>
                      <Link href={`/dashboard/products/${p.id}`} className="flex items-center gap-3 group">
                        <ProductThumb emoji={p.imageEmoji} color={p.imageColor} />
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.sku}</p>
                        </div>
                      </Link>
                    </TD>
                    <TD><ProductStatusBadge status={p.status} /></TD>
                    <TD className="text-muted-foreground">{p.category}</TD>
                    <TD className="text-right font-medium">{formatCurrency(p.price)}</TD>
                    <TD className="text-right">
                      <span className={p.stock === 0 ? "text-danger" : p.stock <= p.reorderPoint ? "text-warning" : "text-foreground"}>
                        {formatNumber(p.stock)}
                      </span>
                    </TD>
                    <TD className="text-right text-muted-foreground">{formatNumber(p.unitsSold)}</TD>
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
