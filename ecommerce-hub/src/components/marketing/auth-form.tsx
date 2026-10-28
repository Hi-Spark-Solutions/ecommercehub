"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const inputClass =
  "mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

/**
 * Frontend-only auth form. Authentication is NOT wired to any backend —
 * on submit it simply routes to the dashboard so the flow is navigable.
 * Replace the submit handler with a real auth call later.
 */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const isSignup = mode === "signup";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate a request, then enter the product.
    setTimeout(() => router.push("/dashboard"), 600);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {isSignup
          ? "Start running your commerce operations — free during early access."
          : "Log in to your Smartify Commerce workspace."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {isSignup && (
          <div>
            <label className="text-sm font-medium text-slate-700">Full name</label>
            <input required className={inputClass} placeholder="Jane Doe" />
          </div>
        )}
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input required type="email" className={inputClass} placeholder="jane@brand.com" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Password</label>
            {!isSignup && (
              <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <input required type="password" className={inputClass} placeholder="••••••••" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSignup ? "Create account" : "Log in"}
        </button>
      </form>
      
      {/* Future ToDo */}
      {/* <p className="mt-6 text-center text-sm text-slate-600">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Smartify Commerce?{" "}
            <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
              Create an account
            </Link>
          </>
        )}
      </p> */}

      <p className="mt-4 text-center text-xs text-slate-400">
        Demo only — no real authentication is performed.
      </p>
    </div>
  );
}
