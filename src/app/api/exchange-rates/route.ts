import { NextResponse } from "next/server";
import { fetchExchangeRates } from "@/lib/exchange-rates";

export async function GET() {
  const rates = await fetchExchangeRates();
  return NextResponse.json(rates, {
    headers: {
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
    },
  });
}
