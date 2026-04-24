"use client";

import React from "react";
import { CurrencyProvider } from "@/components/currency-provider";

interface RootProvidersProps {
  children: React.ReactNode;
}

export default function RootProviders({ children }: RootProvidersProps) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}
