"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { LinkButton } from "@/components/marketing/primitives";
import { headerLinks, solutionsMenu, productMenu, type MenuItem } from "@/config/marketing-nav";
import { cn } from "@/lib/utils";

function MegaPanel({ items, columns = 2 }: { items: MenuItem[]; columns?: 1 | 2 }) {
  return (
    <div
      className={cn(
        "grid gap-1 p-3",
        columns === 2 ? "grid-cols-2" : "grid-cols-1"
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                {item.description}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function MarketingHeader() {
  const [openMenu, setOpenMenu] = React.useState<"solutions" | "product" | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSection, setMobileSection] = React.useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {headerLinks.map((link) => {
            if (link.megaMenu) {
              const active = openMenu === link.megaMenu;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.megaMenu!)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-blue-600" : "text-slate-700 hover:text-slate-900"
                    )}
                    aria-expanded={active}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", active && "rotate-180")}
                    />
                  </Link>
                  {active && (
                    <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2">
                      <div className="animate-fade-in overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                        <MegaPanel items={link.megaMenu === "solutions" ? solutionsMenu : productMenu} />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
          >
            Login
          </Link>
          <LinkButton href="/signup" size="md">
            Get Started
          </LinkButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-slate-700 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4">
            <nav className="space-y-1">
              {headerLinks.map((link) => {
                if (link.megaMenu) {
                  const items = link.megaMenu === "solutions" ? solutionsMenu : productMenu;
                  const expanded = mobileSection === link.label;
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileSection(expanded ? null : link.label)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-800"
                      >
                        {link.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                      </button>
                      {expanded && (
                        <div className="ml-3 border-l border-slate-200 pl-3">
                          {items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-800"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
              <LinkButton href="/login" variant="outline" onClick={() => setMobileOpen(false)}>
                Login
              </LinkButton>
              <LinkButton href="/signup" onClick={() => setMobileOpen(false)}>
                Get Started
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
