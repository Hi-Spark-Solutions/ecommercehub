"use client";

import * as React from "react";
import { CheckCircle2, Info, X, AlertCircle, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastTone = "info" | "success" | "warning" | "danger";
interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  toast: (t: Omit<Toast, "id">) => void;
}
const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const icons: Record<ToastTone, React.ReactNode> = {
  info: <Info className="h-5 w-5 text-sky-500" />,
  success: <CheckCircle2 className="h-5 w-5 text-success" />,
  warning: <TriangleAlert className="h-5 w-5 text-warning" />,
  danger: <AlertCircle className="h-5 w-5 text-danger" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const counter = React.useRef(0);

  const remove = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (t: Omit<Toast, "id">) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => remove(id), 4000);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex animate-slide-up items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-lg"
            role="status"
          >
            <span className="mt-0.5 shrink-0">{icons[t.tone]}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{t.title}</p>
              {t.description && <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>}
            </div>
            <button
              onClick={() => remove(t.id)}
              className={cn("shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground")}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
