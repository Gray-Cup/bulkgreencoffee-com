"use client";

import { getProductsByRegion } from "@/data/products";
import { ProductCard } from "@/components/products";

const REGIONS = [
  {
    id: "East India" as const,
    label: "East India",
    subtitle: "Odisha · Andhra Pradesh · Assam · Arunachal Pradesh",
    description:
      "Single-origin green coffees from the Eastern Ghats, the Brahmaputra valley, and the Himalayan foothills — India's most exciting emerging coffee belt.",
  },
  {
    id: "South India" as const,
    label: "South India",
    subtitle: "Karnataka · Kerala",
    description:
      "The established heartland of Indian coffee: Chikmagalur, Coorg, Wayanad, and the ancient Bababudangiri hills — producing consistent, traceable Arabica year after year.",
  },
];

export default function ProductsPage() {
  const regionProducts = REGIONS.map((r) => ({
    ...r,
    products: getProductsByRegion(r.id),
  }));

  return (
    <div className="px-4 lg:px-6">
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground">
              Premium specialty green coffee sourced directly from Indian farms
            </p>
          </div>

          <div className="space-y-20">
            {regionProducts.map((region) => (
              <section key={region.id}>
                {/* Region header */}
                <div className="mb-8 border-b border-neutral-200 pb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-black mb-1">
                    {region.label}
                  </h2>
                  <p className="text-sm font-medium text-teal-700 mb-3">
                    {region.subtitle}
                  </p>
                  <p className="text-muted-foreground max-w-2xl text-sm">
                    {region.description}
                  </p>
                </div>

                {region.products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {region.products.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Products coming soon.
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
