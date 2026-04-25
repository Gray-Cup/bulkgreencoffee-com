import { unstable_cache } from "next/cache";
import type { CurrencyCode } from "./currency";

export type RatesMap = Record<CurrencyCode, number>;

// Fallback rates (INR-based) used if the API call fails
const FALLBACK_RATES: RatesMap = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  KRW: 16.2,
};

type ExchangeRateApiResponse = {
  result: "success" | "error";
  conversion_rates: Record<string, number>;
};

export const fetchExchangeRates = unstable_cache(
  async (): Promise<RatesMap> => {
    const apiKey = process.env.EXCHANGERATE_API_KEY;
    if (!apiKey) {
      console.warn("EXCHANGERATE_API_KEY not set, using fallback rates");
      return FALLBACK_RATES;
    }

    try {
      // Fetch USD-based rates — USD is the intermediary for cross-currency conversion
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
        { next: { revalidate: 86400 } }
      );

      if (!res.ok) throw new Error(`ExchangeRate API error: ${res.status}`);

      const data: ExchangeRateApiResponse = await res.json();
      if (data.result !== "success") throw new Error("ExchangeRate API returned non-success");

      const r = data.conversion_rates;

      // All stored as "how many of this currency = 1 INR"
      // 1 INR = (1/r.INR) USD, then multiply by target USD rate
      const inrToUsd = 1 / r["INR"];

      return {
        INR: 1,
        USD: inrToUsd,
        EUR: inrToUsd * r["EUR"],
        GBP: inrToUsd * r["GBP"],
        AED: inrToUsd * r["AED"],
        KRW: inrToUsd * r["KRW"],
      };
    } catch (err) {
      console.error("Failed to fetch exchange rates, using fallback:", err);
      return FALLBACK_RATES;
    }
  },
  ["exchange-rates"],
  { revalidate: 86400, tags: ["exchange-rates"] }
);
