"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(DropdownContext)!;
  return (
    <div onClick={() => ctx.setOpen(!ctx.open)} className="cursor-pointer">
      {children}
    </div>
  );
}

export function DropdownMenu({
  children,
  align = "end",
  className,
}: {
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const ctx = React.useContext(DropdownContext)!;
  if (!ctx.open) return null;
  return (
    <div
      className={cn(
        "absolute z-40 mt-2 min-w-[200px] animate-slide-up rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      role="menu"
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  icon,
  danger,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  className?: string;
}) {
  const ctx = React.useContext(DropdownContext)!;
  return (
    <button
      role="menuitem"
      onClick={() => {
        onClick?.();
        ctx.setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted",
        danger ? "text-danger hover:bg-danger/10" : "text-foreground",
        className
      )}
    >
      {icon && <span className="shrink-0 text-muted-foreground">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">{children}</div>;
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-border" />;
}
