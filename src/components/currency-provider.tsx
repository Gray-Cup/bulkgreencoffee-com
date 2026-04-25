"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  type CurrencyCode,
  DEFAULT_CURRENCY,
  getCurrencyFromCountry,
  CURRENCIES,
  convertPrice,
} from "@/lib/currency";
import type { RatesMap } from "@/lib/exchange-rates";

const FALLBACK_RATES: RatesMap = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  KRW: 16.2,
};

type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  isLoading: boolean;
  rates: RatesMap;
  convert: (priceInINR: number, toCurrency: CurrencyCode) => number;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = "graycup_currency";
const CURRENCY_MANUAL_KEY = "graycup_currency_manual";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);
  const [rates, setRates] = useState<RatesMap>(FALLBACK_RATES);

  useEffect(() => {
    async function init() {
      // If the user manually picked a currency, respect it — skip geo
      const isManual = localStorage.getItem(CURRENCY_MANUAL_KEY) === "true";
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (isManual && stored && stored in CURRENCIES) {
        setCurrencyState(stored as CurrencyCode);
      } else {
        // Always re-check geo so VPN / location changes are picked up
        try {
          const response = await fetch("/api/geo");
          if (response.ok) {
            const data = await response.json();
            if (data.country) {
              const detected = getCurrencyFromCountry(data.country);
              setCurrencyState(detected);
              localStorage.setItem(CURRENCY_STORAGE_KEY, detected);
            }
          }
        } catch {
          // fall back to whatever was stored, or DEFAULT_CURRENCY
          if (stored && stored in CURRENCIES) {
            setCurrencyState(stored as CurrencyCode);
          }
        }
      }
      setIsLoading(false);

      // Fetch live rates in the background — doesn't block the selector
      try {
        const ratesData = await fetch("/api/exchange-rates").then((r) => r.json() as Promise<RatesMap>);
        if (ratesData) setRates(ratesData);
      } catch {
        // keep using FALLBACK_RATES
      }
    }

    init();
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
    localStorage.setItem(CURRENCY_MANUAL_KEY, "true");
  };

  const convert = useCallback(
    (priceInINR: number, toCurrency: CurrencyCode) =>
      convertPrice(priceInINR, toCurrency, rates),
    [rates]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, isLoading, rates, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
