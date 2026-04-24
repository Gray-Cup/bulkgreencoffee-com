"use client";

import { useState, useCallback, Suspense } from "react";
import { PriceCalculator } from "./PriceCalculator";
import { QuoteRequestForm } from "./QuoteRequestForm";
import { ShareButton } from "./ShareButton";
import type { Product } from "@/data/products";

type ProductConfiguratorProps = {
  product: Product;
};

function ProductConfiguratorInner({ product }: ProductConfiguratorProps) {
  const [config, setConfig] = useState({
    grade: product.grades[0],
    quantity: product.minimumOrder.quantity,
  });

  const handleConfigChange = useCallback(
    (newConfig: { grade: string; quantity: number }) => {
      setConfig(newConfig);
    },
    [],
  );

  return (
    <PriceCalculator product={product} onConfigChange={handleConfigChange}>
      <div className="flex gap-3">
        <div className="flex-1">
          <QuoteRequestForm
            product={product}
            selectedGrade={config.grade}
            selectedQuantity={config.quantity}
          />
        </div>
        <ShareButton productName={product.name} />
      </div>
    </PriceCalculator>
  );
}

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  return (
    <Suspense
      fallback={
        <div className="h-80 bg-gray-100 rounded-lg animate-pulse border border-gray-200" />
      }
    >
      <ProductConfiguratorInner product={product} />
    </Suspense>
  );
}
