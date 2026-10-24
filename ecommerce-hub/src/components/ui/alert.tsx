import * as React from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "success" | "warning" | "danger";

const config: Record<Tone, { icon: React.ReactNode; classes: string }> = {
  info: { icon: <Info className="h-4 w-4" />, classes: "border-sky-500/30 bg-sky-500/5 text-sky-700 dark:text-sky-300" },
  success: { icon: <CheckCircle2 className="h-4 w-4" />, classes: "border-success/30 bg-success/5 text-success" },
  warning: { icon: <TriangleAlert className="h-4 w-4" />, classes: "border-warning/40 bg-warning/5 text-warning" },
  danger: { icon: <AlertCircle className="h-4 w-4" />, classes: "border-danger/30 bg-danger/5 text-danger" },
};

export function Alert({
  tone = "info",
  title,
  children,
  className,
  action,
}: {
  tone?: Tone;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  const { icon, classes } = config[tone];
  return (
    <div className={cn("flex items-start gap-3 rounded-lg border px-4 py-3 text-sm", classes, className)}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className={cn("text-foreground/80", title && "mt-0.5")}>{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
