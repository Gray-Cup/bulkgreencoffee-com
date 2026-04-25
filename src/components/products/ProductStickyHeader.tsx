"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductStickyHeaderProps {
  name: string;
  description: string;
  scaScore?: number | null;
  sentinelId?: string;
}

export function ProductStickyHeader({
  name,
  description,
  scaScore,
  sentinelId = "accordion-sentinel",
}: ProductStickyHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    const header = headerRef.current;
    if (!sentinel || !header) return;

    const stickyClasses = ["sticky", "top-28", "z-10", "bg-white", "pb-3"];

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Stick only when accordion sentinel is below the viewport (not yet reached)
        const shouldBeSticky =
          !entry.isIntersecting && entry.boundingClientRect.top > 0;
        stickyClasses.forEach((cls) =>
          header.classList.toggle(cls, shouldBeSticky)
        );
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  return (
    <div ref={headerRef} className="sticky top-28 z-10 bg-white pb-3">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h1 className="text-3xl md:text-4xl font-semibold text-black">
          {name}
        </h1>
        {scaScore != null && scaScore > 81 && (
          <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
            Specialty
          </Badge>
        )}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
