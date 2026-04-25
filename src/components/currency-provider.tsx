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

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);
  const [rates, setRates] = useState<RatesMap>(FALLBACK_RATES);

  useEffect(() => {
    async function init() {
      // Step 1: Resolve currency immediately (localStorage or geo) — unblocks the UI
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (stored && stored in CURRENCIES) {
        setCurrencyState(stored as CurrencyCode);
      } else {
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
          // fallback to DEFAULT_CURRENCY
        }
      }
      setIsLoading(false);

      // Step 2: Fetch live rates in the background (doesn't block the selector)
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
