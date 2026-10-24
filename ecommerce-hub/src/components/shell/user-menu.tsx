"use client";

import { LogOut, Settings, User, CreditCard, LifeBuoy } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import type { CurrentUser } from "@/data/types";

export function UserMenu({ user }: { user: CurrentUser }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted" aria-label="Account menu">
          <Avatar name={user.name} size="sm" />
        </button>
      </DropdownTrigger>
      <DropdownMenu className="min-w-[220px]">
        <div className="flex items-center gap-3 px-2.5 py-2">
          <Avatar name={user.name} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownSeparator />
        <DropdownItem icon={<User className="h-4 w-4" />}>Profile</DropdownItem>
        <DropdownItem icon={<Settings className="h-4 w-4" />}>Settings</DropdownItem>
        <DropdownItem icon={<CreditCard className="h-4 w-4" />}>Billing</DropdownItem>
        <DropdownItem icon={<LifeBuoy className="h-4 w-4" />}>Support</DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={<LogOut className="h-4 w-4" />} danger>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
