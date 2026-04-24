"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  type CurrencyCode,
  DEFAULT_CURRENCY,
  getCurrencyFromCountry,
  CURRENCIES,
} from "@/lib/currency";

type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  isLoading: boolean;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = "graycup_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function detectCurrency() {
      // Check localStorage first
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (stored && stored in CURRENCIES) {
        setCurrencyState(stored as CurrencyCode);
        setIsLoading(false);
        return;
      }

      // Auto-detect from IP
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
        // Fallback to default
      }

      setIsLoading(false);
    }

    detectCurrency();
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, isLoading }}>
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
