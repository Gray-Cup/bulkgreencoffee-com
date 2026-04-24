export type { Product } from "./types";

export { coffeeProducts } from "./coffee";
export { instantCoffeeProducts } from "./instant-coffee";
export { specialtyCoffeeProducts } from "./specialty-coffee";

import { coffeeProducts } from "./coffee";
import { instantCoffeeProducts } from "./instant-coffee";
import { specialtyCoffeeProducts } from "./specialty-coffee";
import type { Product } from "./types";

// Combined array of all products
export const products: Product[] = [
  ...specialtyCoffeeProducts,
  ...coffeeProducts,
  ...instantCoffeeProducts,
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getProductsByCategory(category: "Coffee"): Product[] {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}
