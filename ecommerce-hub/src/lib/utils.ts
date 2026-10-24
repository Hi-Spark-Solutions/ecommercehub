import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency. */
export function formatCurrency(value: number, opts?: { compact?: boolean }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: opts?.compact ? "compact" : "standard",
    maximumFractionDigits: opts?.compact ? 1 : 2,
  }).format(value);
}

/** Format a plain number with grouping. */
export function formatNumber(value: number, opts?: { compact?: boolean }) {
  return new Intl.NumberFormat("en-US", {
    notation: opts?.compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

/** Format a percentage from a ratio or already-percent number. */
export function formatPercent(value: number, fractionDigits = 1) {
  return `${value.toFixed(fractionDigits)}%`;
}

/** Format an ISO date string into a readable date. */
export function formatDate(
  iso: string,
  style: "short" | "medium" | "long" = "medium"
) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const options: Intl.DateTimeFormatOptions =
    style === "short"
      ? { month: "short", day: "numeric" }
      : style === "long"
        ? { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
        : { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/** Relative time like "3 days ago" (deterministic against a reference date). */
export function formatRelativeTime(iso: string, now: Date = REFERENCE_NOW) {
  const date = new Date(iso);
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  if (abs < 60) return rtf.format(Math.round(diffSec), "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 2592000) return rtf.format(Math.round(diffSec / 86400), "day");
  if (abs < 31536000) return rtf.format(Math.round(diffSec / 2592000), "month");
  return rtf.format(Math.round(diffSec / 31536000), "year");
}

/**
 * Fixed "now" reference so dummy data & relative times stay stable/deterministic
 * across renders. Replace with `new Date()` once wired to a live backend.
 */
export const REFERENCE_NOW = new Date("2026-08-14T12:00:00Z");

/** Get initials from a full name. */
export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Deterministic pastel-ish avatar color from a string. */
export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 45%)`;
}

/** Simulate network latency for the dummy adapter. */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
