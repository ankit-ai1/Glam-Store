"use client";
import Link from "next/link";
import { Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import "@/styles/home.css";

interface Product {
  id: string; name: string; brand: string; brandColor?: string;
  price: number; mrp: number; discount: number;
  rating: number; reviews: string; img: string; badgeBg?: string;
}

export default function ProductCard({ p, badge }: { p: Product; badge?: string }) {
  const { dispatch, inWish, inCart } = useCart();
  const wished = inWish(p.id);
  const carted = inCart(p.id);

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={p.img} alt={p.name} className="product-img" />
        {badge && <span className="product-badge" style={{ background: p.badgeBg || "#673ab7" }}>{badge}</span>}
        <button className={`product-wishlist-btn${wished ? " active" : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_WISH", id: p.id })}>
          {wished ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="product-body">
        <p className="product-brand" style={{ color: p.brandColor || "#673ab7" }}>{p.brand}</p>
        <Link href={`/products/${p.id}`}>
          <p className="product-name line-clamp-2">{p.name}</p>
        </Link>
        <div className="product-rating">
          <div className="product-rating-pill">
            <Star size={10} fill="white" color="white" />
            <span>{p.rating}</span>
          </div>
          <span className="product-rating-count">({p.reviews})</span>
        </div>
        <div className="product-price">
          <span className="product-price-curr">₹{p.price}</span>
          <span className="product-price-mrp">₹{p.mrp}</span>
          <span className="product-price-off">{p.discount}% OFF</span>
        </div>
        <button
          className={`product-add-btn${carted ? " added" : ""}`}
          onClick={() => dispatch({ type: "ADD", item: { id: p.id, name: p.name, brand: p.brand, price: p.price, mrp: p.mrp, img: p.img } })}>
          🛍 {carted ? "Added" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}
