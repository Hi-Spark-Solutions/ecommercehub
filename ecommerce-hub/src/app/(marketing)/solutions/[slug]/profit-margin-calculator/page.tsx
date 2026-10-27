import type { Metadata } from "next";
import { ProfitMarginCalculator } from "@/features/tools/profit-margin-calculator/components/profit-margin-calculator";

export const metadata: Metadata = {
  title: "Free Profit Margin Calculator | Smartify Commerce",
  description: "Calculate ecommerce product profit, gross and net margin, markup, discounts, and additional selling costs with Smartify Commerce's free profit margin calculator.",
};

export default function ProfitMarginCalculatorPage() {
  return <section className="bg-slate-50"><ProfitMarginCalculator /></section>;
}
