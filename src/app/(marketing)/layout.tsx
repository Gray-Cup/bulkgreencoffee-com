import React from "react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import FooterBelow from "@/components/footer-below";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Sticky Header Group */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="w-full">
        <div className="max-w-7xl mx-auto  ">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
      <FooterBelow />
    </div>
  );
}
