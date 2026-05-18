"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { CheckoutForm } from "@/components/buy-samples/CheckoutForm";

const TIERS = [
  { label: "100g", grams: 100,  packaging: 30 },
  { label: "1kg",  grams: 1000, packaging: 0  },
  { label: "3kg",  grams: 3000, packaging: 0  },
  { label: "5kg",  grams: 5000, packaging: 0  },
] as const;

type TierLabel = (typeof TIERS)[number]["label"];

function calcPrice(pricePerKg: number, grams: number, packaging: number) {
  return Math.round((pricePerKg * grams) / 1000) + packaging;
}

function BuySamplesInner() {
  const searchParams   = useSearchParams();
  const preselected    = searchParams.get("product");

  const [step,       setStep]       = useState<"select" | "checkout">("select");
  const [activeTier, setActiveTier] = useState<TierLabel>(() => {
    if (typeof window === "undefined") return "100g";
    return (localStorage.getItem("bgc_tier") as TierLabel) ?? "100g";
  });
  const [selected,   setSelected]   = useState<string[]>(() => {
    if (typeof window === "undefined") return preselected ? [preselected] : [];
    try {
      const saved: string[] = JSON.parse(localStorage.getItem("bgc_selected") ?? "[]");
      if (!Array.isArray(saved)) return preselected ? [preselected] : [];
      if (preselected && !saved.includes(preselected)) return [...saved, preselected];
      return saved.length > 0 ? saved : (preselected ? [preselected] : []);
    } catch {
      return preselected ? [preselected] : [];
    }
  });

  const tier          = TIERS.find((t) => t.label === activeTier)!;
  const selectedItems = products.filter((p) => selected.includes(p.slug));
  const orderTotal    = selectedItems.reduce(
    (sum, p) => sum + calcPrice(p.priceRange.min, tier.grams, tier.packaging),
    0,
  );

  const toggle = (slug: string) =>
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );

  React.useEffect(() => { localStorage.setItem("bgc_selected", JSON.stringify(selected)); }, [selected]);
  React.useEffect(() => { localStorage.setItem("bgc_tier", activeTier); }, [activeTier]);

  /* ── STEP 1: product selection ───────────────────────────────────── */
  if (step === "select") {
    return (
      <div className="min-h-screen pb-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-12 pb-6">
          <h1 className="text-3xl font-semibold text-black mb-2">Buy Samples</h1>
          <p className="text-muted-foreground max-w-xl">
            Pick the coffees you want to try and choose your quantity.
          </p>
        </div>

        {/* Quantity tabs */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-8">
          <div className="inline-flex gap-1 bg-gray-100 rounded-xl p-1">
            {TIERS.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setActiveTier(t.label)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTier === t.label
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => {
              const isSelected = selected.includes(product.slug);
              const price      = calcPrice(product.priceRange.min, tier.grams, tier.packaging);
              return (
                <div
                  key={product.slug}
                  className={`relative flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-150 ${
                    isSelected
                      ? "border-teal-500 ring-2 ring-teal-400/40 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 bg-teal-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      Selected
                    </div>
                  )}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      draggable={false}
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-black leading-tight">{product.name}</p>
                      {product.region && (
                        <p className="text-xs text-muted-foreground mt-0.5">{product.region}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{tier.label}</p>
                      <p className="text-base font-semibold text-black">₹{price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(product.slug)}
                      className={`w-full h-9 cursor-pointer rounded-xl text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {isSelected ? "Remove" : "Select Sample"}
                    </button>
                    <Link
                      href={`/buy-samples/${product.slug}`}
                      className="w-full h-9 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-black flex items-center justify-center transition-colors"
                    >
                      Buy now →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div
          className={`fixed bottom-0 inset-x-0 z-40 bg-yellow-200 border-t-[5px] border-neutral-800 shadow-lg transition-transform duration-200 ${
            selected.length > 0 ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex  items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-black text-sm">
                {selected.length} product{selected.length !== 1 ? "s" : ""}
              </p>
              <p className="text-md sm:text-lg md:text-xl font-semibold text-black">₹{orderTotal}</p>
            </div>
            <Button variant="teal" size="lg" className="shrink-0" onClick={() => setStep("checkout")}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ── STEP 2: checkout ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-semibold text-black mb-2">Your order</h1>
        <p className="text-muted-foreground mb-8">Fill in your details and we&apos;ll ship your samples.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: form */}
          <CheckoutForm
            products={selected}
            quantityTier={activeTier}
            totalAmount={orderTotal}
            onBack={() => setStep("select")}
          />

          {/* Right: order summary */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden sticky top-8">
            {selectedItems.map((product, i) => {
              const price = calcPrice(product.priceRange.min, tier.grams, tier.packaging);
              return (
                <div
                  key={product.slug}
                  className={`flex items-center gap-4 px-4 py-3 ${i < selectedItems.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{tier.label}</p>
                  </div>
                  <p className="text-sm font-semibold text-black shrink-0">₹{price}</p>
                  <button
                    type="button"
                    onClick={() => toggle(product.slug)}
                    className="text-xs text-muted-foreground hover:text-red-500 transition-colors shrink-0"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            {selectedItems.length > 0 && (
              <div className="flex justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-sm font-semibold text-black">₹{orderTotal}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuySamplesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BuySamplesInner />
    </Suspense>
  );
}
