"use client";

import * as React from "react";
import { Radio, RefreshCw } from "lucide-react";
import { getIntegrations } from "@/features/integrations/api";
import { useAsyncData } from "@/hooks/use-async-data";
import type { Integration } from "@/data/types";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IntegrationStatusBadge } from "@/components/ui/status-badge";
import { Skeleton, TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { formatRelativeTime, formatNumber, cn } from "@/lib/utils";

function isConnectedChannel(i: Integration) {
  return i.status === "connected" || i.status === "syncing" || i.status === "error";
}

function IntegrationLogo({ integration }: { integration: Integration }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
      style={{ backgroundColor: integration.logoColor }}
    >
      {integration.logoInitials}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
    </Card>
  );
}

function SyncHealthBar({ health }: { health?: number }) {
  if (typeof health !== "number") {
    return <span className="text-sm text-muted-foreground">—</span>;
  }
  const color = health >= 90 ? "bg-success" : health >= 60 ? "bg-warning" : "bg-danger";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${health}%` }} />
      </div>
      <span className="text-sm tabular-nums text-foreground">{health}%</span>
    </div>
  );
}

export function ChannelsView() {
  const { data, loading, error, reload } = useAsyncData(() => getIntegrations(), []);
  const { toast } = useToast();

  const channels = React.useMemo(() => (data ?? []).filter(isConnectedChannel), [data]);

  const summary = React.useMemo(() => {
    const products = channels.reduce((sum, c) => sum + (c.productsSynced ?? 0), 0);
    const orders = channels.reduce((sum, c) => sum + (c.ordersSynced ?? 0), 0);
    const healthValues = channels.map((c) => c.syncHealth).filter((h): h is number => typeof h === "number");
    const avgHealth = healthValues.length
      ? Math.round(healthValues.reduce((s, h) => s + h, 0) / healthValues.length)
      : 0;
    return { active: channels.length, products, orders, avgHealth };
  }, [channels]);

  const handleSync = (channel: Integration) => {
    toast({ title: `Syncing ${channel.name}`, description: "A manual sync has been queued.", tone: "info" });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Connected Channels"
        description="Monitor sync health and activity across your live sales channels."
      />

      {error ? (
        <Card>
          <ErrorState onRetry={reload} />
        </Card>
      ) : loading ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-3 h-7 w-20" />
              </Card>
            ))}
          </div>
          <Card>
            <TableSkeleton rows={5} cols={6} />
          </Card>
        </>
      ) : channels.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Radio className="h-6 w-6" />}
            title="No connected channels"
            description="Once you connect a store platform or marketplace, its sync activity will appear here."
          />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active channels" value={formatNumber(summary.active)} />
            <StatCard label="Products synced" value={formatNumber(summary.products)} />
            <StatCard label="Orders synced" value={formatNumber(summary.orders)} />
            <StatCard label="Avg sync health" value={`${summary.avgHealth}%`} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Live channels</CardTitle>
            </CardHeader>
            <div className="pt-2">
              <Table>
                <THead>
                  <TR className="hover:bg-transparent">
                    <TH>Channel</TH>
                    <TH>Category</TH>
                    <TH>Status</TH>
                    <TH>Last sync</TH>
                    <TH>Sync health</TH>
                    <TH className="text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {channels.map((channel) => (
                    <TR key={channel.id}>
                      <TD>
                        <div className="flex items-center gap-3">
                          <IntegrationLogo integration={channel} />
                          <span className="font-medium text-foreground">{channel.name}</span>
                        </div>
                      </TD>
                      <TD className="text-muted-foreground">{channel.category}</TD>
                      <TD>
                        <IntegrationStatusBadge status={channel.status} />
                      </TD>
                      <TD className="whitespace-nowrap text-muted-foreground">
                        {channel.lastSync ? formatRelativeTime(channel.lastSync) : "—"}
                      </TD>
                      <TD>
                        <SyncHealthBar health={channel.syncHealth} />
                      </TD>
                      <TD className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<RefreshCw className="h-4 w-4" />}
                          onClick={() => handleSync(channel)}
                        >
                          Sync now
                        </Button>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
