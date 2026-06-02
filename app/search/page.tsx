"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import "@/styles/home.css";

function Results() {
  const sp = useSearchParams();
  const q = sp.get("q") || "";
  const results = q
    ? ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()))
    : ALL_PRODUCTS;
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, color: "#1a1a2e" }}>
        {q ? `Results for "${q}"` : "All Products"}
      </h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>{results.length} products found</p>
      <div className="products-grid">
        {results.map(p => <ProductCard key={p.id} p={p} badge={`${p.discount}%`} />)}
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense><Results /></Suspense>;
}
