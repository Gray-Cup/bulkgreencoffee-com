import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const country =
      request.headers.get("cf-ipcountry") ||
      request.headers.get("x-vercel-ip-country") ||
      null;

    return NextResponse.json({ country });
  } catch {
    return NextResponse.json({ country: null });
  }
}
