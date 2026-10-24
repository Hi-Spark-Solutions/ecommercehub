"use client";

import * as React from "react";
import { Bell, Package, Boxes, Plug, Info } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu } from "@/components/ui/dropdown-menu";
import type { NotificationItem } from "@/data/types";
import { cn, formatRelativeTime } from "@/lib/utils";

const iconFor = {
  order: Package,
  inventory: Boxes,
  integration: Plug,
  system: Info,
} as const;

export function NotificationsMenu({ notifications }: { notifications: NotificationItem[] }) {
  const [items, setItems] = React.useState(notifications);
  const unread = items.filter((n) => !n.read).length;

  React.useEffect(() => setItems(notifications), [notifications]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-danger-foreground">
              {unread}
            </span>
          )}
        </button>
      </DropdownTrigger>
      <DropdownMenu className="w-[340px] p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-semibold">Notifications</span>
          <button
            onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
            className="text-xs font-medium text-primary hover:underline"
          >
            Mark all read
          </button>
        </div>
        <ul className="max-h-[360px] overflow-y-auto">
          {items.map((n) => {
            const Icon = iconFor[n.type];
            return (
              <li key={n.id} className={cn("flex gap-3 border-b border-border px-4 py-3 last:border-0", !n.read && "bg-accent/40")}>
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">{formatRelativeTime(n.timestamp)}</p>
                </div>
                {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border px-4 py-2.5 text-center">
          <button className="text-xs font-medium text-primary hover:underline">View all</button>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
