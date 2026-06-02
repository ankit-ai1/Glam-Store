import Link from "next/link";
import { BRANDS, ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import "@/styles/home.css";

export default function Page({ params }: { params: { slug: string } }) {
  const brand = BRANDS.find(b => b.href.endsWith("/" + params.slug));
  const brandName = brand?.name || params.slug;

  // Case-insensitive brand match
  const products = ALL_PRODUCTS.filter(
    p => p.brand.toLowerCase() === brandName.toLowerCase()
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      {/* Brand hero */}
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#4a1a8e,#9c27b0)", padding: "48px 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: brand?.color || "#673ab7",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, color: "#fff", fontSize: 22,
            border: "3px solid rgba(255,255,255,0.3)",
            flexShrink: 0,
          }}>
            {brand?.logo || brandName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 6 }}>Brand</p>
            <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: "#fff" }}>{brandName}</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
              {products.length > 0 ? `${products.length} product${products.length !== 1 ? "s" : ""} available` : "Explore all products"}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 20px" }}>
        {products.length > 0 ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>
                {brandName} Products
              </h2>
              <span style={{ fontSize: 13, color: "#888" }}>{products.length} items</span>
            </div>
            <div className="products-grid">
              {products.map(p => (
                <ProductCard key={p.id} p={p} badge={p.discount + "%"} />
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 20 }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>No products found for {brandName}</h2>
            <p style={{ fontSize: 14, color: "#aaa", marginBottom: 24 }}>
              We're adding more {brandName} products soon. Explore all brands in the meantime.
            </p>
            <Link href="/brands" style={{ background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
              All Brands →
            </Link>
          </div>
        )}
      </div>

      {/* All brands */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>More Brands</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {BRANDS.filter(b => b.name.toLowerCase() !== brandName.toLowerCase()).map(b => (
            <Link key={b.name} href={b.href} style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #e0d5f5", borderRadius: 999, padding: "7px 14px", fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: b.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#fff" }}>{b.logo.charAt(0)}</span>
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
