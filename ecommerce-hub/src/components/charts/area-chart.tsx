"use client";

import * as React from "react";
import { formatDate } from "@/lib/utils";

interface Series {
  name: string;
  color: string;
  points: { date: string; value: number }[];
}

/** Multi-series area/line chart with hover tooltip. Pure SVG, no deps. */
export function AreaChart({
  series,
  height = 260,
  valueFormatter = (v) => v.toLocaleString(),
}: {
  series: Series[];
  height?: number;
  valueFormatter?: (value: number) => string;
}) {
  const [hover, setHover] = React.useState<number | null>(null);
  const width = 640;
  const padX = 12;
  const padTop = 16;
  const padBottom = 28;
  const labels = series[0]?.points.map((p) => p.date) ?? [];
  const count = labels.length;
  const allValues = series.flatMap((s) => s.points.map((p) => p.value));
  const max = Math.max(...allValues, 1);
  const min = Math.min(...allValues, 0);
  const range = max - min || 1;

  const innerH = height - padTop - padBottom;
  const innerW = width - padX * 2;
  const x = (i: number) => padX + (count <= 1 ? innerW / 2 : (i / (count - 1)) * innerW);
  const y = (v: number) => padTop + innerH - ((v - min) / range) * innerH;

  const gridLines = 4;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        onMouseLeave={() => setHover(null)}
        role="img"
      >
        {/* grid */}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const gy = padTop + (i / gridLines) * innerH;
          return <line key={i} x1={padX} y1={gy} x2={width - padX} y2={gy} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 4" />;
        })}
        {series.map((s) => {
          const line = s.points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
          const area = `${line} L${x(count - 1)},${padTop + innerH} L${x(0)},${padTop + innerH} Z`;
          const gid = `grad-${s.name.replace(/\s/g, "")}`;
          return (
            <g key={s.name}>
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill={`url(#${gid})`} />
              <path d={line} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}
        {/* hover markers */}
        {hover !== null &&
          series.map((s) => (
            <circle key={s.name} cx={x(hover)} cy={y(s.points[hover].value)} r="4" fill="hsl(var(--card))" stroke={s.color} strokeWidth="2.5" />
          ))}
        {hover !== null && <line x1={x(hover)} y1={padTop} x2={x(hover)} y2={padTop + innerH} stroke="hsl(var(--border))" strokeWidth="1.5" />}
        {/* hover hit areas */}
        {labels.map((_, i) => (
          <rect
            key={i}
            x={x(i) - innerW / Math.max(count - 1, 1) / 2}
            y={0}
            width={innerW / Math.max(count - 1, 1)}
            height={height}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        ))}
      </svg>
      {/* x labels */}
      <div className="mt-1 flex justify-between px-3 text-[10px] text-muted-foreground">
        {labels.map((d, i) =>
          i % Math.ceil(count / 7) === 0 || i === count - 1 ? (
            <span key={i}>{formatDate(d, "short")}</span>
          ) : (
            <span key={i} />
          )
        )}
      </div>
      {hover !== null && (
        <div className="pointer-events-none absolute left-2 top-2 rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
          <p className="font-medium text-foreground">{formatDate(labels[hover], "medium")}</p>
          {series.map((s) => (
            <p key={s.name} className="mt-1 flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              {s.name}: <span className="font-medium text-foreground">{valueFormatter(s.points[hover].value)}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
