"use client";

import Link from "next/link";
import { ArrowUpRight, Download, Plus } from "lucide-react";
import { getDashboard } from "@/features/dashboard/api";
import { useAsyncData } from "@/hooks/use-async-data";
import { PageHeader } from "@/components/ui/page-header";
import { KpiCard } from "@/components/ui/kpi-card";
import { KpiCardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/states";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { ProductThumb } from "@/components/ui/avatar";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PRIMARY, SUCCESS } from "@/components/charts/palette";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export function DashboardView() {
  const { data, loading, error, reload } = useAsyncData(() => getDashboard(), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's how your store is performing today."
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              New product
            </Button>
          </>
        }
      />

      {error ? (
        <Card>
          <ErrorState onRetry={reload} />
        </Card>
      ) : (
        <>
          {/* KPI grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {loading || !data
              ? Array.from({ length: 6 }).map((_, i) => <KpiCardSkeleton key={i} />)
              : data.metrics.map((m) => <KpiCard key={m.key} metric={m} />)}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div>
                  <CardTitle>Revenue &amp; orders</CardTitle>
                  <CardDescription>Last 14 days</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {loading || !data ? (
                  <ChartSkeleton />
                ) : (
                  <AreaChart
                    height={260}
                    valueFormatter={(v) => formatCurrency(v, { compact: true })}
                    series={[
                      { name: "Revenue", color: PRIMARY, points: data.revenueTrend },
                      { name: "Orders", color: SUCCESS, points: data.ordersTrend.map((p) => ({ date: p.date, value: p.value * 100 })) },
                    ]}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Sales by channel</CardTitle>
                  <CardDescription>This month</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {loading || !data ? (
                  <ChartSkeleton />
                ) : (
                  <DonutChart
                    data={data.salesByChannel}
                    centerLabel="Revenue"
                    valueFormatter={(v) => formatCurrency(v, { compact: true })}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tables row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent orders</CardTitle>
                <Link href="/dashboard/orders" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  View all <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-2">
                {loading || !data ? (
                  <TableSkeleton rows={5} cols={4} />
                ) : (
                  <Table>
                    <THead>
                      <TR className="hover:bg-transparent">
                        <TH>Order</TH>
                        <TH>Customer</TH>
                        <TH>Status</TH>
                        <TH className="text-right">Total</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {data.recentOrders.map((o) => (
                        <TR key={o.id}>
                          <TD>
                            <Link href={`/dashboard/orders/${o.id}`} className="font-medium text-foreground hover:text-primary">
                              {o.number}
                            </Link>
                            <p className="text-xs text-muted-foreground">{formatDate(o.createdAt, "short")}</p>
                          </TD>
                          <TD className="text-muted-foreground">{o.customerName}</TD>
                          <TD><OrderStatusBadge status={o.status} /></TD>
                          <TD className="text-right font-medium">{formatCurrency(o.total)}</TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top products</CardTitle>
                <Link href="/dashboard/products" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  View all <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </CardHeader>
              <CardContent className="pt-2">
                {loading || !data ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-10 skeleton-shimmer rounded-md bg-muted" />
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {data.topProducts.map((p, i) => (
                      <li key={p.id} className="flex items-center gap-3 rounded-lg px-1 py-2">
                        <span className="w-4 text-sm font-medium text-muted-foreground">{i + 1}</span>
                        <ProductThumb emoji={p.imageEmoji} color={p.imageColor} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{formatNumber(p.unitsSold)} sold</p>
                        </div>
                        <span className="text-sm font-medium text-foreground">{formatCurrency(p.revenue, { compact: true })}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
