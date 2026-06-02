// Navigation data structure - single source of truth
export interface NavItem {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
}

export const NAVIGATION: NavItem[] = [
  {
    name: "Makeup",
    slug: "makeup",
    icon: "💄",
    description: "Premium makeup products",
    children: [
      {
        name: "Face",
        slug: "face",
        description: "Face makeup & foundation",
        children: [
          { name: "Primer", slug: "primer" },
          { name: "Concealer", slug: "concealer" },
          { name: "Foundation", slug: "foundation" },
          { name: "Compact", slug: "compact" },
          { name: "Contour", slug: "contour" },
          { name: "Blush", slug: "blush" },
          { name: "Bronzer", slug: "bronzer" },
          { name: "Highlighter", slug: "highlighter" },
          { name: "Setting Spray", slug: "setting-spray" },
          { name: "Loose Powder", slug: "loose-powder" },
        ],
      },
      {
        name: "Eyes",
        slug: "eyes",
        description: "Eye makeup & eyeshadow",
        children: [
          { name: "Kajal", slug: "kajal" },
          { name: "Eyeliner", slug: "eyeliner" },
          { name: "Mascara", slug: "mascara" },
          { name: "Eyeshadow", slug: "eyeshadow" },
          { name: "Eyebrow", slug: "eyebrow" },
          { name: "Eye Primer", slug: "eye-primer" },
          { name: "False Eyelashes", slug: "false-eyelashes" },
        ],
      },
      {
        name: "Lips",
        slug: "lips",
        description: "Lipstick & lip products",
        children: [
          { name: "Lipstick", slug: "lipstick" },
          { name: "Liquid Lipstick", slug: "liquid-lipstick" },
          { name: "Lip Gloss", slug: "lip-gloss" },
          { name: "Lip Liner", slug: "lip-liner" },
          { name: "Lip Balm", slug: "lip-balm" },
          { name: "Lip Tint", slug: "lip-tint" },
        ],
      },
      {
        name: "Nails",
        slug: "nails",
        description: "Nail polish & art",
        children: [
          { name: "Nail Polish", slug: "nail-polish" },
          { name: "Nail Art", slug: "nail-art" },
          { name: "Nail Remover", slug: "nail-remover" },
        ],
      },
      {
        name: "Tools & Brushes",
        slug: "tools-brushes",
        description: "Makeup brushes & tools",
      },
      {
        name: "Kits & Combos",
        slug: "kits-combos",
        description: "Makeup sets & bundles",
      },
    ],
  },
  {
    name: "Skincare",
    slug: "skincare",
    icon: "🧴",
    description: "Premium skincare products",
    children: [
      {
        name: "Cleanser",
        slug: "cleanser",
        description: "Face cleansers & washes",
        children: [
          { name: "Face Wash", slug: "face-wash" },
          { name: "Cleansing Milk", slug: "cleansing-milk" },
          { name: "Cleansing Oil", slug: "cleansing-oil" },
          { name: "Micellar Water", slug: "micellar-water" },
        ],
      },
      {
        name: "Moisturizer",
        slug: "moisturizer",
        description: "Face moisturizers",
      },
      {
        name: "Serum",
        slug: "serum",
        description: "Face serums",
        children: [
          { name: "Vitamin C", slug: "vitamin-c" },
          { name: "Hyaluronic Acid", slug: "hyaluronic-acid" },
          { name: "Niacinamide", slug: "niacinamide" },
          { name: "Retinol", slug: "retinol" },
        ],
      },
      {
        name: "Sunscreen",
        slug: "sunscreen",
        description: "UV protection",
      },
      {
        name: "Masks",
        slug: "masks",
        description: "Face masks",
      },
      {
        name: "Toner",
        slug: "toner",
        description: "Face toners",
      },
      {
        name: "Exfoliator",
        slug: "exfoliator",
        description: "Face exfoliators",
      },
      {
        name: "Eye Care",
        slug: "eye-care",
        description: "Eye creams & serums",
      },
      {
        name: "Lip Care",
        slug: "lip-care",
        description: "Lip care products",
      },
      {
        name: "Acne Care",
        slug: "acne-care",
        description: "Acne treatments",
      },
    ],
  },
  {
    name: "Haircare",
    slug: "haircare",
    icon: "💇",
    description: "Hair care products",
    children: [
      { name: "Shampoo", slug: "shampoo" },
      { name: "Conditioner", slug: "conditioner" },
      { name: "Hair Oil", slug: "hair-oil" },
      { name: "Hair Serum", slug: "hair-serum" },
      { name: "Hair Mask", slug: "hair-mask" },
      { name: "Hair Color", slug: "hair-color" },
      { name: "Styling", slug: "styling" },
    ],
  },
  {
    name: "Fragrance",
    slug: "fragrance",
    icon: "🌸",
    description: "Perfumes & fragrances",
    children: [
      { name: "Perfume", slug: "perfume" },
      { name: "Body Mist", slug: "body-mist" },
      { name: "Deodorant", slug: "deodorant" },
      { name: "Attar", slug: "attar" },
      { name: "Gift Set", slug: "gift-set" },
    ],
  },
  {
    name: "Bath & Body",
    slug: "bath-body",
    icon: "🛁",
    description: "Bath & body care",
    children: [
      { name: "Body Wash", slug: "body-wash" },
      { name: "Body Lotion", slug: "body-lotion" },
      { name: "Body Butter", slug: "body-butter" },
      { name: "Body Scrub", slug: "body-scrub" },
      { name: "Hand Care", slug: "hand-care" },
      { name: "Foot Care", slug: "foot-care" },
      { name: "Shower Gel", slug: "shower-gel" },
    ],
  },
  {
    name: "Men",
    slug: "men",
    icon: "🧔",
    description: "Men's grooming",
    children: [
      { name: "Beard Care", slug: "beard-care" },
      { name: "Shaving", slug: "shaving" },
      { name: "Face Care", slug: "face-care" },
      { name: "Hair Care", slug: "hair-care" },
      { name: "Fragrance", slug: "fragrance" },
      { name: "Body Care", slug: "body-care" },
    ],
  },
  {
    name: "Mom & Baby",
    slug: "mom-baby",
    icon: "👶",
    description: "Mom & baby care",
    children: [
      { name: "Baby Care", slug: "baby-care" },
      { name: "Baby Lotion", slug: "baby-lotion" },
      { name: "Baby Wash", slug: "baby-wash" },
      { name: "Maternity Care", slug: "maternity-care" },
      { name: "Baby Powder", slug: "baby-powder" },
    ],
  },
  {
    name: "Beauty Tools",
    slug: "beauty-tools",
    icon: "🖌️",
    description: "Beauty tools & accessories",
    children: [
      { name: "Makeup Brushes", slug: "makeup-brushes" },
      { name: "Sponges", slug: "sponges" },
      { name: "Hair Tools", slug: "hair-tools" },
      { name: "Trimmers", slug: "trimmers" },
      { name: "Mirrors", slug: "mirrors" },
      { name: "Accessories", slug: "accessories" },
    ],
  },
  {
    name: "Brands",
    slug: "brands",
    icon: "⭐",
    description: "Shop by brands",
    children: [
      { name: "L'Oréal", slug: "loreal" },
      { name: "Maybelline", slug: "maybelline" },
      { name: "MAC", slug: "mac" },
      { name: "Lakme", slug: "lakme" },
      { name: "Huda Beauty", slug: "huda-beauty" },
      { name: "Colorbar", slug: "colorbar" },
      { name: "Plum", slug: "plum" },
      { name: "Mamaearth", slug: "mamaearth" },
      { name: "Minimalist", slug: "minimalist" },
      { name: "Dot Key", slug: "dot-key" },
    ],
  },
  {
    name: "Offers",
    slug: "offers",
    icon: "🔥",
    description: "Special offers & deals",
    children: [
      { name: "Flash Sale", slug: "flash-sale" },
      { name: "Buy 1 Get 1", slug: "buy-1-get-1" },
      { name: "Combo Deals", slug: "combo-deals" },
      { name: "Under ₹499", slug: "under-499" },
      { name: "Under ₹999", slug: "under-999" },
      { name: "New Launches", slug: "new-launches" },
    ],
  },
];

