"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import type { Product } from "@/data/products";
import { useCurrency } from "@/components/currency-provider";
import { CURRENCIES } from "@/lib/currency";
import { useCart } from "@/context/cart-context";

type ProductCardProps = {
  product: Product;
  showPrice?: boolean;
};

export function ProductCard({ product, showPrice = true }: ProductCardProps) {
  const { currency, convert } = useCurrency();
  const config = CURRENCIES[currency];
  const minPriceConverted = convert(product.priceRange.min, currency);
  const { toggle, add, isInCart } = useCart();
  const router = useRouter();
  const inCart = isInCart(product.slug);

  return (
    <Card className="overflow-hidden rounded-lg bg-neutral-50 p-0 transition-all relative">
      {/* Image area */}
      <div className="aspect-square relative">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            draggable={false}
            className="object-cover"
          />
        </Link>

        {/* Absolute badges top-right */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-10">
          {/* Select Sample toggle button */}
          <button
            type="button"
            onClick={() => toggle(product.slug)}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              inCart
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-black/50 text-white hover:bg-black/70"
            }`}
          >
            {inCart ? "✓ Selected" : "+ Sample"}
          </button>

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

      {/* Card body */}
      <div className="px-3 pt-2 pb-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-md hover:underline font-semibold text-black leading-tight">
            {product.name}
          </h3>
        </Link>

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

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => {
              add(product.slug);
              router.push("/cart");
            }}
            className="flex-1 h-8 rounded-lg text-xs font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
          <Link
            href={`/buy-samples/${product.slug}`}
            className="flex-1 h-8 rounded-lg text-xs font-medium border border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black flex items-center justify-center transition-colors"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </Card>
  );
}
