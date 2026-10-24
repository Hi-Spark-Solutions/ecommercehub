import { CHART_COLORS } from "@/components/charts/palette";
import { cn } from "@/lib/utils";

interface Row {
  label: string;
  value: number;
}

/** Ranked horizontal bar list — good for channels, sources, categories. */
export function HorizontalBars({
  data,
  valueFormatter = (v) => v.toLocaleString(),
  colorMode = "single",
  className,
}: {
  data: Row[];
  valueFormatter?: (value: number) => string;
  colorMode?: "single" | "multi";
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className={cn("flex flex-col gap-3.5", className)}>
      {data.map((d, i) => (
        <li key={d.label} className="grid grid-cols-[minmax(90px,140px)_1fr_auto] items-center gap-3 text-sm">
          <span className="truncate text-muted-foreground">{d.label}</span>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: colorMode === "multi" ? CHART_COLORS[i % CHART_COLORS.length] : "hsl(var(--primary))",
              }}
            />
          </div>
          <span className="text-right font-medium tabular-nums text-foreground">{valueFormatter(d.value)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Funnel visualization for conversion steps. */
export function Funnel({
  steps,
  className,
}: {
  steps: { label: string; value: number }[];
  className?: string;
}) {
  const top = steps[0]?.value || 1;
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {steps.map((s, i) => {
        const pct = (s.value / top) * 100;
        const conv = i === 0 ? 100 : (s.value / steps[i - 1].value) * 100;
        return (
          <li key={s.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{s.label}</span>
              <span className="font-medium text-foreground">
                {s.value.toLocaleString()}{" "}
                <span className="text-xs font-normal text-muted-foreground">({conv.toFixed(0)}%)</span>
              </span>
            </div>
            <div className="h-8 w-full overflow-hidden rounded-md bg-muted">
              <div
                className="flex h-full items-center rounded-md"
                style={{ width: `${pct}%`, backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
