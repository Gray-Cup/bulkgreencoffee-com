import React from "react";
import type { Metadata } from "next";
import { Poppins, Inter, Instrument_Sans, Public_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import RootProviders from "@/components/providers";
import { UserJotWidget } from "@/components/userjot-widget";
import Script from "next/script";
import IntercomChat from "@/components/IntercomChat";
import { WhatsappWidget } from "@/components/whatsapp-widget";
import { OrganizationSchema } from "@/components/seo";
import { Analytics } from "@vercel/analytics/next"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontInstrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const fontPublicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bulkgreencoffee.com"),
  title: {
    default: "Bulk Green Coffee | Indian Specialty Green Coffee for Export",
    template: "%s | Bulk Green Coffee",
  },
  description:
    "Wholesale Indian specialty green coffee for roasters and importers worldwide. Natural, Honey (HSD), and Washed process lots from Koraput (Odisha) and Halflong (Assam). Export-ready with full traceability.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/icon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/icon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    title: "Bulk Green Coffee | Indian Specialty Green Coffee for Export",
    description:
      "Wholesale Indian specialty green coffee for roasters and importers worldwide. Natural, Honey, and Washed lots from Koraput and Halflong. Export-ready with full traceability.",
    images: [
      {
        url: "https://bulkgreencoffee.com/og.png",
        width: 1200,
        height: 630,
        alt: "Bulk Green Coffee — Indian Specialty Green Coffee for Export",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Bulk Green Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Green Coffee | Indian Specialty Green Coffee for Export",
    description:
      "Wholesale Indian specialty green coffee for roasters and importers worldwide. Natural, Honey, and Washed lots from Koraput and Halflong. Export-ready.",
    images: ["https://bulkgreencoffee.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontPoppins.variable,
          fontMono.variable,
          fontInstrumentSans.variable,
          fontPublicSans.variable,
        )}
      >

        <OrganizationSchema />
        <RootProviders>{children}</RootProviders>
        {/* <UserJotWidget /> */}
        <WhatsappWidget />
        <Analytics />
      </body>
    </html>
  );
}
