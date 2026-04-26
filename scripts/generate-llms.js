const fs = require('fs');
const path = require('path');

const SITE_URL = "https://bulkgreencoffee.com";
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'llms.txt');

const pages = [
  {
    title: "Bulk Green Coffee - Home",
    url: SITE_URL,
    description: "We help Roasters and Distributors source better Indian Coffee. B2B green coffee supplier based in India."
  },
  {
    title: "About Bulk Green Coffee",
    url: `${SITE_URL}/about`,
    description: "About Gray Cup Enterprises Private Limited - Legal details, notable people, and other sites including graycup.in and IndiaMart presence."
  },
  {
    title: "Products - Green Coffee Catalog",
    url: `${SITE_URL}/products`,
    description: "Browse our catalog of green coffee products from East India (Koraput, Araku Valley), North East India (Assam, Arunachal Pradesh), and South India (Chikmagalur, Coorg, Wayanad, Bababudangiri)."
  },
  {
    title: "Contact Bulk Green Coffee",
    url: `${SITE_URL}/contact`,
    description: "Contact information including schedule a meeting, phone numbers, sales inquiries at office@graycup.org, and general enquiries at arjun@graycup.in."
  },
  {
    title: "Bulk Green Coffee - White Label",
    url: `${SITE_URL}/white-label`,
    description: "White label solutions for businesses looking to brand our coffee products."
  },
  {
    title: "Bulk Green Coffee - Sample Request",
    url: `${SITE_URL}/sample-request`,
    description: "Request coffee samples for evaluation before placing bulk orders."
  },
  {
    title: "Bulk Green Coffee - Sites",
    url: `${SITE_URL}/sites`,
    description: "Information about our other web properties and sales channels."
  },
  {
    title: "Bulk Green Coffee - Careers",
    url: `${SITE_URL}/careers`,
    description: "Career opportunities at Gray Cup Enterprises Private Limited."
  },
  {
    title: "Bulk Green Coffee - Team",
    url: `${SITE_URL}/team`,
    description: "Meet the team behind Bulk Green Coffee."
  },
  {
    title: "Bulk Green Coffee - Social Responsibility",
    url: `${SITE_URL}/social-responsibility`,
    description: "Our commitment to social and environmental responsibility."
  },
  {
    title: "Terms of Service",
    url: `${SITE_URL}/terms`,
    description: "Terms of service for Bulk Green Coffee customers."
  },
  {
    title: "Privacy Policy",
    url: `${SITE_URL}/privacy`,
    description: "Privacy policy and data handling practices."
  },
  {
    title: "New Product Request",
    url: `${SITE_URL}/new-product-request`,
    description: "Request products not currently in our catalog."
  }
];

