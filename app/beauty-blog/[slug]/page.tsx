import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

const CONTENT: Record<string, { intro: string; sections: { heading: string; body: string; img?: string }[] }> = {
  "best-skincare-routines": {
    intro: "A consistent skincare routine is the foundation of healthy, glowing skin. These 10 evidence-backed steps will transform your skin in just a few weeks.",
    sections: [
      { heading: "1. Double Cleanse Every Night", body: "Oil cleanser first to remove SPF & makeup, then a gentle water-based cleanser to clear remaining impurities. Garnier Micellar Water is a perfect second step. Double cleansing ensures nothing clogs your pores overnight.", img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=700&h=400&fit=crop" },
      { heading: "2. Tone to Restore pH", body: "A toner after cleansing restores your skin's natural pH and primes it to absorb serums. Opt for alcohol-free formulas — Biotique Rose Water Toner is a budget bestseller that soothes and hydrates simultaneously." },
      { heading: "3. Vitamin C Every Morning", body: "Vitamin C serum neutralises free radicals, brightens dark spots, and stimulates collagen. Minimalist 20% Vitamin C Serum delivers clinically proven results in 4 weeks. Apply after toner, before moisturiser.", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&h=400&fit=crop" },
      { heading: "4. Niacinamide for Pores & Oil Control", body: "Niacinamide 10% minimises pores, reduces pigmentation, and balances sebum. Minimalist Niacinamide 10% + Zinc has earned cult status in India — it works fast, costs little, and is suitable for all skin types." },
      { heading: "5. Hyaluronic Acid for Deep Hydration", body: "Apply HA serum on damp skin to maximise absorption. It holds 1000x its weight in water, plumps fine lines, and gives a dewy glow. Dot & Key HA Serum is lightweight and layers beautifully under any moisturiser." },
      { heading: "6. SPF 50 PA++++ Is Non-Negotiable", body: "Sunscreen is the most impactful anti-aging product you can use. Rain, shine, indoors — wear SPF 50 PA++++ every morning. Minimalist SPF 50 has zero white cast and works beautifully under makeup." },
      { heading: "7. Retinol for Long-Term Results", body: "Begin retinol in your mid-20s for preventive benefits. Start with The Ordinary Granactive Retinoid 2% every other night and build frequency gradually. Pair with extra moisturiser to offset any initial dryness.", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&h=400&fit=crop" },
    ],
  },
  "summer-makeup-looks": {
    intro: "India's summer heat is the ultimate makeup challenge. With the right products and techniques, your look will stay fresh and glowing from morning till midnight.",
    sections: [
      { heading: "Start with Hydrated, Primed Skin", body: "Moisturised skin holds makeup longer. Apply a gel moisturiser, let it sink in, then layer SPF 50. Lakmé 9to5 Pore Minimizer Primer fills pores and creates a smooth, matte base — essential before any foundation.", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&h=400&fit=crop" },
      { heading: "Switch to Lightweight Base Coverage", body: "Heavy foundation becomes cakey by noon in heat. Swap to BB cream or a tinted moisturiser. Lakmé BB Cream SPF 20 covers imperfections while feeling weightless. For evenings, build coverage only where needed." },
      { heading: "Waterproof Eyes are a Must", body: "Kajal, mascara, eyeliner — waterproof everything. Maybelline Colossal Kajal survives gym sessions, humidity, and 12-hour days. Set cream eyeshadows with a matching powder to lock them in.", img: "https://images.unsplash.com/photo-1599305445671-5c0dd29e9e03?w=700&h=400&fit=crop" },
      { heading: "Coral & Peach Lips for Summer", body: "Skip matte liquid lipstick on hot days. NYX Butter Gloss in sheer rose or coral tones gives a fresh, effortless look that stays hydrated. Add a waterproof liner first to prevent feathering in humidity." },
      { heading: "Setting Spray is Everything", body: "A few spritzes of setting spray lock your makeup for 8–12 hours and genuinely feel refreshing. Hold 30cm away, close your eyes, and mist lightly. Reapply midday for a touch-up without disturbing your base." },
    ],
  },
  "hair-care-secrets": {
    intro: "Hair fall, dryness, frizz — most Indian hair concerns are fixable with the right products and a consistent, proven routine. Here's exactly what works.",
    sections: [
      { heading: "Oil Massage: The Non-Negotiable Step", body: "A warm oil massage 2–3 times a week improves scalp circulation, nourishes follicles, and reduces hair fall by up to 40%. Coconut oil for softness, onion oil for fall, argan oil for shine. Massage for 10 minutes and leave for at least an hour.", img: "https://images.unsplash.com/photo-1634744940484-3a44e9ac0703?w=700&h=400&fit=crop" },
      { heading: "Switch to Sulphate-Free Shampoo", body: "Standard shampoos strip your scalp's natural oils, triggering dryness and excess oiliness. WOW Apple Cider Vinegar Shampoo removes buildup gently. Mamaearth Onion Shampoo is the #1 pick for hair fall — the results speak for themselves." },
      { heading: "Conditioner After Every Wash", body: "Apply conditioner mid-lengths to ends only. Leave for 3 minutes, then rinse with cool water to seal the cuticle. L'Oréal Absolute Repair Conditioner is a game-changer for chemically treated or damaged hair.", img: "https://images.unsplash.com/photo-1522337360885-08fe0c3920be?w=700&h=400&fit=crop" },
      { heading: "Weekly Deep Conditioning Mask", body: "A hair mask provides intensive treatment regular conditioner can't match. Apply generously, put on a shower cap, and wait 20–30 minutes. You'll feel the softness after the very first use." },
      { heading: "Never Skip Heat Protectant", body: "Every session with a blow dryer or straightener without protection causes cumulative damage to your hair's protein structure. Livon Hair Serum before blow-drying protects and controls frizz simultaneously." },
    ],
  },
  "top-fragrances-2025": {
    intro: "2025's fragrance scene is all about long-lasting, versatile scents that take you from boardroom to late nights. Here are the editors' picks across every budget.",
    sections: [
      { heading: "Best Everyday: Engage Bloom EDP", body: "Bergamot top notes, jasmine and rose heart, warm musk base. Light, wearable, and versatile — perfect for daily wear. At ₹449 for 50ml, the value is unbeatable and longevity is 6–8 hours.", img: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=700&h=400&fit=crop" },
      { heading: "Best Bold Statement: Denver Bleu Intense", body: "For those evenings when you want to make a lasting impression. Deep aquatic opening, woody-aromatic heart, lasting trail. 100ml for ₹549 — exceptional pricing for a genuinely premium fragrance experience." },
      { heading: "The Art of Layering Fragrance", body: "Start with a matching body wash, then body lotion, then EDP. The moisturiser anchors the fragrance and makes it last 2–3x longer. The Body Shop Strawberry Body Butter is a beautiful layering companion for fruity EDPs.", img: "https://images.unsplash.com/photo-1594707352515-a335d6b6d5df?w=700&h=400&fit=crop" },
      { heading: "Apply on Pulse Points", body: "Wrists, neck, behind ears, inner elbows, behind knees — these pulse points radiate heat that activates and projects fragrance. Never rub wrists together; it crushes molecules and distorts the scent." },
      { heading: "2025 Fragrance Trends", body: "Skin-scent fragrances (barely-there, second-skin feel), sustainable/vegan EDPs, gourmand notes (vanilla, coffee, caramel), and premium Indian attars reimagined in contemporary bottles are dominating shelves this year." },
    ],
  },
  "glass-skin-guide": {
    intro: "Glass skin — the ultra-dewy, poreless, reflective Korean skin aesthetic — is achievable for Indian skin types. Here's the exact routine that creates it.",
    sections: [
      { heading: "What Exactly is Glass Skin?", body: "Glass skin refers to skin that's so well-hydrated and healthy that it reflects light like glass. It's not about makeup or filters — it's about layering lightweight hydration until your skin becomes genuinely luminous. The Korean 10-step routine is built around this goal.", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&h=400&fit=crop" },
      { heading: "Step 1: Double Cleanse Religiously", body: "Glass skin starts with clean skin. Any residue from SPF, pollution, or makeup will block hydration from penetrating. Oil cleanser first, then gel cleanser. Your skin should feel clean but not tight after cleansing." },
      { heading: "Step 2: Essence — The Core Step", body: "An essence is a lightweight, watery hydrator that preps skin to absorb everything that follows. Pat it in gently — never rub. Apply 3–4 layers for the '7-skin method' popularised in Korean skincare.", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&h=400&fit=crop" },
      { heading: "Step 3: Hyaluronic Acid Serum", body: "On damp skin, apply Dot & Key HA Serum. The hyaluronic acid draws moisture from the air into your skin, plumping it from within. This single step alone creates a noticeable dewy finish." },
      { heading: "Step 4: Sheet Mask Twice a Week", body: "Sheet masks deliver a concentrated dose of active ingredients directly onto skin. Use 2–3 times weekly, especially when your skin feels dull or stressed. Leave the remaining serum on your face — don't rinse." },
      { heading: "Step 5: Lock In with a Ceramide Moisturiser", body: "Ceramides strengthen your skin barrier, trapping all that hydration inside. Apply a ceramide-rich moisturiser as the final step in your AM/PM routine. Healthy barrier = glass skin that lasts all day." },
    ],
  },
  "nail-art-trends-2025": {
    intro: "2025 is the most exciting year for nail art in recent memory — from barely-there minimalism to full-on maximalist statements. Here's what's trending and how to recreate it at home.",
    sections: [
      { heading: "Trend 1: Jelly Nails", body: "Translucent, sheer, candy-like nails in pink, nude, and clear tones are everywhere. The jelly effect is achieved by layering sheer gel polish or a jelly topcoat over bare nails. It's subtle, elegant, and works with any outfit.", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&h=400&fit=crop" },
      { heading: "Trend 2: Chrome & Mirror Finish", body: "Ultra-reflective chrome nails that look like liquid metal are huge this year. Silver, gold, rose gold, and holographic finishes are all trending. Use a chrome powder over gel polish for the best mirror effect at home." },
      { heading: "Trend 3: Minimalist Negative Space", body: "Less is more — leaving part of the natural nail bare creates striking geometric designs without complex nail art skills. A simple stripe of colour or a semi-circle at the base is all you need.", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&h=400&fit=crop" },
      { heading: "Trend 4: 3D Nail Art", body: "Textured, three-dimensional elements like tiny gems, flowers, pearls, and bows are the maximalist statement of 2025. Easier to achieve than ever with nail glue and pre-made nail charms from any beauty store." },
      { heading: "Nail Care Essentials for Strong Nails", body: "Beautiful nail art starts with healthy nails. Use a strengthening base coat, keep nails hydrated with cuticle oil daily, and take biotin supplements for structural strength. Lakmé Xtend Color polishes are formulated to not weaken nails over time." },
    ],
  },
  "mens-grooming-guide": {
    intro: "Great grooming isn't complicated. A targeted, consistent routine with the right products takes less than 10 minutes a day and makes a transformative difference to how you look and feel.",
    sections: [
      { heading: "Skincare: The Foundation of Great Grooming", body: "Men's skin is thicker and oilier than women's — it needs targeted care. A simple 3-step routine: cleanser (morning and night), SPF 50 moisturiser (morning), and a niacinamide serum for pores and oil control. That's it — 5 minutes, huge results.", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&h=400&fit=crop" },
      { heading: "Beard Care: The Basics", body: "A well-groomed beard starts with regular washing with a dedicated beard wash (not regular shampoo — it's too harsh). Follow with beard oil — Beardo Beard Growth Oil is packed with nutrients that soften the beard and promote growth. Apply daily after washing." },
      { heading: "Shaving: The Right Way", body: "Always soften the beard with warm water or steam first. Use a quality shaving gel or foam. Shave in the direction of hair growth to prevent ingrown hairs and razor burns. Finish with an alcohol-free aftershave balm that soothes and moisturises." },
      { heading: "Hair: Keep It Simple", body: "Shampoo 2–3 times a week — daily washing strips natural oils and leads to a drier scalp. Use a light conditioner on lengths. A good hair serum like Livon controls frizz without making hair look greasy.", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&h=400&fit=crop" },
      { heading: "Fragrance: The Final Touch", body: "A good fragrance is the most memorable part of your grooming. Denver Bleu Intense EDP is a confident, long-lasting choice for everyday wear. Apply on pulse points after moisturising for maximum longevity." },
    ],
  },
  "budget-beauty-under-500": {
    intro: "You don't need to spend a fortune to look and feel your best. These are the best beauty products under ₹500 that genuinely deliver premium results.",
    sections: [
      { heading: "Skincare Under ₹500", body: "Minimalist Niacinamide 10% (₹349) — reduces pores and oil, visible results in 2 weeks. Biotique Rose Water Toner (₹299) — hydrates and preps skin for serums. Himalaya Neem Face Wash (₹129) — the best daily cleanser at any price point.", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&h=400&fit=crop" },
      { heading: "Makeup Under ₹500", body: "Maybelline Colossal Kajal (₹129) — 12-hour waterproof formula, the benchmark for kajals in India. Lakmé HD Kajal (₹149) — slightly more pigmented with a soft kohl formula. Biotique Lip Balm SPF 30 (₹99) — the best tinted balm at under ₹100." },
      { heading: "Hair Care Under ₹500", body: "Mamaearth Onion Shampoo (₹299) — sulphate-free, targets hair fall, smells lovely. Livon Hair Serum (₹159) — the OG Indian hair serum, instant smoothness and frizz control. WOW Onion Hair Oil (₹349) — excellent value for regular oil massage.", img: "https://images.unsplash.com/photo-1634744940484-3a44e9ac0703?w=700&h=400&fit=crop" },
      { heading: "Bath & Body Under ₹500", body: "Nivea Rose Body Lotion (₹199) — rich, long-lasting moisture for all skin types. MCaffeine Coffee Body Scrub (₹349) — exfoliates and softens in one step, plus that coffee scent is addictive. Himalaya Neem & Turmeric Soap (₹60) — a classic for a reason." },
      { heading: "Tips for Smart Beauty Shopping", body: "Buy multi-tasking products (SPF moisturiser, tinted balm). Look for Indian brands — they're formulated for Indian climate and skin types. Watch for flash sales on Glam Store where top products go up to 60% off. Try before splurging on premium — many drugstore products match luxury results." },
    ],
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
        <p style={{ fontSize: 48, marginBottom: 16 }}>📝</p>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a2e", marginBottom: 12 }}>Post Not Found</h1>
        <p style={{ color: "#888", marginBottom: 24 }}>This article doesn't exist or may have been moved.</p>
        <Link href="/beauty-blog" style={{ display: "inline-block", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
          ← Back to Beauty Blog
        </Link>
      </div>
    );
  }

  const content = CONTENT[slug] || {
    intro: "Read our expert-curated beauty insights and product recommendations.",
    sections: [{ heading: "Expert Insights", body: "Our team curates the best beauty advice to help you look and feel your best every day." }],
  };

  const otherPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 4);

  return (
    <article>
      {/* Hero */}
      <div style={{ position: "relative", height: "clamp(260px,45vw,420px)", overflow: "hidden" }}>
        <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.15) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(20px,5vw,48px)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <span style={{ background: post.tagBg, color: post.tagColor, borderRadius: 999, fontSize: 10, fontWeight: 800, padding: "4px 14px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {post.tag}
            </span>
            <h1 style={{ fontSize: "clamp(1.4rem,4vw,2.3rem)", fontWeight: 900, color: "#fff", marginTop: 14, lineHeight: 1.15, letterSpacing: "-0.025em" }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 10 }}>
              ⏱ {post.read} read &nbsp;·&nbsp; ✍️ Glam Store Editors
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#bbb", marginBottom: 28 }}>
          <Link href="/" style={{ color: "#673ab7", fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href="/beauty-blog" style={{ color: "#673ab7", fontWeight: 600 }}>Beauty Blog</Link>
          <span>›</span>
          <span>{post.tag}</span>
        </div>

        {/* Intro */}
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.9, marginBottom: 40, fontStyle: "italic", borderLeft: "4px solid #673ab7", paddingLeft: 20, background: "#faf5ff", padding: "16px 20px", borderRadius: "0 12px 12px 0" }}>
          {content.intro}
        </p>

        {/* Body sections */}
        {content.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(1.05rem,2.5vw,1.3rem)", fontWeight: 800, color: "#1a1a2e", marginBottom: 12, letterSpacing: "-0.02em" }}>
              {s.heading}
            </h2>
            {s.img && (
              <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, height: 280 }}>
                <img src={s.img} alt={s.heading} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9 }}>{s.body}</p>
          </div>
        ))}

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg,#1a0a2e,#673ab7,#9c27b0)", borderRadius: 20, padding: "28px", marginTop: 48, marginBottom: 52, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Shop the products mentioned in this article</p>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 18 }}>Explore Our Curated Collection</h3>
          <Link href="/" style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", borderRadius: 999, padding: "11px 28px", fontWeight: 700, fontSize: 14 }}>
            Shop Now →
          </Link>
        </div>

        {/* More posts */}
        <h3 style={{ fontSize: 20, fontWeight: 900, color: "#1a1a2e", marginBottom: 20 }}>More from the Blog</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 36 }}>
          {otherPosts.map(p => (
            <Link key={p.id} href={`/beauty-blog/${p.slug}`} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #f0eaf8", background: "#fff", display: "block" }}>
              <img src={p.img} alt={p.title} style={{ width: "100%", height: 120, objectFit: "cover" }} />
              <div style={{ padding: "12px 14px" }}>
                <span style={{ background: p.tagBg, color: p.tagColor, borderRadius: 999, fontSize: 9, fontWeight: 700, padding: "2px 8px", textTransform: "uppercase" }}>{p.tag}</span>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", marginTop: 6, lineHeight: 1.35 }}>{p.title}</p>
                <p style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>⏱ {p.read}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/beauty-blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
            ← Back to Beauty Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
