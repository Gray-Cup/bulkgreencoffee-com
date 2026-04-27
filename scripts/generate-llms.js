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
    slug: "koraput-naturals",
    name: "Koraput Naturals",
    variety: "Arabica",
    region: "East India",
    description: "Sun-dried natural process green coffee beans from the tribal highlands of Koraput, Odisha — bold, fruity, and traceable to small-holder farms.",
    longDescription: "Grown at 900–1200m in the Eastern Ghats by tribal farming communities in Koraput district, these natural-process beans are dried whole on raised beds under the Odisha sun. The result is an intense, fruit-forward cup with wine-like complexity and a heavy, lingering body. Each lot is micro-milled and hand-sorted for export quality. Ideal for specialty roasters seeking authentic Indian single-origin coffees with a compelling provenance story.",
    details: ["Natural sun-dried process", "Tribal smallholder farms", "Eastern Ghats terroir", "Fruit-forward flavor profile", "Hand-sorted and micro-milled", "Traceable single-origin lots"],
    locations: ["Koraput, Odisha"],
    grades: ["Grade 1", "Grade 2", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "Chandragiri, Local Heirlooms",
    scaScore: 87
  },
  {
    slug: "koraput-hsd",
    name: "Koraput HSD (Honey Sun-Dried)",
    variety: "Arabica",
    region: "East India",
    description: "Honey Sun-Dried (HSD) green coffee from Koraput, Odisha — a unique process that delivers sweetness and body between naturals and washed.",
    longDescription: "Honey Sun-Dried (HSD) coffee from Koraput is pulped and then dried with the mucilage intact under direct sunlight, capturing the natural sugars of the cherry without full fermentation. The resulting green bean delivers pronounced sweetness, stone-fruit notes, and a silky body that appeals to both specialty and commercial buyers. Grown by tribal cooperatives in the biodiverse highlands of Koraput district, Odisha.",
    details: ["Honey (mucilage-on) sun-dried process", "Balanced sweetness and acidity", "Stone-fruit and caramel notes", "Tribal cooperative sourcing", "Eastern Ghats origin", "Hand-sorted for export"],
    locations: ["Koraput, Odisha"],
    grades: ["Gold Honey", "Red Honey", "Yellow Honey"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "Chandragiri, Local Heirlooms",
    scaScore: 88
  },
  {
    slug: "koraput-washed",
    name: "Koraput Washed",
    variety: "Arabica",
    region: "East India",
    description: "Fully washed green coffee beans from Koraput, Odisha — clean, bright, and expressive of the Eastern Ghats terroir.",
    longDescription: "Koraput Washed coffee undergoes a meticulous wet-process at community washing stations in Odisha's Eastern Ghats. Cherries are depulped, fermented in clean spring water overnight, thoroughly washed, and shade-dried on raised beds. This classic process highlights the origin's floral brightness and crisp, tea-like acidity. Perfect for filter coffee buyers and roasters looking for a clean, transparent Indian single origin.",
    details: ["Fully washed wet process", "Floral and tea-like brightness", "Crisp, clean cup profile", "Spring water fermentation", "Shade-dried on raised beds", "Community washing station"],
    locations: ["Koraput, Odisha"],
    grades: ["AA", "A", "AB", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "Chandragiri, S795",
    scaScore: 87
  },
  {
    slug: "araku-valley-naturals",
    name: "Araku Valley Naturals",
    variety: "Arabica",
    region: "East India",
    description: "Natural-process Arabica green coffee from the lush highlands of Araku Valley, Andhra Pradesh — vibrant, complex, and grown by tribal farming cooperatives.",
    longDescription: "Araku Valley sits at 900–1100m in the Eastern Ghats of Andhra Pradesh, where tribal cooperatives — supported by the Girijan Cooperative Corporation — cultivate shade-grown Arabica under a rich biodiversity canopy. Natural-process drying on raised beds develops the valley's characteristic tropical-fruit brightness, honeyed sweetness, and clean finish. Araku has earned international acclaim for its specialty potential, and these lots represent the finest the valley has to offer.",
    details: ["Natural sun-dried process", "Shade-grown under Eastern Ghats forest canopy", "Tribal cooperative sourcing (GCC)", "Tropical-fruit brightness and honey sweetness", "Hand-sorted for export", "Internationally recognised specialty origin"],
    locations: ["Araku Valley, Andhra Pradesh"],
    grades: ["Grade 1", "Grade 2", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "S795, Chandragiri",
    scaScore: 86
  },
  {
    slug: "halflong-arabica-naturals",
    name: "Halflong Arabica Naturals",
    variety: "Arabica",
    region: "North East India",
    description: "Natural-process Arabica green coffee from the misty highlands of Halflong, Assam — rare, aromatic, and distinctly North-East Indian.",
    longDescription: "Halflong, nestled in the Dima Hasao district of Assam at elevations above 1000m, produces some of India's most underrated Arabica coffees. These natural-process beans are dried whole on raised beds under Assam's cool highland climate, developing a wine-like intensity softened by the region's persistent mist and cool nights. The resulting green bean carries delicate florals, red-berry sweetness, and a smooth, rounded body — a compelling contrast to the bold naturals of South India. Strictly limited harvests make this an exceptional origin for specialty buyers.",
    details: ["Natural sun-dried Arabica", "High-altitude Dima Hasao hills", "Cool-climate slow drying", "Wine-like and floral notes", "Red-berry sweetness", "Limited harvest — North-East India origin"],
    locations: ["Halflong, Assam"],
    grades: ["Naturals"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "SL-9",
    scaScore: 89
  },
  {
    slug: "chirang-robusta-naturals",
    name: "Chirang Robusta Naturals",
    variety: "Robusta",
    region: "North East India",
    description: "Natural-process Robusta green coffee from the lowland forests of Chirang, Assam — bold, earthy, and distinctly North-East Indian.",
    longDescription: "Grown in the forest-fringe villages of Chirang district at 100–200m, this CxR (Congensis × Robusta) cultivar thrives in Assam's humid subtropical climate. Natural process drying on raised beds brings out a deep, chocolatey body with earthy undertones and low acidity — well-suited for espresso blends, instant coffee production, or buyers seeking affordable North-East Indian Robusta. Harvested by small-holder farming families under a canopy of deciduous forest.",
    details: ["CxR (Congensis × Robusta) cultivar", "Natural sun-dried process", "Low-altitude forest-fringe farms", "Bold, chocolatey body", "Low acidity, high caffeine", "Ideal for espresso blends and instant"],
    locations: ["Chirang, Assam"],
    grades: ["Grade 1", "Grade 2"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "CxR"
  },
  {
    slug: "tirap-robusta-naturals",
    name: "Tirap Robusta Naturals",
    variety: "Robusta",
    region: "North East India",
    description: "Natural-process Robusta green coffee from the hilly forests of Tirap, Arunachal Pradesh — rich, full-bodied, and traceable to tribal farms.",
    longDescription: "Tirap district in Arunachal Pradesh sits at around 300m in the eastern foothills of the Himalayas, producing a CxR Robusta with more elevation character than typical lowland Robusta. The natural process lends a mild fruitiness on top of the variety's inherent earthiness and depth. Harvested by Naga and Wancho tribal communities, this coffee offers a compelling provenance story alongside solid commercial cup quality. Suitable for blending, instant, and high-volume roastery buyers.",
    details: ["CxR (Congensis × Robusta) cultivar", "Natural sun-dried process", "Himalayan foothill farms at 300m", "Rich body with mild fruity notes", "Tribal Naga and Wancho farming communities", "Arunachal Pradesh single origin"],
    locations: ["Tirap, Arunachal Pradesh"],
    grades: ["Grade 1", "Grade 2"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "CxR"
  },
  {
    slug: "chikmagalur-arabica",
    name: "Chikmagalur Arabica",
    variety: "Arabica",
    region: "South India",
    description: "Premium green Arabica from the misty coffee estates of Chikmagalur, Karnataka — the heartland of Indian coffee with bright acidity and floral notes.",
    longDescription: "Chikmagalur, perched in the Western Ghats of Karnataka, is the cradle of Indian coffee and produces some of the country's most consistent, well-structured Arabica. Grown at 900–1200m on well-established estates under silver oak shade, these beans develop a classic profile of bright citrus acidity, subtle floral notes, and a clean, balanced finish. Available in washed, natural, and honey process — ideal for specialty roasters building a reliable South India offering.",
    details: ["Western Ghats shade-grown Arabica", "900–1200 masl elevation", "Multiple process options (washed / natural / honey)", "Bright citrus acidity and floral top notes", "Established estate sourcing", "Karnataka's original coffee belt"],
    locations: ["Chikmagalur, Karnataka"],
    grades: ["AA", "A", "AB", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "S795, Catuai, SLN 9",
    scaScore: 85
  },
  {
    slug: "coorg-arabica",
    name: "Coorg Arabica",
    variety: "Arabica",
    region: "South India",
    description: "Rich, full-bodied green Arabica from Coorg (Kodagu), Karnataka — grown on lush planters' estates at elevation with excellent body and mild acidity.",
    longDescription: "Coorg, also known as Kodagu, is Karnataka's other great coffee district — famous for its dense, forested planters' estates where Arabica grows under pepper vines and silver oak at 800–1100m. The beans carry a characteristic richness: full body, mild acidity, chocolate and spice undertones, and a long, clean finish. A favourite among South Indian filter coffee blenders and specialty roasters alike, Coorg Arabica is one of India's most reliably traded origins.",
    details: ["Full-bodied Arabica from Kodagu estates", "800–1100 masl elevation", "Grown alongside pepper and cardamom", "Chocolate and spice undertones", "Mild acidity, long clean finish", "Traditional planters' estate sourcing"],
    locations: ["Coorg (Kodagu), Karnataka"],
    grades: ["AA", "A", "AB", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "S795, Catuai",
    scaScore: 84
  },
  {
    slug: "wayanad-arabica",
    name: "Wayanad Arabica",
    variety: "Arabica",
    region: "South India",
    description: "Smooth, well-rounded green Arabica from the highland forests of Wayanad, Kerala — celebrated for its mild flavour and excellent cup consistency.",
    longDescription: "Wayanad's coffee grows in the biodiverse forests of northern Kerala at 700–1000m, benefiting from the Arabian Sea's moisture and cool Ghats nights. Small-holder farms and cooperatives produce Arabica with a notably smooth cup — gentle acidity, mild nuttiness, subtle floral hints, and a clean, medium body. Wayanad Arabica is prized for its consistency and adaptability across filter, espresso, and blending applications. Certified organic lots are available on request.",
    details: ["Kerala forest-grown Arabica", "700–1000 masl elevation", "Small-holder and cooperative sourcing", "Smooth, mild cup with floral hints", "Organic certified lots available", "Consistent quality across seasons"],
    locations: ["Wayanad, Kerala"],
    grades: ["AA", "A", "AB", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    varietal: "S795, Catuai, Chandragiri",
    scaScore: 84
  },
  {
    slug: "bababudangiri-arabica",
    name: "Bababudangiri Arabica",
    variety: "Arabica",
    region: "South India",
    description: "Rare single-origin green Arabica from the ancient Bababudangiri hills, Karnataka — India's mythical coffee birthplace with a distinctive earthy complexity.",
    longDescription: "The Bababudangiri hills in Karnataka's Chikmagalur district are where coffee is said to have first been cultivated in India, brought by Baba Budan in the 17th century. Today, small estates and forest-fringe farms at 1000–1400m produce limited lots of Arabica with a profile unlike any other Indian origin — earthy and spiced at its core, with a creamy body, brown-sugar sweetness, and a lingering, complex finish. These lots are genuinely rare and carry a provenance story that resonates strongly with specialty buyers.",
    details: ["India's mythical coffee origin", "1000–1400 masl — one of India's highest-grown origins", "Rare, limited-availability lots", "Earthy, spiced complexity with creamy body", "Brown-sugar sweetness and long finish", "Forest-fringe small-estate sourcing"],
    locations: ["Bababudangiri, Karnataka"],
    grades: ["Grade 1", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags"],
    varietal: "S795, Local Heirlooms",
    scaScore: 86
  }
];

function formatProductContent(product) {
  let content = `title: ${product.name}\n`;
  content += `url: ${SITE_URL}/products/${product.slug}\n`;
  content += `variety: ${product.variety}\n`;
  content += `region: ${product.region}\n`;
  content += `description: ${product.description}\n\n`;

  content += `## Product Description\n${product.longDescription}\n\n`;

  content += `## Details\n${product.details.join(", ")}\n\n`;

  content += `## Available Grades\n${product.grades.join(", ")}\n\n`;

  content += `## Source Locations\n${product.locations.join(", ")}\n\n`;

  content += `## Packaging Options\n${product.packaging.join(", ")}\n\n`;

  if (product.varietal) {
    content += `## Varietal\n${product.varietal}\n\n`;
  }

  if (product.scaScore) {
    content += `## SCA Score\n${product.scaScore}\n\n`;
  }

  return content;
}

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
    content += formatProductContent(product);
    content += `### END PAGE\n\n`;
  });

  content += `\n---\n\n`;

  content += `## Site Metadata\n`;
  content += `site_name: Bulk Green Coffee\n`;
  content += `site_url: ${SITE_URL}\n`;
  content += `business_name: Gray Cup Enterprises Private Limited\n`;
  content += `country: India\n`;
  content += `contact_email: office@graycup.org\n`;
  content += `business_description: B2B green coffee supplier helping Roasters and Distributors source better Indian Coffee.\n`;

  fs.writeFileSync(OUTPUT_PATH, content);
  console.log(`Generated ${OUTPUT_PATH}`);
}

generateLLMS();