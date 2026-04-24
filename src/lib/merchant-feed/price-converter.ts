import type { CurrencyCode } from "./types";
import { EXCHANGE_RATES, ZERO_DECIMAL_CURRENCIES } from "./countries";

/**
 * Convert price from INR to target currency
 */
export function convertFromINR(priceINR: number, targetCurrency: CurrencyCode): number {
  const rate = EXCHANGE_RATES[targetCurrency];
  if (!rate) {
    throw new Error(`Unknown currency: ${targetCurrency}`);
  }

  const converted = priceINR * rate;

  // Round appropriately based on currency
  if (ZERO_DECIMAL_CURRENCIES.includes(targetCurrency)) {
    // KRW, JPY - round to nearest whole number, often to nearest 100 or 1000
    return Math.round(converted);
  }

  // Other currencies - round to 2 decimal places
  return Math.round(converted * 100) / 100;
}

/**
 * Format price for Google Merchant Center feed
 * Returns: "15000 KRW" or "12.50 USD"
 */
export function formatMerchantPrice(priceINR: number, currency: CurrencyCode): string {
  const converted = convertFromINR(priceINR, currency);

  if (ZERO_DECIMAL_CURRENCIES.includes(currency)) {
    return `${Math.round(converted)} ${currency}`;
  }

  return `${converted.toFixed(2)} ${currency}`;
}

/**
 * Round price to a "nice" number for specific markets
 * e.g., ₩14,832 -> ₩15,000 for KRW
 */
export function roundToNicePrice(price: number, currency: CurrencyCode): number {
  switch (currency) {
    case "KRW":
      // Round to nearest 100 or 1000 based on price magnitude
      if (price >= 10000) return Math.round(price / 1000) * 1000;
      return Math.round(price / 100) * 100;
    case "JPY":
      // Round to nearest 10 or 100
      if (price >= 1000) return Math.round(price / 100) * 100;
      return Math.round(price / 10) * 10;
    case "INR":
      // Round to nearest 10 or 100
      if (price >= 1000) return Math.round(price / 100) * 100;
      return Math.round(price / 10) * 10;
    default:
      // Round to nearest 0.50 or whole number
      return Math.round(price * 2) / 2;
  }
}

/**
 * Convert and format with nice rounding
 */
export function convertAndFormat(
  priceINR: number,
  currency: CurrencyCode,
  useNiceRounding = false
): string {
  let converted = convertFromINR(priceINR, currency);

  if (useNiceRounding) {
    converted = roundToNicePrice(converted, currency);
  }

  if (ZERO_DECIMAL_CURRENCIES.includes(currency)) {
    return `${Math.round(converted)} ${currency}`;
  }

  return `${converted.toFixed(2)} ${currency}`;
}