const products = [
  {
    title: "Koraput Naturals",
    url: `${SITE_URL}/products/koraput-naturals`,
    description: "Sun-dried natural process Arabica from Koraput, Odisha. Price range: ₹1100-1900/kg. Minimum order: 60kg. SCA Score: 87."
  },
  {
    title: "Koraput HSD (Honey Sun-Dried)",
    url: `${SITE_URL}/products/koraput-hsd`,
    description: "Honey sun-dried Arabica from Koraput, Odisha with stone-fruit and caramel notes. Price range: ₹1200-2100/kg. Minimum order: 60kg. SCA Score: 88."
  },
  {
    title: "Koraput Washed",
    url: `${SITE_URL}/products/koraput-washed`,
    description: "Fully washed Arabica from Koraput, Odisha with floral and tea-like brightness. Price range: ₹1100-1900/kg. Minimum order: 60kg. SCA Score: 87."
  },
  {
    title: "Araku Valley Naturals",
    url: `${SITE_URL}/products/araku-valley-naturals`,
    description: "Natural-process Arabica from Araku Valley, Andhra Pradesh with tropical-fruit brightness. Price range: ₹1200-2000/kg. Minimum order: 60kg. SCA Score: 86."
  },
  {
    title: "Halflong Arabica Naturals",
    url: `${SITE_URL}/products/halflong-arabica-naturals`,
    description: "Rare natural-process Arabica from Halflong, Assam with wine-like and floral notes. Price: ₹1750/kg. Minimum order: 30kg. SCA Score: 89."
  },
  {
    title: "Chirang Robusta Naturals",
    url: `${SITE_URL}/products/chirang-robusta-naturals`,
    description: "Natural-process Robusta from Chirang, Assam with bold, chocolatey body. Price range: ₹750-1100/kg. Minimum order: 60kg."
  },
  {
    title: "Tirap Robusta Naturals",
    url: `${SITE_URL}/products/tirap-robusta-naturals`,
    description: "Natural-process Robusta from Tirap, Arunachal Pradesh with rich body and mild fruity notes. Price range: ₹800-1200/kg. Minimum order: 60kg."
  },
  {
    title: "Chikmagalur Arabica",
    url: `${SITE_URL}/products/chikmagalur-arabica`,
    description: "Premium Arabica from Chikmagalur, Karnataka with bright citrus acidity. Price range: ₹950-1700/kg. Minimum order: 60kg. SCA Score: 85."
  },
  {
    title: "Coorg Arabica",
    url: `${SITE_URL}/products/coorg-arabica`,
    description: "Rich, full-bodied Arabica from Coorg (Kodagu), Karnataka with chocolate and spice notes. Price range: ₹900-1600/kg. Minimum order: 60kg. SCA Score: 84."
  },
  {
    title: "Wayanad Arabica",
    url: `${SITE_URL}/products/wayanad-arabica`,
    description: "Smooth Arabica from Wayanad, Kerala with mild nuttiness and subtle floral hints. Price range: ₹900-1650/kg. Minimum order: 60kg. SCA Score: 84."
  },
  {
    title: "Bababudangiri Arabica",
    url: `${SITE_URL}/products/bababudangiri-arabica`,
    description: "Rare Arabica from Bababudangiri hills, Karnataka (India's coffee birthplace) with earthy complexity. Price range: ₹1200-2200/kg. Minimum order: 30kg. SCA Score: 86."
  }
];

function generateLLMS() {
  const now = new Date().toISOString();

  let content = `<SYSTEM>This is the full textual snapshot of bulkgreencoffee.com</SYSTEM>\n\n`;
  content += `# llms-full v1\n`;
  content += `# site: ${SITE_URL}\n`;
  content += `# generated: ${now}\n`;
  content += `# generator: custom script\n`;
  content += `# pages: ${pages.length + products.length}\n\n`;

  content += `## Table of Contents\n`;
  pages.forEach((page, i) => {
    content += `- ${i + 1} ${page.url} — ${page.title}\n`;
  });
  content += `\n---\n\n`;

  content += `## Pages\n`;
  pages.forEach(page => {
    content += `### BEGIN PAGE\n`;
    content += `title: ${page.title}\n`;
    content += `url: ${page.url}\n`;
    content += `description: ${page.description}\n`;
    content += `### END PAGE\n\n`;
  });

  content += `\n---\n\n`;

  content += `## Products\n`;
  products.forEach(product => {
    content += `### BEGIN PAGE\n`;
    content += `title: ${product.title}\n`;
    content += `url: ${product.url}\n`;
    content += `description: ${product.description}\n`;
    content += `### END PAGE\n\n`;
  });

  content += `\n---\n\n`;

  content += `## Site Metadata\n`;
  content += `site_name: Bulk Green Coffee\n`;
  content += `site_url: ${SITE_URL}\n`;
  content += `business_name: Gray Cup Enterprises Private Limited\n`;
  content += `country: India\n`;
  content += `contact_email: office@graycup.org\n`;
  content += `contact_phone: +91 85279 14317\n`;
  content += `business_description: B2B green coffee supplier helping Roasters and Distributors source better Indian Coffee.\n`;

  fs.writeFileSync(OUTPUT_PATH, content);
  console.log(`Generated ${OUTPUT_PATH}`);
}

generateLLMS();