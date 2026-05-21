import { NextResponse } from "next/server";
import { fetchExchangeRates } from "@/lib/exchange-rates";

const FALLBACK_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  KRW: 16.2,
};

export async function GET() {
  try {
    const rates = await fetchExchangeRates();
    return NextResponse.json(rates, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("exchange-rates route error:", err);
    return NextResponse.json(FALLBACK_RATES, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  }
}
