"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSeparator, DropdownLabel } from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/data/types";
import { cn } from "@/lib/utils";

export function WorkspaceSwitcher({ workspaces }: { workspaces: Workspace[] }) {
  const [current, setCurrent] = React.useState(0);
  const active = workspaces[current];
  if (!active) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-sm transition-colors hover:bg-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-semibold text-white" style={{ backgroundColor: active.logoColor }}>
            {active.initials}
          </span>
          <span className="hidden max-w-[130px] truncate font-medium sm:block">{active.name}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownTrigger>
      <DropdownMenu align="start" className="min-w-[240px]">
        <DropdownLabel>Workspaces</DropdownLabel>
        {workspaces.map((ws, i) => (
          <DropdownItem key={ws.id} onClick={() => setCurrent(i)}>
            <span className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-semibold text-white" style={{ backgroundColor: ws.logoColor }}>
              {ws.initials}
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium">{ws.name}</span>
              <span className="block text-xs text-muted-foreground">{ws.plan} plan</span>
            </span>
            <Check className={cn("h-4 w-4 text-primary", i === current ? "opacity-100" : "opacity-0")} />
          </DropdownItem>
        ))}
        <DropdownSeparator />
        <DropdownItem icon={<Plus className="h-4 w-4" />}>Create workspace</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
