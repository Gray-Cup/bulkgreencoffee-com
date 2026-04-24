"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";

const productOptions = [
  { id: "ctc-tea", label: "CTC Tea", color: "bg-green-600 border-green-600" },
  {
    id: "loose-leaf-tea",
    label: "Loose Leaf Tea",
    color: "bg-green-500 border-green-500",
  },
  { id: "coffee", label: "Coffee", color: "bg-amber-900 border-amber-900" },
  {
    id: "instant-coffee",
    label: "Instant Coffee",
    color: "bg-amber-700 border-amber-700",
  },
];

const businessCategories = [
  { id: "hotel", label: "Hotel", color: "bg-blue-900 border-blue-900" },
  {
    id: "restaurant",
    label: "Restaurant",
    color: "bg-emerald-700 border-emerald-700",
  },
  {
    id: "banquet-hall",
    label: "Banquet Hall",
    color: "bg-red-600 border-red-600",
  },
  { id: "cafe", label: "Cafe", color: "bg-amber-600 border-amber-600" },
  { id: "other", label: "Other", color: "bg-neutral-700 border-neutral-700" },
];

export default function SampleRequestPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const turnstile = useTurnstile();

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

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

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment link");
      }

      // Redirect to Cashfree payment page
      window.location.href = data.paymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-lg mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-black mb-2">
            Request Samples
          </h1>
          <p className="text-muted-foreground">
            Fill in your details and we'll send you product samples.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              placeholder="Your company name"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Business Category</Label>
            <div className="flex flex-wrap gap-2">
              {businessCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    selectedCategory === category.id
                      ? `${category.color} text-white`
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            {selectedCategory === "other" && (
              <Textarea
                id="otherCategory"
                placeholder="Please specify your business type"
                rows={2}
                className="mt-3"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gst">GST Number</Label>
              <Input id="gst" placeholder="22AAAAA0000A1Z5" required />
            </div>

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

          <div className="space-y-3">
            <Label>Products</Label>
            <div className="grid grid-cols-2 gap-3">
              {productOptions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  className={`px-4 py-3 text-sm rounded-lg border transition-colors ${
                    selectedProducts.includes(product.id)
                      ? `${product.color} text-white`
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {product.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-neutral-700">
            ps: This page is not functioning properly but the api endpoint is
            open source on our{" "}
            <a
              className="underline"
              href="https://github.com/Gray-Cup/b2b-graycup-in-static/tree/main/src/app/api/create-payment"
            >
              github
            </a>
            .
          </p>

          <Turnstile
            onVerify={turnstile.handleVerify}
            onError={turnstile.handleError}
            onExpire={turnstile.handleExpire}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="gray"
            className="w-full h-11 rounded-lg mt-4"
            disabled={!turnstile.isVerified || isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </form>
      </div>
    </div>
  );
}
