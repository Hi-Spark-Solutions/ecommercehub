"use client";

import * as React from "react";

interface BarSeries {
  name: string;
  color: string;
  values: number[];
}

/** Grouped vertical bar chart. Pure SVG. */
export function BarChart({
  labels,
  series,
  height = 260,
  valueFormatter = (v) => v.toLocaleString(),
}: {
  labels: string[];
  series: BarSeries[];
  height?: number;
  valueFormatter?: (value: number) => string;
}) {
  const [hover, setHover] = React.useState<number | null>(null);
  const width = 640;
  const padX = 16;
  const padTop = 16;
  const padBottom = 28;
  const innerH = height - padTop - padBottom;
  const innerW = width - padX * 2;
  const max = Math.max(...series.flatMap((s) => s.values), 1);
  const groupW = innerW / labels.length;
  const barGap = 4;
  const barW = (groupW - barGap * (series.length + 1)) / series.length;

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" onMouseLeave={() => setHover(null)}>
        {Array.from({ length: 5 }).map((_, i) => {
          const gy = padTop + (i / 4) * innerH;
          return <line key={i} x1={padX} y1={gy} x2={width - padX} y2={gy} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 4" />;
        })}
        {labels.map((_, li) => {
          const gx = padX + li * groupW;
          return (
            <g key={li} onMouseEnter={() => setHover(li)}>
              <rect x={gx} y={padTop} width={groupW} height={innerH} fill={hover === li ? "hsl(var(--muted))" : "transparent"} opacity="0.5" />
              {series.map((s, si) => {
                const v = s.values[li];
                const h = (v / max) * innerH;
                const bx = gx + barGap + si * (barW + barGap);
                return (
                  <rect
                    key={si}
                    x={bx}
                    y={padTop + innerH - h}
                    width={Math.max(barW, 2)}
                    height={h}
                    rx="3"
                    fill={s.color}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
      <div className="mt-1 flex px-4 text-[10px] text-muted-foreground">
        {labels.map((l, i) => (
          <span key={i} className="flex-1 text-center">
            {l}
          </span>
        ))}
      </div>
      {hover !== null && (
        <div className="pointer-events-none absolute left-2 top-2 rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
          <p className="font-medium text-foreground">{labels[hover]}</p>
          {series.map((s) => (
            <p key={s.name} className="mt-1 flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              {s.name}: <span className="font-medium text-foreground">{valueFormatter(s.values[hover])}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
