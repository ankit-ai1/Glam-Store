"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import "@/styles/pages.css";

export default function CartPage() {
  const router = useRouter();
  const { state, dispatch, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { items } = state;
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponErr, setCouponErr] = useState("");

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "GLAM25") { setCouponApplied(true); setCouponErr(""); }
    else { setCouponErr("Invalid coupon code"); setCouponApplied(false); }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push("/login?redirect=/checkout");
    } else {
      // Navigate to checkout
      router.push("/checkout");
    }
  };

  const discount = couponApplied ? Math.round(cartTotal * 0.25) : 0;
  const delivery = cartTotal > 499 ? 0 : 79;
  const total = cartTotal - discount + delivery;

  if (items.length === 0) return (
    <div style={{ maxWidth: 480, margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛍️</div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1a1a2e", marginBottom: 8 }}>Your bag is empty</h2>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>Looks like you haven't added anything yet.</p>
      <Link href="/" style={{ display: "inline-block", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px 32px", fontWeight: 700, fontSize: 14 }}>Start Shopping →</Link>
    </div>
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">My Bag ({items.length} {items.length === 1 ? "item" : "items"})</h1>
      <div className="cart-layout">
        <div>
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-img" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="cart-item-brand">{item.brand}</p>
                <p className="cart-item-name">{item.name}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <div className="cart-qty">
                    <button className="cart-qty-btn" onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.quantity - 1 })}><Minus size={12} /></button>
                    <span className="cart-qty-val">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.quantity + 1 })}><Plus size={12} /></button>
                  </div>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>₹{item.price * item.quantity}</span>
                    <span style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through", marginLeft: 6 }}>₹{item.mrp * item.quantity}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => dispatch({ type: "REMOVE", id: item.id })} style={{ background: "none", border: "none", cursor: "pointer", color: "#e91e8c", padding: "4px" }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div>
          <div className="cart-coupon-wrap">
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Tag size={14} color="#673ab7" /> Apply Coupon</p>
            <div style={{ display: "flex" }}>
              <input className="cart-coupon-input" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon code" />
              <button className="cart-coupon-btn" onClick={applyCoupon}>Apply</button>
            </div>
            {couponApplied && <p style={{ fontSize: 12, color: "#2e7d32", marginTop: 6, fontWeight: 600 }}>✓ GLAM25 applied! You save ₹{discount}</p>}
            {couponErr && <p style={{ fontSize: 12, color: "#c62828", marginTop: 6 }}>{couponErr}</p>}
            <p style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>Try: GLAM25</p>
          </div>

          <div className="cart-summary">
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: "#1a1a2e" }}>Price Details</h3>
            <div className="cart-price-row"><span className="cart-price-label">MRP Total</span><span>₹{items.reduce((s,i) => s + i.mrp * i.quantity, 0)}</span></div>
            <div className="cart-price-row"><span className="cart-price-label">Discount</span><span className="cart-price-save">−₹{items.reduce((s,i) => s + (i.mrp - i.price) * i.quantity, 0)}</span></div>
            {couponApplied && <div className="cart-price-row"><span className="cart-price-label">Coupon (GLAM25)</span><span className="cart-price-save">−₹{discount}</span></div>}
            <div className="cart-price-row"><span className="cart-price-label">Delivery</span><span className={delivery === 0 ? "cart-price-save" : ""}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
            <div className="cart-total-row"><span>Total</span><span>₹{total}</span></div>
            {delivery > 0 && <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>Add ₹{499 - cartTotal} more for free delivery</p>}
            <button onClick={handleCheckout} className="cart-checkout-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" }}>
              <ShoppingBag size={16} /> Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
