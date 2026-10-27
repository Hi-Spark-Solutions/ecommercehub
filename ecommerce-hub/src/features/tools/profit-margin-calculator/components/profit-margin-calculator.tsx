"use client";

import * as React from "react";
import { Calculator, RotateCcw, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Currency = "USD" | "PKR" | "GBP" | "EUR" | "CAD" | "AUD" | "INR";
const CURRENCIES: { code: Currency; locale: string }[] = [
  { code: "USD", locale: "en-US" }, 
  { code: "GBP", locale: "en-GB" }, 
  { code: "EUR", locale: "de-DE" },
  { code: "CAD", locale: "en-CA" }, 
  { code: "AUD", locale: "en-AU" },
  { code: "INR", locale: "en-IN" },
  { code: "PKR", locale: "en-PK" },
];
const INITIAL = { cost: "25", price: "60", shipping: "0", acquisition: "0", other: "0", discount: "0", units: "1" };
const numberValue = (v: string) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? n : 0; };

function Field({ label, help, value, onChange, prefix, suffix, min = 0, max, step = 0.01 }: {
  label: string; help: string; value: string; onChange: (v: string) => void;
  prefix?: string; suffix?: string; min?: number; max?: number; step?: number;
}) {
  const id = React.useId();
  return <div className="min-w-0">
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-800">{label}</label>
    <div className="relative">
      {prefix && <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-500">{prefix}</span>}
      <Input id={id} type="number" inputMode="decimal" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(e.target.value)} className={`${prefix ? "pl-[4.5rem]" : "pl-3"} ${suffix ? "pr-10" : "pr-3"} h-11 rounded-lg border-slate-300 bg-white text-slate-900`} />
      {suffix && <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center border-l border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">{suffix}</span>}
    </div>
    <p className="mt-1.5 text-xs leading-5 text-slate-500">{help}</p>
  </div>;
}
function Metric({ label, value }: { label: string; value: string }) {
  return <div className="bg-white p-4 sm:p-5"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 break-words text-xl font-semibold tracking-tight text-slate-900">{value}</p></div>;
}
function BreakdownRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex items-start justify-between gap-4 text-sm ${strong ? "font-semibold text-slate-900" : "text-slate-600"}`}><span>{label}</span><span className="shrink-0 tabular-nums">{value}</span></div>;
}

export function ProfitMarginCalculator() {
  const [currency, setCurrency] = React.useState<Currency>("USD");
  const [cost, setCost] = React.useState(INITIAL.cost);
  const [price, setPrice] = React.useState(INITIAL.price);
  const [shipping, setShipping] = React.useState(INITIAL.shipping);
  const [acquisition, setAcquisition] = React.useState(INITIAL.acquisition);
  const [other, setOther] = React.useState(INITIAL.other);
  const [discount, setDiscount] = React.useState(INITIAL.discount);
  const [units, setUnits] = React.useState(INITIAL.units);
  const [expanded, setExpanded] = React.useState(true);
  const currencyLocale = CURRENCIES.find((c) => c.code === currency)!.locale;
  const money = React.useCallback((v: number) => new Intl.NumberFormat(currencyLocale, { style: "currency", currency, maximumFractionDigits: 2 }).format(Number.isFinite(v) ? v : 0), [currency, currencyLocale]);
  const pct = (v: number) => `${new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(Number.isFinite(v) ? v : 0)}%`;
  const result = React.useMemo(() => {
    const productCost = numberValue(cost), listPrice = numberValue(price);
    const effectivePrice = listPrice * (1 - Math.min(numberValue(discount), 100) / 100);
    const ship = numberValue(shipping), marketing = numberValue(acquisition), misc = numberValue(other);
    const quantity = Math.max(1, Math.floor(numberValue(units) || 1));
    const grossProfit = effectivePrice - productCost;
    const totalCosts = productCost + ship + marketing + misc;
    const netProfit = effectivePrice - totalCosts;
    return { productCost, effectivePrice, grossProfit, totalCosts, netProfit,
      margin: effectivePrice > 0 ? netProfit / effectivePrice * 100 : 0,
      grossMargin: effectivePrice > 0 ? grossProfit / effectivePrice * 100 : 0,
      markup: productCost > 0 ? grossProfit / productCost * 100 : 0,
      quantity, revenue: effectivePrice * quantity, totalProfit: netProfit * quantity };
  }, [cost, price, shipping, acquisition, other, discount, units]);
  const reset = () => { setCurrency("USD"); setCost(INITIAL.cost); setPrice(INITIAL.price); setShipping(INITIAL.shipping); setAcquisition(INITIAL.acquisition); setOther(INITIAL.other); setDiscount(INITIAL.discount); setUnits(INITIAL.units); setExpanded(true); };
  const setMarkup = (v: number) => setPrice((numberValue(cost) * (1 + v / 100)).toFixed(2));
  const loss = result.netProfit < -0.005, even = Math.abs(result.netProfit) <= 0.005;

  return <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700"><Calculator className="h-3.5 w-3.5" />Free ecommerce tool</div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Profit margin calculator</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Calculate product profit, margin, and markup. Include the costs behind each sale to make more confident pricing decisions.</p></div>
      <Button type="button" variant="outline" onClick={reset} leftIcon={<RotateCcw className="h-4 w-4" />} className="border-slate-300 bg-white text-slate-700">Reset</Button>
    </div>
    <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-5"><div><CardTitle className="text-base">Product pricing</CardTitle><p className="mt-1 text-sm text-slate-500">Start with product cost and selling price.</p></div>
          <label htmlFor="profit-currency" className="sr-only">Currency</label><select id="profit-currency" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-200">{CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}</select>
        </CardHeader>
        <CardContent className="space-y-6"><div className="grid gap-5 sm:grid-cols-2">
          <Field label="Cost per item" help="What one unit costs to purchase or make." value={cost} onChange={setCost} prefix={currency} />
          <Field label="Selling price" help="Your regular price before discounts." value={price} onChange={setPrice} prefix={currency} />
        </div>
        <div className="rounded-xl bg-slate-50 p-4"><div className="mb-3 flex items-center justify-between gap-3"><label htmlFor="profit-markup" className="text-sm font-semibold text-slate-800">Markup on product cost</label><span className="text-sm font-semibold tabular-nums text-slate-800">{pct(result.markup)}</span></div>
          <input id="profit-markup" type="range" min="0" max="300" step="1" value={Math.max(0, Math.min(300, result.markup))} onChange={(e) => setMarkup(Number(e.target.value))} className="w-full cursor-pointer accent-blue-600" aria-label="Set markup percentage" />
          <div className="flex justify-between text-xs text-slate-500"><span>0%</span><span>150%</span><span>300%</span></div><p className="mt-2 text-xs leading-5 text-slate-500">Adjust the slider to calculate selling price from product cost. Markup excludes other expenses.</p>
        </div>
        <div className="border-t border-slate-200 pt-4"><button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-slate-800"><span>Additional costs and adjustments</span>{expanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}</button>
          {expanded && <div className="mt-4 grid gap-5 sm:grid-cols-2"><Field label="Shipping & fulfillment" help="Shipping, packaging, and handling per sale." value={shipping} onChange={setShipping} prefix={currency} /><Field label="Customer acquisition cost" help="Average marketing cost to acquire this order." value={acquisition} onChange={setAcquisition} prefix={currency} /><Field label="Other costs" help="Payment fees, commissions, or other variable costs." value={other} onChange={setOther} prefix={currency} /><Field label="Discount" help="Percentage taken off the selling price." value={discount} onChange={setDiscount} suffix="%" max={100} /><Field label="Units sold" help="Estimate revenue and profit across units." value={units} onChange={setUnits} min={1} step={1} /></div>}
        </div><div className="flex gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600"><Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />Your entries are calculated in this browser and are not saved or sent to a server.</div></CardContent>
      </Card>
      <div className="space-y-5"><Card className="overflow-hidden border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 px-5 py-5 sm:px-6"><p className="text-sm font-medium text-slate-500">Estimated profit per sale</p><p className={`mt-2 text-4xl font-bold tracking-tight sm:text-5xl ${loss ? "text-rose-600" : "text-slate-950"}`}>{money(result.netProfit)}</p><div className="mt-3 flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${loss ? "bg-rose-50 text-rose-700" : even ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{loss ? "Loss per sale" : even ? "Break-even" : "Profitable"}</span><span className="text-sm text-slate-500">{pct(result.margin)} net margin</span></div></div>
        <div className="grid grid-cols-2 gap-px bg-slate-200"><Metric label="Net profit margin" value={pct(result.margin)} /><Metric label="Gross profit" value={money(result.grossProfit)} /><Metric label="Gross margin" value={pct(result.grossMargin)} /><Metric label="Product markup" value={pct(result.markup)} /></div>
        <div className="space-y-3 px-5 py-5 sm:px-6"><BreakdownRow label="Selling price after discount" value={money(result.effectivePrice)} /><BreakdownRow label="Product cost" value={`− ${money(result.productCost)}`} /><BreakdownRow label="Shipping & fulfillment" value={`− ${money(numberValue(shipping))}`} /><BreakdownRow label="Customer acquisition" value={`− ${money(numberValue(acquisition))}`} /><BreakdownRow label="Other costs" value={`− ${money(numberValue(other))}`} /><div className="border-t border-slate-200 pt-3"><BreakdownRow label="Estimated profit per sale" value={money(result.netProfit)} strong /></div></div>
      </Card>
      <Card className="border-slate-200 bg-white shadow-sm"><CardContent><h2 className="text-base font-semibold text-slate-900">Sales estimate</h2><p className="mt-1 text-sm text-slate-500">Based on {result.quantity.toLocaleString()} {result.quantity === 1 ? "unit" : "units"}.</p><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-lg bg-slate-50 p-3 sm:p-4"><p className="text-xs font-medium text-slate-500">Total revenue</p><p className="mt-2 break-words text-lg font-semibold text-slate-900">{money(result.revenue)}</p></div><div className="rounded-lg bg-slate-50 p-3 sm:p-4"><p className="text-xs font-medium text-slate-500">Total estimated profit</p><p className={`mt-2 break-words text-lg font-semibold ${result.totalProfit < 0 ? "text-rose-600" : "text-slate-900"}`}>{money(result.totalProfit)}</p></div></div>
        <div className="mt-4 rounded-lg border border-slate-200 p-4"><p className="text-sm font-semibold text-slate-900">Pricing insight</p><p className="mt-1 text-sm leading-6 text-slate-600">{loss ? `Your entered costs exceed the sale price. Your break-even price before discount is ${money(result.totalCosts)} per unit.` : even ? "Your price approximately covers the costs entered. Increase price or reduce costs to earn a profit." : `You keep ${money(result.netProfit)} per sale after the costs entered. Your break-even price before discount is ${money(result.totalCosts)}.`}</p></div>
      </CardContent></Card></div>
    </div>
    <div className="mt-6 grid gap-5 md:grid-cols-2"><Card className="border-slate-200 bg-white shadow-sm"><CardContent><h2 className="font-semibold text-slate-900">Profit margin vs. markup</h2><p className="mt-2 text-sm leading-6 text-slate-600">Profit margin is profit divided by selling price. Markup is gross profit divided by product cost. These are different percentages.</p><div className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-xs leading-6 text-slate-700">Net margin = Net profit ÷ Selling price × 100<br />Markup = Gross profit ÷ Product cost × 100</div></CardContent></Card>
      <Card className="border-slate-200 bg-white shadow-sm"><CardContent><h2 className="font-semibold text-slate-900">What this estimate includes</h2><p className="mt-2 text-sm leading-6 text-slate-600">Only costs entered here are included. Add taxes, payment fees, returns, overhead, or marketplace commissions under Other costs when relevant. This estimate is not accounting or tax advice.</p></CardContent></Card></div>
    <p className="mt-8 text-center text-xs text-slate-500">Smartify Commerce · Free Profit Margin Calculator</p>
  </div>;
}
