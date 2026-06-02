"use client";
import Link from "next/link";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { ALL_PRODUCTS } from "@/lib/data";
import "@/styles/home.css";

const DETAILS: Record<string, { description: string; benefits: string[]; howToUse: string[]; ingredients: string }> = {
  serum:        { description: "A potent, fast-absorbing serum packed with active ingredients that visibly target skin concerns. Dermatologist-tested for daily use.", benefits: ["Reduces dark spots & uneven tone", "Boosts skin radiance", "Strengthens skin barrier", "No greasy residue"], howToUse: ["Cleanse and tone your face.", "Apply 2–3 drops evenly on face and neck.", "Follow with moisturiser and sunscreen."], ingredients: "Niacinamide, Hyaluronic Acid, Vitamin C, Zinc, Panthenol, Allantoin" },
  sunscreen:    { description: "Broad-spectrum SPF 50 PA++++ sunscreen that protects against UVA & UVB rays. Lightweight, no white cast, perfect under makeup.", benefits: ["SPF 50 PA++++ protection", "No white cast", "Water-resistant", "Non-comedogenic"], howToUse: ["Apply 15 min before sun exposure.", "Spread evenly on face and neck.", "Reapply every 2 hours outdoors."], ingredients: "Zinc Oxide, Titanium Dioxide, Avobenzone, Aloe Vera, Vitamin E" },
  cleanser:     { description: "Gentle yet effective cleanser that removes dirt, oil and impurities without stripping skin's natural moisture. Leaves skin fresh and balanced.", benefits: ["Deep cleanses pores", "Removes excess sebum & pollution", "Maintains skin's natural pH", "Suitable for daily use"], howToUse: ["Wet face with lukewarm water.", "Lather gently in circular motions.", "Rinse and pat dry."], ingredients: "Neem Extract, Salicylic Acid, Glycerin, Aloe Vera, Panthenol" },
  moisturizer:  { description: "Deep hydrating formula that locks in moisture and keeps skin soft, smooth and supple all day. Absorbs instantly without any stickiness.", benefits: ["48-hour deep hydration", "Softens and smoothens skin", "Strengthens moisture barrier", "Fast-absorbing, non-sticky"], howToUse: ["Apply after cleansing and serum.", "Dot on forehead, cheeks, nose and chin.", "Massage in upward circular motions."], ingredients: "Aloe Vera, Shea Butter, Hyaluronic Acid, Ceramides, Glycerin" },
  masks:        { description: "Deep-purifying face pack with activated charcoal that draws out impurities and excess oil from pores, leaving skin visibly cleaner.", benefits: ["Unclogs and minimises pores", "Removes blackheads", "Controls excess sebum", "Leaves skin fresh and matte"], howToUse: ["Apply evenly, avoiding eyes and lips.", "Leave on for 10–15 minutes.", "Rinse with lukewarm water."], ingredients: "Activated Charcoal, Kaolin Clay, Tea Tree Oil, Neem Extract" },
  toner:        { description: "Alcohol-free toner that balances skin pH, tightens pores and boosts hydration — the essential step between cleansing and moisturising.", benefits: ["Balances skin pH", "Tightens pores", "Lightweight hydration boost", "Better serum absorption"], howToUse: ["Swipe across face with a cotton pad after cleansing.", "Follow immediately with serum.", "Use morning and night."], ingredients: "Rose Water, Witch Hazel, Niacinamide, Hyaluronic Acid, Glycerin" },
  "eye-care":   { description: "Specially formulated for the delicate eye area. Targets dark circles, puffiness and fine lines with concentrated peptides and brightening actives.", benefits: ["Reduces dark circles & puffiness", "Smoothens fine lines", "Deeply nourishes eye area", "Safe for daily use"], howToUse: ["Tap gently around eye contour with ring finger.", "Work from inner corner outward.", "Use morning and night."], ingredients: "Peptides, Caffeine, Hyaluronic Acid, Vitamin K, Ceramides" },
  lips:         { description: "Rich, comfortable lip colour that glides on smoothly and stays in place all day. Infused with nourishing ingredients to keep lips soft and moisturised.", benefits: ["True-to-pan colour payoff", "Long-wearing, non-drying", "Moisturising formula", "Comfortable all-day wear"], howToUse: ["Apply directly from bullet or use a lip brush.", "Layer for more intense colour.", "Pair with lip liner for longer wear."], ingredients: "Castor Oil, Beeswax, Vitamin E, Shea Butter, Jojoba Oil, Mica" },
  eyes:         { description: "Intense, long-lasting eye makeup that delivers bold definition with every application. Smudge-proof formula that stays perfect from morning to night.", benefits: ["Intense pigmentation", "Up to 12 hours wear", "Smudge-proof & water-resistant", "Ophthalmologist-tested"], howToUse: ["Line from inner corner along lash line.", "Smudge gently for smoky effect.", "Apply second coat for intensity."], ingredients: "Carbon Black, Carnauba Wax, Beeswax, Vitamin E, Jojoba Oil" },
  face:         { description: "Flawless, long-lasting base that evens skin tone and covers imperfections. Buildable coverage that looks natural and fresh all day.", benefits: ["Buildable coverage", "Lasts up to 16 hours", "Minimises pores & fine lines", "SPF protection included"], howToUse: ["Start with moisturised, primed skin.", "Apply with brush, sponge or fingers.", "Build coverage only where needed."], ingredients: "Dimethicone, Titanium Dioxide, Mica, Talc, Niacinamide, Hyaluronic Acid" },
  nails:        { description: "High-shine nail colour with a chip-resistant formula that applies smoothly and dries quickly for a glossy, salon-quality finish.", benefits: ["Chip-resistant formula", "High-shine glossy finish", "Quick-drying", "Wide brush for even application"], howToUse: ["Apply a clear base coat first.", "Apply 1–2 colour coats, letting each dry.", "Seal with top coat for extra shine."], ingredients: "Butyl Acetate, Ethyl Acetate, Nitrocellulose, Camphor, Vitamin E" },
  shampoo:      { description: "Nourishing shampoo that cleanses scalp and hair while maintaining moisture balance. Addresses specific hair concerns and leaves hair soft and shiny.", benefits: ["Gentle cleanse without stripping oils", "Strengthens hair root to tip", "Reduces hair fall", "Leaves hair soft and shiny"], howToUse: ["Wet hair thoroughly with lukewarm water.", "Lather from roots to ends.", "Massage 2–3 minutes then rinse. Follow with conditioner."], ingredients: "Onion Bulb Extract, Biotin, Keratin, Argan Oil, Provitamin B5" },
  "hair-serum": { description: "Lightweight leave-in serum that tames frizz, adds mirror-like shine and protects hair from heat and humidity with just a few drops.", benefits: ["Controls frizz instantly", "Mirror-like shine", "Heat protection up to 230°C", "No build-up or greasy feel"], howToUse: ["Apply 2–3 drops on damp or dry hair.", "Spread from mid-lengths to ends.", "Style as usual."], ingredients: "Cyclomethicone, Dimethicone, Argan Oil, Vitamin E, Keratin" },
  "hair-mask":  { description: "Intensive deep-conditioning treatment that repairs damage, restores moisture and revives dull hair. Penetrates deep into the hair shaft for healthier hair.", benefits: ["Repairs damaged hair", "Restores moisture & shine", "Reduces breakage & split ends", "Softer, more manageable hair"], howToUse: ["After shampooing, squeeze out excess water.", "Apply generously from mid-lengths to ends.", "Leave 5–10 minutes then rinse."], ingredients: "Shea Butter, Argan Oil, Keratin Protein, Hydrolysed Silk, Panthenol" },
  perfume:      { description: "An exquisite fragrance with fresh top notes, a warm floral heart and a rich lasting base. Sophisticated and memorable — lasts 8+ hours.", benefits: ["Long-lasting 8+ hour sillage", "Multi-layered fragrance pyramid", "Elegant bottle, great for gifting", "Day and evening wear"], howToUse: ["Hold 15–20 cm from body.", "Spray on pulse points — wrists, neck, behind ears.", "Do not rub — let dry naturally."], ingredients: "Alcohol Denat., Aqua, Parfum, Benzyl Alcohol, Limonene, Linalool" },
  "body-lotion":{ description: "Luxurious body lotion that leaves skin deeply nourished, silky soft and fragrant. Rich emollients absorb quickly for lasting moisture.", benefits: ["Long-lasting skin hydration", "Improves softness & texture", "Gentle lingering fragrance", "Fast-absorbing, non-greasy"], howToUse: ["Apply on clean, slightly damp skin after shower.", "Massage in circular motions until absorbed.", "Focus on dry areas — elbows, knees."], ingredients: "Shea Butter, Cocoa Butter, Jojoba Oil, Vitamin E, Glycerin, Aloe Vera" },
  "body-scrub": { description: "Exfoliating body scrub that buffs away dead skin cells, unclogs pores and leaves skin visibly smoother and radiant with every use.", benefits: ["Removes dead skin cells", "Unclogs pores & prevents ingrowns", "Boosts circulation", "Leaves skin soft and glowing"], howToUse: ["Apply on wet skin in circular motions.", "Focus on rough areas — knees, elbows.", "Rinse off thoroughly and moisturise."], ingredients: "Coffee Granules, Coconut Oil, Brown Sugar, Vitamin E, Caffeine" },
  "body-butter":{ description: "Rich, whipped body butter that melts into skin and provides intense, lasting hydration. Perfect for dry and very dry skin.", benefits: ["Intense deep moisturisation", "Melts into skin instantly", "Fragrant & long-lasting", "Ideal for very dry skin"], howToUse: ["Scoop a small amount and warm between palms.", "Massage into skin after shower.", "Focus on extra-dry areas."], ingredients: "Shea Butter, Strawberry Extract, Cocoa Butter, Vitamin E, Sweet Almond Oil" },
  "beard-care": { description: "Premium beard oil enriched with natural oils that nourish beard and skin, soften coarse hair, eliminate beardruff and promote fuller growth.", benefits: ["Softens coarse beard hair", "Eliminates itch and beardruff", "Promotes healthier beard growth", "Non-greasy formula"], howToUse: ["Take 3–5 drops onto palm.", "Rub hands together and apply through beard.", "Massage down to the skin. Best after shower."], ingredients: "Castor Oil, Argan Oil, Vitamin E, Jojoba Oil, Bhringraj Extract, Redensyl" },
};

