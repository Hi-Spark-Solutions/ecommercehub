"use client";

import { useState } from "react";

type Item = {
  id: number;
  description: string;
  quantity: number;
  price: number;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

const today = new Date().toISOString().slice(0, 10);

export default function InvoiceGenerator() {
  const [invoiceNo, setInvoiceNo] = useState("INV-1001");
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);
  const [currency, setCurrency] = useState("USD");
  const [seller, setSeller] = useState("");
  const [customer, setCustomer] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("Thank you for your business.");
  const [items, setItems] = useState<Item[]>([
    { id: 1, description: "Product or service", quantity: 1, price: 100 },
  ]);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Math.max(0, item.quantity) * Math.max(0, item.price),
    0,
  );

  const discountAmount = (subtotal * Math.min(100, Math.max(0, discount))) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount =
    (taxableAmount * Math.min(100, Math.max(0, taxRate))) / 100;
  const total = taxableAmount + taxAmount;

  const money = (amount: number) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    }).format(amount);

  function updateItem(id: number, changes: Partial<Item>) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        id: Math.max(0, ...current.map((item) => item.id)) + 1,
        description: "",
        quantity: 1,
        price: 0,
      },
    ]);
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <section className="no-print space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Invoice details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              Invoice number
              <input
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className={`${inputClass} mt-2`}
              />
            </label>

            <label className="text-sm font-medium">
              Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`${inputClass} mt-2`}
              >
                {["USD", "PKR", "GBP", "EUR", "CAD", "AUD", "INR"].map(
                  (code) => (
                    <option key={code}>{code}</option>
                  ),
                )}
              </select>
            </label>

            <label className="text-sm font-medium">
              Invoice date
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className={`${inputClass} mt-2`}
              />
            </label>

            <label className="text-sm font-medium">
              Due date
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`${inputClass} mt-2`}
              />
            </label>
          </div>

          <label className="block text-sm font-medium">
            Your business / seller
            <textarea
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              placeholder={"Business name\nAddress\nEmail"}
              rows={3}
              className={`${inputClass} mt-2`}
            />
          </label>

          <label className="block text-sm font-medium">
            Bill to / customer
            <textarea
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder={"Customer name\nAddress\nEmail"}
              rows={3}
              className={`${inputClass} mt-2`}
            />
          </label>

          <div>
            <h3 className="font-semibold text-slate-900">Line items</h3>

            {items.map((item) => (
              <div
                key={item.id}
                className="mt-3 grid grid-cols-2 gap-3 rounded-lg border border-slate-200 p-3"
              >
                <label className="col-span-2 text-sm">
                  Description
                  <input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, { description: e.target.value })
                    }
                    className={`${inputClass} mt-1`}
                  />
                </label>

                <label className="text-sm">
                  Quantity
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, {
                        quantity: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className={`${inputClass} mt-1`}
                  />
                </label>

                <label className="text-sm">
                  Unit price ({currency})
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.id, {
                        price: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className={`${inputClass} mt-1`}
                  />
                </label>

                <div className="col-span-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Amount: {money(item.quantity * item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setItems((current) =>
                        current.filter((entry) => entry.id !== item.id),
                      )
                    }
                    className="font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="mt-3 rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              + Add line item
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              Discount (%)
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                className={`${inputClass} mt-2`}
              />
            </label>

            <label className="text-sm font-medium">
              Tax (%)
              <input
                type="number"
                min="0"
                max="100"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                className={`${inputClass} mt-2`}
              />
            </label>
          </div>

          <label className="block text-sm font-medium">
            Notes / payment instructions
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={`${inputClass} mt-2`}
            />
          </label>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Print / Save as PDF
          </button>

          <p className="text-xs leading-5 text-slate-500">
            Use your browser&apos;s print dialog and select Save as PDF to
            download a copy.
          </p>
        </section>

        <section
          id="invoice-document"
          className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Invoice
              </p>
              <h2 className="mt-2 break-all text-2xl font-extrabold text-slate-900">
                {invoiceNo || "Invoice"}
              </h2>
            </div>
            <div className="text-right text-sm text-slate-600">
              <p>Date: {invoiceDate || "—"}</p>
              <p className="mt-1">Due: {dueDate || "—"}</p>
            </div>
          </div>

          <div className="grid gap-6 py-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                From
              </h3>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-800">
                {seller || "Your business details"}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Bill to
              </h3>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-800">
                {customer || "Customer details"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] text-left text-sm">
              <thead>
                <tr className="border-y border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-3 pr-2">Description</th>
                  <th className="px-2 py-3 text-right">Qty</th>
                  <th className="px-2 py-3 text-right">Price</th>
                  <th className="py-3 pl-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="break-words py-4 pr-2">
                      {item.description || "Item"}
                    </td>
                    <td className="px-2 py-4 text-right">{item.quantity}</td>
                    <td className="px-2 py-4 text-right">
                      {money(item.price)}
                    </td>
                    <td className="py-4 pl-2 text-right font-medium">
                      {money(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ml-auto mt-6 max-w-xs space-y-3 text-sm">
            <div className="flex justify-between gap-4 text-slate-600">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4 text-slate-600">
              <span>Discount ({Math.min(100, Math.max(0, discount))}%)</span>
              <span>−{money(discountAmount)}</span>
            </div>
            <div className="flex justify-between gap-4 text-slate-600">
              <span>Tax ({Math.min(100, Math.max(0, taxRate))}%)</span>
              <span>{money(taxAmount)}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-extrabold text-slate-900">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>

          {notes.trim() && (
            <div className="mt-10 border-t border-slate-200 pt-5">
              <h3 className="text-sm font-bold text-slate-900">Notes</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                {notes}
              </p>
            </div>
          )}

          <p className="mt-10 text-center text-xs text-slate-400">
            Generated with Smartify Commerce
          </p>
        </section>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }

          #invoice-document,
          #invoice-document * {
            visibility: visible !important;
          }

          #invoice-document {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            max-width: none !important;
            border: 0 !important;
            border-radius: 0 !important;
            padding: 12mm !important;
            box-shadow: none !important;
          }

          @page {
            size: auto;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}