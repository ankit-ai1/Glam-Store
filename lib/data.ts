export const CATEGORIES = [
  { icon: "💄", name: "Makeup",      href: "/makeup",       color: "#e91e8c" },
  { icon: "✨", name: "Skincare",    href: "/skincare",     color: "#673ab7" },
  { icon: "✂️", name: "Haircare",    href: "/haircare",     color: "#f57c00" },
  { icon: "🌸", name: "Fragrance",   href: "/fragrance",    color: "#e91e8c" },
  { icon: "🛁", name: "Bath & Body", href: "/bath-body",    color: "#26a69a" },
  { icon: "🌿", name: "Wellness",    href: "/wellness",     color: "#43a047" },
  { icon: "🧔", name: "Men's",       href: "/men",          color: "#1565c0" },
  { icon: "💅", name: "Nails",       href: "/nails",        color: "#e91e8c" },
  { icon: "🔌", name: "Appliances",  href: "/appliances",   color: "#5c6bc0" },
  { icon: "👑", name: "Luxe",        href: "/luxe",         color: "#bf8f00" },
];

export const PROMO_BANNERS = [
  { title: "Skincare Fest",  sub: "Upto 60% OFF",     href: "/skincare", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop" },
  { title: "Makeup Mania",   sub: "Buy 2 Get 1 Free", href: "/makeup",   img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=600&fit=crop" },
  { title: "Hair Care Sale", sub: "Flat 40% OFF",     href: "/haircare", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop" },
];

// ─── Deal of the Day — 24 products, each with a unique image ──────────────────
export const DEALS = [
  // Skincare
  { id: "d1",  name: "Vitamin C Serum 20%",           brand: "MINIMALIST",       brandColor: "#1565c0", price: 399, mrp: 799,  discount: 50, badgeBg: "#00897b", rating: 4.7, reviews: "8.2k", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" },
  { id: "d3",  name: "SPF 50 Sunscreen PA++++",        brand: "MINIMALIST",       brandColor: "#1565c0", price: 249, mrp: 499,  discount: 50, badgeBg: "#1565c0", rating: 4.6, reviews: "6.7k", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&h=400&fit=crop" },
  { id: "d6",  name: "Purifying Neem Face Wash 150ml", brand: "HIMALAYA",         brandColor: "#2e7d32", price: 129, mrp: 199,  discount: 35, badgeBg: "#2e7d32", rating: 4.4, reviews: "22k",  img: "https://images.unsplash.com/photo-1604715892639-e07ceea2e08e?w=400&h=400&fit=crop" },
  { id: "d10", name: "Pure Aloe Vera Gel 300ml",       brand: "MAMAEARTH",        brandColor: "#388e3c", price: 249, mrp: 399,  discount: 38, badgeBg: "#388e3c", rating: 4.5, reviews: "18k",  img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop" },
  { id: "d13", name: "Activated Charcoal Face Pack",   brand: "HIMALAYA",         brandColor: "#2e7d32", price: 179, mrp: 299,  discount: 40, badgeBg: "#37474f", rating: 4.3, reviews: "9.1k", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop" },
  { id: "d17", name: "Micellar Cleansing Water 400ml", brand: "GARNIER",          brandColor: "#c62828", price: 249, mrp: 399,  discount: 38, badgeBg: "#558b2f", rating: 4.4, reviews: "11k",  img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop" },
  { id: "d22", name: "Total Effects Night Cream 50g",  brand: "OLAY",             brandColor: "#d84315", price: 649, mrp: 999,  discount: 35, badgeBg: "#d84315", rating: 4.5, reviews: "7.4k", img: "https://images.unsplash.com/photo-1628944681206-57573b3b2f64?w=400&h=400&fit=crop" },
  // Makeup
  { id: "d2",  name: "Matte Liquid Lipstick",          brand: "SUGAR",            brandColor: "#880e4f", price: 299, mrp: 599,  discount: 50, badgeBg: "#880e4f", rating: 4.4, reviews: "5.1k", img: "https://images.unsplash.com/photo-1586495777744-4e6232bf2263?w=400&h=400&fit=crop" },
  { id: "d5",  name: "HD Kajal 0.35g Deep Black",      brand: "LAKMÉ",            brandColor: "#e53935", price: 149, mrp: 299,  discount: 50, badgeBg: "#212121", rating: 4.6, reviews: "31k",  img: "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=400&fit=crop" },
  { id: "d9",  name: "BB Cream SPF 20 Natural",        brand: "LAKMÉ",            brandColor: "#e53935", price: 349, mrp: 549,  discount: 36, badgeBg: "#e53935", rating: 4.3, reviews: "14k",  img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop" },
  { id: "d18", name: "12HR Stay Eyeshadow Palette",    brand: "SWISS BEAUTY",     brandColor: "#7b1fa2", price: 399, mrp: 799,  discount: 50, badgeBg: "#7b1fa2", rating: 4.2, reviews: "3.8k", img: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&h=400&fit=crop" },
  { id: "d20", name: "Radiance Compact Powder",        brand: "LAKMÉ",            brandColor: "#e53935", price: 299, mrp: 449,  discount: 33, badgeBg: "#e53935", rating: 4.3, reviews: "8.9k", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" },
  { id: "d23", name: "Colossal Kajal 12HR",            brand: "MAYBELLINE",       brandColor: "#e53935", price: 129, mrp: 179,  discount: 28, badgeBg: "#c62828", rating: 4.7, reviews: "45k",  img: "https://images.unsplash.com/photo-1599305445671-5c0dd29e9e03?w=400&h=400&fit=crop" },
  // Haircare
  { id: "d4",  name: "Onion Shampoo 300ml",            brand: "WOW",              brandColor: "#6a1b9a", price: 299, mrp: 599,  discount: 50, badgeBg: "#37474f", rating: 4.5, reviews: "12k",  img: "https://images.unsplash.com/photo-1522337360885-08fe0c3920be?w=400&h=400&fit=crop" },
  { id: "d11", name: "Argan Oil Shampoo 400ml",        brand: "TRESEMMÉ",         brandColor: "#1565c0", price: 399, mrp: 699,  discount: 43, badgeBg: "#1565c0", rating: 4.3, reviews: "7.2k", img: "https://images.unsplash.com/photo-1583394293214-b26e2e67cef0?w=400&h=400&fit=crop" },
  { id: "d15", name: "Smoothening Hair Serum 100ml",   brand: "LIVON",            brandColor: "#7b1fa2", price: 159, mrp: 299,  discount: 47, badgeBg: "#7b1fa2", rating: 4.4, reviews: "9.5k", img: "https://images.unsplash.com/photo-1634744940484-3a44e9ac0703?w=400&h=400&fit=crop" },
  { id: "d19", name: "Biotin Shampoo 250ml",           brand: "MAMAEARTH",        brandColor: "#388e3c", price: 299, mrp: 499,  discount: 40, badgeBg: "#388e3c", rating: 4.4, reviews: "6.3k", img: "https://images.unsplash.com/photo-1590155765720-3b5dfe8d0c70?w=400&h=400&fit=crop" },
  { id: "d21", name: "Anti-Dandruff Shampoo 340ml",   brand: "HEAD & SHOULDERS", brandColor: "#1565c0", price: 249, mrp: 399,  discount: 38, badgeBg: "#1565c0", rating: 4.4, reviews: "19k",  img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop" },
  // Fragrance
  { id: "d8",  name: "Bloom Floral EDP 50ml",          brand: "ENGAGE",           brandColor: "#ad1457", price: 449, mrp: 699,  discount: 36, badgeBg: "#ad1457", rating: 4.3, reviews: "4.2k", img: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop" },
  // Bath & Body
  { id: "d7",  name: "Rose Moisturising Body Lotion",  brand: "NIVEA",            brandColor: "#1565c0", price: 199, mrp: 349,  discount: 43, badgeBg: "#1565c0", rating: 4.5, reviews: "16k",  img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop" },
  { id: "d16", name: "Coffee Body Scrub 100g",         brand: "MCAFFEINE",        brandColor: "#5d4037", price: 349, mrp: 599,  discount: 42, badgeBg: "#5d4037", rating: 4.5, reviews: "13k",  img: "https://images.unsplash.com/photo-1608217738438-b5bb6b6da5ca?w=400&h=400&fit=crop" },
  // Nails
  { id: "d12", name: "Xtend Color Nail Polish 9ml",    brand: "COLORBAR",         brandColor: "#ad1457", price: 149, mrp: 249,  discount: 40, badgeBg: "#ad1457", rating: 4.2, reviews: "3.6k", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop" },
  // Lip
  { id: "d14", name: "Lip Balm SPF 30 Tropical",       brand: "BIOTIQUE",         brandColor: "#00897b", price: 99,  mrp: 199,  discount: 50, badgeBg: "#00897b", rating: 4.3, reviews: "7.8k", img: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=400&h=400&fit=crop" },
  // Men
  { id: "d24", name: "Beard Growth Oil 50ml",          brand: "BEARDO",           brandColor: "#5d4037", price: 399, mrp: 699,  discount: 43, badgeBg: "#5d4037", rating: 4.4, reviews: "8.1k", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop" },
];

// ─── New Launches — 24 products, each with a unique image (none repeated from DEALS) ─
export const NEW_LAUNCHES = [
  // Skincare
  { id: "n2",  name: "SPF 50+ Sunscreen PA++++",        brand: "MINIMALIST",   brandColor: "#1565c0", price: 499,  mrp: 699,  discount: 29, rating: 4.6, reviews: "7.8k", img: "https://images.unsplash.com/photo-1601049177266-e9a6d04e0688?w=400&h=400&fit=crop" },
  { id: "n4",  name: "Rose Water Brightening Toner",    brand: "BIOTIQUE",     brandColor: "#00897b", price: 299,  mrp: 450,  discount: 33, rating: 4.3, reviews: "5.4k", img: "https://images.unsplash.com/photo-1509587522-ceb6f2e0b481?w=400&h=400&fit=crop" },
  { id: "n5",  name: "Glass Skin Radiance Serum 30ml",  brand: "DOT & KEY",    brandColor: "#e91e8c", price: 699,  mrp: 999,  discount: 30, rating: 4.5, reviews: "3.2k", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop" },
  { id: "n7",  name: "Peptide Eye Cream 15ml",          brand: "THE ORDINARY", brandColor: "#212121", price: 899,  mrp: 1299, discount: 31, rating: 4.4, reviews: "2.1k", img: "https://images.unsplash.com/photo-1563841930606-67afcef39cd6?w=400&h=400&fit=crop" },
  { id: "n10", name: "Niacinamide 10% + Zinc 1% 30ml", brand: "MINIMALIST",   brandColor: "#1565c0", price: 349,  mrp: 599,  discount: 42, rating: 4.7, reviews: "11k",  img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop" },
  { id: "n13", name: "Glycolic Acid Glow Drops 30ml",   brand: "L'ORÉAL",      brandColor: "#f57c00", price: 799,  mrp: 1199, discount: 33, rating: 4.3, reviews: "1.8k", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop" },
  { id: "n15", name: "Hyaluronic Acid Serum 30ml",      brand: "DOT & KEY",    brandColor: "#e91e8c", price: 649,  mrp: 999,  discount: 35, rating: 4.5, reviews: "4.6k", img: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=400&h=400&fit=crop" },
  { id: "n19", name: "Granactive Retinoid 2% Emulsion", brand: "THE ORDINARY", brandColor: "#212121", price: 749,  mrp: 1199, discount: 38, rating: 4.4, reviews: "2.9k", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop" },
  // Makeup
  { id: "n1",  name: "Naked Eyeshadow Palette 12 Pan",  brand: "SUGAR",        brandColor: "#7b1fa2", price: 1299, mrp: 1899, discount: 31, rating: 4.5, reviews: "1.2k", img: "https://images.unsplash.com/photo-1574201635742-e0d9c70e726e?w=400&h=400&fit=crop" },
  { id: "n6",  name: "Matte HD Liquid Foundation",      brand: "HUDA BEAUTY",  brandColor: "#880e4f", price: 2499, mrp: 3299, discount: 24, rating: 4.5, reviews: "987",  img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop" },
  { id: "n9",  name: "Butter Lip Gloss Sheer Rose",     brand: "NYX",          brandColor: "#c62828", price: 699,  mrp: 999,  discount: 30, rating: 4.4, reviews: "1.5k", img: "https://images.unsplash.com/photo-1588776814546-1a5e8cf97a86?w=400&h=400&fit=crop" },
  { id: "n14", name: "Sky High Lash Mascara",           brand: "MAYBELLINE",   brandColor: "#e53935", price: 549,  mrp: 799,  discount: 31, rating: 4.6, reviews: "6.2k", img: "https://images.unsplash.com/photo-1560012127-48ada099b13d?w=400&h=400&fit=crop" },
  { id: "n17", name: "9to5 Pore Minimizer Primer",      brand: "LAKMÉ",        brandColor: "#e53935", price: 349,  mrp: 549,  discount: 36, rating: 4.3, reviews: "3.1k", img: "https://images.unsplash.com/photo-1522335578-4f1b7f9df61c?w=400&h=400&fit=crop" },
  { id: "n20", name: "Waterproof Kajal Intense Black",  brand: "LAKMÉ",        brandColor: "#e53935", price: 199,  mrp: 299,  discount: 33, rating: 4.5, reviews: "28k",  img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop" },
  { id: "n22", name: "Liquid Illuminating Drops",       brand: "SWISS BEAUTY", brandColor: "#7b1fa2", price: 399,  mrp: 599,  discount: 33, rating: 4.2, reviews: "1.3k", img: "https://images.unsplash.com/photo-1574600034992-c1a03e57e73c?w=400&h=400&fit=crop" },
  // Haircare
  { id: "n8",  name: "Scalp Revitalising Serum 100ml",  brand: "MAMAEARTH",    brandColor: "#388e3c", price: 549,  mrp: 799,  discount: 31, rating: 4.3, reviews: "2.4k", img: "https://images.unsplash.com/photo-1490645034245-4afe7b30b4a9?w=400&h=400&fit=crop" },
  { id: "n11", name: "Color Protect Shampoo 250ml",     brand: "SCHWARZKOPF",  brandColor: "#212121", price: 449,  mrp: 699,  discount: 36, rating: 4.4, reviews: "1.9k", img: "https://images.unsplash.com/photo-1601049177542-9e9aba6b50db?w=400&h=400&fit=crop" },
  { id: "n16", name: "Absolute Repair Hair Mask 200ml", brand: "L'ORÉAL",      brandColor: "#f57c00", price: 499,  mrp: 799,  discount: 38, rating: 4.5, reviews: "2.7k", img: "https://images.unsplash.com/photo-1568393948086-1a5dc1e99e10?w=400&h=400&fit=crop" },
  { id: "n21", name: "Apple Cider Vinegar Shampoo",     brand: "WOW",          brandColor: "#6a1b9a", price: 449,  mrp: 699,  discount: 36, rating: 4.4, reviews: "5.1k", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop" },
  // Fragrance
  { id: "n12", name: "Bleu Intense EDP 100ml",          brand: "DENVER",       brandColor: "#1565c0", price: 549,  mrp: 899,  discount: 39, rating: 4.3, reviews: "3.6k", img: "https://images.unsplash.com/photo-1594707352515-a335d6b6d5df?w=400&h=400&fit=crop" },
  // Bath & Body
  { id: "n18", name: "Strawberry Body Butter 200ml",    brand: "THE BODY SHOP",brandColor: "#2e7d32", price: 899,  mrp: 1299, discount: 31, rating: 4.6, reviews: "4.3k", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop" },
  // Nails
  { id: "n3",  name: "Nail Xtreme Color Glitter 9ml",   brand: "LAKMÉ",        brandColor: "#e53935", price: 229,  mrp: 349,  discount: 34, rating: 4.2, reviews: "1.9k", img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop" },
  // Lip
  { id: "n24", name: "Sleeping Lip Mask Vanilla 20g",   brand: "LANEIGE",      brandColor: "#1565c0", price: 849,  mrp: 1299, discount: 35, rating: 4.7, reviews: "6.8k", img: "https://images.unsplash.com/photo-1609248231760-fb57b5888dc6?w=400&h=400&fit=crop" },
  // Wellness
  { id: "n23", name: "Biotin 10000mcg Hair Gummies",    brand: "MAMAEARTH",    brandColor: "#388e3c", price: 549,  mrp: 799,  discount: 31, rating: 4.4, reviews: "7.2k", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop" },
];

export const BRANDS = [
  { logo: "L",   name: "Lakmé",        color: "#e53935", href: "/brands/lakme" },
  { logo: "M",   name: "Maybelline",   color: "#7b1fa2", href: "/brands/maybelline" },
  { logo: "LO",  name: "L'Oréal",      color: "#f57c00", href: "/brands/loreal" },
  { logo: "MA",  name: "Mamaearth",    color: "#2e7d32", href: "/brands/mamaearth" },
  { logo: "SC",  name: "Sugar Cosm.",  color: "#ad1457", href: "/brands/sugar" },
  { logo: "TO",  name: "The Ordinary", color: "#5d4037", href: "/brands/the-ordinary" },
  { logo: "MI",  name: "Minimalist",   color: "#1565c0", href: "/brands/minimalist" },
  { logo: "NY",  name: "NYX",          color: "#c62828", href: "/brands/nyx" },
  { logo: "HB",  name: "Huda Beauty",  color: "#880e4f", href: "/brands/huda" },
  { logo: "MAC", name: "MAC",          color: "#212121", href: "/brands/mac" },
];

export const CONCERNS = [
  { icon: "💧", label: "Dry Skin",      href: "/skincare?concern=dry" },
  { icon: "✨", label: "Glowing Skin",  href: "/skincare?concern=glow" },
  { icon: "🌿", label: "Anti-Aging",   href: "/skincare?concern=anti-aging" },
  { icon: "🔴", label: "Acne Control", href: "/skincare?concern=acne" },
  { icon: "🌑", label: "Dark Circles",  href: "/skincare?concern=dark-circles" },
];

export const BLOG_POSTS = [
  { id: "b1", title: "10 Best Skincare Routines for Glowing Skin",          tag: "SKINCARE",   tagBg: "#e8f5e9", tagColor: "#2e7d32", read: "5 min", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=500&fit=crop",    slug: "best-skincare-routines" },
  { id: "b2", title: "Summer Makeup Looks: Stay Fresh All Day",             tag: "MAKEUP",     tagBg: "#fce4ec", tagColor: "#c2185b", read: "4 min", img: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&h=500&fit=crop",   slug: "summer-makeup-looks" },
  { id: "b3", title: "Hair Care Secrets: Grow Longer Stronger Hair",        tag: "HAIRCARE",   tagBg: "#fff3e0", tagColor: "#e65100", read: "6 min", img: "https://images.unsplash.com/photo-1634744940484-3a44e9ac0703?w=800&h=500&fit=crop",   slug: "hair-care-secrets" },
  { id: "b4", title: "Top Fragrances of 2025: Editors Picks",               tag: "FRAGRANCE",  tagBg: "#f3e5f5", tagColor: "#7b1fa2", read: "3 min", img: "https://images.unsplash.com/photo-1594707352515-a335d6b6d5df?w=800&h=500&fit=crop",   slug: "top-fragrances-2025" },
  { id: "b5", title: "Glass Skin Guide: Achieve the Korean Glow",           tag: "SKINCARE",   tagBg: "#e8f5e9", tagColor: "#2e7d32", read: "5 min", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=500&fit=crop",   slug: "glass-skin-guide" },
  { id: "b6", title: "Nail Art Trends 2025: From Minimalist to Maximalist", tag: "NAILS",      tagBg: "#fce4ec", tagColor: "#ad1457", read: "4 min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=500&fit=crop",   slug: "nail-art-trends-2025" },
  { id: "b7", title: "Men's Grooming 101: Look Your Best Every Day",        tag: "GROOMING",   tagBg: "#e3f2fd", tagColor: "#1565c0", read: "5 min", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=500&fit=crop",   slug: "mens-grooming-guide" },
  { id: "b8", title: "Budget Beauty Haul: Best Products Under ₹500",        tag: "MAKEUP",     tagBg: "#fce4ec", tagColor: "#c2185b", read: "6 min", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop",   slug: "budget-beauty-under-500" },
];

export const TRUST_BADGES = [
  { icon: "✓",  title: "100% Authentic", sub: "Genuine products from authorised brands & affiliates" },
  { icon: "🚚", title: "Free Delivery",  sub: "On all orders across India" },
  { icon: "↩",  title: "Easy Returns",   sub: "7-day hassle-free returns" },
  { icon: "🔒", title: "Secure Payment", sub: "100% safe & encrypted checkout" },
  { icon: "⭐", title: "Best Prices",    sub: "Price match guarantee always" },
];

export const ALL_PRODUCTS = [...DEALS, ...NEW_LAUNCHES];
