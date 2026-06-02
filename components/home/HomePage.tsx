"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES, PROMO_BANNERS, DEALS, BRANDS, CONCERNS, NEW_LAUNCHES, BLOG_POSTS, TRUST_BADGES } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import "@/styles/home.css";

function useCountdown(hours: number) {
  const [t, setT] = useState(hours * 3600);
  useEffect(() => { const i = setInterval(() => setT(s => s > 0 ? s - 1 : 0), 1000); return () => clearInterval(i); }, []);
  return {
    h: Math.floor(t / 3600).toString().padStart(2, "0"),
    m: Math.floor((t % 3600) / 60).toString().padStart(2, "0"),
    s: (t % 60).toString().padStart(2, "0"),
  };
}

function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const banners = [
    { eyebrow: "Level Up With NYX", title: "Meet The Cult Favs", desc: "Shop iconic beauty heroes, glowing skincare essentials, and launch-first stories curated for your daily glam.", cta: "Shop All Deals", href: "/offers", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&fit=crop" },
    { eyebrow: "New Arrivals 2025", title: "Skincare That Works", desc: "Science-backed formulas from the world's most trusted brands. Get glowing skin in 30 days.", cta: "Shop Skincare", href: "/skincare", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&fit=crop" },
    { eyebrow: "Exclusive Offer", title: "Luxury At Your Price", desc: "Premium MAC, Huda Beauty & more at unbeatable prices. Limited time offer.", cta: "Shop Luxe", href: "/luxe", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&fit=crop" },
  ];
  useEffect(() => { const t = setInterval(() => setCurrent(c => (c + 1) % banners.length), 4500); return () => clearInterval(t); }, []);
  const b = banners[current];
  return (
    <div className="hero-banner">
      <img src={b.img} alt="" className="hero-bg-img" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-eyebrow">{b.eyebrow}</span>
        <h1 className="hero-title">{b.title}</h1>
        <p className="hero-desc">{b.desc}</p>
        <Link href={b.href} className="hero-btn">{b.cta} →</Link>
      </div>
      <div className="hero-dots">
        {banners.map((_, i) => (
          <button key={i} className={`hero-dot${i === current ? " active" : ""}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { h, m, s } = useCountdown(8);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>

      {/* Hero */}
      <section className="section" style={{ paddingTop: 28, paddingBottom: 32 }}>
        <div className="container"><HeroBanner /></div>
      </section>

      {/* Category */}
      <section className="section" style={{ background: "#fff", borderTop: "1px solid #f5eef5" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="section-label">Premium Edit</span>
            <h2 className="section-title">Shop By Category</h2>
            <div className="section-bar section-bar-center" />
            <p className="section-subtitle">Browse premium categories designed for every beauty ritual.</p>
          </div>
          <div className="category-grid">
            {CATEGORIES.map(c => (
              <Link key={c.name} href={c.href} className="category-item">
                <div className="category-icon-wrap" style={{ background: `${c.color}18` }}>{c.icon}</div>
                <span className="category-name">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Picks */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <span className="section-label">Trending Now</span>
            <h2 className="section-title">Promo Picks</h2>
            <div className="section-bar" />
            <p className="section-subtitle">High-impact beauty offers to elevate every routine.</p>
          </div>
          <div className="promo-grid">
            {PROMO_BANNERS.map((b, i) => (
              <Link key={i} href={b.href} className="promo-card">
                <img src={b.img} alt={b.title} className="promo-card-img" />
                <div className="promo-card-overlay" />
                <span className="promo-card-badge">Featured</span>
                <div className="promo-card-body">
                  <h3 className="promo-card-title">{b.title}</h3>
                  <p className="promo-card-sub">{b.sub}</p>
                </div>
                <span className="promo-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="section-label">Flash Sale</span>
              <h2 className="section-title">Deal of the Day</h2>
              <div className="section-bar" />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, paddingTop: 8 }}>
              {[[h,"HRS"],[m,"MIN"],[s,"SEC"]].map(([val, lbl], i) => (
                <span key={lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span className="timer-block">{val}</span>
                  <span className="timer-label">{lbl}</span>
                  {i < 2 && <span className="timer-sep" style={{ position: "absolute", marginLeft: 44 }}>:</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="products-grid">
            {DEALS.map(d => <ProductCard key={d.id} p={d} badge={`${d.discount}% OFF`} />)}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <span className="section-label">Brand Edit</span>
              <h2 className="section-title">Top Brands</h2>
              <div className="section-bar" />
            </div>
            <Link href="/brands" style={{ fontSize: 13, fontWeight: 700, color: "#673ab7" }}>View All →</Link>
          </div>
          <div className="brands-grid">
            {BRANDS.map(b => (
              <Link key={b.name} href={b.href} className="brand-item">
                <div className="brand-circle" style={{ background: b.color }}>{b.logo}</div>
                <span className="brand-name">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Concern */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-label">Personalised For You</span>
          <h2 className="section-title">Shop By Concern</h2>
          <div className="section-bar section-bar-center" />
          <div className="concern-grid" style={{ marginTop: 8 }}>
            {CONCERNS.map(c => (
              <Link key={c.label} href={c.href} className="concern-chip">
                <span style={{ fontSize: 18 }}>{c.icon}</span> {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Launches */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <span className="section-label">Just Arrived</span>
            <h2 className="section-title">New Launches ✨</h2>
            <div className="section-bar" />
            <p className="section-subtitle">Fresh arrivals handcrafted for modern luxury.</p>
          </div>
          <div className="products-grid">
            {NEW_LAUNCHES.map(p => <ProductCard key={p.id} p={p} badge="NEW" />)}
          </div>
        </div>
      </section>

      {/* Beauty Blog */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <span className="section-label">Style & Advice</span>
              <h2 className="section-title">Beauty Blog</h2>
              <div className="section-bar" />
              <p className="section-subtitle">Inspiration, routines and expert advice for modern beauty rituals.</p>
            </div>
            <Link href="/beauty-blog" style={{ fontSize: 13, fontWeight: 700, color: "#673ab7", flexShrink: 0, paddingTop: 4 }}>View All →</Link>
          </div>
          <div className="blog-grid">
            {BLOG_POSTS.map(post => (
              <Link key={post.id} href={`/beauty-blog/${post.slug}`} className="blog-card">
                <img src={post.img} alt={post.title} className="blog-img" />
                <div className="blog-body">
                  <span className="blog-tag" style={{ background: post.tagBg, color: post.tagColor }}>{post.tag}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-meta">⏱ {post.read} read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span className="section-label section-label-light">Why Shop With Us</span>
            <h2 className="section-title section-title-light">Luxury Service Highlights</h2>
            <div className="section-bar section-bar-center" />
          </div>
          <div className="trust-grid">
            {TRUST_BADGES.map((b, i) => (
              <div key={i} className="trust-item">
                <div className="trust-icon">{b.icon}</div>
                <p className="trust-title">{b.title}</p>
                <p className="trust-sub">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
