"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { routeTitles } from "@/config/navigation";

function titleFor(segment: string, path: string) {
  return routeTitles[path] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const allSegments = pathname.split("/").filter(Boolean);
  // "Home" already points at /dashboard, so drop the leading dashboard segment
  // to avoid a redundant Home › Dashboard crumb.
  const segments = allSegments[0] === "dashboard" ? allSegments.slice(1) : allSegments;

  const crumbs = segments.map((seg, i) => {
    const path = "/dashboard/" + segments.slice(0, i + 1).join("/");
    const isId = /^(prod|order|cust)_/.test(seg) || /^\d+$/.test(seg);
    return { label: isId ? "Details" : titleFor(seg, path), path, isLast: i === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
        Home
      </Link>
      {crumbs.map((c) => (
        <span key={c.path} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          {c.isLast ? (
            <span className="font-medium text-foreground">{c.label}</span>
          ) : (
            <Link href={c.path} className="text-muted-foreground hover:text-foreground">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
