import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

type LazyProductRowProps = {
  title: string;
  products: Product[];
};

export function LazyProductRow({ title, products }: LazyProductRowProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 font-instrument-sans">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
