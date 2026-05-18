"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import { products } from "@/data/products";

const businessCategories = [
  { id: "roastery", label: "Roastery" },
  { id: "cafe", label: "Cafe" },
  { id: "hotel", label: "Hotel" },
  { id: "restaurant", label: "Restaurant" },
  { id: "importer", label: "Importer / Distributor" },
  { id: "other", label: "Other" },
];

function BuySamplesInner() {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get("product");

  const initialSelected = preselectedSlug
    ? products.filter((p) => p.slug === preselectedSlug).map((p) => p.slug)
    : [];

  const [step, setStep] = useState<"select" | "checkout">("select");
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const turnstile = useTurnstile();

  const toggle = (slug: string) =>
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );

  const selectedItems = products.filter((p) => selected.includes(p.slug));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: companyName,
          customerPhone: phone,
          customerEmail: email || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create payment link");
      window.location.href = data.paymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  /* ── STEP 1: product selection ───────────────────────────────────── */
  if (step === "select") {
    return (
      <div className="min-h-screen pb-32">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-12 pb-8">
          <h1 className="text-3xl font-semibold text-black mb-2">Buy Samples</h1>
          <p className="text-muted-foreground max-w-xl">
            Pick the coffees you want to try. We&apos;ll ship 100g samples directly to you.
          </p>
        </div>

        {/* Product grid */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => {
              const isSelected = selected.includes(product.slug);
              const price100g = Math.round(product.priceRange.min / 10) + 30;
              return (
                <div
                  key={product.slug}
                  className={`relative flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-150 ${
                    isSelected
                      ? "border-teal-500 ring-2 ring-teal-400/40 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {/* Selected badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 bg-teal-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      Selected
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      draggable={false}
                      className="object-contain p-4"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-black leading-tight">
                        {product.name}
                      </p>
                      {product.region && (
                        <p className="text-xs text-muted-foreground mt-0.5">{product.region}</p>
                      )}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">100g sample</p>
                        <p className="text-base font-semibold text-black">
                          ₹{price100g}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggle(product.slug)}
                      className={`w-full h-9 rounded-xl text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {isSelected ? "Remove" : "Add to order"}
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
          className={`fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-lg transition-all duration-200 ${
            selected.length > 0 ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-black text-sm">
                {selected.length} product{selected.length !== 1 ? "s" : ""} selected
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedItems.map((p) => p.name).join(", ")}
              </p>
            </div>
            <Button
              variant="teal"
              size="lg"
              className="shrink-0"
              onClick={() => setStep("checkout")}
            >
              Proceed to checkout →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ── STEP 2: checkout form ───────────────────────────────────────── */
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back */}
        <button
          type="button"
          onClick={() => setStep("select")}
          className="text-sm text-muted-foreground hover:text-black mb-8 flex items-center gap-1 transition-colors"
        >
          ← Back to products
        </button>

        <h1 className="text-3xl font-semibold text-black mb-2">Your order</h1>
        <p className="text-muted-foreground mb-8">Fill in your details and we&apos;ll ship your samples.</p>

        {/* Order summary */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden mb-8">
          {selectedItems.map((product, i) => {
            const price100g = Math.round(product.priceRange.min / 10) + 30;
            return (
              <div
                key={product.slug}
                className={`flex items-center gap-4 px-4 py-3 ${
                  i < selectedItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">100g sample</p>
                </div>
                <p className="text-sm font-semibold text-black shrink-0">₹{price100g}</p>
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
          {selectedItems.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No products selected.{" "}
              <button type="button" onClick={() => setStep("select")} className="underline">
                Go back
              </button>
            </p>
          )}
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="company">Company / Business Name</Label>
            <Input
              id="company"
              placeholder="Your company name"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Business Type</Label>
            <div className="flex flex-wrap gap-2">
              {businessCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-neutral-800 border-neutral-800 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {selectedCategory === "other" && (
              <Textarea placeholder="Please describe your business" rows={2} className="mt-2" />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst">GST Number</Label>
              <Input id="gst" placeholder="22AAAAA0000A1Z5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="business@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Full address for sample delivery"
              rows={3}
              required
            />
          </div>

          <Turnstile
            onVerify={turnstile.handleVerify}
            onError={turnstile.handleError}
            onExpire={turnstile.handleExpire}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="teal"
            className="w-full h-11 rounded-xl"
            disabled={!turnstile.isVerified || isLoading || selectedItems.length === 0}
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </form>
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