// Helper: Find category by slug
export function findCategory(slug: string): NavItem | undefined {
  return NAVIGATION.find((item) => item.slug === slug);
}

// Helper: Find subcategory by parent slug and child slug
export function findSubcategory(
  parentSlug: string,
  childSlug: string
): NavItem | undefined {
  const parent = findCategory(parentSlug);
  return parent?.children?.find((item) => item.slug === childSlug);
}

// Helper: Find 3rd-level child
export function findChild(
  parentSlug: string,
  subSlug: string,
  childSlug: string
): NavItem | undefined {
  const sub = findSubcategory(parentSlug, subSlug);
  return sub?.children?.find((item) => item.slug === childSlug);
}

// Helper: Generate breadcrumbs
export interface Breadcrumb {
  name: string;
  slug: string;
  path: string;
}

export function getBreadcrumbs(
  category?: string,
  subcategory?: string,
  child?: string
): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [
    { name: "Home", slug: "", path: "/" },
  ];

  if (category) {
    const cat = findCategory(category);
    if (cat) {
      crumbs.push({
        name: cat.name,
        slug: cat.slug,
        path: `/${cat.slug}`,
      });
    }
  }

  if (subcategory && category) {
    const subcat = findSubcategory(category, subcategory);
    if (subcat) {
      crumbs.push({
        name: subcat.name,
        slug: subcat.slug,
        path: `/${category}/${subcat.slug}`,
      });
    }
  }

  if (child && subcategory && category) {
    const childItem = findChild(category, subcategory, child);
    if (childItem) {
      crumbs.push({
        name: childItem.name,
        slug: childItem.slug,
        path: `/${category}/${subcategory}/${childItem.slug}`,
      });
    }
  }

  return crumbs;
}

