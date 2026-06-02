// Navigation configuration - single source of truth
export interface CategoryItem {
  id: string;
  label: string;
  slug: string;
  description?: string;
  icon?: string;
  children?: CategoryItem[];
}

export interface CategoryConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  banner: string;
  icon?: string;
  parent?: string;
  parentLabel?: string;
  children?: CategoryConfig[];
}

// All routes configuration
export const CATEGORIES: CategoryItem[] = [
  {
    id: "makeup",
    label: "Makeup",
    slug: "makeup",
    icon: "💄",
    children: [
      { id: "makeup-face", label: "Face", slug: "face", description: "Face makeup & foundation" },
      { id: "makeup-eyes", label: "Eyes", slug: "eyes", description: "Eye makeup & eyeshadow" },
      { id: "makeup-lips", label: "Lips", slug: "lips", description: "Lipstick & lip products" },
      { id: "makeup-nails", label: "Nails", slug: "nails", description: "Nail polish & art" },
      { id: "makeup-tools", label: "Tools & Brushes", slug: "tools-brushes", description: "Makeup brushes & tools" },
      { id: "makeup-kits", label: "Kits & Combos", slug: "kits-combos", description: "Makeup sets & bundles" },
    ],
  },
  {
    id: "skincare",
    label: "Skincare",
    slug: "skincare",
    icon: "🧴",
    children: [
      { id: "skincare-cleanser", label: "Cleanser", slug: "cleanser", description: "Face cleansers & washes" },
      { id: "skincare-moisturizer", label: "Moisturizer", slug: "moisturizer", description: "Face moisturizers" },
      { id: "skincare-serum", label: "Serum", slug: "serum", description: "Face serums" },
      { id: "skincare-sunscreen", label: "Sunscreen", slug: "sunscreen", description: "UV protection" },
      { id: "skincare-masks", label: "Masks", slug: "masks", description: "Face masks" },
      { id: "skincare-toner", label: "Toner", slug: "toner", description: "Face toners" },
      { id: "skincare-exfoliator", label: "Exfoliator", slug: "exfoliator", description: "Face exfoliators" },
      { id: "skincare-eye-care", label: "Eye Care", slug: "eye-care", description: "Eye creams & serums" },
      { id: "skincare-lip-care", label: "Lip Care", slug: "lip-care", description: "Lip care products" },
      { id: "skincare-acne-care", label: "Acne Care", slug: "acne-care", description: "Acne treatments" },
    ],
  },
  {
    id: "haircare",
    label: "Haircare",
    slug: "haircare",
    icon: "💇",
    children: [
      { id: "haircare-shampoo", label: "Shampoo", slug: "shampoo", description: "Hair shampoos" },
      { id: "haircare-conditioner", label: "Conditioner", slug: "conditioner", description: "Hair conditioners" },
      { id: "haircare-oil", label: "Hair Oil", slug: "hair-oil", description: "Hair oils" },
      { id: "haircare-serum", label: "Hair Serum", slug: "hair-serum", description: "Hair serums" },
      { id: "haircare-mask", label: "Hair Mask", slug: "hair-mask", description: "Hair masks" },
      { id: "haircare-color", label: "Hair Color", slug: "hair-color", description: "Hair color & dye" },
      { id: "haircare-styling", label: "Styling", slug: "styling", description: "Hair styling products" },
    ],
  },
  {
    id: "fragrance",
    label: "Fragrance",
    slug: "fragrance",
    icon: "🌸",
    children: [
      { id: "fragrance-perfume", label: "Perfume", slug: "perfume", description: "Perfumes & EDP" },
      { id: "fragrance-body-mist", label: "Body Mist", slug: "body-mist", description: "Body mists" },
      { id: "fragrance-deodorant", label: "Deodorant", slug: "deodorant", description: "Deodorants" },
      { id: "fragrance-attar", label: "Attar", slug: "attar", description: "Attars & oils" },
      { id: "fragrance-gift-set", label: "Gift Set", slug: "gift-set", description: "Fragrance sets" },
    ],
  },
  {
    id: "bath-body",
    label: "Bath & Body",
    slug: "bath-body",
    icon: "🛁",
    children: [
      { id: "bath-wash", label: "Body Wash", slug: "body-wash", description: "Body wash & shower" },
      { id: "bath-lotion", label: "Body Lotion", slug: "body-lotion", description: "Body lotions" },
      { id: "bath-butter", label: "Body Butter", slug: "body-butter", description: "Body butters" },
      { id: "bath-scrub", label: "Body Scrub", slug: "body-scrub", description: "Body scrubs" },
      { id: "bath-hand-care", label: "Hand Care", slug: "hand-care", description: "Hand creams & wash" },
      { id: "bath-foot-care", label: "Foot Care", slug: "foot-care", description: "Foot care products" },
      { id: "bath-shower-gel", label: "Shower Gel", slug: "shower-gel", description: "Shower gels" },
    ],
  },
  {
    id: "men",
    label: "Men",
    slug: "men",
    icon: "🧔",
    children: [
      { id: "men-beard", label: "Beard Care", slug: "beard-care", description: "Beard products" },
      { id: "men-shaving", label: "Shaving", slug: "shaving", description: "Shaving products" },
      { id: "men-face", label: "Face Care", slug: "face-care", description: "Men's skincare" },
      { id: "men-hair", label: "Hair Care", slug: "hair-care", description: "Men's haircare" },
      { id: "men-fragrance", label: "Fragrance", slug: "fragrance", description: "Men's fragrance" },
      { id: "men-body", label: "Body Care", slug: "body-care", description: "Men's body care" },
    ],
  },
  {
    id: "mom-baby",
    label: "Mom & Baby",
    slug: "mom-baby",
    icon: "👶",
    children: [
      { id: "baby-care", label: "Baby Care", slug: "baby-care", description: "Baby essentials" },
      { id: "baby-lotion", label: "Baby Lotion", slug: "baby-lotion", description: "Baby lotions" },
      { id: "baby-wash", label: "Baby Wash", slug: "baby-wash", description: "Baby wash & shampoo" },
      { id: "maternity-care", label: "Maternity Care", slug: "maternity-care", description: "Maternity products" },
      { id: "baby-powder", label: "Baby Powder", slug: "baby-powder", description: "Baby powder" },
    ],
  },
  {
    id: "beauty-tools",
    label: "Beauty Tools",
    slug: "beauty-tools",
    icon: "🖌️",
    children: [
      { id: "beauty-brushes", label: "Makeup Brushes", slug: "makeup-brushes", description: "Makeup brushes" },
      { id: "beauty-sponges", label: "Sponges", slug: "sponges", description: "Beauty sponges" },
      { id: "beauty-hair-tools", label: "Hair Tools", slug: "hair-tools", description: "Hair styling tools" },
      { id: "beauty-trimmers", label: "Trimmers", slug: "trimmers", description: "Beard & hair trimmers" },
      { id: "beauty-mirrors", label: "Mirrors", slug: "mirrors", description: "Beauty mirrors" },
      { id: "beauty-accessories", label: "Accessories", slug: "accessories", description: "Beauty accessories" },
    ],
  },
  {
    id: "brands",
    label: "Brands",
    slug: "brands",
    icon: "⭐",
    children: [
      { id: "brand-loreal", label: "L'Oréal", slug: "loreal" },
      { id: "brand-maybelline", label: "Maybelline", slug: "maybelline" },
      { id: "brand-mac", label: "MAC", slug: "mac" },
      { id: "brand-lakme", label: "Lakme", slug: "lakme" },
      { id: "brand-huda", label: "Huda Beauty", slug: "huda-beauty" },
      { id: "brand-colorbar", label: "Colorbar", slug: "colorbar" },
      { id: "brand-plum", label: "Plum", slug: "plum" },
      { id: "brand-mamaearth", label: "Mamaearth", slug: "mamaearth" },
      { id: "brand-minimalist", label: "Minimalist", slug: "minimalist" },
      { id: "brand-dot-key", label: "Dot Key", slug: "dot-key" },
    ],
  },
  {
    id: "new-launches",
    label: "New Launches",
    slug: "new-launches",
    icon: "✨",
    children: [
      { id: "new-makeup", label: "Makeup", slug: "makeup", description: "New makeup arrivals" },
      { id: "new-skincare", label: "Skincare", slug: "skincare", description: "New skincare launches" },
      { id: "new-haircare", label: "Haircare", slug: "haircare", description: "New haircare products" },
      { id: "new-fragrance", label: "Fragrance", slug: "fragrance", description: "New fragrances" },
      { id: "new-bath-body", label: "Bath & Body", slug: "bath-body", description: "New bath products" },
    ],
  },
  {
    id: "offers",
    label: "Offers",
    slug: "offers",
    icon: "🔥",
    children: [
      { id: "offer-flash", label: "Flash Sale", slug: "flash-sale", description: "Limited time offers" },
      { id: "offer-bogo", label: "Buy 1 Get 1", slug: "buy-1-get-1", description: "BOGO deals" },
      { id: "offer-combo", label: "Combo Deals", slug: "combo-deals", description: "Bundle offers" },
      { id: "offer-under499", label: "Under ₹499", slug: "under-499", description: "Budget picks" },
      { id: "offer-under999", label: "Under ₹999", slug: "under-999", description: "Premium under 999" },
      { id: "offer-new", label: "New Launches", slug: "new-launches", description: "Latest products" },
    ],
  },
];

