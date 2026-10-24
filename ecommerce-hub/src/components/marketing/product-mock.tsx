import { Boxes, LayoutDashboard, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Self-contained, static mock of the application UI used in marketing
 * sections. Pure CSS/markup — no images, no data — so it renders instantly
 * and offline while still communicating what the product looks like.
 */
export function ProductMock({ className }: { className?: string }) {
  const bars = [42, 58, 47, 70, 63, 82, 75, 91];
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5",
        className
      )}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <div className="ml-3 h-5 w-40 rounded bg-white ring-1 ring-slate-200" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-40 shrink-0 space-y-1 bg-slate-950 p-3 sm:block">
          {[LayoutDashboard, Package, ShoppingCart, Boxes].map((Icon, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium",
                i === 0 ? "bg-blue-600 text-white" : "text-slate-400"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="h-2 w-14 rounded bg-current opacity-70" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 p-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Revenue", value: "$48.2k", up: "+12%" },
              { label: "Orders", value: "1,284", up: "+8%" },
              { label: "Customers", value: "3,912", up: "+5%" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-lg border border-slate-200 p-3">
                <p className="text-[10px] font-medium text-slate-500">{kpi.label}</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{kpi.value}</p>
                <p className="mt-0.5 flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                  <TrendingUp className="h-3 w-3" /> {kpi.up}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <div className="mb-3 h-2 w-24 rounded bg-slate-200" />
            <div className="flex h-24 items-end gap-2">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-t",
                    i === bars.length - 1 ? "bg-blue-600" : "bg-blue-200"
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-slate-200 p-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-slate-100" />
                <div className="h-2 flex-1 rounded bg-slate-100" />
                <div className="h-2 w-12 rounded bg-slate-100" />
                <div className="h-4 w-14 rounded-full bg-blue-50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
