import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import ShippingLabelMaker from "@/features/tools/shipping-label-maker/components/shipping-label-maker";

export const metadata: Metadata = {
  title: "Free Shipping Label Maker | Smartify Commerce",
  description:
    "Create printable shipping labels with sender and recipient addresses, order references, package weight, and PDF printing.",
};

export default function ShippingLabelMakerPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <Eyebrow className="block">Commerce Operations</Eyebrow>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free Shipping Label Maker
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Create shipping labels with sender and recipient details, package
            information, and printable layouts for your fulfillment workflow.
          </p>
        </header>

        <ShippingLabelMaker />

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to create a shipping label
          </h2>

          <ol className="mt-5 list-inside list-decimal space-y-3 text-slate-600">
            <li>Enter the sender and recipient addresses.</li>
            <li>Add order details, package weight, and shipping service.</li>
            <li>Select a 4 × 6 inch label or A4 layout.</li>
            <li>Preview your label and print it or save it as a PDF.</li>
          </ol>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            This tool creates printable label layouts, not official carrier
            shipping labels. The displayed barcode area is a placeholder.
            Carrier postage, validated tracking barcodes, and shipping
            integrations are not included.
          </p>
        </div>
      </Container>
    </section>
  );
}