"use client";

import React from "react";
import { CurrencyProvider } from "@/components/currency-provider";
import { CartProvider } from "@/context/cart-context";

interface RootProvidersProps {
  children: React.ReactNode;
}

export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <CurrencyProvider>
      <CartProvider>{children}</CartProvider>
    </CurrencyProvider>
  );
}
