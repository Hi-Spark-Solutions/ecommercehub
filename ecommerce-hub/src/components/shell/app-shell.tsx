"use client";

import * as React from "react";
import { Sidebar } from "@/components/shell/sidebar";
import { Header } from "@/components/shell/header";
import { useAsyncData } from "@/hooks/use-async-data";
import { dataAdapter } from "@/data";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { data: user } = useAsyncData(() => dataAdapter.getCurrentUser(), []);
  const { data: workspaces } = useAsyncData(() => dataAdapter.getWorkspaces(), []);
  const { data: notifications } = useAsyncData(() => dataAdapter.getNotifications(), []);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 w-64 animate-slide-in-right">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <Header
          onOpenSidebar={() => setMobileOpen(true)}
          workspaces={workspaces ?? []}
          user={user}
          notifications={notifications ?? []}
        />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
