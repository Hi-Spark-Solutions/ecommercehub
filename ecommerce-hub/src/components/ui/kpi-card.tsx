import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { MetricCard } from "@/data/types";

function formatValue(metric: MetricCard) {
  if (metric.format === "currency") return formatCurrency(metric.value, { compact: metric.value >= 100000 });
  if (metric.format === "percent") return formatPercent(metric.value);
  return formatNumber(metric.value);
}

export function KpiCard({ metric }: { metric: MetricCard }) {
  const positive = metric.deltaPct >= 0;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {formatValue(metric)}
          </p>
        </div>
        <div className="h-9 w-20">
          <Sparkline data={metric.trend.map((t) => t.value)} positive={positive} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
            positive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {formatPercent(Math.abs(metric.deltaPct))}
        </span>
        <span className="text-muted-foreground">vs last period</span>
      </div>
    </Card>
  );
}
