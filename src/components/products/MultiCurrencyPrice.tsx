"use client";

import { useState } from "react";
import { useCurrency } from "@/components/currency-provider";
import { CURRENCIES, CurrencyCode } from "@/lib/currency";

type MultiCurrencyPriceProps = {
  priceInINR: number;
};

const CURRENCY_OPTIONS: { code: CurrencyCode; flag: string }[] = [
  { code: "INR", flag: "🇮🇳" },
  { code: "USD", flag: "🇺🇸" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "GBP", flag: "🇬🇧" },
  { code: "AED", flag: "🇦🇪" },
  { code: "KRW", flag: "🇰🇷" },
];

export function MultiCurrencyPrice({ priceInINR }: MultiCurrencyPriceProps) {
  const [selected, setSelected] = useState<CurrencyCode>("INR");
  const { convert } = useCurrency();

  const config = CURRENCIES[selected];
  const converted = convert(priceInINR, selected);
  const decimals = selected === "INR" || selected === "KRW" ? 0 : 2;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {CURRENCY_OPTIONS.map(({ code, flag }) => (
          <button
            key={code}
            onClick={() => setSelected(code)}
            className={`inline-flex items-center gap-1 text-sm font-medium rounded-md px-2 py-1 transition-colors ${
              selected === code
                ? "bg-neutral-800 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            <span>{flag}</span>
            <span>{code}</span>
          </button>
        ))}
      </div>
      <span dir="ltr" className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md px-2 py-1">
        {config.symbol}
        {converted.toLocaleString(config.locale, {
          maximumFractionDigits: decimals,
        })}
        <span className="text-neutral-400 font-normal">/ kg</span>
      </span>
    </div>
  );
}
