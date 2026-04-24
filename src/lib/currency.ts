export type CurrencyCode = "INR" | "EUR" | "GBP" | "USD" | "AED" | "KRW";

export type CurrencyConfig = {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // Rate to convert FROM INR
  locale: string;
};

// Exchange rates from INR (as of Feb 2026 - update periodically)
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    rate: 1,
    locale: "en-IN",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rate: 0.011, // 1 INR = 0.011 EUR (approx)
    locale: "de-DE",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    rate: 0.0094, // 1 INR = 0.0094 GBP (approx)
    locale: "en-GB",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rate: 0.012, // 1 INR = 0.012 USD (approx)
    locale: "en-US",
  },
  AED: {
    code: "AED",
    symbol: "د.إ",
    name: "UAE Dirham",
    rate: 0.044, // 1 INR = 0.044 AED (approx)
    locale: "ar-AE",
  },
  KRW: {
    code: "KRW",
    symbol: "₩",
    name: "South Korean Won",
    rate: 16.2, // 1 INR = 16.2 KRW (approx)
    locale: "ko-KR",
  },
};

// Map countries to currencies
export const COUNTRY_CURRENCY_MAP: Record<string, CurrencyCode> = {
  // Europe (EUR)
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  IE: "EUR",
  FI: "EUR",
  GR: "EUR",
  // UK (GBP)
  GB: "GBP",
  // North America (USD)
  US: "USD",
  CA: "USD",
  MX: "USD",
  // South America (USD)
  BR: "USD",
  AR: "USD",
  CL: "USD",
  CO: "USD",
  PE: "USD",
  // East Asia (USD)
  JP: "USD",
  // South Korea (KRW)
  KR: "KRW",
  CN: "USD",
  HK: "USD",
  TW: "USD",
  SG: "USD",
  MY: "USD",
  TH: "USD",
  VN: "USD",
  PH: "USD",
  ID: "USD",
  // UAE (AED)
  AE: "AED",
  // India (INR)
  IN: "INR",
};

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

export function convertPrice(priceInINR: number, toCurrency: CurrencyCode): number {
  const rate = CURRENCIES[toCurrency].rate;
  return Math.round(priceInINR * rate * 100) / 100;
}

export function formatPrice(
  price: number,
  currency: CurrencyCode,
  options?: { showSymbol?: boolean }
): string {
  const config = CURRENCIES[currency];
  const formatted = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    minimumFractionDigits: currency === "INR" || currency === "KRW" ? 0 : 2,
    maximumFractionDigits: currency === "INR" || currency === "KRW" ? 0 : 2,
  }).format(price);

  return formatted;
}

export function formatPriceRange(
  minINR: number,
  maxINR: number,
  currency: CurrencyCode
): string {
  const minConverted = convertPrice(minINR, currency);
  const maxConverted = convertPrice(maxINR, currency);
  const config = CURRENCIES[currency];

  if (currency === "INR" || currency === "KRW") {
    return `${config.symbol}${Math.round(minConverted)} - ${config.symbol}${Math.round(maxConverted)}`;
  }

  return `${config.symbol}${minConverted.toFixed(2)} - ${config.symbol}${maxConverted.toFixed(2)}`;
}

export function getCurrencyFromCountry(countryCode: string): CurrencyCode {
  return COUNTRY_CURRENCY_MAP[countryCode.toUpperCase()] || DEFAULT_CURRENCY;
}
