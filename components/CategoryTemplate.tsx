"use client";
import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  banner?: string;
}

export default function CategoryTemplate({ title, description, banner }: Props) {
  return (
    <div style={{ background: "#fff" }}>
      {/* Hero */}
      <div style={{ background: `url(${banner || '/images/hero-default.jpg'}) center/cover`, height: 260, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '32px 20px', color: '#fff' }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, margin: 0 }}>{title}</h1>
          {description && <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.9)' }}>{description}</p>}
        </div>
      </div>

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 20px' }}>
        {/* Category Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16, marginBottom: 30 }}>
          {["Top Picks","New Arrivals","Best Sellers","Editor Picks"].map((c) => (
            <Link key={c} href="#" style={{ display: 'block', padding: 18, borderRadius: 12, background: '#fff', boxShadow: '0 6px 18px rgba(19,12,38,0.04)', textDecoration: 'none', color: '#111' }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>{c}</div>
              <div style={{ color: '#666', fontSize: 13 }}>Explore curated selections of {title.toLowerCase()}</div>
            </Link>
          ))}
        </section>

        {/* Featured Products */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Featured Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(19,12,38,0.04)' }}>
                <div style={{ height: 140, background: '#f6f2ff', borderRadius: 8, marginBottom: 8 }} />
                <div style={{ fontWeight: 700 }}>Product {i + 1}</div>
                <div style={{ color: '#777', fontSize: 13 }}>Brand • ₹{499 + i * 100}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Best Sellers</h2>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ minWidth: 220, padding: 12, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(19,12,38,0.04)' }}>
                <div style={{ height: 140, background: '#fff4fb', borderRadius: 8, marginBottom: 8 }} />
                <div style={{ fontWeight: 700 }}>Best Seller {i + 1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Trending Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 8, background: '#fff', boxShadow: '0 6px 18px rgba(19,12,38,0.04)' }}>
                <div style={{ height: 120, background: '#fff7f0', borderRadius: 6, marginBottom: 8 }} />
                <div style={{ fontWeight: 700 }}>Trending {i + 1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Customer Reviews</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(19,12,38,0.04)' }}>
                <div style={{ fontWeight: 800 }}>Reviewer {i + 1}</div>
                <div style={{ color: '#666', fontSize: 13 }}>“Amazing product, loved the texture and finish.”</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>FAQs</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {["Shipping & Returns","Product Ingredients","How to choose shade"].map((q, i) => (
              <details key={i} style={{ padding: 12, borderRadius: 8, background: '#fff', boxShadow: '0 6px 18px rgba(19,12,38,0.04)' }}>
                <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{q}</summary>
                <div style={{ marginTop: 8, color: '#666' }}>Answer for {q}.</div>
              </details>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section style={{ padding: 22, borderRadius: 12, background: '#f6f2ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Join our beauty newsletter</div>
            <div style={{ color: '#666', marginTop: 6 }}>Get early access to launches and exclusive offers.</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input placeholder="Enter your email" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e8dff5' }} />
            <button style={{ background: 'linear-gradient(90deg,#673ab7,#9c27b0)', color: '#fff', padding: '10px 14px', borderRadius: 8, fontWeight: 800 }}>Subscribe</button>
          </div>
        </section>
      </main>
    </div>
  );
}
