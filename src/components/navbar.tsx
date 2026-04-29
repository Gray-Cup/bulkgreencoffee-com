"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CurrencySelector } from "@/components/currency-selector";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-teal-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl text-white font-semibold text-nowrap tracking-tight">
                Bulk Green Coffee
              </span>
            </Link>
            <p className="opacity-20">|</p>
            <nav className="hidden md:flex text-neutral-100 gap-1 text-sm font-medium">
              {[
                ["Products", "/products"],
                ["Product Request", "/new-product-request"],
                ["Price Quote", "/price-quote"],
                ["White Label", "/white-label"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-md px-2 py-2 hover:bg-teal-500"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <CurrencySelector />
            <a
              id="store-link"
              href="/contact"
              className="hidden lg:inline-block"
            >
              <Button variant="lightgraybg" size="sm">
                Contact
              </Button>
            </a>
            <a
              id="store-link"
              href="https://graycup.org/"
              target="_blank"
              rel="noopener"
              className="hidden lg:inline-block"
            >
              <Button variant="lightgraybg" size="sm">
                Visit Gray Cup
              </Button>
            </a>

            {/* Hamburger — visible whenever anything is hidden */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-teal-500"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <aside
          style={{ backgroundColor: "#115e59" }}
          className={`absolute right-0 top-0 h-full w-72 p-6 shadow-xl flex flex-col
          transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-white font-semibold tracking-tight">
              Bulk Green Coffee
            </span>
            <button
              className="rounded-md cursor-pointer p-2 text-white hover:bg-teal-500"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* All links */}
          <nav className="flex flex-col text-neutral-100 gap-1 text-sm font-medium">
            {[
              ["Products", "/products"],
              ["Product Request", "/new-product-request"],
              ["Price Quote", "/price-quote"],
              ["White Label", "/white-label"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2 hover:bg-teal-500"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2 pt-6">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              <Button variant="lightgraybg" size="sm" className="w-full">
                Contact
              </Button>
            </Link>
            <Link
              href="https://graycup.org/"
              target="_blank"
              rel="noopener"
              onClick={() => setMenuOpen(false)}
            >
              <Button variant="lightgraybg" size="sm" className="w-full">
                Visit Gray Cup
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
