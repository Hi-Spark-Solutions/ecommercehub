import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import PurchaseOrderGenerator from "@/features/tools/purchase-order-generator/components/purchase-order-generator";

export const metadata: Metadata = {
  title: "Free Purchase Order Generator | Smartify Commerce",
  description:
    "Create professional purchase orders with your company logo, supplier details, itemized costs, and A4 PDF printing.",
};

export default function PurchaseOrderGeneratorPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <Eyebrow className="block">Commerce Operations</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free Purchase Order Generator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Create branded purchase orders, calculate order totals, and print
            or save your document as a PDF.
          </p>
        </header>

        <PurchaseOrderGenerator />

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to create a purchase order
          </h2>
          <ol className="mt-5 list-inside list-decimal space-y-3 text-slate-600">
            <li>Upload your company logo and enter buyer and supplier details.</li>
            <li>Add products, SKUs, quantities, and unit prices.</li>
            <li>Enter tax, shipping costs, payment terms, and delivery details.</li>
            <li>Review the A4 preview and print or save it as a PDF.</li>
          </ol>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            This browser-based tool does not save purchase orders, send them to
            suppliers, or verify tax compliance.
          </p>
        </div>
      </Container>
    </section>
  );
}