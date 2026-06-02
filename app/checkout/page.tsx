"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import ProtectedRoute from "@/components/ProtectedRoute";

type AddrKey = "name" | "phone" | "pincode" | "city" | "addressState" | "address";

const LABELS: Record<AddrKey, string> = {
  name: "Full Name", phone: "Phone Number", pincode: "Pincode",
  city: "City", addressState: "State", address: "Full Address",
};
const PLACEHOLDERS: Record<AddrKey, string> = {
  name: "Your full name", phone: "10-digit mobile number", pincode: "6-digit pincode",
  city: "Your city", addressState: "Your state", address: "House no, street, area, landmark",
};

const INPUT: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e0d5f5",
  outline: "none", fontSize: 13, boxSizing: "border-box", background: "#faf8ff", color: "#1a1a2e",
};
const LABEL: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700, color: "#673ab7",
  marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em",
};

function CheckoutContent() {
  const router = useRouter();
  const { state, cartTotal, dispatch } = useCart();
  const [step, setStep] = useState(0);
  const [addr, setAddr] = useState<Record<AddrKey, string>>({
    name: "", phone: "", pincode: "", city: "", addressState: "", address: "",
  });
  const [pay, setPay] = useState("upi");
  const [errs, setErrs] = useState<Partial<Record<AddrKey, string>>>({});

  const delivery = cartTotal > 499 ? 0 : 79;
  const total = cartTotal + delivery;

  const inp = (k: AddrKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setAddr(p => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<Record<AddrKey, string>> = {};
    if (!addr.name.trim())                          e.name = "Name is required";
    if (!/^\d{10}$/.test(addr.phone))               e.phone = "Enter valid 10-digit number";
    if (!/^\d{6}$/.test(addr.pincode))              e.pincode = "Enter valid 6-digit pincode";
    if (!addr.city.trim())                          e.city = "City is required";
    if (!addr.addressState.trim())                  e.addressState = "State is required";
    if (!addr.address.trim())                       e.address = "Address is required";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => { dispatch({ type: "CLEAR" }); router.push("/order-success"); };

  const CARD: React.CSSProperties = {
    background: "#fff", borderRadius: 20, border: "1px solid #f0eaf8",
    padding: 24, boxShadow: "0 2px 14px rgba(103,58,183,0.07)",
  };

  return (
    <div style={{ background: "#f5f0ff", minHeight: "100vh", padding: "32px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#1a1a2e", marginBottom: 20 }}>Checkout</h1>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          {["Delivery Address", "Payment"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step >= i ? "linear-gradient(135deg,#673ab7,#9c27b0)" : "#e0d5f5",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: step >= i ? "#fff" : "#aaa", fontWeight: 800, fontSize: 12,
              }}>{step > i ? "✓" : i + 1}</div>
              <span style={{ fontSize: 13, fontWeight: step === i ? 700 : 500, color: step === i ? "#673ab7" : "#999" }}>{s}</span>
              {i < 1 && <div style={{ width: 32, height: 2, background: step > 0 ? "#673ab7" : "#e0d5f5", borderRadius: 2 }} />}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(0,310px)", gap: 20, alignItems: "start" }}>
          <div>
            {/* Step 0 — Address */}
            {step === 0 && (
              <div style={CARD}>
                <h2 style={{ fontWeight: 800, fontSize: 17, color: "#1a1a2e", marginBottom: 20 }}>Delivery Address</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {(["name", "phone", "pincode", "city", "addressState"] as AddrKey[]).map(f => (
                    <div key={f}>
                      <label style={LABEL}>{LABELS[f]} *</label>
                      <input
                        style={{ ...INPUT, borderColor: errs[f] ? "#e91e8c" : "#e0d5f5" }}
                        type={f === "phone" || f === "pincode" ? "tel" : "text"}
                        maxLength={f === "phone" ? 10 : f === "pincode" ? 6 : undefined}
                        value={addr[f]}
                        onChange={inp(f)}
                        placeholder={PLACEHOLDERS[f]}
                      />
                      {errs[f] && <p style={{ color: "#e91e8c", fontSize: 11, marginTop: 3 }}>{errs[f]}</p>}
                    </div>
                  ))}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={LABEL}>{LABELS.address} *</label>
                    <textarea
                      rows={2}
                      style={{ ...INPUT, resize: "none", borderColor: errs.address ? "#e91e8c" : "#e0d5f5" } as React.CSSProperties}
                      value={addr.address}
                      onChange={inp("address")}
                      placeholder={PLACEHOLDERS.address}
                    />
                    {errs.address && <p style={{ color: "#e91e8c", fontSize: 11, marginTop: 3 }}>{errs.address}</p>}
                  </div>
                </div>
                <button
                  onClick={() => { if (validate()) setStep(1); }}
                  style={{ marginTop: 20, background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "13px 32px", fontWeight: 800, border: "none", cursor: "pointer", fontSize: 14 }}
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 1 — Payment */}
            {step === 1 && (
              <div style={CARD}>
                <h2 style={{ fontWeight: 800, fontSize: 17, color: "#1a1a2e", marginBottom: 20 }}>Payment Method</h2>
                {[
                  ["upi",  "📱 UPI / GPay / PhonePe",    "Pay via any UPI app instantly"],
                  ["card", "💳 Credit / Debit Card",      "Visa, Mastercard, RuPay accepted"],
                  ["cod",  "💵 Cash on Delivery",         "Pay when your order arrives"],
                ].map(([v, l, sub]) => (
                  <label key={v} style={{
                    display: "flex", gap: 14, padding: "14px 16px", borderRadius: 14,
                    border: `2px solid ${pay === v ? "#673ab7" : "#f0eaf8"}`,
                    marginBottom: 10, cursor: "pointer",
                    background: pay === v ? "#faf5ff" : "#fff", alignItems: "center",
                  }}>
                    <input type="radio" value={v} checked={pay === v} onChange={() => setPay(v)} style={{ accentColor: "#673ab7" }} />
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{l}</p>
                      <p style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{sub}</p>
                    </div>
                  </label>
                ))}

                {/* Address recap */}
                <div style={{ background: "#f9f7ff", borderRadius: 12, padding: "12px 14px", marginTop: 16, border: "1px solid #e0d5f5" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#673ab7", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Delivering to</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{addr.name} · {addr.phone}</p>
                  <p style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{addr.address}, {addr.city}, {addr.addressState} — {addr.pincode}</p>
                  <button onClick={() => setStep(0)} style={{ background: "none", border: "none", color: "#673ab7", fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 6, padding: 0 }}>
                    ✏️ Change Address
                  </button>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button onClick={() => setStep(0)} style={{ padding: "12px 22px", borderRadius: 999, border: "1.5px solid #673ab7", color: "#673ab7", fontWeight: 700, background: "#fff", cursor: "pointer", fontSize: 13 }}>
                    ← Back
                  </button>
                  <button onClick={placeOrder} style={{ flex: 1, background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "13px", fontWeight: 800, border: "none", cursor: "pointer", fontSize: 14 }}>
                    Place Order · ₹{total}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary sidebar */}
          <div style={CARD}>
            <h3 style={{ fontWeight: 800, marginBottom: 14, color: "#1a1a2e", fontSize: 15 }}>
              Order Summary · {state.items.length} item{state.items.length !== 1 ? "s" : ""}
            </h3>
            <div style={{ maxHeight: 240, overflowY: "auto", marginBottom: 14 }}>
              {state.items.map(i => (
                <div key={i.id} style={{ display: "flex", gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #f5f0ff" }}>
                  <img src={i.img} alt={i.name} style={{ width: 50, height: 50, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "#673ab7", textTransform: "uppercase" }}>{i.brand}</p>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>{i.name}</p>
                    <p style={{ fontSize: 12, color: "#673ab7", fontWeight: 700, marginTop: 2 }}>₹{i.price} × {i.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #f0eaf8", paddingTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 6 }}>
                <span>Subtotal</span><span>₹{cartTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10, color: delivery === 0 ? "#2e7d32" : "#666" }}>
                <span>Delivery</span><span style={{ fontWeight: 600 }}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 17, color: "#1a1a2e", paddingTop: 10, borderTop: "1px solid #f0eaf8" }}>
                <span>Total</span><span>₹{total}</span>
              </div>
              {delivery > 0 && (
                <p style={{ fontSize: 11, color: "#888", marginTop: 8, textAlign: "center", background: "#f5f0ff", padding: "6px 10px", borderRadius: 8 }}>
                  Add ₹{499 - cartTotal} more for FREE delivery
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <ProtectedRoute><CheckoutContent /></ProtectedRoute>;
}
