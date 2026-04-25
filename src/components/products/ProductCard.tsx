"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Product } from "@/data/products";
import { useCurrency } from "@/components/currency-provider";
import { CURRENCIES } from "@/lib/currency";

type ProductCardProps = {
  product: Product;
  showPrice?: boolean;
};

export function ProductCard({ product, showPrice = true }: ProductCardProps) {
  const { currency, convert } = useCurrency();
  const config = CURRENCIES[currency];
  const minPriceConverted = convert(product.priceRange.min, currency);

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden rounded-lg bg-neutral-50 p-0 cursor-pointer transition-all">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            draggable={false}
            className="object-cover"
          />

          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            {product.scaScore != null && product.scaScore > 81 && (
              <span className="bg-green-600 px-2 py-0.5 rounded text-xs font-medium text-white">
                Specialty
              </span>
            )}
            {product.categoryTwo && (
              <span className="bg-black/50 px-2 py-0.5 rounded text-xs font-medium text-white capitalize">
                {product.categoryTwo}
              </span>
            )}
          </div>
        </div>
        <div className="px-3 pb-6">
          <h3 className="text-md hover:underline font-semibold text-black">
            {product.name}
          </h3>
          {showPrice && (
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span dir="ltr">
                From {config.symbol}
                {currency === "INR"
                  ? minPriceConverted
                  : minPriceConverted.toFixed(2)}
                /{product.minimumOrder.unit}
              </span>
              <span>
                MOQ: {product.minimumOrder.quantity} {product.minimumOrder.unit}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
