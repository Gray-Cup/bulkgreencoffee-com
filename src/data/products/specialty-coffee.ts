import type { Product } from "./types";

export const specialtyCoffeeProducts: Product[] = [
  {
    slug: "koraput-naturals",
    name: "Koraput Naturals",
    image: "/products/koraput-naturals.png",
    description:
      "Sun-dried natural process green coffee beans from the tribal highlands of Koraput, Odisha — bold, fruity, and traceable to small-holder farms.",
    longDescription:
      "Grown at 900–1200m in the Eastern Ghats by tribal farming communities in Koraput district, these natural-process beans are dried whole on raised beds under the Odisha sun. The result is an intense, fruit-forward cup with wine-like complexity and a heavy, lingering body. Each lot is micro-milled and hand-sorted for export quality. Ideal for specialty roasters seeking authentic Indian single-origin coffees with a compelling provenance story.",
    details: [
      "Natural sun-dried process",
      "Tribal smallholder farms",
      "Eastern Ghats terroir",
      "Fruit-forward flavor profile",
      "Hand-sorted and micro-milled",
      "Traceable single-origin lots",
    ],
    locations: ["Koraput, Odisha"],
    category: "Coffee",
    categoryTwo: "Single Origin",
    priceRange: {
      min: 1100,
      max: 1900,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 60,
      unit: "kg",
    },
    grades: ["Grade 1", "Grade 2", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    sku: "BGC-KOR-NAT-001",
    brand: "Bulk Green Coffee",
    availability: "in_stock",
    googleProductCategory: "1868",
  },
  {
    slug: "koraput-hsd",
    name: "Koraput HSD",
    image: "/products/koraput-hsd.png",
    description:
      "Honey Sun-Dried (HSD) green coffee from Koraput, Odisha — a unique process that delivers sweetness and body between naturals and washed.",
    longDescription:
      "Honey Sun-Dried (HSD) coffee from Koraput is pulped and then dried with the mucilage intact under direct sunlight, capturing the natural sugars of the cherry without full fermentation. The resulting green bean delivers pronounced sweetness, stone-fruit notes, and a silky body that appeals to both specialty and commercial buyers. Grown by tribal cooperatives in the biodiverse highlands of Koraput district, Odisha.",
    details: [
      "Honey (mucilage-on) sun-dried process",
      "Balanced sweetness and acidity",
      "Stone-fruit and caramel notes",
      "Tribal cooperative sourcing",
      "Eastern Ghats origin",
      "Hand-sorted for export",
    ],
    locations: ["Koraput, Odisha"],
    category: "Coffee",
    categoryTwo: "Single Origin",
    priceRange: {
      min: 1200,
      max: 2100,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 60,
      unit: "kg",
    },
    grades: ["Gold Honey", "Red Honey", "Yellow Honey"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    sku: "BGC-KOR-HSD-001",
    brand: "Bulk Green Coffee",
    availability: "in_stock",
    googleProductCategory: "1868",
  },
  {
    slug: "koraput-washed",
    name: "Koraput Washed",
    image: "/products/koraput-washed.png",
    description:
      "Fully washed green coffee beans from Koraput, Odisha — clean, bright, and expressive of the Eastern Ghats terroir.",
    longDescription:
      "Koraput Washed coffee undergoes a meticulous wet-process at community washing stations in Odisha's Eastern Ghats. Cherries are depulped, fermented in clean spring water overnight, thoroughly washed, and shade-dried on raised beds. This classic process highlights the origin's floral brightness and crisp, tea-like acidity. Perfect for filter coffee buyers and roasters looking for a clean, transparent Indian single origin.",
    details: [
      "Fully washed wet process",
      "Floral and tea-like brightness",
      "Crisp, clean cup profile",
      "Spring water fermentation",
      "Shade-dried on raised beds",
      "Community washing station",
    ],
    locations: ["Koraput, Odisha"],
    category: "Coffee",
    categoryTwo: "Single Origin",
    priceRange: {
      min: 1100,
      max: 1900,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 60,
      unit: "kg",
    },
    grades: ["AA", "A", "AB", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    sku: "BGC-KOR-WSH-001",
    brand: "Bulk Green Coffee",
    availability: "in_stock",
    googleProductCategory: "1868",
  },
  {
    slug: "halflong-arabica-naturals",
    name: "Halflong Arabica Naturals",
    image: "/products/halflong-arabica-naturals.png",
    description:
      "Natural-process Arabica green coffee from the misty highlands of Halflong, Assam — rare, aromatic, and distinctly North-East Indian.",
    longDescription:
      "Halflong, nestled in the Dima Hasao district of Assam at elevations above 1000m, produces some of India's most underrated Arabica coffees. These natural-process beans are dried whole on raised beds under Assam's cool highland climate, developing a wine-like intensity softened by the region's persistent mist and cool nights. The resulting green bean carries delicate florals, red-berry sweetness, and a smooth, rounded body — a compelling contrast to the bold naturals of South India. Strictly limited harvests make this an exceptional origin for specialty buyers.",
    details: [
      "Natural sun-dried Arabica",
      "High-altitude Dima Hasao hills",
      "Cool-climate slow drying",
      "Wine-like and floral notes",
      "Red-berry sweetness",
      "Limited harvest — North-East India origin",
    ],
    locations: ["Halflong, Assam"],
    category: "Coffee",
    categoryTwo: "Single Origin",
    priceRange: {
      min: 1300,
      max: 2400,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 30,
      unit: "kg",
    },
    grades: ["AA", "A", "PB (Peaberry)"],
    packaging: ["60kg GrainPro jute bags", "30kg bags", "Bulk containers"],
    sku: "BGC-HLG-ARB-001",
    brand: "Bulk Green Coffee",
    availability: "in_stock",
    googleProductCategory: "1868",
  },
];
