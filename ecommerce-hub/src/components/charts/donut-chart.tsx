"use client";

import * as React from "react";
import { CHART_COLORS } from "@/components/charts/palette";

interface Slice {
  label: string;
  value: number;
}

/** Donut chart with an interactive legend. Pure SVG. */
export function DonutChart({
  data,
  valueFormatter = (v) => v.toLocaleString(),
  centerLabel,
}: {
  data: Slice[];
  valueFormatter?: (value: number) => string;
  centerLabel?: string;
}) {
  const [active, setActive] = React.useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = 60;
  const stroke = 22;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const segments = data.map((d, i) => {
    const fraction = d.value / total;
    const seg = {
      color: CHART_COLORS[i % CHART_COLORS.length],
      dash: fraction * circumference,
      offset,
      label: d.label,
      value: d.value,
      fraction,
    };
    offset += fraction * circumference;
    return seg;
  });

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative h-[168px] w-[168px] shrink-0">
        <svg viewBox="0 0 168 168" className="h-full w-full -rotate-90">
          <circle cx="84" cy="84" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
          {segments.map((s, i) => (
            <circle
              key={i}
              cx="84"
              cy="84"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={active === null || active === i ? stroke : stroke - 6}
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
              strokeLinecap="butt"
              className="transition-all"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-semibold text-foreground">
            {active === null ? valueFormatter(total) : valueFormatter(segments[active].value)}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {active === null ? centerLabel ?? "Total" : segments[active].label}
          </span>
        </div>
      </div>
      <ul className="flex w-full flex-col gap-2">
        {segments.map((s, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-3 text-sm"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="font-medium text-foreground">
              {(s.fraction * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
