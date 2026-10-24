import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Max-width page container used across all marketing sections. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/** Small uppercase label above section headings. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-wider text-blue-600",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Centered (or left) section heading + optional description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
  );
}

type LinkButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type LinkButtonSize = "md" | "lg";

const linkButtonVariants: Record<LinkButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
  outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
};

const linkButtonSizes: Record<LinkButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/** Anchor styled like a button — used for marketing CTAs. */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        linkButtonVariants[variant],
        linkButtonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