function getDetails(subcategory: string) {
  return DETAILS[subcategory] ?? {
    description: "A premium beauty product crafted with high-quality ingredients for visible results. Dermatologist-tested and suitable for regular use.",
    benefits: ["Premium quality ingredients", "Dermatologist tested", "Suitable for regular use", "Visible results"],
    howToUse: ["Apply as directed.", "Use consistently for best results.", "Discontinue if irritation occurs."],
    ingredients: "Premium active ingredients blend. See packaging for full list.",
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const { dispatch, inWish } = useCart();
  const [tab, setTab] = useState<"desc" | "use" | "ing">("desc");
  const p = ALL_PRODUCTS.find(x => x.id === params.id) || ALL_PRODUCTS[0];
  const d = getDetails((p as any).subcategory || "");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 60px" }}>
      <Link href="/" style={{ color: "#673ab7", fontWeight: 600, fontSize: 13, display: "inline-block", marginBottom: 20 }}>← Back</Link>

      {/* Top grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 40 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", background: "#f8f4ff", aspectRatio: "1", position: "relative" }}>
          <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {p.discount > 0 && <div style={{ position: "absolute", top: 14, left: 14, background: "#e91e8c", color: "#fff", borderRadius: 8, padding: "4px 10px", fontWeight: 800, fontSize: 12 }}>{p.discount}% OFF</div>}
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: "#673ab7", marginBottom: 6 }}>{p.brand}</p>
          <h1 style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 900, color: "#1a1a2e", marginBottom: 12, lineHeight: 1.2 }}>{p.name}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#673ab7", color: "#fff", padding: "4px 10px", borderRadius: 999 }}>
              <Star size={12} fill="white" color="white" /><span style={{ fontWeight: 700, fontSize: 12 }}>{p.rating}</span>
            </div>
            <span style={{ fontSize: 12, color: "#aaa" }}>({p.reviews} reviews)</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 30, fontWeight: 900, color: "#1a1a2e" }}>₹{p.price}</span>
            <span style={{ fontSize: 16, color: "#bbb", textDecoration: "line-through" }}>₹{p.mrp}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#e91e8c" }}>{p.discount}% OFF</span>
          </div>
          <p style={{ fontSize: 12, color: "#2e7d32", fontWeight: 700, marginBottom: 20 }}>You save ₹{p.mrp - p.price}</p>

          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <button onClick={() => dispatch({ type: "ADD", item: { id: p.id, name: p.name, brand: p.brand, price: p.price, mrp: p.mrp, img: p.img } })} style={{ flex: 1, padding: "14px", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <ShoppingBag size={16} /> Add to Bag
            </button>
            <button onClick={() => dispatch({ type: "TOGGLE_WISH", id: p.id })} style={{ width: 52, height: 52, borderRadius: "50%", border: "1.5px solid #e0d5f5", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: inWish(p.id) ? "#e91e8c" : "#888" }}>
              <Heart size={20} fill={inWish(p.id) ? "#e91e8c" : "none"} />
            </button>
          </div>

          {/* Key highlights */}
          <div style={{ marginBottom: 20 }}>
            {d.benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", borderBottom: i < d.benefits.length - 1 ? "1px solid #f0eaf8" : "none" }}>
                <span style={{ color: "#673ab7", fontWeight: 900, fontSize: 16, lineHeight: 1.2, flexShrink: 0 }}>•</span>
                <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* Trust row */}
          <div style={{ display: "flex", gap: 8 }}>
            {["✓ 100% Authentic", "🚚 Free Delivery", "↩ 7-Day Returns"].map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 700, color: "#673ab7", background: "#f0eaf8", borderRadius: 999, padding: "5px 10px" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Details tabs */}
      <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(103,58,183,0.07)" }}>
        <div style={{ display: "flex", borderBottom: "1px solid #f0eaf8" }}>
          {([["desc", "Description"], ["use", "How to Use"], ["ing", "Ingredients"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "15px", border: "none", background: "none", fontWeight: 700, fontSize: 13, color: tab === key ? "#673ab7" : "#999", borderBottom: tab === key ? "2.5px solid #673ab7" : "2.5px solid transparent", cursor: "pointer", transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ padding: "28px 28px" }}>
          {tab === "desc" && (
            <div>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: 24 }}>{d.description}</p>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a1a2e", marginBottom: 12 }}>Key Benefits</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {d.benefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#f9f6ff", borderRadius: 10, padding: "12px 14px" }}>
                    <span style={{ color: "#673ab7", fontWeight: 900 }}>✦</span>
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "use" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {d.howToUse.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#673ab7,#9c27b0)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ background: "#f9f6ff", borderRadius: 12, padding: "12px 16px", flex: 1 }}>
                    <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "ing" && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a1a2e", marginBottom: 14 }}>Key Ingredients</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {d.ingredients.split(",").map((ing, i) => (
                  <span key={i} style={{ background: "#f0eaf8", color: "#673ab7", borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600 }}>{ing.trim()}</span>
                ))}
              </div>
              <div style={{ background: "#fff8e1", borderRadius: 12, padding: "12px 16px", border: "1px solid #ffe082" }}>
                <p style={{ fontSize: 12, color: "#f57f17", fontWeight: 700, marginBottom: 4 }}>⚠️ Patch Test Recommended</p>
                <p style={{ fontSize: 12, color: "#795548", lineHeight: 1.6 }}>Always do a patch test before first use. For external use only. Discontinue if irritation occurs. Full list on packaging.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}