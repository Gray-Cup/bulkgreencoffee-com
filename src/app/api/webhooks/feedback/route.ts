import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;

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
    const {
      company,
      name,
      email,
      feedbackType,
      rating,
      feedback,
      turnstileToken,
    } = body;

    if (!email || !feedback) {
      return NextResponse.json(
        { error: "Email and feedback are required" },
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
    const { error: dbError } = await supabase
      .from("feedback_submissions")
      .insert({
        company: company?.trim() || "",
        name: name?.trim() || "",
        email: email.trim().toLowerCase(),
        feedback_type: feedbackType || "",
        rating: rating || "",
        feedback: feedback.trim(),
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    // Send to Discord if configured
    if (DISCORD_WEBHOOK_URL) {
      const ratingEmojiMap: Record<string, string> = {
        excellent: "⭐⭐⭐⭐⭐",
        good: "⭐⭐⭐⭐",
        average: "⭐⭐⭐",
        poor: "⭐⭐",
      };
      const ratingEmoji = rating ? ratingEmojiMap[rating] || "" : "";

      const discordMessage = {
        embeds: [
          {
            title: "💬 New Feedback",
            color: 10181046,
            fields: [
              {
                name: "Company",
                value: company || "Not provided",
                inline: true,
              },
              {
                name: "Contact",
                value: `${name || "Anonymous"} (${email})`,
                inline: true,
              },
              {
                name: "Type",
                value: feedbackType || "General",
                inline: true,
              },
              {
                name: "Rating",
                value: `${rating || "Not rated"} ${ratingEmoji}`,
                inline: true,
              },
              {
                name: "Feedback",
                value: feedback.substring(0, 1000),
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      }).catch((err) => console.error("Discord webhook error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
