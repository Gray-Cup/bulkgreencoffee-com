import { Button } from "@/components/ui/button";
import { getProductsByRegion, getCommercialProducts } from "@/data/products";
import { LazyProductRow } from "@/components/products";
import { RequestCallDialog } from "@/components/RequestCallDialog";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Buy Indian Green Coffee | Specialty & Commercial | Bulk Green Coffee",
  description:
    "Source Indian green coffee — specialty lots (Natural, Honey, Washed) and commercial AA/AAA grade from Koraput (Odisha), Halflong (Assam), and South India. Wholesale for roasters, blenders, and importers. Peaberry available. MOQ from 30 kg.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Buy Indian Green Coffee | Specialty & Commercial | Bulk Green Coffee",
    description:
      "Specialty and commercial-grade Indian green coffee from Koraput, Halflong, and South India. AA/AAA from ₹800/kg. Peaberry available. Export-ready with full traceability.",
    url: "https://bulkgreencoffee.com",
    locale: "en_US",
  },
};

const eastIndiaProducts = getProductsByRegion("East India");
const northEastIndiaProducts = getProductsByRegion("North East India");
const southIndiaProducts = getProductsByRegion("South India");
const commercialProducts = getCommercialProducts();

export default function Home() {
  return (
    <div>
      <div className="mx-auto px-4 lg:px-6 h-auto my-10">
        <div className="md:min-h-screen pt-10 pb-20 max-w-6xl mx-auto md:pb-0 flex flex-col justify-center">
          <div>
            <div>
              <div>
                <h1 className="text-4xl font-semibold text-black pt-2 max-w-xl">
                  Specialty and Commercial Indian Green Coffee — Wholesale & Export.
                </h1>
                <p className="text-lg text-neutral-700 mt-4 max-w-2xl">
                  From AAA/AA commercial grade beans at ₹800/kg to award-worthy specialty lots — we source directly from Koraput, Assam, and South India. Whether you run a roastery, a café chain, or import at scale, we have the right grade for your volume.
                </p>
                <div className="pt-5 flex flex-row gap-4">
                  <RequestCallDialog />
                  <Link
                    href="https://cal.com/arjunaditya/30min?user=arjunaditya"
                    target="_blank"
                  >
                    <Button variant="red" size="sm">
                      Schedule a Zoom Meeting
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="teal" size="sm">
                      Buy Products
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Featured Products Section */}
              <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 lg:px-6">
                  <LazyProductRow
                    title="Commercial Grade"
                    products={commercialProducts}
                    showActions={false}
                  />
                  <LazyProductRow
                    title="East India"
                    products={eastIndiaProducts}
                    showActions={false}
                  />
                  <LazyProductRow
                    title="North East India"
                    products={northEastIndiaProducts}
                    showActions={false}
                  />
                  <LazyProductRow
                    title="South India"
                    products={southIndiaProducts}
                    showActions={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
