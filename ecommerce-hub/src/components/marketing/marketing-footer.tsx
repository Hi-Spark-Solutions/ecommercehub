import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { footerColumns } from "@/config/marketing-nav";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              The commerce operating system for modern brands. Connect every channel and run
              your operations from one place.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {2026} Ecommerce Hub. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Free during early access — no credit card required.
          </p>
        </div>
      </div>
    </footer>
  );
}
