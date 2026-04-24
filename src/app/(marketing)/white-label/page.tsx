import React from "react";
import { Button } from "@/components/ui/button";

export default function WhiteLabelPage() {
  return (
    <div className="min-h-screen py-20 px-4 lg:px-6">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
            White Label
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3">
            Your Brand. Our Tea & Coffee.
          </h1>
          <p className="text-md text-muted-foreground max-w-xl">
            We can be your sourcing partner — supplying premium quality tea and
            coffee under your brand name. Simple, reliable, and scalable.
          </p>
        </div>

        <hr className="mb-12" />

        {/* What we offer */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-black mb-4">
            What we offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 border rounded-lg">
              <p className="font-medium text-black mb-1">Product Sourcing</p>
              <p className="text-sm text-muted-foreground">
                We source and supply tea leaves, CTC, and coffee beans from
                India — ready to carry your label.
              </p>
            </div>
            <div className="p-5 border rounded-lg">
              <p className="font-medium text-black mb-1">Flexible Quantities</p>
              <p className="text-sm text-muted-foreground">
                Whether you're starting small or scaling up, we accommodate
                orders of all sizes with consistent quality.
              </p>
            </div>
            <div className="p-5 border rounded-lg">
              <p className="font-medium text-black mb-1">Quality Assurance</p>
              <p className="text-sm text-muted-foreground">
                Every batch is quality-checked before dispatch. You get what you
                expect, every time.
              </p>
            </div>
            <div className="p-5 border rounded-lg">
              <p className="font-medium text-black mb-1">Worldwide Shipping</p>
              <p className="text-sm text-muted-foreground">
                We ship globally. If you have a market, we can reach it.
              </p>
            </div>
          </div>
        </div>

        {/* Packaging note */}
        <div className="mb-12 p-5 border border-neutral-200 rounded-lg bg-neutral-50">
          <p className="text-sm font-semibold text-black mb-1">
            A note on packaging
          </p>
          <p className="text-sm text-muted-foreground">
            We focus entirely on sourcing — we do not provide custom packaging.
            For branded packaging, we recommend{" "}
            <a
              href="https://www.swisspac.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline underline-offset-4 hover:text-neutral-600"
            >
              SwissPac
            </a>
            , a trusted packaging partner used by many brands worldwide.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="https://wa.me/918527914317?text=Hi%2C%20I%20found%20the%20White%20Label%20page%20on%20bulkgreencoffee.com%20and%20I%20would%20like%20to%20enquire%20about%20it."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="black" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message us on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
