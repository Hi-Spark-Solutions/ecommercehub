import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

const siteUrl = "https://ecommercehub.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ecommerce Hub — One platform for omnichannel commerce",
    template: "%s · Ecommerce Hub",
  },
  description:
    "Ecommerce Hub is the commerce operating system for modern brands. Manage products, orders, inventory, customers and every sales channel from one place.",
  keywords: [
    "omnichannel commerce",
    "ecommerce operations",
    "order management",
    "inventory management",
    "multi-channel selling",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ecommerce Hub",
    title: "Ecommerce Hub — One platform for omnichannel commerce",
    description:
      "The commerce operating system for modern brands. Connect every channel, automate operations, and grow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Hub — One platform for omnichannel commerce",
    description:
      "The commerce operating system for modern brands. Connect every channel, automate operations, and grow.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
