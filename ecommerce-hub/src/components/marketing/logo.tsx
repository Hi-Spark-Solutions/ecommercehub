import Link from "next/link";
import { Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Brand logo. `variant="light"` renders white text for dark backgrounds
 * (e.g. the footer). Default renders dark text for light backgrounds.
 */
export function Logo({
  variant = "dark",
  href = "/",
  className,
}: {
  variant?: "dark" | "light";
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
        <Boxes className="h-[18px] w-[18px]" />
      </span>
      <span
        className={cn(
          "text-[17px] font-bold tracking-tight",
          variant === "light" ? "text-white" : "text-slate-900"
        )}
      >
        Smartify Commerce
      </span>
    </Link>
  );
}
