import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Cloudflare provides geolocation via headers
  const country = request.headers.get("cf-ipcountry") ||
                  request.headers.get("x-vercel-ip-country") ||
                  "IN"; // Default to India

  return NextResponse.json({
    country: country,
  });
}
