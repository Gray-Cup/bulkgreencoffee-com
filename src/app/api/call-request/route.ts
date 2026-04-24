import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn("TURNSTILE_SECRET_KEY not configured");
    return true;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      },
    );

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, companyName, agenda, turnstileToken } = body;

    if (!name || !phone || !companyName || !agenda) {
      return NextResponse.json(
        { error: "Name, phone, company name, and agenda are required" },
        { status: 400 },
      );
    }

    // Verify Turnstile token
    if (turnstileToken) {
      const clientIP = getClientIP(request);
      const isValidToken = await verifyTurnstile(turnstileToken, clientIP);
      if (!isValidToken) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 },
        );
      }
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("call_requests").insert({
      name: name.trim(),
      phone: phone.trim(),
      company_name: companyName.trim(),
      agenda: agenda.trim(),
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save call request. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Call request submitted successfully",
    });
  } catch (error) {
    console.error("Call request API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
