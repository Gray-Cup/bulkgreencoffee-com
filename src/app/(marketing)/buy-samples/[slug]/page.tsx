"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { Badge } from "@/components/ui/badge";
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

export default function BuySampleSlugPage() {
  const { slug }  = useParams<{ slug: string }>();
  const product   = getProductBySlug(slug);
  if (!product) notFound();

  const [activeTier, setActiveTier] = useState<TierLabel>("100g");
  const tier  = TIERS.find((t) => t.label === activeTier)!;
  const total = calcPrice(product.priceRange.min, tier.grams, tier.packaging);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">

        <Link
          href="/buy-samples"
          className="text-sm text-muted-foreground hover:text-black mb-8 inline-flex items-center gap-1 transition-colors"
        >
          ← All samples
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — product + tier picker */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-5">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                draggable={false}
                className="object-contain p-6"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-semibold text-black">{product.name}</h1>
                {product.scaScore != null && product.scaScore > 81 && (
                  <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                    Specialty
                  </Badge>
                )}
              </div>
              {product.region && (
                <p className="text-sm text-muted-foreground mb-3">{product.region}</p>
              )}
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity tabs */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Quantity</p>
              <div className="inline-flex gap-1 bg-gray-100 rounded-xl p-1">
                {TIERS.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setActiveTier(t.label)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTier === t.label
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>{tier.label} of {product.name}</span>
                <span>₹{calcPrice(product.priceRange.min, tier.grams, 0)}</span>
              </div>
              {tier.packaging > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Packaging</span>
                  <span>₹{tier.packaging}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-black border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {product.details && product.details.length > 0 && (
              <ul className="space-y-1.5">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 text-teal-600 shrink-0">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right — form */}
          <div>
            <h2 className="text-xl font-semibold text-black mb-1">Your details</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fill in your details and we&apos;ll ship your order.
            </p>
            <CheckoutForm
              products={[product.slug]}
              quantityTier={activeTier}
              totalAmount={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
