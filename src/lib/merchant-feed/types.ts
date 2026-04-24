// Types for Google Merchant Center feed generation

export type CountryCode =
  | "IN"
  | "KR"
  | "US"
  | "GB"
  | "DE"
  | "FR"
  | "AE"
  | "JP"
  | "AU"
  | "CA"
  | "SG";

export type CurrencyCode =
  | "INR"
  | "KRW"
  | "USD"
  | "GBP"
  | "EUR"
  | "AED"
  | "JPY"
  | "AUD"
  | "CAD"
  | "SGD";

export interface CountryConfig {
  code: CountryCode;
  currency: CurrencyCode;
  language: string;
  name: string;
}

export interface ExchangeRates {
  base: "INR";
  rates: Record<CurrencyCode, number>;
  updatedAt: string;
}

export interface MerchantProduct {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  availability: "in_stock" | "out_of_stock" | "preorder";
  priceINR: number; // Base price in INR
  salePriceINR?: number;
  brand: string;
  condition: "new" | "used" | "refurbished";
  googleProductCategory: string;
  productType: string;
  mpn: string;
  identifierExists: boolean;
}

export interface LocalizedProduct extends Omit<MerchantProduct, "priceINR" | "salePriceINR"> {
  price: string; // Formatted: "15000 KRW"
  salePrice?: string;
  currency: CurrencyCode;
  country: CountryCode;
}