// Helper: Build page title
export function getPageTitle(
  category?: string,
  subcategory?: string,
  child?: string
): string {
  const parts: string[] = [];

  if (category) {
    const cat = findCategory(category);
    if (cat) parts.push(cat.name);
  }

  if (subcategory && category) {
    const subcat = findSubcategory(category, subcategory);
    if (subcat) parts.push(subcat.name);
  }

  if (child && subcategory && category) {
    const childItem = findChild(category, subcategory, child);
    if (childItem) parts.push(childItem.name);
  }

  return parts.length > 0
    ? `${parts.join(" - ")} | Glam Store`
    : "Glam Store";
}

// Helper: Get description
export function getDescription(
  category?: string,
  subcategory?: string,
  child?: string
): string {
  if (child && subcategory && category) {
    const childItem = findChild(category, subcategory, child);
    if (childItem) return `Shop ${childItem.name} at Glam Store`;
  }

  if (subcategory && category) {
    const subcat = findSubcategory(category, subcategory);
    if (subcat)
      return (
        subcat.description || `Shop ${subcat.name} at Glam Store`
      );
  }

  if (category) {
    const cat = findCategory(category);
    if (cat)
      return cat.description || `Shop ${cat.name} at Glam Store`;
  }

  return "Shop premium beauty products at Glam Store";
}

// Helper: Check if path is valid
export function isValidPath(
  category?: string,
  subcategory?: string,
  child?: string
): boolean {
  if (!category) return false;
  if (!findCategory(category)) return false;
  if (subcategory && !findSubcategory(category, subcategory)) return false;
  if (child && !findChild(category, subcategory!, child)) return false;
  return true;
}
