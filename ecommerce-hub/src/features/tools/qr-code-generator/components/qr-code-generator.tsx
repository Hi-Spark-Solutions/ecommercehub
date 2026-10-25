"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [value, setValue] = useState("https://example.com");
  const [foreground, setForeground] = useState("#111827");
  const [background, setBackground] = useState("#ffffff");
  const [size, setSize] = useState(320);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function generate() {
      if (!value.trim()) {
        setPreview("");
        setError("Enter text or a URL to generate a QR code.");
        return;
      }

      try {
        const result = await QRCode.toDataURL(value, {
          width: size,
          margin: 4,
          errorCorrectionLevel: level,
          color: { dark: foreground, light: background },
        });

        if (active) {
          setPreview(result);
          setError("");
        }
      } catch {
        if (active) {
          setPreview("");
          setError("Could not generate the QR code. Try shorter content.");
        }
      }
    }

    void generate();

    return () => {
      active = false;
    };
  }, [value, foreground, background, size, level]);

  async function downloadSvg() {
    if (!value.trim() || error) return;

    try {
      const svg = await QRCode.toString(value, {
        type: "svg",
        width: size,
        margin: 4,
        errorCorrectionLevel: level,
        color: { dark: foreground, light: background },
      });

      downloadFile(
        new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
        "qr-code.svg",
      );
    } catch {
      setError("SVG download failed. Please try again.");
    }
  }

  function downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadPng() {
    if (!preview || error) return;

    fetch(preview)
      .then((response) => response.blob())
      .then((blob) => downloadFile(blob, "qr-code.png"))
      .catch(() => setError("PNG download failed. Please try again."));
  }

  function reset() {
    setValue("https://example.com");
    setForeground("#111827");
    setBackground("#ffffff");
    setSize(320);
    setLevel("M");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Customize your QR code
        </h2>

        <label className="mt-6 block text-sm font-medium text-slate-700">
          Text or URL
        </label>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={4000}
          rows={4}
          placeholder="Enter a website URL, text, or other content"
          className="mt-2 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-5 grid grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700">
            QR color
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="mt-2 block h-11 w-full rounded border p-1"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Background
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="mt-2 block h-11 w-full rounded border p-1"
            />
          </label>
        </div>

        <label className="mt-5 block text-sm font-medium text-slate-700">
          Image size: {size}px
          <input
            type="range"
            min={160}
            max={640}
            step={40}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="mt-3 w-full accent-blue-600"
          />
        </label>

        <label className="mt-5 block text-sm font-medium text-slate-700">
          Error correction
          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as "L" | "M" | "Q" | "H")
            }
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
          >
            <option value="L">Low — 7%</option>
            <option value="M">Medium — 15%</option>
            <option value="Q">Quartile — 25%</option>
            <option value="H">High — 30%</option>
          </select>
        </label>

        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          Reset settings
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Live preview</h2>
        <p className="mt-2 text-sm text-slate-600">
          Scan the code to check its content before downloading.
        </p>

        <div className="mt-6 flex min-h-80 items-center justify-center rounded-xl border border-slate-200 bg-white p-4">
          {preview && !error && (
            <img
              src={preview}
              alt="Generated QR code preview"
              className="h-auto max-w-full"
              style={{ width: size }}
            />
          )}
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={downloadPng}
            disabled={!preview || !!error}
            className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={downloadSvg}
            disabled={!preview || !!error}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-50"
          >
            Download SVG
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Keep strong contrast between the QR code and background. Test
          scanning before printing or publishing.
        </p>
      </section>
    </div>
  );
}