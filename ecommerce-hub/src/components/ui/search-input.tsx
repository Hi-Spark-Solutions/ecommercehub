"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={
          value ? (
            <button onClick={() => onChange("")} aria-label="Clear search" className="pointer-events-auto hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          ) : undefined
        }
      />
    </div>
  );
}

/** Debounce a fast-changing value (e.g. a search box) before querying. */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
