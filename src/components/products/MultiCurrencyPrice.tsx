"use client";

import { convertPrice, CURRENCIES } from "@/lib/currency";

type MultiCurrencyPriceProps = {
  priceInINR: number;
};

const DISPLAY_CURRENCIES = [
  { code: "INR" as const, flag: "🇮🇳" },
  { code: "USD" as const, flag: "🇺🇸" },
  { code: "EUR" as const, flag: "🇪🇺" },
];

export function MultiCurrencyPrice({ priceInINR }: MultiCurrencyPriceProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {DISPLAY_CURRENCIES.map(({ code, flag }) => {
        const config = CURRENCIES[code];
        const converted = convertPrice(priceInINR, code);
        const decimals = code === "INR" ? 0 : 2;
        return (
          <span
            key={code}
            className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md px-2 py-1"
          >
            <span>{flag}</span>
            <span>
              {config.symbol}
              {converted.toLocaleString(config.locale, {
                maximumFractionDigits: decimals,
              })}
            </span>
          </span>
        );
      })}
    </div>
  );
}
