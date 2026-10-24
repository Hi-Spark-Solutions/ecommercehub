import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

/**
 * Public marketing website layout. Uses its own header (with mega-menus)
 * and footer — completely separate from the authenticated DashboardLayout
 * so the two navigation systems never mix. Forced light theme for a
 * consistent premium marketing look regardless of the app's theme toggle.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