// Sub-category mappings for second-level items
export const SUBCATEGORIES: Record<string, CategoryItem[]> = {
  "makeup/face": [
    { id: "makeup-face-primer", label: "Primer", slug: "primer" },
    { id: "makeup-face-concealer", label: "Concealer", slug: "concealer" },
    { id: "makeup-face-foundation", label: "Foundation", slug: "foundation" },
    { id: "makeup-face-compact", label: "Compact", slug: "compact" },
    { id: "makeup-face-contour", label: "Contour", slug: "contour" },
    { id: "makeup-face-blush", label: "Blush", slug: "blush" },
    { id: "makeup-face-bronzer", label: "Bronzer", slug: "bronzer" },
    { id: "makeup-face-highlighter", label: "Highlighter", slug: "highlighter" },
    { id: "makeup-face-setting-spray", label: "Setting Spray", slug: "setting-spray" },
    { id: "makeup-face-loose-powder", label: "Loose Powder", slug: "loose-powder" },
  ],
  "makeup/eyes": [
    { id: "makeup-eyes-kajal", label: "Kajal", slug: "kajal" },
    { id: "makeup-eyes-eyeliner", label: "Eyeliner", slug: "eyeliner" },
    { id: "makeup-eyes-mascara", label: "Mascara", slug: "mascara" },
    { id: "makeup-eyes-eyeshadow", label: "Eyeshadow", slug: "eyeshadow" },
    { id: "makeup-eyes-eyebrow", label: "Eyebrow", slug: "eyebrow" },
    { id: "makeup-eyes-eye-primer", label: "Eye Primer", slug: "eye-primer" },
    { id: "makeup-eyes-false-eyelashes", label: "False Eyelashes", slug: "false-eyelashes" },
  ],
  "makeup/lips": [
    { id: "makeup-lips-lipstick", label: "Lipstick", slug: "lipstick" },
    { id: "makeup-lips-liquid-lipstick", label: "Liquid Lipstick", slug: "liquid-lipstick" },
    { id: "makeup-lips-lip-gloss", label: "Lip Gloss", slug: "lip-gloss" },
    { id: "makeup-lips-lip-liner", label: "Lip Liner", slug: "lip-liner" },
    { id: "makeup-lips-lip-balm", label: "Lip Balm", slug: "lip-balm" },
    { id: "makeup-lips-lip-tint", label: "Lip Tint", slug: "lip-tint" },
  ],
  "makeup/nails": [
    { id: "makeup-nails-polish", label: "Nail Polish", slug: "nail-polish" },
    { id: "makeup-nails-art", label: "Nail Art", slug: "nail-art" },
    { id: "makeup-nails-remover", label: "Nail Remover", slug: "nail-remover" },
  ],
  "skincare/cleanser": [
    { id: "skincare-cleanser-face-wash", label: "Face Wash", slug: "face-wash" },
    { id: "skincare-cleanser-milk", label: "Cleansing Milk", slug: "cleansing-milk" },
    { id: "skincare-cleanser-oil", label: "Cleansing Oil", slug: "cleansing-oil" },
    { id: "skincare-cleanser-micellar", label: "Micellar Water", slug: "micellar-water" },
  ],
  "skincare/serum": [
    { id: "skincare-serum-vitamin-c", label: "Vitamin C", slug: "vitamin-c" },
    { id: "skincare-serum-hyaluronic", label: "Hyaluronic Acid", slug: "hyaluronic-acid" },
    { id: "skincare-serum-niacinamide", label: "Niacinamide", slug: "niacinamide" },
    { id: "skincare-serum-retinol", label: "Retinol", slug: "retinol" },
  ],
  "haircare/concern": [
    { id: "haircare-concern-hairfall", label: "Hairfall", slug: "hairfall" },
    { id: "haircare-concern-dandruff", label: "Dandruff", slug: "dandruff" },
    { id: "haircare-concern-dry", label: "Dry Hair", slug: "dry-hair" },
    { id: "haircare-concern-frizzy", label: "Frizzy Hair", slug: "frizzy-hair" },
    { id: "haircare-concern-damaged", label: "Damaged Hair", slug: "damaged-hair" },
    { id: "haircare-concern-growth", label: "Hair Growth", slug: "hair-growth" },
  ],
  "fragrance/family": [
    { id: "fragrance-family-floral", label: "Floral", slug: "floral" },
    { id: "fragrance-family-woody", label: "Woody", slug: "woody" },
    { id: "fragrance-family-fresh", label: "Fresh", slug: "fresh" },
    { id: "fragrance-family-oriental", label: "Oriental", slug: "oriental" },
    { id: "fragrance-family-fruity", label: "Fruity", slug: "fruity" },
  ],
};

