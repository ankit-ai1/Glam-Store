import Link from "next/link";
import { RotateCcw, CheckCircle, XCircle, Clock, Package } from "lucide-react";

const STEPS = [
  { icon: "📦", title: "Initiate Return", desc: "Go to My Orders, select the item, and click 'Return Item' within 7 days of delivery." },
  { icon: "🔍", title: "We Review", desc: "Our team reviews your request within 24 hours and confirms eligibility." },
  { icon: "🚚", title: "Pickup Scheduled", desc: "A courier partner will be assigned to pick up the item from your doorstep — free of charge." },
  { icon: "✅", title: "Refund Processed", desc: "Once we receive and inspect the item, your refund is processed within 5–7 business days." },
];

const ELIGIBLE = ["Damaged or defective products","Wrong item delivered","Products with missing components","Sealed/unopened products within 7 days"];
const NOT_ELIGIBLE = ["Opened skincare, makeup, or fragrance products","Products without original packaging","Items purchased during final sale","Personalised or custom orders","Digital/downloadable products"];

export default function ReturnsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#1565c0,#673ab7)", padding: "56px 20px 64px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Returns & Refunds</h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
          We want you to be completely happy with your purchase. Here's everything you need to know.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "-28px auto 60px", padding: "0 20px" }}>

        {/* 7-day badge */}
        <div style={{ background: "linear-gradient(135deg,#673ab7,#9c27b0)", borderRadius: 20, padding: "28px 32px", marginBottom: 20, display: "flex", alignItems: "center", gap: 20, boxShadow: "0 8px 28px rgba(103,58,183,0.25)" }}>
          <div style={{ fontSize: 48, flexShrink: 0 }}>↩</div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>7-Day Easy Returns</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Return eligible items within 7 days of delivery for a full refund or exchange — no questions asked.</p>
          </div>
        </div>

        {/* Process steps */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", marginBottom: 20, boxShadow: "0 2px 12px rgba(103,58,183,0.08)" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 24 }}>How to Return</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                <p style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e", marginBottom: 6 }}>
                  <span style={{ color: "#673ab7" }}>{i + 1}. </span>{s.title}
                </p>
                <p style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligible / Not eligible */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "24px", boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <CheckCircle size={20} color="#2e7d32" />
              <h3 style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e" }}>Eligible for Return</h3>
            </div>
            {ELIGIBLE.map(i => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#2e7d32", fontSize: 14, marginTop: 1 }}>✓</span>
                <p style={{ fontSize: 13, color: "#444" }}>{i}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "24px", boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <XCircle size={20} color="#c62828" />
              <h3 style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e" }}>Not Eligible</h3>
            </div>
            {NOT_ELIGIBLE.map(i => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#c62828", fontSize: 14, marginTop: 1 }}>✕</span>
                <p style={{ fontSize: 13, color: "#444" }}>{i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Refund timeline */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "24px", marginBottom: 20, boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Clock size={20} color="#673ab7" />
            <h3 style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e" }}>Refund Timeline</h3>
          </div>
          {[["UPI / Wallet", "1–3 business days"],["Credit / Debit Card", "5–7 business days"],["Net Banking", "5–7 business days"],["Cash on Delivery", "5–7 business days (bank transfer)"]].map(([method, time]) => (
            <div key={method} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f0ff" }}>
              <span style={{ fontSize: 14, color: "#444", fontWeight: 500 }}>{method}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#673ab7", background: "#f0eaf8", borderRadius: 999, padding: "3px 12px" }}>{time}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e", marginBottom: 6 }}>Need help with a return?</p>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>Contact our support team and we'll resolve it within 24 hours.</p>
          <Link href="/contact" style={{ display: "inline-block", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
