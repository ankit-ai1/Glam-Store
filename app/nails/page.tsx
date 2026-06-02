"use client";
import { ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import "@/styles/home.css";
export default function Page() {
  return (
    <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{marginBottom:32}}>
        <span className="section-label">Shop Now</span>
        <h1 className="section-title">Nails</h1>
        <div className="section-bar"/>
      </div>
      <div className="products-grid">
        {ALL_PRODUCTS.map(p=><ProductCard key={p.id} p={p} badge={p.discount+"%"}/>)}
      </div>
    </div>
  );
}