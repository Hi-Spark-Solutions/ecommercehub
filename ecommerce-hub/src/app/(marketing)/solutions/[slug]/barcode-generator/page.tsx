import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import BarcodeGenerator from "@/features/tools/barcode-generator/components/barcode-generator";

export const metadata: Metadata = {
  title: "Free Barcode Generator | Smartify Commerce",
  description:
    "Generate product barcodes online. Customize barcode formats and colors, preview instantly, and download PNG or SVG files.",
};

export default function BarcodeGeneratorPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Eyebrow className="block">Commerce Operations</Eyebrow>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free Barcode Generator
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Create customized barcodes for product identification, inventory,
            and retail workflows. Preview your barcode and download it in
            seconds.
          </p>
        </div>

        <BarcodeGenerator />

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to generate a barcode
          </h2>
          <ol className="mt-5 list-inside list-decimal space-y-3 text-slate-600">
            <li>Enter a product SKU or supported barcode value.</li>
            <li>Select a barcode format appropriate for your use case.</li>
            <li>Customize the colors and whether the value is displayed.</li>
            <li>Preview the result and download PNG or SVG.</li>
          </ol>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            This tool generates barcode images; it does not register product
            identifiers or issue official GS1 numbers. Confirm identifier
            requirements with your retailer or standards provider.
          </p>
        </div>
      </Container>
    </section>
  );
}