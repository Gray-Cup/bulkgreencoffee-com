"use client";

import { useCurrency } from "@/components/currency-provider";
import { convertPrice, CURRENCIES } from "@/lib/currency";

type PriceDisplayProps = {
  minPrice: number;
  maxPrice: number;
  unit: string;
};

export function PriceDisplay({ minPrice, maxPrice, unit }: PriceDisplayProps) {
  const { currency, isLoading } = useCurrency();
  const config = CURRENCIES[currency];

  if (isLoading) {
    return <span className="animate-pulse">Loading...</span>;
  }

  const minConverted = convertPrice(minPrice, currency);
  const maxConverted = convertPrice(maxPrice, currency);
  const decimals = currency === "INR" ? 0 : 2;

  return (
    <>
      {config.symbol}
      {minConverted.toLocaleString(config.locale, { maximumFractionDigits: decimals })} - {config.symbol}
      {maxConverted.toLocaleString(config.locale, { maximumFractionDigits: decimals })}{" "}
      <span className="text-sm font-normal text-muted-foreground">{unit}</span>
    </>
  );
}
