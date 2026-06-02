"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "Orders & Delivery",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 3–5 business days across India. Express delivery (1–2 days) is available in select cities. You can track your order in real time from My Orders." },
      { q: "Is there a minimum order value for free delivery?", a: "Yes — orders above ₹499 qualify for free standard delivery across India. Orders below ₹499 incur a delivery fee of ₹79." },
      { q: "Can I change or cancel my order?", a: "You can cancel or modify orders within 1 hour of placing them. After that, the order enters our fulfillment process and changes may not be possible. Contact our support team immediately at support@glamstore.in." },
      { q: "Do you deliver internationally?", a: "Currently, we deliver only within India. We're working on international shipping and will announce it soon." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "We offer hassle-free returns within 7 days of delivery for most products. Items must be unused, in original packaging, and with all tags intact. Certain categories like opened skincare, fragrances, and intimate items are not eligible for return." },
      { q: "How long does a refund take?", a: "Once we receive and inspect your returned item, refunds are processed within 5–7 business days. The amount is credited to your original payment method. UPI and wallet refunds are typically faster (1–3 days)." },
      { q: "What if I receive a damaged or wrong product?", a: "We're extremely sorry if this happens! Take photos of the product and packaging, then contact us within 48 hours at support@glamstore.in. We'll arrange an immediate replacement or full refund — no questions asked." },
    ],
  },
  {
    category: "Products & Authenticity",
    items: [
      { q: "Are all products on Glam Store authentic?", a: "100% yes. We source all products directly from authorised brand distributors and brand partners. We have a zero-tolerance policy for counterfeit products. Every product comes with original brand packaging and authentic batch codes." },
      { q: "How do I check if a product is right for my skin type?", a: "Each product page includes detailed ingredient lists, skin type suitability, and usage instructions. You can also filter by skin concern in the Skincare section. If you need personalised advice, reach out to our beauty advisors via chat." },
      { q: "Do you sell products that have been tested on animals?", a: "We're committed to cruelty-free beauty. We clearly mark cruelty-free and vegan products on their product pages. We're actively expanding our cruelty-free range." },
    ],
  },
  {
    category: "Payments & Security",
    items: [
      { q: "What payment methods are accepted?", a: "We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking, EMI, and Cash on Delivery. All transactions are secured with 256-bit SSL encryption." },
      { q: "Is it safe to save my card on Glam Store?", a: "Yes. We're PCI DSS compliant and use tokenisation — we never store your full card number. Your saved card details are encrypted and secure." },
      { q: "Can I use multiple coupon codes on one order?", a: "Only one coupon code can be applied per order. However, you can combine a coupon with Glamour Points for additional savings. Check our Offers page for the latest active coupons." },
    ],
  },
  {
    category: "Account & Glamour Points",
    items: [
      { q: "What are Glamour Points?", a: "Glamour Points are our loyalty reward currency. You earn 1 point for every ₹100 spent. Points can be redeemed for discounts on future orders. Accumulate 1,000 points to reach Gold tier and unlock exclusive member offers." },
      { q: "How do I delete my account?", a: "You can request account deletion from Profile > Account Settings > Delete Account. Please note this is irreversible and all order history, wishlist, and points will be permanently deleted." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f0eaf8" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", flex: 1 }}>{q}</span>
        <ChevronDown size={18} color="#673ab7" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, paddingBottom: 16, paddingRight: 28 }}>{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#673ab7)", padding: "56px 20px 64px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 12, maxWidth: 440, margin: "12px auto 0" }}>
          Find quick answers to common questions about orders, products, and your account.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "-28px auto 60px", padding: "0 20px" }}>
        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 20, scrollbarWidth: "none" }}>
          {FAQS.map(f => (
            <button key={f.category} onClick={() => setActiveCategory(f.category)} style={{ flexShrink: 0, padding: "9px 18px", borderRadius: 999, border: "none", background: activeCategory === f.category ? "linear-gradient(90deg,#673ab7,#9c27b0)" : "#fff", color: activeCategory === f.category ? "#fff" : "#666", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(103,58,183,0.08)" }}>
              {f.category}
            </button>
          ))}
        </div>

        {FAQS.filter(f => f.category === activeCategory).map(section => (
          <div key={section.category} style={{ background: "#fff", borderRadius: 20, padding: "8px 24px", boxShadow: "0 2px 12px rgba(103,58,183,0.08)" }}>
            {section.items.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 40, background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Still have questions?</p>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>Our support team is available Mon–Sat, 9am–6pm IST.</p>
          <Link href="/contact" style={{ display: "inline-block", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
