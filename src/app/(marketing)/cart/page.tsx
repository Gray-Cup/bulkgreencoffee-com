"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart, CART_TIERS, type TierLabel } from "@/context/cart-context";
import { useCurrency } from "@/components/currency-provider";
import { formatPrice, convertPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";

function calcPrice(pricePerKg: number, grams: number, packaging: number) {
  return Math.round((pricePerKg * grams) / 1000) + packaging;
}

export default function CartPage() {
  const { items, remove, updateTier, clear, count } = useCart();
  const { currency, rates } = useCurrency();
  const router = useRouter();
  const fmt = (inr: number) => formatPrice(convertPrice(inr, currency, rates), currency);

  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      const tierData = CART_TIERS.find((t) => t.label === item.tier)!;
      return product ? { product, tier: item.tier, tierData } : null;
    })
    .filter(Boolean) as {
    product: (typeof products)[number];
    tier: TierLabel;
    tierData: (typeof CART_TIERS)[number];
  }[];

  const total = cartProducts.reduce(
    (sum, { product, tierData }) =>
      sum + calcPrice(product.priceRange.min, tierData.grams, tierData.packaging),
    0
  );

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-black">Your Cart</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {count} item{count !== 1 ? "s" : ""} selected for sampling
            </p>
          </div>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="text-sm text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {count === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <Link href="/products">
              <Button variant="teal" size="sm">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
              {cartProducts.map(({ product, tier, tierData }) => {
                const price = calcPrice(
                  product.priceRange.min,
                  tierData.grams,
                  tierData.packaging
                );
                return (
                  <div key={`${product.slug}-${tier}`} className="flex items-start gap-4 px-4 py-4 bg-white">
                    <Link href={`/products/${product.slug}`} className="shrink-0">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/products/${product.slug}`}>
                          <p className="text-sm font-semibold text-black hover:underline leading-tight">
                            {product.name}
                          </p>
                        </Link>
                        <div className="flex items-center gap-3 shrink-0">
                          <p className="text-sm font-semibold text-black">{fmt(price)}</p>
                          <button
                            type="button"
                            onClick={() => remove(product.slug)}
                            className="text-gray-300 hover:text-red-400 transition-colors text-sm leading-none cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {product.region && (
                        <p className="text-xs text-muted-foreground mt-0.5">{product.region}</p>
                      )}

                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {CART_TIERS.map((t) => (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => updateTier(product.slug, tier, t.label)}
                            className={`px-2.5 py-0.5 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                              tier === t.label
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

              <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-base font-semibold text-black">{fmt(total)}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                variant="teal"
                size="lg"
                className="flex-1"
                onClick={() => router.push("/buy-samples/checkout")}
              >
                Proceed to Checkout
              </Button>
              <Link href="/products" className="flex-1">
                <Button variant="lightgraybg" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
