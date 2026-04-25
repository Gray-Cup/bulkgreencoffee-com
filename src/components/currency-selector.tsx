"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/components/currency-provider";
import { type CurrencyCode } from "@/lib/currency";
import { Button } from "@/components/ui/button";

const CURRENCY_OPTIONS: { code: CurrencyCode; label: string; flag: string }[] = [
  { code: "INR", label: "INR (₹)", flag: "🇮🇳" },
  { code: "USD", label: "USD ($)", flag: "🇺🇸" },
  { code: "EUR", label: "EUR (€)", flag: "🇪🇺" },
  { code: "GBP", label: "GBP (£)", flag: "🇬🇧" },
  { code: "AED", label: "AED (د.إ)", flag: "🇦🇪" },
  { code: "KRW", label: "KRW (₩)", flag: "🇰🇷" },
];

export function CurrencySelector() {
  const { currency, setCurrency, isLoading } = useCurrency();
  const currentOption = CURRENCY_OPTIONS.find((o) => o.code === currency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="lightgraybg" size="sm" disabled={isLoading} className="focus-visible:ring-0 focus-visible:outline-none data-[state=open]:ring-0">
          {isLoading ? "..." : <>{currentOption?.flag} {currentOption?.label ?? "Currency"}</>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {CURRENCY_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => setCurrency(option.code)}
            className={currency === option.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{option.flag}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
