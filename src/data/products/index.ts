export type { Product } from "./types";

export { specialtyCoffeeProducts } from "./specialty-coffee";
export { commercialCoffeeProducts } from "./commercial-coffee";

import { specialtyCoffeeProducts } from "./specialty-coffee";
import { commercialCoffeeProducts } from "./commercial-coffee";
import type { Product } from "./types";

export const products: Product[] = [...specialtyCoffeeProducts, ...commercialCoffeeProducts];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getProductsByRegion(region: "East India" | "North East India" | "South India"): Product[] {
  return products.filter((product) => product.region === region);
}

export function getCommercialProducts(): Product[] {
  return products.filter((product) => product.categoryTwo === "Commercial");
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}
