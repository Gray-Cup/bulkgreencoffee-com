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
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      category,
      productName,
      origin,
      grade,
      quantity,
      targetPrice,
      notes,
      turnstileToken,
    } = body;

    if (!companyName || !contactName || !email || !productName || !quantity) {
      return NextResponse.json(
        { error: "Company name, contact name, email, product name, and quantity are required" },
        { status: 400 },
      );
    }

    if (turnstileToken) {
      const clientIP = getClientIP(request);
      const isValid = await verifyTurnstile(turnstileToken, clientIP);
      if (!isValid) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 },
        );
      }
    }

    const { error: dbError } = await supabase.from("price_quotes").insert({
      company_name: companyName.trim(),
      contact_name: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      category: category || null,
      product_name: productName.trim(),
      origin: origin?.trim() || null,
      grade: grade || null,
      quantity: quantity.trim(),
      target_price: targetPrice?.trim() || null,
      notes: notes?.trim() || null,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save price quote request. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Price quote request submitted successfully",
    });
  } catch (error) {
    console.error("Price quote API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
