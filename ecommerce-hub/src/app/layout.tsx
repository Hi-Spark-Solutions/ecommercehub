import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { GoogleTagManager } from '@next/third-parties/google'


const siteUrl = "https://smartifycommerce.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Smartify Commerce — One platform for omnichannel commerce",
    template: "%s · Smartify Commerce",
  },
  description:
    "Smartify Commerce is the commerce operating system for modern brands. Manage products, orders, inventory, customers and every sales channel from one place.",
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
    siteName: "Smartify Commerce",
    title: "Smartify Commerce — One platform for omnichannel commerce",
    description:
      "The commerce operating system for modern brands. Connect every channel, automate operations, and grow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smartify Commerce — One platform for omnichannel commerce",
    description:
      "The commerce operating system for modern brands. Connect every channel, automate operations, and grow.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
          </>
        )}
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_ID!}
      />
    </html>
  );
}
