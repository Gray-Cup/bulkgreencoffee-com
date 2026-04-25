"use client";

import { useState } from "react";
import { getProductsByRegion } from "@/data/products";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/products";

type VarietyFilter = "All" | "Arabica" | "Robusta";

const REGIONS = [
  {
    id: "East India" as const,
    label: "East India",
    subtitle: "Odisha · Andhra Pradesh",
    description:
      "Single-origin green coffees from the Eastern Ghats — tribal-grown Arabica from Koraput and the internationally acclaimed specialty lots of Araku Valley.",
  },
  {
    id: "North East India" as const,
    label: "North East India",
    subtitle: "Assam · Arunachal Pradesh",
    description:
      "India's most underexplored coffee frontier: high-altitude Arabica from the Dima Hasao hills of Assam and Robusta from the Himalayan foothills of Arunachal Pradesh.",
  },
  {
    id: "South India" as const,
    label: "South India",
    subtitle: "Karnataka · Kerala",
    description:
      "The established heartland of Indian coffee: Chikmagalur, Coorg, Wayanad, and the ancient Bababudangiri hills — producing consistent, traceable Arabica year after year.",
  },
];

function getVariety(p: Product): "Arabica" | "Robusta" | null {
  return p.variety ?? p.origin?.variety ?? null;
}

function RegionSection({
  region,
}: {
  region: (typeof REGIONS)[number];
}) {
  const [filter, setFilter] = useState<VarietyFilter>("All");
  const allProducts = getProductsByRegion(region.id);

  const filtered =
    filter === "All"
      ? allProducts
      : allProducts.filter((p) => getVariety(p) === filter);

  const hasRobusta = allProducts.some((p) => getVariety(p) === "Robusta");
  const hasArabica = allProducts.some((p) => getVariety(p) === "Arabica");

  return (
    <section>
      <div className="mb-6 border-b border-neutral-200 pb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-1">
          {region.label}
        </h2>
        <p className="text-sm font-medium text-teal-700 mb-3">
          {region.subtitle}
        </p>
        <p className="text-muted-foreground max-w-2xl text-sm mb-5">
          {region.description}
        </p>

        {/* Filters */}
        <div className="flex gap-2">
          {(["All", "Arabica", "Robusta"] as VarietyFilter[]).map((v) => {
            const disabled =
              (v === "Arabica" && !hasArabica) ||
              (v === "Robusta" && !hasRobusta);
            return (
              <button
                key={v}
                disabled={disabled}
                onClick={() => setFilter(v)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${
                    filter === v
                      ? "bg-teal-800 text-white"
                      : disabled
                        ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          No {filter} products in this region.
        </p>
      )}
    </section>
  );
}

export default function ProductsPage() {
  return (
    <div className="px-4 lg:px-6">
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground">
              Premium green coffee sourced directly from Indian farms
            </p>
          </div>

          <div className="space-y-20">
            {REGIONS.map((region) => (
              <RegionSection key={region.id} region={region} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
