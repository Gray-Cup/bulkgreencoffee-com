"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import { getProductBySlug } from "@/data/products";
import { Badge } from "@/components/ui/badge";

const businessCategories = [
  { id: "roastery", label: "Roastery" },
  { id: "cafe", label: "Cafe" },
  { id: "hotel", label: "Hotel" },
  { id: "restaurant", label: "Restaurant" },
  { id: "importer", label: "Importer / Distributor" },
  { id: "other", label: "Other" },
];

export default function BuySampleSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const price100g = Math.round(product.priceRange.min / 10) + 30;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const turnstile = useTurnstile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: companyName,
          customerPhone: phone,
          customerEmail: email || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create payment link");
      window.location.href = data.paymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">

        {/* Back */}
        <Link
          href="/buy-samples"
          className="text-sm text-muted-foreground hover:text-black mb-8 inline-flex items-center gap-1 transition-colors"
        >
          ← All samples
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — product card */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-5">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                draggable={false}
                className="object-contain p-6"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-semibold text-black">{product.name}</h1>
                {product.scaScore != null && product.scaScore > 81 && (
                  <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                    Specialty
                  </Badge>
                )}
              </div>
              {product.region && (
                <p className="text-sm text-muted-foreground mb-3">{product.region}</p>
              )}
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Sample price breakdown */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>100g sample</span>
                <span>₹{Math.round(product.priceRange.min / 10)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Packaging</span>
                <span>₹30</span>
              </div>
              <div className="flex justify-between font-semibold text-black border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>₹{price100g}</span>
              </div>
            </div>

            {product.details && product.details.length > 0 && (
              <ul className="space-y-1.5">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 text-teal-600 shrink-0">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right — form */}
          <div>
            <h2 className="text-xl font-semibold text-black mb-1">Your details</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fill in your details and we&apos;ll ship the sample to you.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="company">Company / Business Name</Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Business Type</Label>
                <div className="flex flex-wrap gap-2">
                  {businessCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-neutral-800 border-neutral-800 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                {selectedCategory === "other" && (
                  <Textarea
                    placeholder="Please describe your business"
                    rows={2}
                    className="mt-2"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <Input id="gst" placeholder="22AAAAA0000A1Z5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="business@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  placeholder="Full address for sample delivery"
                  rows={3}
                  required
                />
              </div>

              <Turnstile
                onVerify={turnstile.handleVerify}
                onError={turnstile.handleError}
                onExpire={turnstile.handleExpire}
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button
                type="submit"
                variant="teal"
                className="w-full h-11 rounded-xl"
                disabled={!turnstile.isVerified || isLoading}
              >
                {isLoading ? "Processing..." : `Pay ₹${price100g} & Order Sample`}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
