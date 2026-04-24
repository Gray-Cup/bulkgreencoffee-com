import type { CountryCode, CountryConfig, CurrencyCode } from "./types";

// Country to currency mapping for Google Merchant Center
export const MERCHANT_COUNTRIES: Record<CountryCode, CountryConfig> = {
  IN: { code: "IN", currency: "INR", language: "en", name: "India" },
  KR: { code: "KR", currency: "KRW", language: "ko", name: "South Korea" },
  US: { code: "US", currency: "USD", language: "en", name: "United States" },
  GB: { code: "GB", currency: "GBP", language: "en", name: "United Kingdom" },
  DE: { code: "DE", currency: "EUR", language: "de", name: "Germany" },
  FR: { code: "FR", currency: "EUR", language: "fr", name: "France" },
  AE: { code: "AE", currency: "AED", language: "en", name: "United Arab Emirates" },
  JP: { code: "JP", currency: "JPY", language: "ja", name: "Japan" },
  AU: { code: "AU", currency: "AUD", language: "en", name: "Australia" },
  CA: { code: "CA", currency: "CAD", language: "en", name: "Canada" },
  SG: { code: "SG", currency: "SGD", language: "en", name: "Singapore" },
};

// Exchange rates from INR (update these periodically or fetch from API)
// These are approximate rates as of Feb 2025
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  KRW: 16.5, // 1 INR = ~16.5 KRW
  USD: 0.012, // 1 INR = ~0.012 USD
  GBP: 0.0095, // 1 INR = ~0.0095 GBP
  EUR: 0.011, // 1 INR = ~0.011 EUR
  AED: 0.044, // 1 INR = ~0.044 AED
  JPY: 1.8, // 1 INR = ~1.8 JPY
  AUD: 0.018, // 1 INR = ~0.018 AUD
  CAD: 0.016, // 1 INR = ~0.016 CAD
  SGD: 0.016, // 1 INR = ~0.016 SGD
};

// Currencies that don't use decimal places
export const ZERO_DECIMAL_CURRENCIES: CurrencyCode[] = ["KRW", "JPY"];

export function getCountryConfig(countryCode: CountryCode): CountryConfig {
  return MERCHANT_COUNTRIES[countryCode];
}

export function getCurrencyForCountry(countryCode: CountryCode): CurrencyCode {
  return MERCHANT_COUNTRIES[countryCode].currency;
}
