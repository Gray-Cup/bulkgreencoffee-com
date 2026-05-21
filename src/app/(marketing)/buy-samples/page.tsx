"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { products } from "@/data/products";
import { CheckoutForm } from "@/components/buy-samples/CheckoutForm";
import { useCurrency } from "@/components/currency-provider";
import { formatPrice, convertPrice } from "@/lib/currency";

const TIERS = [
  { label: "100g", grams: 100,  packaging: 30 },
  { label: "1kg",  grams: 1000, packaging: 0  },
  { label: "3kg",  grams: 3000, packaging: 0  },
  { label: "5kg",  grams: 5000, packaging: 0  },
] as const;

type TierLabel = (typeof TIERS)[number]["label"];
type SelectedItem = { slug: string; tier: TierLabel };

function calcPrice(pricePerKg: number, grams: number, packaging: number) {
  return Math.round((pricePerKg * grams) / 1000) + packaging;
}

function AddProductCard({
  product,
  defaultTier,
  onAdd,
}: {
  product: (typeof products)[number];
  defaultTier: TierLabel;
  onAdd: (tier: TierLabel) => void;
}) {
  const [tier, setTier] = useState<TierLabel>(defaultTier);
  const { currency, rates } = useCurrency();
  const tierData = TIERS.find((t) => t.label === tier)!;
  const priceINR = calcPrice(product.priceRange.min, tierData.grams, tierData.packaging);
  const fmt = (inr: number) => formatPrice(convertPrice(inr, currency, rates), currency);

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image src={product.image} alt={product.name} fill draggable={false} className="object-contain p-4" />
      </div>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <p className="font-semibold text-sm text-black leading-tight">{product.name}</p>
          {product.region && <p className="text-xs text-muted-foreground mt-0.5">{product.region}</p>}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {TIERS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setTier(t.label)}
              className={`px-3 py-1 text-sm rounded-lg border font-medium transition-colors cursor-pointer ${
                tier === t.label
                  ? "bg-neutral-800 border-neutral-800 text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-base font-semibold text-black">{fmt(priceINR)}</p>
        <button
          type="button"
          onClick={() => onAdd(tier)}
          className="w-full py-2.5 text-sm font-medium bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors cursor-pointer"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

function BuySamplesInner() {
  const searchParams = useSearchParams();
  const preselected  = searchParams.get("product");

  const [step,       setStep]       = useState<"select" | "checkout">("select");
  const [activeTier, setActiveTier] = useState<TierLabel>(() => {
    if (typeof window === "undefined") return "100g";
    return (localStorage.getItem("bgc_tier") as TierLabel) ?? "100g";
  });
  const [selected, setSelected] = useState<SelectedItem[]>(() => {
    if (typeof window === "undefined") return preselected ? [{ slug: preselected, tier: "100g" }] : [];
    try {
      const raw = localStorage.getItem("bgc_selected");
      if (!raw) return preselected ? [{ slug: preselected, tier: "100g" }] : [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return preselected ? [{ slug: preselected, tier: "100g" }] : [];
      // Migrate old string[] format
      const normalized: SelectedItem[] = parsed.map((s: string | SelectedItem) =>
        typeof s === "string" ? { slug: s, tier: "100g" as TierLabel } : s
      );
      if (preselected && !normalized.find((s) => s.slug === preselected)) {
        return [...normalized, { slug: preselected, tier: "100g" }];
      }
      return normalized;
    } catch {
      return preselected ? [{ slug: preselected, tier: "100g" }] : [];
    }
  });

  const [showItemsOpen, setShowItemsOpen] = useState(false);

  const selectedSlugs    = selected.map((s) => s.slug);
  const selectedProducts = selected
    .map((s) => {
      const product  = products.find((p) => p.slug === s.slug);
      const tierData = TIERS.find((t) => t.label === s.tier)!;
      return product ? { product, tier: s.tier as TierLabel, tierData } : null;
    })
    .filter(Boolean) as { product: (typeof products)[number]; tier: TierLabel; tierData: (typeof TIERS)[number] }[];

  const unselectedProducts = products.filter((p) => !selectedSlugs.includes(p.slug));

  const orderTotal = selectedProducts.reduce(
    (sum, { product, tierData }) => sum + calcPrice(product.priceRange.min, tierData.grams, tierData.packaging),
    0,
  );

  const { currency, rates } = useCurrency();
  const fmt = (inr: number) => formatPrice(convertPrice(inr, currency, rates), currency);

  // Tier for the selection grid prices
  const gridTier = TIERS.find((t) => t.label === activeTier)!;

  const toggle = (slug: string) =>
    setSelected((prev) =>
      prev.find((s) => s.slug === slug && s.tier === activeTier)
        ? prev.filter((s) => !(s.slug === slug && s.tier === activeTier))
        : [...prev, { slug, tier: activeTier }],
    );

  // Dominant tier for the checkout form (used for tax field logic)
  const tierCounts = selected.reduce((acc, s) => { acc[s.tier] = (acc[s.tier] ?? 0) + 1; return acc; }, {} as Record<string, number>);
  const quantityTier = (Object.entries(tierCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "100g") as TierLabel;

  React.useEffect(() => { localStorage.setItem("bgc_selected", JSON.stringify(selected)); }, [selected]);
  React.useEffect(() => { localStorage.setItem("bgc_tier", activeTier); }, [activeTier]);
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [step]);

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
              const isSelected = selected.some((s) => s.slug === product.slug && s.tier === activeTier);
              const price      = calcPrice(product.priceRange.min, gridTier.grams, gridTier.packaging);
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
                      <p className="text-xs text-muted-foreground">{gridTier.label}</p>
                      <p className="text-base font-semibold text-black">{fmt(price)}</p>
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
          className={`fixed bottom-0 inset-x-0 z-40 bg-yellow-200 shadow-lg transition-transform duration-300 ${
            selected.length > 0 ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-black text-sm">
                {selected.length} item{selected.length !== 1 ? "s" : ""}
              </p>
              <p className="text-md sm:text-lg md:text-xl font-semibold text-black">{fmt(orderTotal)}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelected([])}
                className="text-sm font-medium text-black/50 hover:text-red-500 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <Button variant="outline" size="lg" className="border-black/20 bg-yellow-100 hover:bg-yellow-50" onClick={() => setShowItemsOpen(true)}>
                Show Items
              </Button>
              <Button variant="teal" size="lg" onClick={() => setStep("checkout")}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>

        {/* Show Items dialog */}
        <Dialog open={showItemsOpen} onOpenChange={setShowItemsOpen}>
          <DialogContent className="sm:max-w-2xl flex flex-col" style={{ maxHeight: "80vh" }}>
            <DialogHeader>
              <DialogTitle>Your Items ({selected.length})</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 -mx-6 px-6">
              {/* Mobile: rows */}
              <div className="flex flex-col divide-y divide-gray-100 sm:hidden">
                {selectedProducts.map(({ product, tier: itemTier, tierData }) => {
                  const price = calcPrice(product.priceRange.min, tierData.grams, tierData.packaging);
                  return (
                    <div key={`${product.slug}-${itemTier}`} className="py-3 flex items-start gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-black leading-tight">{product.name}</p>
                          <div className="flex items-center gap-2 shrink-0">
                            <p className="text-sm font-semibold text-black">{fmt(price)}</p>
                            <button
                              type="button"
                              onClick={() => setSelected((prev) => prev.filter((s) => !(s.slug === product.slug && s.tier === itemTier)))}
                              className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {TIERS.map((t) => (
                            <button
                              key={t.label}
                              type="button"
                              onClick={() =>
                                setSelected((prev) =>
                                  prev.map((s) =>
                                    s.slug === product.slug && s.tier === itemTier ? { ...s, tier: t.label } : s
                                  )
                                )
                              }
                              className={`px-3 py-1 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                                itemTier === t.label
                                  ? "bg-neutral-800 border-neutral-800 text-white"
                                  : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: cards grid */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-3 py-2">
                {selectedProducts.map(({ product, tier: itemTier, tierData }) => {
                  const price = calcPrice(product.priceRange.min, tierData.grams, tierData.packaging);
                  return (
                    <div key={`${product.slug}-${itemTier}`} className="relative flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setSelected((prev) => prev.filter((s) => !(s.slug === product.slug && s.tier === itemTier)))}
                        className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors text-sm leading-none bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                      >
                        ✕
                      </button>
                      <div className="relative aspect-square bg-gray-50 overflow-hidden">
                        <Image src={product.image} alt={product.name} fill className="object-contain p-3" />
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <p className="text-xs font-semibold text-black leading-tight">{product.name}</p>
                        <div className="flex gap-1 flex-wrap">
                          {TIERS.map((t) => (
                            <button
                              key={t.label}
                              type="button"
                              onClick={() =>
                                setSelected((prev) =>
                                  prev.map((s) =>
                                    s.slug === product.slug && s.tier === itemTier ? { ...s, tier: t.label } : s
                                  )
                                )
                              }
                              className={`px-2 py-0.5 text-xs rounded-md border font-medium transition-colors cursor-pointer ${
                                itemTier === t.label
                                  ? "bg-neutral-800 border-neutral-800 text-white"
                                  : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm font-semibold text-black">{fmt(price)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {selectedProducts.length > 0 && (
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-sm font-semibold text-black">{fmt(orderTotal)}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
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
            products={selectedSlugs}
            quantityTier={quantityTier}
            totalAmount={orderTotal}
            onBack={() => setStep("select")}
          />

          {/* Right: order summary */}
          <div className="rounded-2xl border border-gray-200 sticky top-8 max-h-[80vh] overflow-y-auto">
            {selectedProducts.map(({ product, tier: itemTier, tierData }, i) => {
              const price = calcPrice(product.priceRange.min, tierData.grams, tierData.packaging);
              return (
                <div
                  key={`${product.slug}-${itemTier}`}
                  className={`px-4 py-3 ${i < selectedProducts.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0 mt-0.5">
                      <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-black leading-tight">{product.name}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <p className="text-sm font-semibold text-black">{fmt(price)}</p>
                          <button
                            type="button"
                            onClick={() => setSelected((prev) => prev.filter((s) => !(s.slug === product.slug && s.tier === itemTier)))}
                            className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {TIERS.map((t) => (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() =>
                              setSelected((prev) =>
                                prev.map((s) =>
                                  s.slug === product.slug && s.tier === itemTier ? { ...s, tier: t.label } : s
                                )
                              )
                            }
                            className={`px-3 py-1 text-sm rounded-lg border font-medium transition-colors cursor-pointer ${
                              itemTier === t.label
                                ? "bg-neutral-800 border-neutral-800 text-white"
                                : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {selectedProducts.length > 0 && (
              <div className="flex justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-sm font-semibold text-black">{fmt(orderTotal)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Add more — below everything, card grid */}
        {unselectedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-black mb-1">Add more samples</h2>
            <p className="text-sm text-muted-foreground mb-6">Pick a size and add to your order.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {unselectedProducts.map((product) => (
                <AddProductCard
                  key={product.slug}
                  product={product}
                  defaultTier={activeTier}
                  onAdd={(tier: TierLabel) => {
                    setSelected((prev) => [...prev, { slug: product.slug, tier }]);
                  }}
                />
              ))}
            </div>
          </div>
        )}
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
