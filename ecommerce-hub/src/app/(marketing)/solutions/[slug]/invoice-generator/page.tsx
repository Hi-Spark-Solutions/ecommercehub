import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import InvoiceGenerator from "@/features/tools/invoice-generator/components/invoice-generator";

export const metadata: Metadata = {
  title: "Free Invoice Generator | Smartify Commerce",
  description:
    "Create professional invoices online with editable line items, tax, discounts, totals, and PDF printing.",
};

export default function InvoiceGeneratorPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <Eyebrow className="block">Commerce Operations</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free Invoice Generator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Create professional invoices, calculate taxes and discounts, and
            print or save your invoice as a PDF.
          </p>
        </header>

        <InvoiceGenerator />

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to create an invoice
          </h2>
          <ol className="mt-5 list-inside list-decimal space-y-3 text-slate-600">
            <li>Enter your business and customer details.</li>
            <li>Add products or services, quantities, and prices.</li>
            <li>Apply any discount and tax rate.</li>
            <li>Review the invoice and print or save it as a PDF.</li>
          </ol>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            This is a browser-based invoice creation tool. It does not save
            invoices, send them to customers, or verify tax compliance.
          </p>
        </div>
      </Container>
    </section>
  );
}