
import type { Metadata } from "next";
import { Container } from "@/components/marketing/primitives";
import BillOfLadingGenerator from "@/features/tools/bill-of-lading-generator/components/bill-of-lading-generator";

export const metadata: Metadata = {
  title: "Free Bill of Lading Generator",
  description:
    "Create a printable bill of lading with shipper, consignee, carrier, freight details, package counts, and shipment instructions.",
  alternates: {
    canonical: "/solutions/commerce-operations/bill-of-lading-generator",
  },
};

export default function BillOfLadingGeneratorPage() {
  return (
    <main>
      <section className="bg-gradient-to-b from-blue-50 to-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-semibold text-blue-700">
              Commerce Operations
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Free Bill of Lading Generator
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Prepare a clear, printable freight document with shipper,
              consignee, carrier, and cargo details. Preview your bill of
              lading and print or save it as a PDF.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-screen-2xl">
          <BillOfLadingGenerator />
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to create a bill of lading
          </h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-slate-600">
            <li>Enter the shipment number, date, carrier, and freight terms.</li>
            <li>Add the shipper and consignee contact information.</li>
            <li>Describe each freight item, package count, weight, and applicable handling details.</li>
            <li>Review the generated document for accuracy.</li>
            <li>Print the document or select Save as PDF in your browser.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Important information
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            This tool generates a general-purpose, non-negotiable template.
            It is not a carrier-issued bill of lading, shipping label, or
            confirmation of shipment acceptance. Carrier requirements and
            applicable transportation regulations may differ. Verify the
            completed document with your carrier before shipping.
          </p>
        </Container>
      </section>
    </main>
  );
}
