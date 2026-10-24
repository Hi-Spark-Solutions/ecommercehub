"use client";

import * as React from "react";
import Link from "next/link";
import { Download, UserPlus, Users } from "lucide-react";
import { getCustomers } from "@/features/customers/api";
import { useAsyncData } from "@/hooks/use-async-data";
import type { CustomerFilters, CustomerSegment } from "@/data/types";
import { PageHeader, TableToolbar } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchInput, useDebouncedValue } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";
import { Table, THead, TBody, TR, TH, TD, SortableTH } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Avatar } from "@/components/ui/avatar";
import { SegmentBadge } from "@/components/ui/status-badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

const segmentTabs = [
  { value: "all", label: "All" },
  { value: "vip", label: "VIP" },
  { value: "returning", label: "Returning" },
  { value: "new", label: "New" },
  { value: "at_risk", label: "At risk" },
];

export function CustomersView() {
  const [search, setSearch] = React.useState("");
  const [segment, setSegment] = React.useState<CustomerSegment | "all">("all");
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("totalSpend");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const debouncedSearch = useDebouncedValue(search);

  const filters: CustomerFilters = React.useMemo(
    () => ({ search: debouncedSearch, segment, page, sortBy, sortDir, pageSize: 10 }),
    [debouncedSearch, segment, page, sortBy, sortDir]
  );

  const { data, loading, error, reload } = useAsyncData(() => getCustomers(filters), [filters]);

  React.useEffect(() => setPage(1), [debouncedSearch, segment]);

  const onSort = (key: string) => {
    if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Understand and segment the people buying from your store."
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
            <Button size="sm" leftIcon={<UserPlus className="h-4 w-4" />}>Add customer</Button>
          </>
        }
      />

      <Card className="overflow-hidden">
        <div className="px-4 pt-2">
          <Tabs tabs={segmentTabs} value={segment} onValueChange={(v) => setSegment(v as CustomerSegment | "all")} />
        </div>

        <TableToolbar>
          <SearchInput value={search} onChange={setSearch} placeholder="Search name, email…" className="w-full sm:w-72" />
        </TableToolbar>

        {error ? (
          <ErrorState onRetry={reload} />
        ) : loading || !data ? (
          <TableSkeleton rows={10} cols={6} />
        ) : data.items.length === 0 ? (
          <EmptyState icon={<Users className="h-6 w-6" />} title="No customers found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <Table>
              <THead>
                <TR className="hover:bg-transparent">
                  <SortableTH label="Customer" sortKey="name" activeKey={sortBy} direction={sortDir} onSort={onSort} />
                  <TH>Segment</TH>
                  <TH>Location</TH>
                  <SortableTH label="Orders" sortKey="ordersCount" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                  <SortableTH label="Total spent" sortKey="totalSpend" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                  <SortableTH label="Last order" sortKey="lastOrderAt" activeKey={sortBy} direction={sortDir} onSort={onSort} align="right" />
                </TR>
              </THead>
              <TBody>
                {data.items.map((c) => (
                  <TR key={c.id}>
                    <TD>
                      <Link href={`/dashboard/customers/${c.id}`} className="flex items-center gap-2.5 group">
                        <Avatar name={c.name} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">{c.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </Link>
                    </TD>
                    <TD><SegmentBadge segment={c.segment} /></TD>
                    <TD className="text-muted-foreground">{c.location}</TD>
                    <TD className="text-right">{formatNumber(c.ordersCount)}</TD>
                    <TD className="text-right font-medium">{formatCurrency(c.totalSpend)}</TD>
                    <TD className="whitespace-nowrap text-right text-muted-foreground">{formatDate(c.lastOrderAt, "short")}</TD>
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
