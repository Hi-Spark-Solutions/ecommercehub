import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/marketing/primitives";
import QRCodeGenerator from "@/features/tools/qr-code-generator/components/qr-code-generator";

export const metadata: Metadata = {
  title: "Free QR Code Generator | Ecommerce Hub",
  description:
    "Create custom QR codes for URLs and text. Customize colors, size, and error correction, then download PNG or SVG.",
};

export default function QRCodeGeneratorPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-6xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <Eyebrow className="block">Commerce Operations</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free Custom QR Code Generator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Create QR codes for product pages, websites, promotions, and other
            content. Customize the design and download your code instantly.
          </p>
        </header>

        <QRCodeGenerator />

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            How to create a custom QR code
          </h2>
          <ol className="mt-5 list-inside list-decimal space-y-3 text-slate-600">
            <li>Enter the URL or text you want to share.</li>
            <li>Customize the QR code and background colors.</li>
            <li>Choose the image size and error correction level.</li>
            <li>Download as PNG or scalable SVG.</li>
          </ol>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            This generator creates static QR codes. Changing the destination
            requires generating a new code; link tracking and dynamic redirects
            are not included.
          </p>
        </div>
      </Container>
    </section>
  );
}