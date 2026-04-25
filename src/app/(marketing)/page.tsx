import { Button } from "@/components/ui/button";
import { getProductsByRegion } from "@/data/products";
import { LazyProductRow } from "@/components/products";
import { RequestCallDialog } from "@/components/RequestCallDialog";
import Link from "next/link";

export const revalidate = 3600;

const eastIndiaProducts = getProductsByRegion("East India");
const southIndiaProducts = getProductsByRegion("South India");

export default function Home() {
  return (
    <div>
      <div className="mx-auto px-4 lg:px-6 h-auto my-10">
        <div className="md:min-h-screen pt-10 pb-20 max-w-6xl mx-auto md:pb-0 flex flex-col justify-center">
          <div>
            {/* Left Column */}
            <div>
              <div>
                <h1 className="text-4xl font-semibold text-black pt-2 max-w-xl">
                  We help Roasters and Distributors source better Indian Coffee.
                </h1>
                <p className="text-lg text-neutral-700 mt-4 max-w-2xl">
                  We are dedicated to providing exceptional service and support
                  to our B2B clients. Whether you're a small roastery or a large importer, we are here to help you source the best Indian coffee for your needs.
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
                </div>
              </div>
              {/* Featured Products Section */}
              <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 lg:px-6">
                  <LazyProductRow
                    title="East India"
                    products={eastIndiaProducts}
                  />
                  <LazyProductRow
                    title="South India"
                    products={southIndiaProducts}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <Image src="/beans-circle.webp" alt="coffee beans" className="pl-2" width={200} height={200} /> */}
        </div>
      </div>
    </div>
  );
}
