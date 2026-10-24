"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/marketing/primitives";

const inputClass =
  "mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

/**
 * Frontend-only contact form. No backend is connected — on submit it shows
 * a success state locally. Wire this to a real endpoint/service later.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">Message sent</h3>
        <p className="mt-2 text-sm text-slate-600">
          Thanks for reaching out. This is a demo form — no message was actually sent. Our team
          would normally get back to you within one business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-semibold text-blue-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input required className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input required type="email" className={inputClass} placeholder="jane@brand.com" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Company</label>
          <input className={inputClass} placeholder="Your brand" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Subject</label>
          <select className={inputClass} defaultValue="Business inquiry">
            <option>Business inquiry</option>
            <option>Support inquiry</option>
            <option>Partnership</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <label className="text-sm font-medium text-slate-700">Message</label>
        <textarea
          required
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
      >
        Send message
      </button>
      <p className="mt-3 text-xs text-slate-400">
        This form is frontend-only and does not send data anywhere.
      </p>
    </form>
  );
}
