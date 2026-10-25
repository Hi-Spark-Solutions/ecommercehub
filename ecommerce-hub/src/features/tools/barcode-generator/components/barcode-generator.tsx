"use client";

import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";

const formats = [
  { label: "Code 128 — General purpose", value: "CODE128" },
  { label: "Code 39", value: "CODE39" },
  { label: "EAN-13 — Retail", value: "EAN13" },
  { label: "EAN-8 — Retail", value: "EAN8" },
  { label: "UPC-A — Retail", value: "UPC" },
  { label: "ITF-14 — Cartons", value: "ITF14" },
  { label: "Codabar", value: "codabar" },
];

export default function BarcodeGenerator() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [value, setValue] = useState("EH-2026-001");
  const [format, setFormat] = useState("CODE128");
  const [lineColor, setLineColor] = useState("#111827");
  const [background, setBackground] = useState("#ffffff");
  const [showText, setShowText] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.replaceChildren();
    setError("");

    if (!value.trim()) {
      setError("Enter a value to generate your barcode.");
      return;
    }

    try {
      JsBarcode(svg, value.trim(), {
        format,
        lineColor,
        background,
        width: 2,
        height: 90,
        displayValue: showText,
        fontSize: 16,
        margin: 12,
      });
    } catch {
      setError(
        `This value is not valid for ${format}. Check the required digits and format.`,
      );
    }
  }, [value, format, lineColor, background, showText]);

  function downloadSvg() {
    if (!svgRef.current || error) return;

    const blob = new Blob(
      [new XMLSerializer().serializeToString(svgRef.current)],
      { type: "image/svg+xml;charset=utf-8" },
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "barcode.svg";
    link.click();
    URL.revokeObjectURL(url);
  }

  function downloadPng() {
    if (!svgRef.current || error) return;

    const svgBlob = new Blob(
      [new XMLSerializer().serializeToString(svgRef.current)],
      { type: "image/svg+xml;charset=utf-8" },
    );

    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width * 2;
      canvas.height = image.height * 2;

      const context = canvas.getContext("2d");

      if (context) {
        context.scale(2, 2);
        context.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return;

          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = "barcode.png";
          link.click();
          URL.revokeObjectURL(pngUrl);
        }, "image/png");
      }

      URL.revokeObjectURL(url);
    };

    image.onerror = () => URL.revokeObjectURL(url);
    image.src = url;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Customize barcode
        </h2>

        <label className="mt-6 block text-sm font-medium text-slate-700">
          Barcode value
        </label>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter product code or SKU"
          maxLength={100}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <label className="mt-5 block text-sm font-medium text-slate-700">
          Barcode format
        </label>
        <select
          value={format}
          onChange={(event) => setFormat(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
        >
          {formats.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700">
            Barcode color
            <input
              type="color"
              value={lineColor}
              onChange={(event) => setLineColor(event.target.value)}
              className="mt-2 block h-11 w-full cursor-pointer rounded border p-1"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Background color
            <input
              type="color"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
              className="mt-2 block h-11 w-full cursor-pointer rounded border p-1"
            />
          </label>
        </div>

        <label className="mt-5 flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={showText}
            onChange={(event) => setShowText(event.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          Show value below barcode
        </label>

        <button
          type="button"
          onClick={() => {
            setValue("EH-2026-001");
            setFormat("CODE128");
            setLineColor("#111827");
            setBackground("#ffffff");
            setShowText(true);
          }}
          className="mt-6 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          Reset settings
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Preview</h2>
        <p className="mt-2 text-sm text-slate-600">
          Your barcode updates automatically as you edit it.
        </p>

        <div className="mt-6 flex min-h-56 items-center justify-center overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
          <svg
            ref={svgRef}
            role="img"
            aria-label="Generated barcode preview"
            className="max-w-full"
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={downloadPng}
            disabled={!!error}
            className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={downloadSvg}
            disabled={!!error}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download SVG
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Check your barcode format and scan quality before using it on
          products or packaging. Retail formats may require specific digit
          lengths and valid check digits.
        </p>
      </section>
    </div>
  );
}