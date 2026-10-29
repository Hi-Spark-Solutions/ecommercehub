"use client";

import { useRef, useState } from "react";

type Item = {
  id: number;
  sku: string;
  description: string;
  quantity: number;
  price: number;
};

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

const today = new Date().toISOString().slice(0, 10);

function money(value: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(value);
}

export default function PurchaseOrderGenerator() {
  const logoRef = useRef<HTMLInputElement>(null);

  const [logo, setLogo] = useState("");
  const [poNo, setPoNo] = useState("PO-1001");
  const [orderDate, setOrderDate] = useState(today);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [buyer, setBuyer] = useState("");
  const [vendor, setVendor] = useState("");
  const [shipTo, setShipTo] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Due on receipt");
  const [shippingMethod, setShippingMethod] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      sku: "",
      description: "Product or service",
      quantity: 1,
      price: 100,
    },
  ]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const tax = (subtotal * Math.min(100, Math.max(0, taxRate))) / 100;
  const total = subtotal + tax + Math.max(0, shipping);

  function updateItem(id: number, changes: Partial<Item>) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        id: Math.max(0, ...current.map((item) => item.id)) + 1,
        sku: "",
        description: "",
        quantity: 1,
        price: 0,
      },
    ]);
  }

  function uploadLogo(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      window.alert("Upload a PNG, JPG, or WebP logo.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => setLogo(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  function handlePrint() {
    const documentElement = document.getElementById(
      "purchase-order-document"
    );
  
    if (!documentElement) {
      window.alert("Purchase order document not found.");
      return;
    }
  
    const printWindow = window.open("", "_blank");
  
    if (!printWindow) {
      window.alert("Please allow pop-ups to print the purchase order.");
      return;
    }
  
    // Reuse your site's styles so the document keeps its design.
    const styles = Array.from(
      window.document.querySelectorAll('link[rel="stylesheet"]')
    )
      .map((element) => {
        const link = element as HTMLLinkElement;
        return `<link rel="stylesheet" href="${link.href}">`;
      })
      .join("\n");
  
    const inlineStyles = Array.from(
      window.document.querySelectorAll("style")
    )
      .map((element) => element.outerHTML)
      .join("\n");
  
    printWindow.document.open();
  
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Purchase Order</title>
          ${styles}
          ${inlineStyles}
  
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
  
            html,
            body {
              width: auto !important;
              height: auto !important;
              min-height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
              background: #fff !important;
            }
  
            body {
              display: block !important;
            }
  
            #purchase-order-document {
              display: flex !important;
              position: static !important;
              width: 100% !important;
              max-width: none !important;
              height: auto !important;
              min-height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
              border: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              font-size: 9pt !important;
              break-before: auto !important;
              page-break-before: auto !important;
            }
  
            #purchase-order-document * {
              visibility: visible !important;
              box-sizing: border-box;
            }
  
            #purchase-order-document table {
              width: 100% !important;
              table-layout: fixed !important;
              border-collapse: collapse !important;
            }
  
            #purchase-order-document tr {
              break-inside: avoid;
              page-break-inside: avoid;
            }
  
            #purchase-order-document th,
            #purchase-order-document td {
              overflow-wrap: anywhere !important;
            }
  
            #purchase-order-document footer {
              margin-top: 16px !important;
            }
  
            img {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          </style>
        </head>
        <body>
          ${documentElement.outerHTML}
        </body>
      </html>
    `);
  
    printWindow.document.close();
  
    printWindow.onload = () => {
      const images = Array.from(printWindow.document.images);
  
      Promise.all(
        images.map((image) => {
          if (image.complete) return Promise.resolve();
  
          return new Promise<void>((resolve) => {
            image.onload = () => resolve();
            image.onerror = () => resolve();
          });
        })
      ).then(() => {
        printWindow.focus();
        printWindow.print();
      });
    };
  }

  return (
    <>
      <div className="purchase-order-layout mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(360px,0.85fr)_minmax(0,1.15fr)] xl:gap-8">
        {/* Form: hidden when printing */}
        <section className="no-print space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">Purchase order details</h2>

          <label className="block text-sm font-medium">
            Company logo
            <input
              ref={logoRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={uploadLogo}
              className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-1`}
            />
          </label>

          {logo && (
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo preview"
                className="h-14 max-w-40 object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  setLogo("");
                  if (logoRef.current) logoRef.current.value = "";
                }}
                className="text-sm text-red-600"
              >
                Remove logo
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              PO number
              <input
                value={poNo}
                onChange={(e) => setPoNo(e.target.value)}
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium">
              Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inputClass}
              >
                {["USD", "PKR", "GBP", "EUR", "CAD", "AUD", "INR"].map(
                  (code) => (
                    <option key={code}>{code}</option>
                  )
                )}
              </select>
            </label>

            <label className="text-sm font-medium">
              Order date
              <input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium">
              Expected delivery
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <label className="block text-sm font-medium">
            Buyer / your company
            <textarea
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              placeholder={"Company name\nAddress\nEmail / phone / tax ID"}
              rows={3}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium">
            Supplier / vendor
            <textarea
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder={"Supplier name\nAddress\nEmail / phone / tax ID"}
              rows={3}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium">
            Ship to
            <textarea
              value={shipTo}
              onChange={(e) => setShipTo(e.target.value)}
              placeholder={"Delivery address\nContact / phone"}
              rows={2}
              className={inputClass}
            />
          </label>

          <div>
            <h3 className="font-semibold">Line items</h3>

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
                      updateItem(item.id, {
                        description: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </label>

                <label className="text-sm">
                  SKU / code
                  <input
                    value={item.sku}
                    onChange={(e) =>
                      updateItem(item.id, { sku: e.target.value })
                    }
                    className={inputClass}
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
                        quantity: Math.max(
                          0,
                          Number(e.target.value) || 0
                        ),
                      })
                    }
                    className={inputClass}
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
                        price: Math.max(
                          0,
                          Number(e.target.value) || 0
                        ),
                      })
                    }
                    className={inputClass}
                  />
                </label>

                <div className="col-span-2 flex items-center justify-between text-sm">
                  <span>
                    Amount: {money(item.quantity * item.price, currency)}
                  </span>

                  <button
                    type="button"
                    disabled={items.length === 1}
                    onClick={() =>
                      setItems((current) =>
                        current.filter((x) => x.id !== item.id)
                      )
                    }
                    className="text-red-600 disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="mt-3 rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700"
            >
              + Add line item
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              Tax (%)
              <input
                type="number"
                min="0"
                max="100"
                value={taxRate}
                onChange={(e) =>
                  setTaxRate(
                    Math.min(100, Math.max(0, Number(e.target.value) || 0))
                  )
                }
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium">
              Shipping ({currency})
              <input
                type="number"
                min="0"
                step="0.01"
                value={shipping}
                onChange={(e) =>
                  setShipping(Math.max(0, Number(e.target.value) || 0))
                }
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium">
              Payment terms
              <input
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                placeholder="e.g. Net 30"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium">
              Shipping method
              <input
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value)}
                placeholder="e.g. Courier"
                className={inputClass}
              />
            </label>
          </div>

          <label className="block text-sm font-medium">
            Notes / instructions
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </label>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Print / Save as PDF
          </button>

          <p className="text-xs text-slate-500">
            Choose A4 paper and Save as PDF in the print dialog. Purchase
            orders are not stored or sent.
          </p>
        </section>

        {/* Printable document preview */}
        <section className="print-preview-shell min-w-0 rounded-2xl border border-slate-200 bg-slate-100 p-3 sm:p-4 lg:p-5">
          <p className="mb-3 text-sm font-semibold text-slate-600">
            A4 document preview
          </p>

          <article
            id="purchase-order-document"
            className="purchase-order-document mx-auto flex w-full max-w-[210mm] flex-col bg-white px-5 py-6 text-slate-900 shadow-sm sm:px-7 sm:py-8 lg:px-8 lg:py-9"
          >
            <header className="flex items-start justify-between gap-5 border-b-2 border-slate-800 pb-5">
              <div className="min-w-0">
                {logo ? (
                  <img
                    src={logo}
                    alt="Company logo"
                    className="mb-4 max-h-16 max-w-44 object-contain object-left"
                  />
                ) : (
                  <p className="mb-4 text-xs uppercase tracking-widest text-slate-400">
                    Company logo
                  </p>
                )}

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                  Purchase Order
                </p>

                <h2 className="mt-2 break-words text-3xl font-extrabold">
                  {poNo || "PO Number"}
                </h2>
              </div>

              <div className="shrink-0 text-right text-sm">
                <p>
                  <b>Order date:</b> {orderDate || "—"}
                </p>
                <p className="mt-2">
                  <b>Delivery:</b> {deliveryDate || "—"}
                </p>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-5 py-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Buyer
                </h3>
                <p className="mt-2 whitespace-pre-line break-words text-sm leading-6">
                  {buyer || "Your company details"}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Supplier / Vendor
                </h3>
                <p className="mt-2 whitespace-pre-line break-words text-sm leading-6">
                  {vendor || "Supplier details"}
                </p>
              </div>
            </div>

            <div className="mb-5 rounded-md border border-slate-200 p-3 sm:p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ship to
              </h3>

              <p className="mt-2 whitespace-pre-line break-words text-sm leading-6">
                {shipTo || "Delivery address"}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <p>
                  <b>Payment terms:</b> {paymentTerms || "—"}
                </p>
                <p>
                  <b>Shipping:</b> {shippingMethod || "—"}
                </p>
              </div>
            </div>

            <table className="w-full table-fixed border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-100 text-xs uppercase">
                  <th className="w-[36%] border border-slate-300 p-2">
                    Description
                  </th>
                  <th className="w-[17%] border border-slate-300 p-2">
                    SKU
                  </th>
                  <th className="w-[10%] border border-slate-300 p-2 text-right">
                    Qty
                  </th>
                  <th className="w-[18%] border border-slate-300 p-2 text-right">
                    Unit price
                  </th>
                  <th className="w-[19%] border border-slate-300 p-2 text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="break-words border border-slate-300 p-2">
                      {item.description || "—"}
                    </td>
                    <td className="break-words border border-slate-300 p-2">
                      {item.sku || "—"}
                    </td>
                    <td className="border border-slate-300 p-2 text-right">
                      {item.quantity}
                    </td>
                    <td className="break-words border border-slate-300 p-2 text-right">
                      {money(item.price, currency)}
                    </td>
                    <td className="break-words border border-slate-300 p-2 text-right">
                      {money(item.quantity * item.price, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ml-auto mt-6 w-full max-w-xs space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span>Subtotal</span>
                <span>{money(subtotal, currency)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Tax ({taxRate}%)</span>
                <span>{money(tax, currency)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Shipping</span>
                <span>{money(Math.max(0, shipping), currency)}</span>
              </div>

              <div className="flex justify-between gap-4 border-t-2 border-slate-800 pt-3 text-lg font-extrabold">
                <span>Order total</span>
                <span>{money(total, currency)}</span>
              </div>
            </div>

            {notes.trim() && (
              <div className="mt-8 border-t border-slate-200 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Notes / instructions
                </h3>
                <p className="mt-2 whitespace-pre-line break-words text-sm leading-6">
                  {notes}
                </p>
              </div>
            )}

            <div className="mt-10 grid grid-cols-2 gap-10">
              <div>
                <div className="h-8 border-b border-slate-500" />
                <p className="mt-2 text-xs font-semibold">
                  Authorized by / date
                </p>
              </div>

              <div>
                <div className="h-8 border-b border-slate-500" />
                <p className="mt-2 text-xs font-semibold">
                  Supplier confirmation / date
                </p>
              </div>
            </div>

            <footer className="mt-8 border-t border-slate-200 pt-3 text-center text-[10px] text-slate-500">
              Generated with Smartify Commerce · Purchase Order Template
            </footer>
          </article>
        </section>
      </div>

      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 12mm;
        }

        @media print {
            html,
            body {
                display: block !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
                background: #fff !important;
            }

            body * {
                visibility: hidden !important;
            }

            /* Hide the form and preview helper text */
            .no-print,
            .print-preview-shell > p {
                display: none !important;
            }

            /* Remove the surrounding layout's spacing */
            .purchase-order-layout {
                display: block !important;
                position: static !important;
                width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                gap: 0 !important;
                transform: none !important;
            }

            .print-preview-shell {
                display: block !important;
                position: static !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
                border: 0 !important;
                background: #fff !important;
                box-shadow: none !important;
                transform: none !important;
            }

            /* Show only the purchase order */
            #purchase-order-document,
            #purchase-order-document * {
                visibility: visible !important;
            }

            #purchase-order-document {
                display: flex !important;
                position: relative !important;
                inset: auto !important;
                width: 100% !important;
                max-width: none !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 6mm !important;
                overflow: visible !important;
                border: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                font-size: 9pt !important;
                break-before: auto !important;
                page-break-before: auto !important;
            }

            #purchase-order-document header,
            #purchase-order-document table,
            #purchase-order-document footer {
                break-before: auto !important;
                page-break-before: auto !important;
            }

            #purchase-order-document table {
                width: 100% !important;
                table-layout: fixed !important;
                border-collapse: collapse !important;
            }

            #purchase-order-document tr {
                break-inside: avoid !important;
                page-break-inside: avoid !important;
            }

            #purchase-order-document th,
            #purchase-order-document td {
                overflow-wrap: anywhere !important;
            }

            #purchase-order-document footer {
                margin-top: 16px !important;
            }
        }
      `}</style>
    </>
  );
}