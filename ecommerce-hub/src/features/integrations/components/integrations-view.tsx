"use client";

import * as React from "react";
import { Plug, Check, Settings, RefreshCw, ExternalLink } from "lucide-react";
import { getIntegrations } from "@/features/integrations/api";
import { useAsyncData } from "@/hooks/use-async-data";
import type { Integration, IntegrationCategory } from "@/data/types";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationStatusBadge } from "@/components/ui/status-badge";
import { Tabs } from "@/components/ui/tabs";
import { SearchInput, useDebouncedValue } from "@/components/ui/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";
import { formatRelativeTime, formatNumber } from "@/lib/utils";

const CATEGORY_ORDER: IntegrationCategory[] = [
  "Marketplace",
  "Store Platform",
  "Shipping",
  "Marketing",
  "Feed",
  "Messaging",
];

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

function IntegrationCard({
  integration,
  onConnect,
  onReconnect,
  onManage,
}: {
  integration: Integration;
  onConnect: (i: Integration) => void;
  onReconnect: (i: Integration) => void;
  onManage: (i: Integration) => void;
}) {
  const { status, lastSync, productsSynced, ordersSynced } = integration;
  const showSyncMeta = (status === "connected" || status === "syncing" || status === "error") && lastSync;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex min-w-0 items-start gap-3">
          <IntegrationLogo integration={integration} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="truncate">{integration.name}</CardTitle>
              {integration.popular && <Badge tone="primary">Popular</Badge>}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{integration.category}</p>
          </div>
        </div>
        <IntegrationStatusBadge status={status} />
      </CardHeader>

      <CardContent className="flex-1 pt-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{integration.description}</p>
      </CardContent>

      <CardFooter className="justify-between">
        <div className="min-w-0 text-xs text-muted-foreground">
          {showSyncMeta ? (
            <>
              <p className="truncate">Last sync {formatRelativeTime(lastSync!)}</p>
              {(typeof productsSynced === "number" || typeof ordersSynced === "number") && (
                <p className="mt-0.5 truncate text-muted-foreground/80">
                  {typeof productsSynced === "number" && `${formatNumber(productsSynced)} products`}
                  {typeof productsSynced === "number" && typeof ordersSynced === "number" && " · "}
                  {typeof ordersSynced === "number" && `${formatNumber(ordersSynced)} orders`}
                </p>
              )}
            </>
          ) : (
            <span className="text-muted-foreground/70">Not connected yet</span>
          )}
        </div>

        <div className="shrink-0">
          {status === "not_connected" && (
            <Button size="sm" leftIcon={<Plug className="h-4 w-4" />} onClick={() => onConnect(integration)}>
              Connect
            </Button>
          )}
          {status === "connected" && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Settings className="h-4 w-4" />}
              onClick={() => onManage(integration)}
            >
              Manage
            </Button>
          )}
          {status === "error" && (
            <Button
              variant="danger"
              size="sm"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={() => onReconnect(integration)}
            >
              Reconnect
            </Button>
          )}
          {status === "syncing" && (
            <Button variant="outline" size="sm" loading disabled>
              Syncing
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export function IntegrationsView() {
  const { data, loading, error, reload } = useAsyncData(() => getIntegrations(), []);
  const { toast } = useToast();

  const [category, setCategory] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebouncedValue(search, 200);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Integration | null>(null);

  const integrations = data ?? [];

  const tabs = React.useMemo(() => {
    const present = CATEGORY_ORDER.filter((c) => integrations.some((i) => i.category === c));
    return [
      { value: "all", label: "All", count: integrations.length },
      ...present.map((c) => ({
        value: c,
        label: c,
        count: integrations.filter((i) => i.category === c).length,
      })),
    ];
  }, [integrations]);

  const filtered = React.useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return integrations.filter((i) => {
      const matchesCategory = category === "all" || i.category === category;
      const matchesSearch = !q || i.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [integrations, category, debouncedSearch]);

  const openConnect = (integration: Integration) => {
    setSelected(integration);
    setDialogOpen(true);
  };

  const handleConfirmConnect = () => {
    if (selected) {
      toast({ title: `Connected ${selected.name}`, description: "The integration is now syncing.", tone: "success" });
    }
  };

  const handleReconnect = (integration: Integration) => {
    toast({ title: `Reconnecting ${integration.name}`, description: "We're re-establishing the connection.", tone: "info" });
  };

  const handleManage = (integration: Integration) => {
    toast({ title: `Manage ${integration.name}`, description: "Integration settings would open here.", tone: "info" });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect your store platforms, marketplaces and tools."
      />

      {error ? (
        <Card>
          <ErrorState onRetry={reload} />
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs tabs={tabs} value={category} onValueChange={setCategory} className="min-w-0 flex-1 overflow-x-auto" />
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search integrations…"
              className="w-full lg:w-72"
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <Card>
              <EmptyState
                icon={<ExternalLink className="h-6 w-6" />}
                title="No integrations found"
                description="Try a different category or adjust your search to find what you're looking for."
              />
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={openConnect}
                  onReconnect={handleReconnect}
                  onManage={handleManage}
                />
              ))}
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmConnect}
        tone="primary"
        confirmLabel="Connect"
        title={selected ? `Connect ${selected.name}?` : "Connect integration?"}
        description={
          selected
            ? `You'll be redirected to authorize access and start syncing data from ${selected.name}.`
            : undefined
        }
      />
    </div>
  );
}
