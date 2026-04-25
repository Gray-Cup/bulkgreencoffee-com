export type ProductAvailability = "in_stock" | "out_of_stock" | "preorder";

export type Product = {
  slug: string;
  name: string;
  image: string;
  description: string;
  longDescription?: string;
  details: string[];
  locations: string[];
  category: "Coffee";
  categoryTwo?: "Single Origin" | "Blend" | "Premium";
  priceRange: {
    min: number;
    max: number;
    unit: string;
  };
  minimumOrder: {
    quantity: number;
    unit: string;
  };
  grades: string[];
  packaging: string[];
  varietal?: string;
  scaScore?: number;
  scale?: number; // tons available every 3 months (1–5)
  region?: "East India" | "South India";
  origin?: {
    state: string;
    region: string;
    variety: "Arabica" | "Robusta";
    elevation: string;
  };
  estateImages?: string[];
  reviews?: {
    author: string;
    role?: string;
    text: string;
  }[];
  // Google Merchant Center fields
  sku: string;
  brand: string;
  availability: ProductAvailability;
  googleProductCategory: string;
  mpn?: string;
};
