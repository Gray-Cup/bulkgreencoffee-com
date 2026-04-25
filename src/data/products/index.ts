export type { Product } from "./types";

export { specialtyCoffeeProducts } from "./specialty-coffee";

import { specialtyCoffeeProducts } from "./specialty-coffee";
import type { Product } from "./types";

export const products: Product[] = [...specialtyCoffeeProducts];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getProductsByRegion(region: "East India" | "South India"): Product[] {
  return products.filter((product) => product.region === region);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}
