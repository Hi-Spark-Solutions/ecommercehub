"use client";

import { useState } from "react";

const fieldClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none";

export default function ShippingLabelMaker() {
  const [sender, setSender] = useState({
    name: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    phone: "",
  });

  const [recipient, setRecipient] = useState({
    name: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    phone: "",
  });

  const [order, setOrder] = useState("");
  const [reference, setReference] = useState("");
  const [weight, setWeight] = useState("1");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [service, setService] = useState("Standard Shipping");
  const [size, setSize] = useState("4x6");

  function updateAddress(
    type: "sender" | "recipient",
    key: keyof typeof sender,
    value: string,
  ) {
    const setter = type === "sender" ? setSender : setRecipient;
    setter((current) => ({ ...current, [key]: value }));
  }

  function addressFields(
    type: "sender" | "recipient",
    values: typeof sender,
  ) {
    const fields: {
      key: keyof typeof sender;
      label: string;
      placeholder: string;
    }[] = [
      { key: "name", label: "Name / Business", placeholder: "Full name" },
      { key: "address", label: "Street address", placeholder: "Street and unit" },
      { key: "city", label: "City / State", placeholder: "City, state" },
      { key: "postal", label: "Postal code", placeholder: "Postal code" },
      { key: "country", label: "Country", placeholder: "Country" },
      { key: "phone", label: "Phone (optional)", placeholder: "Phone number" },
    ];

    return fields.map((field) => (
      <label key={field.key} className="block text-sm font-medium text-slate-700">
        {field.label}
        <input
          value={values[field.key]}
          onChange={(e) => updateAddress(type, field.key, e.target.value)}
          placeholder={field.placeholder}
          className={fieldClass}
          maxLength={120}
        />
      </label>
    ));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="no-print space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Shipping details
        </h2>

        <div>
          <h3 className="font-semibold text-slate-800">Sender</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {addressFields("sender", sender)}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">Recipient</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {addressFields("recipient", recipient)}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Order number
            <input
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="ORD-1001"
              maxLength={60}
              className={fieldClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Reference / Tracking ID
            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Optional reference"
              maxLength={80}
              className={fieldClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Package weight
            <input
              type="number"
              min="0"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Weight unit
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className={fieldClass}
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="g">Grams (g)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="oz">Ounces (oz)</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Shipping service
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={fieldClass}
            >
              <option>Standard Shipping</option>
              <option>Express Shipping</option>
              <option>International Shipping</option>
              <option>Local Delivery</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Print layout
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={fieldClass}
            >
              <option value="4x6">4 × 6 inches (shipping label)</option>
              <option value="a4">A4 page</option>
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Print / Save as PDF
        </button>

        <p className="text-xs leading-5 text-slate-500">
          In the print dialog, select Save as PDF or choose a label printer.
          For 4 × 6 labels, set the printer paper size to 4 × 6 inches.
        </p>
      </section>

      <section className="min-w-0">
        <h2 className="no-print text-xl font-bold text-slate-900">
          Live label preview
        </h2>
        <p className="no-print mt-2 text-sm text-slate-600">
          Your label updates as you edit the shipping details.
        </p>

        <div className="mt-5 flex justify-center overflow-auto rounded-2xl border border-slate-200 bg-slate-100 p-4 sm:p-6">
          <article
            id="shipping-label"
            className={`shipping-label box-border w-full max-w-[4in] border-2 border-black bg-white p-4 text-black ${
              size === "4x6" ? "aspect-[2/3]" : "min-h-[8in]"
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b-2 border-black pb-3">
              <span className="text-lg font-black tracking-wide">
                SHIPPING LABEL
              </span>
              <span className="text-right text-xs font-bold">
                {service}
              </span>
            </div>

            <div className="border-b border-black py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Ship From
              </p>
              <p className="mt-1 break-words text-sm font-bold">
                {sender.name || "Sender name"}
              </p>
              <p className="whitespace-pre-wrap break-words text-xs leading-5">
                {sender.address || "Street address"}
                {"\n"}
                {[sender.city, sender.postal].filter(Boolean).join(", ") ||
                  "City / Postal code"}
                {"\n"}
                {sender.country || "Country"}
                {sender.phone ? `\nTel: ${sender.phone}` : ""}
              </p>
            </div>

            <div className="border-b-2 border-black py-4">
              <p className="text-xs font-black uppercase tracking-widest">
                Ship To
              </p>
              <p className="mt-2 break-words text-xl font-black">
                {recipient.name || "Recipient name"}
              </p>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6">
                {recipient.address || "Street address"}
                {"\n"}
                {[recipient.city, recipient.postal]
                  .filter(Boolean)
                  .join(", ") || "City / Postal code"}
                {"\n"}
                <span className="font-bold">
                  {recipient.country || "COUNTRY"}
                </span>
                {recipient.phone ? `\nTel: ${recipient.phone}` : ""}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 border-b border-black py-3 text-xs">
              <div>
                <p className="font-bold uppercase">Order</p>
                <p className="mt-1 break-all">{order || "—"}</p>
              </div>
              <div>
                <p className="font-bold uppercase">Weight</p>
                <p className="mt-1">
                  {weight || "0"} {weightUnit}
                </p>
              </div>
              <div className="col-span-2">
                <p className="font-bold uppercase">Reference / Tracking ID</p>
                <p className="mt-1 break-all">{reference || "Not assigned"}</p>
              </div>
            </div>

            <div className="mt-4 border-2 border-dashed border-black p-3 text-center">
              <p className="text-xs font-bold uppercase tracking-widest">
                Carrier Barcode Area
              </p>
              <div
                aria-hidden="true"
                className="mx-auto mt-3 flex h-12 w-full max-w-[220px] items-stretch justify-center gap-[3px] overflow-hidden"
              >
                {Array.from({ length: 45 }, (_, i) => (
                  <span
                    key={i}
                    className="bg-black"
                    style={{
                      width: i % 4 === 0 ? 4 : i % 3 === 0 ? 2 : 1,
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
              <p className="mt-2 text-[10px]">
                Decorative placeholder — not scannable
              </p>
            </div>

            <p className="mt-4 break-words text-center text-xs font-bold">
              {service}
            </p>
          </article>
        </div>
      </section>

      <style jsx global>{`
        @page {
          size: ${size === "4x6" ? "4in 6in" : "A4"};
          margin: ${size === "4x6" ? "0" : "10mm"};
        }

        @media print {
          body * {
            visibility: hidden !important;
          }

          #shipping-label,
          #shipping-label * {
            visibility: visible !important;
          }

          #shipping-label {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: ${size === "4x6" ? "4in" : "190mm"} !important;
            max-width: none !important;
            min-height: 0 !important;
            aspect-ratio: auto !important;
            margin: 0 !important;
            border: 2px solid black !important;
            padding: 4mm !important;
            box-shadow: none !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}