// Helper function to get category metadata
export function getCategoryMetadata(slug: string): {
  title: string;
  description: string;
  banner: string;
  keywords: string;
} {
  const metadata: Record<
    string,
    { title: string; description: string; banner: string; keywords: string }
  > = {
    makeup: {
      title: "Makeup | Glam Store",
      description: "Shop premium makeup products including foundation, lipstick, eyeshadow, and more.",
      banner:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
      keywords: "makeup, cosmetics, lipstick, foundation, eyeshadow",
    },
    "makeup/face": {
      title: "Face Makeup | Glam Store",
      description:
        "Discover face makeup essentials including primers, foundations, concealers, and blush.",
      banner:
        "https://images.unsplash.com/photo-1494217694047-c5433bd555dd?auto=format&fit=crop&w=1200&q=80",
      keywords: "face makeup, foundation, primer, concealer, blush",
    },
    "makeup/eyes": {
      title: "Eye Makeup | Glam Store",
      description: "Explore stunning eye makeup collection including eyeshadow, mascara, and eyeliner.",
      banner:
        "https://images.unsplash.com/photo-1599305445671-5c0dd29e9e03?auto=format&fit=crop&w=1200&q=80",
      keywords: "eye makeup, eyeshadow, mascara, eyeliner, kajal",
    },
    "makeup/lips": {
      title: "Lip Makeup | Glam Store",
      description: "Find your perfect lip color from lipsticks, glosses, tints, and more.",
      banner:
        "https://images.unsplash.com/photo-1586894886904-28e1e0d09b8a?auto=format&fit=crop&w=1200&q=80",
      keywords: "lipstick, lip gloss, lip tint, lip liner, liquid lipstick",
    },
    skincare: {
      title: "Skincare Products | Glam Store",
      description: "Premium skincare collection for all skin types and concerns.",
      banner:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80",
      keywords: "skincare, face care, serum, moisturizer, sunscreen",
    },
    haircare: {
      title: "Haircare Products | Glam Store",
      description: "Complete haircare range including shampoo, conditioner, oils, and treatments.",
      banner:
        "https://images.unsplash.com/photo-1522337360885-08fe0c3920be?auto=format&fit=crop&w=1200&q=80",
      keywords: "haircare, shampoo, conditioner, hair oil, hair mask",
    },
    fragrance: {
      title: "Fragrance & Perfume | Glam Store",
      description: "Browse our collection of perfumes, body mists, and premium attars.",
      banner:
        "https://images.unsplash.com/photo-1594707352515-a335d6b6d5df?auto=format&fit=crop&w=1200&q=80",
      keywords: "perfume, fragrance, body mist, attar, deodorant",
    },
    "bath-body": {
      title: "Bath & Body Care | Glam Store",
      description: "Luxurious bath and body products for complete self-care.",
      banner:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
      keywords: "body wash, body lotion, bath products, body butter",
    },
    brands: {
      title: "Top Beauty Brands | Glam Store",
      description: "Shop from 100+ premium beauty brands — L'Oréal, MAC, Huda Beauty & more.",
      banner:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
      keywords: "beauty brands, loreal, mac, huda beauty, lakme, maybelline",
    },
    offers: {
      title: "Deals & Offers | Glam Store",
      description: "Exclusive discounts, flash sales, and combo deals on top beauty products.",
      banner:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
      keywords: "beauty offers, discounts, flash sale, combo deals, beauty coupons",
    },
    "new-launches": {
      title: "New Launches | Glam Store",
      description: "Be the first to shop the latest beauty arrivals and trending new products.",
      banner:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
      keywords: "new beauty products, new launches, latest arrivals, trending beauty",
    },
  };

  return (
    metadata[slug] || {
      title: slug.replace(/-/g, " ").toUpperCase() + " | Glam Store",
      description: `Shop our collection of ${slug.replace(/-/g, " ")} products.`,
      banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
      keywords: slug.replace(/-/g, ", "),
    }
  );
}

// Breadcrumb helper
export interface Breadcrumb {
  label: string;
  href: string;
}

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const parts = pathname.split("/").filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];

  let href = "";
  for (const part of parts) {
    href += `/${part}`;
    const label = part.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    breadcrumbs.push({ label, href });
  }

  return breadcrumbs;
}

// Flatten categories for easy lookup
export function flattenCategories(categories: CategoryItem[]): Map<string, CategoryItem> {
  const map = new Map<string, CategoryItem>();

  function traverse(items: CategoryItem[], parent = "") {
    for (const item of items) {
      const path = parent ? `${parent}/${item.slug}` : item.slug;
      map.set(path, item);
      if (item.children) {
        traverse(item.children, path);
      }
    }
  }

  traverse(categories);
  return map;
}
