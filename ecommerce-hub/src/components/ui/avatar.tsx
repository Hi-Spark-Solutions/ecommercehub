import { cn, getInitials, stringToColor } from "@/lib/utils";

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-7 w-7 text-[11px]",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        sizes[size],
        className
      )}
      style={{ backgroundColor: stringToColor(name) }}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  );
}

export function ProductThumb({
  emoji,
  color,
  size = "md",
  className,
}: {
  emoji: string;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-base rounded-md",
    md: "h-10 w-10 text-lg rounded-lg",
    lg: "h-16 w-16 text-3xl rounded-xl",
  } as const;
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", sizes[size], className)}
      style={{ backgroundColor: `${color}1a`, border: `1px solid ${color}33` }}
      aria-hidden
    >
      {emoji}
    </span>
  );
}
