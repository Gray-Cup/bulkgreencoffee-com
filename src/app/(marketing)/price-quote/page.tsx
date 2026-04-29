"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";

const productCategories = [
  { id: "coffee", label: "Coffee", color: "bg-amber-900 border-amber-900" },
  {
    id: "beverages",
    label: "Other Beverages",
    color: "bg-blue-600 border-blue-600",
  },
  { id: "other", label: "Other", color: "bg-neutral-700 border-neutral-700" },
];

const grades = ["Specialty", "Premium", "Commercial", "Organic", "Fair Trade"];

export default function PriceQuotePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const turnstile = useTurnstile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName") as string,
      contactName: formData.get("contactName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category:
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
      productName: formData.get("productName") as string,
      origin: formData.get("origin") as string,
      grade: formData.get("grade") as string,
      quantity: formData.get("quantity") as string,
      targetPrice: formData.get("targetPrice") as string,
      notes: formData.get("notes") as string,
      turnstileToken: turnstile.token,
    };

    try {
      const response = await fetch("/api/price-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Your price quote request has been submitted! We'll get back to you shortly.",
        });
        (e.target as HTMLFormElement).reset();
        setSelectedCategory("");
        turnstile.reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-lg mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-black mb-2">
            Request a Price Quote
          </h1>
          <p className="text-muted-foreground">
            Tell us what you need and your target price — we&apos;ll come back
            with a competitive quote tailored to your requirements.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Your company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                name="contactName"
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 85279 14317"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Product Category</Label>
            <div className="flex flex-wrap gap-2">
              {productCategories.map((category) => (
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                name="productName"
                placeholder="e.g., Green Arabica Beans"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">Origin / Region</Label>
              <Input
                id="origin"
                name="origin"
                placeholder="e.g., Ethiopia, India, Colombia"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <select
                id="grade"
                name="grade"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select grade</option>
                {grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity Required</Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="e.g., 500 kg/month"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetPrice">Target Price (per kg)</Label>
            <Input
              id="targetPrice"
              name="targetPrice"
              placeholder="e.g., USD 3.50/kg or leave blank if flexible"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Certifications needed, delivery timeline, packaging preferences, or any other requirements..."
              rows={4}
            />
          </div>

          <Turnstile
            onVerify={turnstile.handleVerify}
            onError={turnstile.handleError}
            onExpire={turnstile.handleExpire}
          />

          {submitStatus && (
            <div
              className={`p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <Button
            type="submit"
            variant="gray"
            className="w-full h-11 rounded-lg mt-4"
            disabled={!turnstile.isVerified || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Request Quote"}
          </Button>
        </form>
      </div>
    </div>
  );
}
