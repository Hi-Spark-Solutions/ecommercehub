"use client";

import * as React from "react";
import { Clock, Plus, Repeat, Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";
import { formatNumber } from "@/lib/utils";

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  runs: number;
  category: string;
}

const initialWorkflows: Workflow[] = [
  {
    id: "wf_order_confirmation",
    name: "Order confirmation email",
    description: "Send customers a branded receipt the moment their order is placed.",
    trigger: "New order created",
    action: "Send confirmation email",
    enabled: true,
    runs: 4821,
    category: "Orders",
  },
  {
    id: "wf_low_stock",
    name: "Low-stock reorder alert",
    description: "Notify the ops team when inventory falls below the reorder point.",
    trigger: "Stock below threshold",
    action: "Alert #inventory channel",
    enabled: true,
    runs: 312,
    category: "Inventory",
  },
  {
    id: "wf_abandoned_cart",
    name: "Abandoned cart recovery",
    description: "Win back shoppers with a reminder and a 10% off nudge after 4 hours.",
    trigger: "Cart abandoned 4h",
    action: "Send recovery email",
    enabled: true,
    runs: 1284,
    category: "Marketing",
  },
  {
    id: "wf_welcome_series",
    name: "New customer welcome series",
    description: "A three-part onboarding sequence introducing your best-selling collections.",
    trigger: "First order completed",
    action: "Enroll in welcome series",
    enabled: false,
    runs: 968,
    category: "Marketing",
  },
  {
    id: "wf_vip_tag",
    name: "VIP tag on $1k+ spend",
    description: "Automatically tag high-value customers so they unlock priority perks.",
    trigger: "Lifetime spend over $1,000",
    action: "Add VIP customer tag",
    enabled: true,
    runs: 147,
    category: "Customers",
  },
  {
    id: "wf_refund_restock",
    name: "Refund → restock inventory",
    description: "Return refunded units to available stock without any manual counting.",
    trigger: "Refund issued",
    action: "Restock inventory",
    enabled: false,
    runs: 526,
    category: "Inventory",
  },
];

export function AutomationView() {
  const { toast } = useToast();
  const [workflows, setWorkflows] = React.useState<Workflow[]>(initialWorkflows);

  const activeCount = workflows.filter((w) => w.enabled).length;
  const totalRuns = workflows.reduce((sum, w) => sum + w.runs, 0);

  const stats = [
    { label: "Active workflows", value: `${activeCount}` },
    { label: "Total runs this month", value: formatNumber(totalRuns) },
    { label: "Time saved", value: "42 hrs" },
  ];

  const handleToggle = (id: string, next: boolean) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? { ...w, enabled: next } : w)));
    const workflow = workflows.find((w) => w.id === id);
    toast({
      title: next ? "Workflow activated" : "Workflow paused",
      description: workflow ? `“${workflow.name}” is now ${next ? "active" : "paused"}.` : undefined,
      tone: next ? "success" : "info",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Automation"
        description="Automate repetitive tasks with triggers and actions."
        actions={
          <Button
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() =>
              toast({
                title: "Create workflow",
                description: "The workflow builder is coming soon.",
                tone: "info",
              })
            }
          >
            Create workflow
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardContent className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Zap className="h-5 w-5" />
              </span>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{workflow.name}</p>
                  <Badge tone="neutral">{workflow.category}</Badge>
                  <Badge tone={workflow.enabled ? "success" : "neutral"} dot>
                    {workflow.enabled ? "Active" : "Paused"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{workflow.description}</p>

                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    When <span className="font-medium text-foreground">{workflow.trigger}</span> →{" "}
                    <span className="font-medium text-foreground">{workflow.action}</span>
                  </span>
                </p>

                <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Repeat className="h-3.5 w-3.5" />
                    {formatNumber(workflow.runs)} runs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Updated recently
                  </span>
                </div>
              </div>

              <Switch
                checked={workflow.enabled}
                onCheckedChange={(next) => handleToggle(workflow.id, next)}
                label={`Toggle ${workflow.name}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
