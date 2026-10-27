import Link from "next/link";
import { Boxes, Check } from "lucide-react";

/**
 * Auth layout — a split screen with a brand panel and the form area.
 * Standalone (no marketing header/footer, no dashboard shell).
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Boxes className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[17px] font-bold tracking-tight">Smartify Commerce</span>
        </Link>

        <div className="relative max-w-sm">
          <h2 className="text-3xl font-bold leading-tight">
            One platform for omnichannel commerce.
          </h2>
          <ul className="mt-8 space-y-3">
            {[
              "Products, orders, inventory & customers in one place",
              "Real-time sync across every channel",
              "Free during early access",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <Check className="h-3 w-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">
          © 2026 Smartify Commerce. All rights reserved.
        </p>
      </div>

      {/* Form area */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
