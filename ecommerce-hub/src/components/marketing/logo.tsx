import Image from "next/image";
import Link from "next/link";
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
      <Image
        src="/logo.png"
        alt="Smartify Commerce"
        width={200}
        height={50}
        priority
        className="h-10 w-auto object-contain"
      />
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