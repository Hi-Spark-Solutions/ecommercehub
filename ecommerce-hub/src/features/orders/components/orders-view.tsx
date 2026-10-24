"use client";

import * as React from "react";
import Link from "next/link";
import { Download, Filter, ShoppingCart } from "lucide-react";
import { getOrders } from "@/features/orders/api";
import { useAsyncData } from "@/hooks/use-async-data";
import type { OrderFilters, OrderStatus, ChannelName } from "@/data/types";
import { PageHeader, TableToolbar } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SearchInput, useDebouncedValue } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";
import { Table, THead, TBody, TR, TH, TD, SortableTH } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Avatar } from "@/components/ui/avatar";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ui/status-badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusTabs = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "delivered", label: "Delivered" },
  { value: "refunded", label: "Refunded" },
];

const channelOptions: { label: string; value: string }[] = [
  { label: "All channels", value: "all" },
  { label: "Online Store", value: "Online Store" },
  { label: "Shopify", value: "Shopify" },
  { label: "Amazon", value: "Amazon" },
  { label: "Etsy", value: "Etsy" },
  { label: "eBay", value: "eBay" },
  { label: "TikTok Shop", value: "TikTok Shop" },
];

export function OrdersView() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<OrderStatus | "all">("all");
  const [channel, setChannel] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const debouncedSearch = useDebouncedValue(search);

  const filters: OrderFilters = React.useMemo(
    () => ({
      search: debouncedSearch,
      status,
      channel: channel as ChannelName | "all",
      page,
      sortBy,
      sortDir,
      pageSize: 10,
    }),
    [debouncedSearch, status, channel, page, sortBy, sortDir]
  );

  const { data, loading, error, reload } = useAsyncData(() => getOrders(filters), [filters]);

  React.useEffect(() => setPage(1), [debouncedSearch, status, channel]);

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
        title="Orders"
        description="Track, fulfill and manage orders across every channel."
        actions={
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <div className="px-4 pt-2">
          <Tabs tabs={statusTabs} value={status} onValueChange={(v) => setStatus(v as OrderStatus | "all")} />
        </div>

        <TableToolbar>
          <SearchInput value={search} onChange={setSearch} placeholder="Search order #, customer…" className="w-full sm:w-72" />
          <div className="flex items-center gap-2">
            <Select className="w-40" value={channel} onValueChange={setChannel} options={channelOptions} />
            <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
              More filters
            </Button>
          </div>
        </TableToolbar>

        {error ? (
          <ErrorState onRetry={reload} />
        ) : loading || !data ? (
          <TableSkeleton rows={10} cols={6} />
        ) : data.items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="h-6 w-6" />}
            title="No orders found"
            description="Try adjusting your search or filters."
          />
        ) : (
          <>
            <Table>
              <THead>
                <TR className="hover:bg-transparent">
                  <SortableTH label="Order" sortKey="number" activeKey={sortBy} direction={sortDir} onSort={onSort} />
                  <SortableTH label="Date" sortKey="createdAt" activeKey={sortBy} direction={sortDir} onSort={onSort} />
                  <TH>Customer</TH>
                  <TH>Channel</TH>
                  <TH>Payment</TH>
                  <TH>Status</TH>
                  <SortableTH label="Total" sortKey="total" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                </TR>
              </THead>
              <TBody>
                {data.items.map((o) => (
                  <TR key={o.id}>
                    <TD>
                      <Link href={`/dashboard/orders/${o.id}`} className="font-medium text-foreground hover:text-primary">
                        {o.number}
                      </Link>
                      <p className="text-xs text-muted-foreground">{o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
                    </TD>
                    <TD className="whitespace-nowrap text-muted-foreground">{formatDate(o.createdAt, "short")}</TD>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={o.customerName} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{o.customerName}</p>
                          <p className="truncate text-xs text-muted-foreground">{o.customerEmail}</p>
                        </div>
                      </div>
                    </TD>
                    <TD className="text-muted-foreground">{o.channel}</TD>
                    <TD><PaymentStatusBadge status={o.paymentStatus} /></TD>
                    <TD><OrderStatusBadge status={o.status} /></TD>
                    <TD className="text-right font-medium">{formatCurrency(o.total)}</TD>
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
