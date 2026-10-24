"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, onValueChange, placeholder, ...props }, ref) => {
    return (
      <div className="relative inline-flex w-full items-center">
        <select
          ref={ref}
          onChange={(e) => onValueChange?.(e.target.value)}
          className={cn(
            "h-9 w-full appearance-none rounded-md border border-input bg-card pl-3 pr-9 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" />
      </div>
    );
  }
);
Select.displayName = "Select";
