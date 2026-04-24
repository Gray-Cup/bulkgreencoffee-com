import { Button } from "@/components/ui/button";
import {
  coffeeProducts,
  ctcTeaProducts,
  looseLeafTeaProducts,
  instantCoffeeProducts,
} from "@/data/products";
import { CoffeeCup } from "@/components/svgs";
import { LazyProductRow } from "@/components/products";
import { RequestCallDialog } from "@/components/RequestCallDialog";
import Link from "next/link";

export const revalidate = 3600;

export default function Home() {
  return (
    <div>
      <div className="mx-auto px-4 lg:px-6 h-auto my-10">
        <div className="md:min-h-screen pt-10 pb-20 max-w-6xl mx-auto md:pb-0 flex flex-col justify-center">
          <div>
            {/* Left Column */}
            <div>
              <div>
                <span className="pb-4 sm:ml-0.5 text-sm font-medium uppercase text-neutral-500">
                  Sustainability & Transparency
                </span>
                <h1 className="text-4xl font-semibold text-black pt-2 max-w-xl">
                  We help Businesses at Scale with Better Support
                </h1>
                <p className="text-lg text-neutral-700 mt-4 max-w-2xl">
                  We are dedicated to providing exceptional service and support
                  to our B2B clients. Whether you're a small cafe or a large
                  hotel chain, we operate with new tech and ethical practices.
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
                  <LazyProductRow title="CTC Tea" products={ctcTeaProducts} />
                  <LazyProductRow
                    title="Coffee"
                    products={[...coffeeProducts, ...instantCoffeeProducts]}
                  />
                  <LazyProductRow
                    title="Loose Leaf Tea"
                    products={looseLeafTeaProducts}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-10 py-10 bg-neutral-100">
            <h2 className="text-5xl font-medium text-neutral-900 mb-6 flex justify-center flex-row items-center gap-4 font-instrument-sans"></h2>
          </div>

          <div className="my-20 flex flex-col md:items-center px-6 py-10 md:py-20 bg-neutral-50 md:grid md:grid-cols-[70%_30%]">
            <div>
              <div className="block md:hidden max-md:pb-5">
                <CoffeeCup />
              </div>

              <h2 className="text-2xl sm:text-4xl font-medium text-neutral-900 mb-6 font-instrument-sans">
                Gray Cup Narrative
              </h2>

              <p className="text-md sm:text-lg mb-10 text-neutral-700 my-4 max-w-2xl leading-relaxed">
                <span className="mb-4">
                  Gray Cup creates sustainable, high-quality essentials for
                  everything that belongs in your cup.
                </span>
                Built on the idea of a{" "}
                <span className="font-medium">neutral cup</span>, sustainable,
                balanced, and uncompromising in quality, Gray Cup focuses on
                what truly matters.
                <br />
                <br />
                From coffee and matcha to tea and future essentials, we do not
                chase categories or trends.
                <br />
                <br />
                <span className="font-medium text-neutral-900">
                  The best is what belongs in your cup.
                </span>
              </p>
            </div>

            <div className="hidden md:block">
              <CoffeeCup />
            </div>

            <a href="https://discord.gg/gpRxmW63JW" target="_blank">
              <Button variant="gray">Join Our Discord</Button>
            </a>
          </div>

          {/* <Image src="/beans-circle.webp" alt="coffee beans" className="pl-2" width={200} height={200} /> */}
        </div>
      </div>
    </div>
  );
}
