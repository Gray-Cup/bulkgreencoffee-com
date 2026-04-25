import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs } from "@/data/products";
import {
  ProductConfigurator,
  PriceDisplay,
} from "@/components/products";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const baseUrl = "https://bulkgreencoffee.com";
  const productUrl = `${baseUrl}/products/${slug}`;

  const seoDescription = `Buy ${product.name} in bulk from Bulk Green Coffee. ${product.description} Price: ₹${product.priceRange.min}-₹${product.priceRange.max} ${product.priceRange.unit}. MOQ: ${product.minimumOrder.quantity} ${product.minimumOrder.unit}.`;

  return {
    title: `${product.name} | Wholesale ${product.category} Supplier India - Bulk Green Coffee`,
    description: seoDescription,
    openGraph: {
      title: `${product.name} | Wholesale ${product.category} - Bulk Green Coffee`,
      description: seoDescription,
      url: productUrl,
      siteName: "Bulk Green Coffee",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Wholesale ${product.category} - Bulk Green Coffee`,
      description: seoDescription,
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://bulkgreencoffee.com" },
    { name: "Products", url: "https://bulkgreencoffee.com/products" },
    { name: product.name, url: `https://bulkgreencoffee.com/products/${slug}` },
  ];

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Main product section — breadcrumb sticks within this container */}
      <div className="py-12 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Sticky breadcrumb */}
          <nav className="sticky top-16 z-20 bg-white py-3 -mx-4 px-4 lg:-mx-6 lg:px-6 border-b border-gray-100 mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-black transition-colors">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-black font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Title + Image */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Title: above image on desktop, below image on mobile */}
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-semibold text-black">
                    {product.name}
                  </h1>
                  {product.scaScore != null && product.scaScore > 81 && (
                    <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                      Specialty
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2">
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 lg:sticky lg:top-28">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    draggable={false}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">

              {/* Product Specs */}
              <div className="py-4 border-y border-gray-200 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {product.priceRange.min === product.priceRange.max ? "Price" : "Price Range"}
                    </p>
                    <p className="font-semibold">
                      <PriceDisplay
                        minPrice={product.priceRange.min}
                        maxPrice={product.priceRange.max}
                        unit={product.priceRange.unit}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Minimum Order</p>
                    <p className="font-semibold">
                      {product.minimumOrder.quantity}{" "}{product.minimumOrder.unit}
                    </p>
                  </div>
                  {product.varietal && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Varietal</p>
                      <p className="font-semibold">{product.varietal}</p>
                    </div>
                  )}
                  {product.scaScore && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">SCA Score</p>
                      <p className="font-semibold">{product.scaScore}+</p>
                    </div>
                  )}
                  {product.scale && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Scale</p>
                      <p className="font-semibold">{product.scale}T / 3 months</p>
                    </div>
                  )}
                </div>
                {product.origin && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-muted-foreground mb-2">Origin</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-xs text-muted-foreground border-b border-gray-100">
                            <th className="text-left font-medium pb-1.5 pr-4">State</th>
                            <th className="text-left font-medium pb-1.5 pr-4">Region</th>
                            <th className="text-left font-medium pb-1.5 pr-4">Variety</th>
                            <th className="text-left font-medium pb-1.5 pr-4">Process</th>
                            <th className="text-left font-medium pb-1.5 pr-4">Varietal</th>
                            <th className="text-left font-medium pb-1.5">Elevation</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="pr-4 py-1 font-medium">{product.origin.state}</td>
                            <td className="pr-4 py-1 font-medium">{product.origin.region}</td>
                            <td className="pr-4 py-1 font-medium">{product.origin.variety}</td>
                            <td className="pr-4 py-1 font-medium">{product.grades[0]}</td>
                            <td className="pr-4 py-1 font-medium">{product.varietal}</td>
                            <td className="py-1 font-medium">{product.origin.elevation}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Calculator */}
              <ProductConfigurator product={product} />

              {/* Accordions */}
              <Accordion type="multiple" defaultValue={["description"]}>
                <AccordionItem value="description">
                  <AccordionTrigger>Product Description</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="grades">
                  <AccordionTrigger>Available Grades</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.grades.map((grade) => (
                        <Badge key={grade} variant="outline" className="bg-white">
                          {grade}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="locations">
                  <AccordionTrigger>Source Locations</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.locations.map((location) => (
                        <span key={location} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="packaging">
                  <AccordionTrigger>Packaging Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.packaging.map((pack) => (
                        <span key={pack} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {pack}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Wide estate section — outside max-w-7xl, breaks to full width */}
      {(product.estateImages?.length || product.reviews?.length) && (
        <div className="border-t border-gray-100 py-16 px-4 lg:px-6">
          {/* Section title */}
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              From the Estate
            </h2>
            <p className="text-muted-foreground mt-1">
              {product.origin
                ? `${product.origin.region}, ${product.origin.state}`
                : product.locations[0]}
            </p>
          </div>

          {/* Estate images — full bleed grid */}
          {product.estateImages && product.estateImages.length > 0 && (
            <div className="max-w-7xl mx-auto mb-16">
              <div className={`grid gap-4 ${product.estateImages.length === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
                {product.estateImages.map((src, i) => (
                  <div key={i} className={`relative rounded-xl overflow-hidden bg-gray-100 ${i === 0 ? "aspect-[4/3] col-span-2 md:col-span-2" : "aspect-square"}`}>
                    <Image
                      src={src}
                      alt={`${product.name} estate image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="max-w-7xl mx-auto">
              <h3 className="text-lg font-semibold text-black mb-6">What buyers say</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.reviews.map((review, i) => (
                  <div key={i} className="bg-neutral-50 border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
                    <p className="text-gray-700 leading-relaxed text-sm">"{review.text}"</p>
                    <div className="mt-auto">
                      <p className="font-semibold text-sm text-black">{review.author}</p>
                      {review.role && (
                        <p className="text-xs text-muted-foreground">{review.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
