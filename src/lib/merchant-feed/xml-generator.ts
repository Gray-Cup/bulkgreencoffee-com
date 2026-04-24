import type { CountryCode, MerchantProduct, LocalizedProduct } from "./types";
import { getCountryConfig } from "./countries";
import { formatMerchantPrice } from "./price-converter";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Localize a product for a specific country/currency
 */
export function localizeProduct(
  product: MerchantProduct,
  countryCode: CountryCode
): LocalizedProduct {
  const config = getCountryConfig(countryCode);
  const currency = config.currency;

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    link: product.link,
    imageLink: product.imageLink,
    availability: product.availability,
    price: formatMerchantPrice(product.priceINR, currency),
    salePrice: product.salePriceINR
      ? formatMerchantPrice(product.salePriceINR, currency)
      : undefined,
    brand: product.brand,
    condition: product.condition,
    googleProductCategory: product.googleProductCategory,
    productType: product.productType,
    mpn: product.mpn,
    identifierExists: product.identifierExists,
    currency,
    country: countryCode,
  };
}

/**
 * Generate XML item for a single product
 */
function generateProductXml(product: LocalizedProduct): string {
  let xml = `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(product.link)}</g:link>
      <g:image_link>${escapeXml(product.imageLink)}</g:image_link>
      <g:availability>${product.availability}</g:availability>
      <g:price>${product.price}</g:price>`;

  if (product.salePrice) {
    xml += `\n      <g:sale_price>${product.salePrice}</g:sale_price>`;
  }

  xml += `
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:condition>${product.condition}</g:condition>
      <g:google_product_category>${product.googleProductCategory}</g:google_product_category>
      <g:product_type>${escapeXml(product.productType)}</g:product_type>
      <g:mpn>${escapeXml(product.mpn)}</g:mpn>
      <g:identifier_exists>${product.identifierExists ? "yes" : "no"}</g:identifier_exists>
    </item>`;

  return xml;
}

/**
 * Generate complete XML feed for a specific country
 */
export function generateCountryFeed(
  products: MerchantProduct[],
  countryCode: CountryCode,
  baseUrl: string
): string {
  const config = getCountryConfig(countryCode);
  const localizedProducts = products.map((p) => localizeProduct(p, countryCode));

  const items = localizedProducts.map(generateProductXml).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Gray Cup B2B - ${config.name} (${config.currency})</title>
    <link>${baseUrl}</link>
    <description>Premium wholesale tea and coffee products for ${config.name}</description>
${items}
  </channel>
</rss>`;
}
