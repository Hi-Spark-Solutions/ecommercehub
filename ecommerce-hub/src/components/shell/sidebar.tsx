"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, X } from "lucide-react";
import { navSections } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onNavigate}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-white">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Ecommerce Hub</span>
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="rounded-md p-1 text-sidebar-muted hover:text-white lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navSections.map((section, i) => (
          <div key={i}>
            {section.title && (
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-sidebar-accent text-white"
                          : "text-sidebar-muted hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-white" : "text-sidebar-muted group-hover:text-white")} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                          active ? "bg-white/20 text-white" : "bg-sidebar-accent/80 text-white"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs font-medium text-white">Growth plan</p>
          <p className="mt-0.5 text-[11px] text-sidebar-muted">72% of monthly orders used</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-sidebar-accent" style={{ width: "72%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
