"use client";

import * as React from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggle: () => void;
}
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = React.useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
