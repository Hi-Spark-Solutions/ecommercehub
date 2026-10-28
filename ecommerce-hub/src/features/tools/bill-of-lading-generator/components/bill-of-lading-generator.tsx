
"use client";

import { useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";

type FreightItem = {
  id: number;
  description: string;
  packages: string;
  packageType: string;
  weight: string;
  freightClass: string;
  nmfc: string;
  hazmat: boolean;
};

type Party = {
  company: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  contact: string;
  phone: string;
};

const emptyParty: Party = {
  company: "",
  address: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
  contact: "",
  phone: "",
};

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "block text-sm font-medium text-slate-700";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className={labelClass}>
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}

export default function BillOfLadingGenerator() {
  const [shipper, setShipper] = useState<Party>(emptyParty);
  const [consignee, setConsignee] = useState<Party>(emptyParty);
  const [carrier, setCarrier] = useState("");
  const [bolNumber, setBolNumber] = useState("BOL-1001");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [poNumber, setPoNumber] = useState("");
  const [proNumber, setProNumber] = useState("");
  const [trailerNumber, setTrailerNumber] = useState("");
  const [sealNumber, setSealNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [freightTerms, setFreightTerms] = useState("Prepaid");
  const [declaredValue, setDeclaredValue] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<FreightItem[]>([
    {
      id: 1,
      description: "",
      packages: "1",
      packageType: "Cartons",
      weight: "",
      freightClass: "",
      nmfc: "",
      hazmat: false,
    },
  ]);

  const updateParty = (
    party: "shipper" | "consignee",
    key: keyof Party,
    value: string,
  ) => {
    const setter = party === "shipper" ? setShipper : setConsignee;
    setter((previous) => ({ ...previous, [key]: value }));
  };

  const updateItem = (
    id: number,
    key: keyof FreightItem,
    value: string | boolean,
  ) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    );
  };

  const addItem = () => {
    setItems((previous) => [
      ...previous,
      {
        id: Math.max(0, ...previous.map((item) => item.id)) + 1,
        description: "",
        packages: "1",
        packageType: "Cartons",
        weight: "",
        freightClass: "",
        nmfc: "",
        hazmat: false,
      },
    ]);
  };

  const totalPackages = items.reduce(
    (sum, item) => sum + (Number(item.packages) || 0),
    0,
  );
  const totalWeight = items.reduce(
    (sum, item) => sum + (Number(item.weight) || 0),
    0,
  );

  const renderPartyFields = (party: "shipper" | "consignee", value: Party) => (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field
          label="Company / Name"
          value={value.company}
          onChange={(v) => updateParty(party, "company", v)}
        />
      </div>
      <div className="sm:col-span-2">
        <Field
          label="Street address"
          value={value.address}
          onChange={(v) => updateParty(party, "address", v)}
        />
      </div>
      <Field
        label="City"
        value={value.city}
        onChange={(v) => updateParty(party, "city", v)}
      />
      <Field
        label="State / Province"
        value={value.region}
        onChange={(v) => updateParty(party, "region", v)}
      />
      <Field
        label="Postal code"
        value={value.postalCode}
        onChange={(v) => updateParty(party, "postalCode", v)}
      />
      <Field
        label="Country"
        value={value.country}
        onChange={(v) => updateParty(party, "country", v)}
      />
      <Field
        label="Contact person"
        value={value.contact}
        onChange={(v) => updateParty(party, "contact", v)}
      />
      <Field
        label="Phone"
        value={value.phone}
        onChange={(v) => updateParty(party, "phone", v)}
      />
    </div>
  );

  const formatAddress = (party: Party) =>
    [
      party.company,
      party.address,
      [party.city, party.region, party.postalCode].filter(Boolean).join(", "),
      party.country,
      party.contact && `Contact: ${party.contact}`,
      party.phone && `Phone: ${party.phone}`,
    ]
      .filter(Boolean)
      .join("\n");

  const handlePrint = () => {
    const preview = document.querySelector<HTMLElement>(".bol-document");
    if (!preview) return;
  
    const printWindow = window.open("", "_blank", "width=1100,height=800");
    if (!printWindow) return;
  
    const stylesheets = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
    )
      .map((link) => `<link rel="stylesheet" href="${link.href}">`)
      .join("");
      
    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Bill of Lading</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 8mm;
            }

            .bol-document {
              display: flex !important;
              flex-direction: column !important;
              min-height: 140mm !important;
              box-sizing: border-box !important;
            }

            .bol-document footer {
              margin-top: auto !important;
            }

            * { box-sizing: border-box; }

            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              font-family: Arial, sans-serif;
              color: #0f172a;
              background: white;
            }

            body { font-size: 9px; }

            .bol-document {
              position: static !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              border: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              font-size: 9px !important;
            }

            .bol-document * {
              visibility: visible !important;
            }

            .bol-document h2 { font-size: 18px !important; }
            .bol-document h3 { font-size: 11px !important; }
            .bol-document p { min-height: 0 !important; }
            .bol-document table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
            }

            .bol-document th,
            .bol-document td {
              border: 1px solid #cbd5e1;
              padding: 4px;
              text-align: left;
              overflow-wrap: anywhere;
            }

            .bol-document .bg-slate-100,
            .bol-document .bg-slate-50 {
              background: #f1f5f9 !important;
            }

            .bol-document .grid {
              display: grid;
            }

            .bol-document .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .bol-document .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .bol-document .gap-3 { gap: 8px; }
            .bol-document .mt-4 { margin-top: 10px !important; }
            .bol-document .mt-5 { margin-top: 12px !important; }
            .bol-document .mt-8 { margin-top: 16px !important; }
            .bol-document .p-3 { padding: 8px !important; }
            .bol-document .border { border: 1px solid #cbd5e1; }
            .bol-document .border-b-2 { border-bottom: 2px solid #0f172a; }
            .bol-document .border-b { border-bottom: 1px solid #cbd5e1; }
            .bol-document .border-t { border-top: 1px solid #cbd5e1; }
            .bol-document .text-center { text-align: center; }
            .bol-document .text-xs { font-size: 8px !important; }
            .bol-document .font-bold,
            .bol-document .font-extrabold { font-weight: 700; }
            .bol-document .uppercase { text-transform: uppercase; }
            .bol-document .whitespace-pre-line,
            .bol-document .whitespace-pre-wrap { white-space: pre-wrap; }
            .bol-document .break-words { overflow-wrap: anywhere; }

            @media print {
              .bol-document { break-after: avoid; }
            }
          </style>
        </head>
        <body>${preview.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
  
    const printAfterStylesLoad = async () => {
      await Promise.all(
        Array.from(printWindow.document.images).map((img) =>
          img.decode().catch(() => {}),
        ),
      );
  
      printWindow.focus();
      printWindow.print();
    };
  
    printWindow.addEventListener("load", printAfterStylesLoad, { once: true });
  };
      
  return (
    <div className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-6 print:hidden">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Shipment details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add your reference numbers and transportation information.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="BOL number" value={bolNumber} onChange={setBolNumber} />
              <Field label="Date" type="date" value={date} onChange={setDate} />
              <Field label="Purchase order" value={poNumber} onChange={setPoNumber} />
              <Field label="Carrier PRO number" value={proNumber} onChange={setProNumber} />
              <Field label="Carrier name" value={carrier} onChange={setCarrier} />
              <Field label="Trailer number" value={trailerNumber} onChange={setTrailerNumber} />
              <Field label="Seal number" value={sealNumber} onChange={setSealNumber} />
              <Field label="Declared value" value={declaredValue} onChange={setDeclaredValue} placeholder="e.g. 2500.00" />
              <Field label="Origin" value={origin} onChange={setOrigin} />
              <Field label="Destination" value={destination} onChange={setDestination} />
              <label className={labelClass}>
                Freight charge terms
                <select
                  value={freightTerms}
                  onChange={(e) => setFreightTerms(e.target.value)}
                  className={fieldClass}
                >
                  <option>Prepaid</option>
                  <option>Collect</option>
                  <option>Third party</option>
                </select>
              </label>
              <label className={labelClass}>
                Weight unit
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className={fieldClass}
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Shipper</h2>
            <p className="mb-5 mt-1 text-sm text-slate-500">
              The person or business sending the freight.
            </p>
            {renderPartyFields("shipper", shipper)}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Consignee</h2>
            <p className="mb-5 mt-1 text-sm text-slate-500">
              The person or business receiving the freight.
            </p>
            {renderPartyFields("consignee", consignee)}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Freight items
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Describe each type of package or goods.
                </p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" /> Add item
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-800">
                      Item {index + 1}
                    </h3>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setItems((previous) =>
                            previous.filter((row) => row.id !== item.id),
                          )
                        }
                        aria-label={`Remove item ${index + 1}`}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field
                        label="Description of goods"
                        value={item.description}
                        onChange={(v) => updateItem(item.id, "description", v)}
                        placeholder="e.g. boxed kitchen equipment"
                      />
                    </div>
                    <Field
                      label="Package count"
                      type="number"
                      value={item.packages}
                      onChange={(v) => updateItem(item.id, "packages", v)}
                    />
                    <label className={labelClass}>
                      Package type
                      <select
                        value={item.packageType}
                        onChange={(e) => updateItem(item.id, "packageType", e.target.value)}
                        className={fieldClass}
                      >
                        <option>Cartons</option>
                        <option>Boxes</option>
                        <option>Pallets</option>
                        <option>Crates</option>
                        <option>Drums</option>
                        <option>Bundles</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <Field
                      label={`Weight (${weightUnit})`}
                      type="number"
                      value={item.weight}
                      onChange={(v) => updateItem(item.id, "weight", v)}
                    />
                    <Field
                      label="Freight class"
                      value={item.freightClass}
                      onChange={(v) => updateItem(item.id, "freightClass", v)}
                      placeholder="If applicable"
                    />
                    <div className="sm:col-span-2">
                      <Field
                        label="NMFC item number"
                        value={item.nmfc}
                        onChange={(v) => updateItem(item.id, "nmfc", v)}
                        placeholder="If applicable"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={item.hazmat}
                        onChange={(e) => updateItem(item.id, "hazmat", e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      Hazardous materials (verify applicable regulations)
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <label className={`${labelClass} mt-5`}>
              Special shipping instructions
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className={fieldClass}
                placeholder="Handling requirements, delivery instructions, or notes"
              />
            </label>
          </section>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Printer className="h-5 w-5" />
            Print / Save as PDF
          </button>
          <p className="text-xs leading-5 text-slate-500">
            Select “Save as PDF” in your browser's print dialog. This tool
            does not submit your information to a carrier.
          </p>
        </div>

        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
            <div>
              <h2 className="font-semibold text-slate-900">Document preview</h2>
              <p className="text-sm text-slate-500">
                Updates as you edit the form.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>

          <article className="bol-document rounded-xl border border-slate-300 bg-white p-5 text-slate-900 shadow-sm sm:p-8">
            <header className="border-b-2 border-slate-900 pb-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Freight shipping document
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                STRAIGHT BILL OF LADING
              </h2>
              <p className="mt-1 text-xs font-semibold uppercase">
                Non-negotiable template
              </p>
            </header>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">BOL number</p>
                <p className="mt-1 break-words font-bold">{bolNumber || "—"}</p>
              </div>
              <div className="rounded-lg border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">Date</p>
                <p className="mt-1 font-semibold">{date || "—"}</p>
              </div>
              <div className="rounded-lg border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">PO number</p>
                <p className="mt-1 break-words">{poNumber || "—"}</p>
              </div>
              <div className="rounded-lg border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">PRO number</p>
                <p className="mt-1 break-words">{proNumber || "—"}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { title: "SHIPPER / FROM", party: shipper },
                { title: "CONSIGNEE / SHIP TO", party: consignee },
              ].map(({ title, party }) => (
                <div key={title} className="min-w-0 border border-slate-300">
                  <h3 className="border-b border-slate-300 bg-slate-100 px-3 py-2 text-xs font-bold uppercase">
                    {title}
                  </h3>
                  <p className="min-h-28 whitespace-pre-line break-words p-3 text-sm">
                    {formatAddress(party) || "Details not provided"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">Carrier</p>
                <p className="mt-1 break-words">{carrier || "—"}</p>
              </div>
              <div className="border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">Freight terms</p>
                <p className="mt-1 font-semibold">{freightTerms}</p>
              </div>
              <div className="border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">Origin</p>
                <p className="mt-1 break-words">{origin || "—"}</p>
              </div>
              <div className="border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">Destination</p>
                <p className="mt-1 break-words">{destination || "—"}</p>
              </div>
              <div className="border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">Trailer / Seal</p>
                <p className="mt-1 break-words">
                  {trailerNumber || "—"} / {sealNumber || "—"}
                </p>
              </div>
              <div className="border border-slate-300 p-3">
                <p className="text-xs font-bold uppercase text-slate-500">Declared value</p>
                <p className="mt-1 break-words">{declaredValue || "—"}</p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="mb-2 text-sm font-bold uppercase">Description of articles</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100">
                      {["Packages", "Type", "Description", "Class / NMFC", "Weight", "HM"].map((heading) => (
                        <th key={heading} className="border border-slate-300 p-2 font-bold">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-slate-300 p-2">{item.packages || "—"}</td>
                        <td className="border border-slate-300 p-2">{item.packageType}</td>
                        <td className="max-w-44 break-words border border-slate-300 p-2">
                          {item.description || "—"}
                        </td>
                        <td className="border border-slate-300 p-2">
                          {[item.freightClass, item.nmfc].filter(Boolean).join(" / ") || "—"}
                        </td>
                        <td className="border border-slate-300 p-2">
                          {item.weight ? `${item.weight} ${weightUnit}` : "—"}
                        </td>
                        <td className="border border-slate-300 p-2">
                          {item.hazmat ? "YES" : "NO"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-bold">
                      <td className="border border-slate-300 p-2">{totalPackages}</td>
                      <td colSpan={3} className="border border-slate-300 p-2">Total</td>
                      <td className="border border-slate-300 p-2">
                        {totalWeight} {weightUnit}
                      </td>
                      <td className="border border-slate-300 p-2">—</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="mt-4 border border-slate-300 p-3">
              <h3 className="text-xs font-bold uppercase">Special instructions</h3>
              <p className="mt-2 min-h-10 whitespace-pre-wrap break-words text-sm">
                {notes || "—"}
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-600">
              Shipper is responsible for accurately describing and declaring the
              shipment. Confirm freight details and applicable requirements with
              the carrier before use.
            </p>

            <div className="bol-document flex min-h-[190mm] flex-col">
              {/* Existing bill of lading content */}

              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {["Shipper signature / date", "Carrier / driver signature / date", "Received by / date"].map((title) => (
                  <div key={title}>
                    <div className="h-10 border-b border-slate-500" />
                    <p className="mt-2 text-xs font-semibold">{title}</p>
                  </div>
                ))}
              </div>

              <footer className="mt-auto border-t border-slate-300 pt-3 text-center text-[10px] text-slate-500">
                Generated with Smartify Commerce · Bill of Lading Template
              </footer>
            </div>
          </article>
        </section>
      </div>

    </div>
  );
}
