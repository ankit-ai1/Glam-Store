"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/styles/home.css";

function WishlistContent() {
  const { state } = useCart();
  const products = ALL_PRODUCTS.filter(p=>state.wishlist.includes(p.id));
  if(products.length===0) return (
    <div style={{maxWidth:480,margin:"80px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{fontSize:64,marginBottom:16}}>❤️</div>
      <h2 style={{fontSize:24,fontWeight:900,color:"#1a1a2e",marginBottom:8}}>Wishlist is empty</h2>
      <Link href="/" style={{display:"inline-block",background:"linear-gradient(90deg,#673ab7,#9c27b0)",color:"#fff",borderRadius:999,padding:"12px 32px",fontWeight:700}}>Explore Products</Link>
    </div>
  );
  return (
    <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 20px"}}>
      <h1 className="section-title" style={{marginBottom:8}}>My Wishlist ❤️</h1>
      <div className="section-bar" style={{marginBottom:24}}/>
      <div className="products-grid">{products.map(p=><ProductCard key={p.id} p={p} badge={p.discount+"%"}/>)}</div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <WishlistContent />
    </ProtectedRoute>
  );
}