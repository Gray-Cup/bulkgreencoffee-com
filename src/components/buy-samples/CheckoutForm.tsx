"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import type { SampleOrderRequest } from "@/app/api/create-payment/route";

const businessCategories = [
  { id: "roastery",   label: "Roastery" },
  { id: "cafe",       label: "Cafe" },
  { id: "hotel",      label: "Hotel" },
  { id: "restaurant", label: "Restaurant" },
  { id: "importer",   label: "Importer / Distributor" },
  { id: "other",      label: "Other" },
];

type Props = {
  products: string[];     // slugs
  quantityTier: string;
  totalAmount: number;
  /** Called before submit so parent can render an order summary */
  renderSummary?: () => React.ReactNode;
  onBack?: () => void;
};

export function CheckoutForm({ products, quantityTier, totalAmount, renderSummary, onBack }: Props) {
  const router = useRouter();
  const turnstile = useTurnstile();

  const [country,          setCountry]          = useState("IN");
  const [name,             setName]             = useState("");
  const [phone,            setPhone]            = useState("");
  const [email,            setEmail]            = useState("");
  const [pincode,          setPincode]          = useState("");
  const [address,          setAddress]          = useState("");
  const [gstOrTaxId,       setGstOrTaxId]       = useState("");
  const [businessType,     setBusinessType]     = useState("");
  const [isLoading,        setIsLoading]        = useState(false);
  const [error,            setError]            = useState("");

  // Auto-detect country from the geo API
  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d) => { if (d.country) setCountry(d.country); })
      .catch(() => {});
  }, []);

  const isIndia       = country === "IN";
  const needsTaxField = quantityTier !== "100g"; // show GST/Tax ID for 1kg+
  const taxLabel      = isIndia ? "GST Number" : "Tax ID";
  const taxPlaceholder = isIndia ? "22AAAAA0000A1Z5" : "VAT / Tax registration number";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const payload: SampleOrderRequest = {
      name,
      phone,
      email:        email || undefined,
      country,
      pincode,
      address,
      gstOrTaxId:   gstOrTaxId || undefined,
      businessType: businessType || undefined,
      products,
      quantityTier,
      totalAmount,
    };

    try {
      const res = await fetch("/api/create-payment", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create payment");
      window.location.href = data.paymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-black mb-8 flex items-center gap-1 transition-colors"
        >
          ← Back to products
        </button>
      )}

      {renderSummary?.()}

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone + Country */}
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
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Country code e.g. IN, US, GB"
              value={country}
              onChange={(e) => setCountry(e.target.value.toUpperCase().slice(0, 2))}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Address + Pincode */}
        <div className="space-y-2">
          <Label htmlFor="address">Full Delivery Address</Label>
          <Textarea
            id="address"
            placeholder="House / flat no., street, area, city, state"
            rows={3}
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode / ZIP</Label>
          <Input
            id="pincode"
            placeholder={isIndia ? "400001" : "ZIP / Postal code"}
            required
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

        {/* GST / Tax ID — only for 1kg+ */}
        {needsTaxField && (
          <div className="space-y-2">
            <Label htmlFor="tax">{taxLabel} <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input
              id="tax"
              placeholder={taxPlaceholder}
              value={gstOrTaxId}
              onChange={(e) => setGstOrTaxId(e.target.value)}
            />
          </div>
        )}

        {/* Business type */}
        <div className="space-y-3">
          <Label>Business Type <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <div className="flex flex-wrap gap-2">
            {businessCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setBusinessType(businessType === cat.id ? "" : cat.id)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  businessType === cat.id
                    ? "bg-neutral-800 border-neutral-800 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
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
          disabled={!turnstile.isVerified || isLoading || products.length === 0}
        >
          {isLoading ? "Processing..." : `Pay ₹${totalAmount} & Order`}
        </Button>
      </form>
    </div>
  );
}
