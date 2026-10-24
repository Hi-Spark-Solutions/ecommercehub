"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { getAnalytics } from "@/features/analytics/api";
import { useAsyncData } from "@/hooks/use-async-data";
import { PageHeader } from "@/components/ui/page-header";
import { KpiCard } from "@/components/ui/kpi-card";
import { KpiCardSkeleton, ChartSkeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ErrorState } from "@/components/ui/states";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { HorizontalBars, Funnel } from "@/components/charts/horizontal-bars";
import { PRIMARY } from "@/components/charts/palette";
import { formatCurrency } from "@/lib/utils";

const RANGE_OPTIONS = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "This year", value: "ytd" },
];

const TARGET_COLOR = "#94a3b8";

export function AnalyticsOverview() {
  const { data, loading, error, reload } = useAsyncData(() => getAnalytics(), []);
  const [range, setRange] = React.useState("30d");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Overview"
        description="Track performance, conversion and customer retention."
        actions={
          <>
            <Select
              className="w-40"
              value={range}
              onValueChange={setRange}
              options={RANGE_OPTIONS}
            />
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {loading || !data
              ? Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
              : data.metrics.map((m) => <KpiCard key={m.key} metric={m} />)}
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div>
                  <CardTitle>Revenue vs target</CardTitle>
                  <CardDescription>Monthly revenue against goal</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PRIMARY }} />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: TARGET_COLOR }} />
                    Target
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {loading || !data ? (
                  <ChartSkeleton />
                ) : (
                  <BarChart
                    height={260}
                    labels={data.revenueVsTarget.map((d) => d.date)}
                    valueFormatter={(v) => formatCurrency(v, { compact: true })}
                    series={[
                      { name: "Revenue", color: PRIMARY, values: data.revenueVsTarget.map((d) => d.revenue) },
                      { name: "Target", color: TARGET_COLOR, values: data.revenueVsTarget.map((d) => d.target) },
                    ]}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Traffic sources</CardTitle>
                  <CardDescription>Share of sessions</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {loading || !data ? (
                  <ChartSkeleton />
                ) : (
                  <DonutChart
                    data={data.trafficSources}
                    centerLabel="Sessions"
                    valueFormatter={(v) => `${v}%`}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Conversion funnel</CardTitle>
                  <CardDescription>Sessions to purchase</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {loading || !data ? (
                  <ChartSkeleton />
                ) : (
                  <Funnel steps={data.conversionFunnel} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Sales by category</CardTitle>
                  <CardDescription>Revenue this period</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {loading || !data ? (
                  <ChartSkeleton />
                ) : (
                  <HorizontalBars
                    data={data.salesByCategory}
                    colorMode="multi"
                    valueFormatter={(v) => formatCurrency(v, { compact: true })}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Cohort retention</CardTitle>
                  <CardDescription>Repeat rate by month</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {loading || !data ? (
                  <ChartSkeleton />
                ) : (
                  <HorizontalBars data={data.cohortRetention} valueFormatter={(v) => `${v}%`} />
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
