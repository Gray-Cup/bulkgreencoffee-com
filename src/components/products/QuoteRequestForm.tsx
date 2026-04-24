"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/data/products";

type QuoteRequestFormProps = {
  product: Product;
  selectedGrade?: string;
  selectedQuantity?: number;
};

type FormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  quantity: string;
  grade: string;
  message: string;
};

export function QuoteRequestForm({
  product,
  selectedGrade,
  selectedQuantity,
}: QuoteRequestFormProps) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const turnstile = useTurnstile();

  // Get grade and quantity from props, URL params, or defaults
  const getInitialGrade = useCallback(() => {
    if (selectedGrade && product.grades.includes(selectedGrade))
      return selectedGrade;
    const urlGrade = searchParams.get("grade");
    if (urlGrade && product.grades.includes(urlGrade)) return urlGrade;
    return product.grades[0];
  }, [selectedGrade, product.grades, searchParams]);

  const getInitialQuantity = useCallback(() => {
    if (selectedQuantity && selectedQuantity > 0)
      return selectedQuantity.toString();
    const urlQty = searchParams.get("qty");
    if (urlQty && parseInt(urlQty) > 0) return urlQty;
    return product.minimumOrder.quantity.toString();
  }, [selectedQuantity, product.minimumOrder.quantity, searchParams]);

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    quantity: getInitialQuantity(),
    grade: getInitialGrade(),
    message: "",
  });

  // Update form when URL params or props change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      grade: getInitialGrade(),
      quantity: getInitialQuantity(),
    }));
  }, [getInitialGrade, getInitialQuantity]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productId: product.slug,
          productName: product.name,
          turnstileToken: turnstile.token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);

      // Reset after showing success
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        turnstile.reset();
        setFormData({
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          quantity: getInitialQuantity(),
          grade: getInitialGrade(),
          message: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Quote request error:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="blue"
        size="lg"
        className="w-full"
        onClick={() => setIsOpen(true)}
      >
        Ask for Price Quote
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Request Quote for {product.name}
            </DialogTitle>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Quote Request Submitted!
              </h3>
              <p className="text-muted-foreground">
                Our team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Preferred Grade</Label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {product.grades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">
                    Quantity ({product.minimumOrder.unit}) *
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={product.minimumOrder.quantity}
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Requirements</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your specific requirements, delivery preferences, or any questions..."
                  rows={4}
                />
              </div>

              <Turnstile
                onVerify={turnstile.handleVerify}
                onError={turnstile.handleError}
                onExpire={turnstile.handleExpire}
                size="normal"
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="blue"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !turnstile.isVerified}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to be contacted by our sales team.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
