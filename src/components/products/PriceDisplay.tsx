"use client";

import { useCurrency } from "@/components/currency-provider";
import { CURRENCIES } from "@/lib/currency";

type PriceDisplayProps = {
  minPrice: number;
  maxPrice: number;
  unit: string;
};

export function PriceDisplay({ minPrice, maxPrice, unit }: PriceDisplayProps) {
  const { currency, isLoading, convert } = useCurrency();
  const config = CURRENCIES[currency];

  if (isLoading) {
    return <span className="animate-pulse">Loading...</span>;
  }

  const minConverted = convert(minPrice, currency);
  const maxConverted = convert(maxPrice, currency);
  const decimals = currency === "INR" ? 0 : 2;

  const priceText =
    minPrice === maxPrice
      ? `${config.symbol}${minConverted.toLocaleString(config.locale, { maximumFractionDigits: decimals })}`
      : `${config.symbol}${minConverted.toLocaleString(config.locale, { maximumFractionDigits: decimals })} - ${config.symbol}${maxConverted.toLocaleString(config.locale, { maximumFractionDigits: decimals })}`;

  const minUSD = convert(minPrice, "USD");
  const maxUSD = convert(maxPrice, "USD");
  const usdText =
    minPrice === maxPrice
      ? `$${minUSD.toFixed(2)}`
      : `$${minUSD.toFixed(2)} - $${maxUSD.toFixed(2)}`;

  return (
    <span dir="ltr">
      {priceText}
      {currency !== "USD" && (
        <span className="text-sm font-normal text-muted-foreground"> ({usdText})</span>
      )}{" "}
      <span className="text-sm font-normal text-muted-foreground">{unit}</span>
    </span>
  );
}
