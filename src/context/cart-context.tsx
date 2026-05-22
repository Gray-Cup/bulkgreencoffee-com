"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export const CART_TIERS = [
  { label: "100g", grams: 100, packaging: 30 },
  { label: "1kg",  grams: 1000, packaging: 0 },
  { label: "3kg",  grams: 3000, packaging: 0 },
  { label: "5kg",  grams: 5000, packaging: 0 },
] as const;

export type TierLabel = (typeof CART_TIERS)[number]["label"];
export type CartItem = { slug: string; tier: TierLabel };

type CartCtx = {
  items: CartItem[];
  add: (slug: string, tier?: TierLabel) => void;
  remove: (slug: string) => void;
  toggle: (slug: string, tier?: TierLabel) => void;
  updateTier: (slug: string, oldTier: TierLabel, newTier: TierLabel) => void;
  isInCart: (slug: string) => boolean;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bgc_selected");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setItems(
          parsed.map((s: string | CartItem) =>
            typeof s === "string" ? { slug: s, tier: "100g" as TierLabel } : s
          )
        );
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("bgc_selected", JSON.stringify(items));
  }, [items]);

  const add = useCallback((slug: string, tier: TierLabel = "100g") => {
    setItems((prev) =>
      prev.some((i) => i.slug === slug) ? prev : [...prev, { slug, tier }]
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const toggle = useCallback((slug: string, tier: TierLabel = "100g") => {
    setItems((prev) =>
      prev.some((i) => i.slug === slug)
        ? prev.filter((i) => i.slug !== slug)
        : [...prev, { slug, tier }]
    );
  }, []);

  const updateTier = useCallback((slug: string, oldTier: TierLabel, newTier: TierLabel) => {
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.tier === oldTier ? { ...i, tier: newTier } : i
      )
    );
  }, []);

  const isInCart = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items]
  );

  const clear = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider
      value={{ items, add, remove, toggle, updateTier, isInCart, clear, count: items.length }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
