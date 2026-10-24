"use client";

import { Menu, Moon, Search, Sun } from "lucide-react";
import { Breadcrumbs } from "@/components/shell/breadcrumbs";
import { WorkspaceSwitcher } from "@/components/shell/workspace-switcher";
import { NotificationsMenu } from "@/components/shell/notifications-menu";
import { UserMenu } from "@/components/shell/user-menu";
import { useTheme } from "@/components/shell/theme-provider";
import type { CurrentUser, NotificationItem, Workspace } from "@/data/types";

export function Header({
  onOpenSidebar,
  workspaces,
  user,
  notifications,
}: {
  onOpenSidebar: () => void;
  workspaces: Workspace[];
  user: CurrentUser | null;
  notifications: NotificationItem[];
}) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <button onClick={onOpenSidebar} className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block">
        <Breadcrumbs />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search…"
            className="h-9 w-48 rounded-lg border border-input bg-card pl-9 pr-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-64"
          />
        </div>

        {workspaces.length > 0 && <WorkspaceSwitcher workspaces={workspaces} />}

        <button
          onClick={toggle}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
        </button>

        <NotificationsMenu notifications={notifications} />

        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}
