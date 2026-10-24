import { AppShell } from "@/components/shell/app-shell";

/**
 * Layout for the authenticated product/dashboard experience.
 * Wraps every /dashboard route in the SaaS application shell
 * (sidebar + header). Kept separate from the marketing layout so the
 * two navigation systems never mix.
 */
export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
