import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bulkgreencoffee_site } from "@/db/schema";

const CASHFREE_API_URL = "https://api.cashfree.com/pg/links";
const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

export interface SampleOrderRequest {
  name: string;
  phone: string;
  email?: string;
  country: string;
  pincode: string;
  address: string;
  gstOrTaxId?: string;
  businessType?: string;
  products: string[];       // slugs
  quantityTier: string;     // "100g" | "1kg" | "3kg" | "5kg"
  totalAmount: number;      // INR, already calculated on client
}

export async function POST(request: NextRequest) {
  try {
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 },
      );
    }

    const body: SampleOrderRequest = await request.json();
    const { name, phone, email, country, pincode, address, gstOrTaxId, businessType, products, quantityTier, totalAmount } = body;

    if (!name || !phone || !address || !pincode || products.length === 0) {
      return NextResponse.json(
        { error: "Name, phone, address, pincode and at least one product are required" },
        { status: 400 },
      );
    }

    const linkId = `bgc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    const origin = request.headers.get("origin") || "https://bulkgreencoffee.com";

    // Save order to database first
    await db.insert(bulkgreencoffee_site).values({
      name,
      phone: phone.replace(/\D/g, "").slice(-12),
      email:          email || null,
      country,
      pincode,
      address,
      gst_or_tax_id:  gstOrTaxId || null,
      business_type:  businessType || null,
      products:       JSON.stringify(products),
      quantity_tier:  quantityTier,
      total_amount:   totalAmount,
      link_id:        linkId,
      payment_status: "pending",
    });

    const paymentLinkPayload = {
      link_id: linkId,
      link_amount: totalAmount,
      link_currency: "INR",
      link_purpose: `Bulk Green Coffee — ${quantityTier} sample${products.length > 1 ? "s" : ""} (${products.join(", ")})`,

      customer_details: {
        customer_name:  name,
        customer_phone: phone.replace(/\D/g, "").slice(-10),
        ...(email && { customer_email: email }),
      },

      link_meta: {
        return_url: `${origin}/buy-samples/success?link_id=${linkId}`,
      },

      link_notify: {
        send_sms:   true,
        send_email: !!email,
      },

      link_expiry_time: expiryTime.toISOString(),
    };

    const response = await fetch(CASHFREE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type":    "application/json",
        "x-client-id":     CASHFREE_CLIENT_ID,
        "x-client-secret": CASHFREE_CLIENT_SECRET,
        "x-api-version":   "2023-08-01",
      },
      body: JSON.stringify(paymentLinkPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create payment link" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success:     true,
      paymentLink: data.link_url,
      linkId,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
