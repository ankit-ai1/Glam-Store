"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Plus, Trash2, Shield, CheckCircle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const UPIS = [
  { id: "u1", id_str: "ankit@paytm", provider: "Paytm", color: "#00BAF2" },
  { id: "u2", id_str: "ankit@gpay",  provider: "Google Pay", color: "#4285F4" },
];
const CARDS = [
  { id: "c1", last4: "4242", brand: "VISA",       exp: "12/27", name: "Ankit Kumar", color: "linear-gradient(135deg,#1565c0,#673ab7)" },
  { id: "c2", last4: "5353", brand: "MASTERCARD", exp: "08/26", name: "Ankit Kumar", color: "linear-gradient(135deg,#880e4f,#e91e8c)" },
];

function PaymentContent() {
  const router = useRouter();
  const [cards, setCards] = useState(CARDS);
  const [upis, setUpis] = useState(UPIS);
  const [addCard, setAddCard] = useState(false);
  const [addUpi, setAddUpi] = useState(false);
  const [upiInput, setUpiInput] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      {toast && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "#1a1a2e", color: "#fff", padding: "12px 24px", borderRadius: 99, fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
          ✅ {toast}
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#880e4f,#9c27b0)", padding: "20px 20px 48px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <button onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
            <ArrowLeft size={15} /> Back
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>Payment Methods</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Manage your saved cards and UPI IDs</p>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", flex: 1, textAlign: "center" }}>
              <Shield size={20} color="rgba(255,255,255,0.7)" style={{ margin: "0 auto 4px" }} />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>256-bit SSL</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", flex: 1, textAlign: "center" }}>
              <CheckCircle size={20} color="rgba(255,255,255,0.7)" style={{ margin: "0 auto 4px" }} />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>PCI DSS Safe</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "-28px auto 40px", padding: "0 20px" }}>

        {/* Saved Cards */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 2px 12px rgba(103,58,183,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e" }}>💳 Saved Cards</h3>
            <button onClick={() => setAddCard(a => !a)} style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0eaf8", border: "none", color: "#673ab7", borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              <Plus size={12} /> Add Card
            </button>
          </div>

          {addCard && (
            <div style={{ background: "#f9f7ff", border: "1.5px dashed #b39ddb", borderRadius: 12, padding: "16px", marginBottom: 14 }}>
              <p style={{ fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 10 }}>Enter card details (demo)</p>
              {[["Card Number","card-number","**** **** **** ****"],["Cardholder Name","name","Your name"],["Expiry","expiry","MM/YY"],["CVV","cvv","•••"]].map(([lbl,k,ph])=>(
                <input key={k} placeholder={ph as string} style={{ width:"100%",padding:"10px 12px",border:"1.5px solid #e0d5f5",borderRadius:8,fontSize:13,marginBottom:8,outline:"none",boxSizing:"border-box" as any }} />
              ))}
              <button onClick={() => { setAddCard(false); showToast("Card add ho gayi!"); }} style={{ width:"100%",padding:"10px",background:"linear-gradient(90deg,#673ab7,#9c27b0)",color:"#fff",border:"none",borderRadius:9,fontWeight:700,cursor:"pointer" }}>
                Save Card
              </button>
            </div>
          )}

          {cards.map(c => (
            <div key={c.id} style={{ background: c.color, borderRadius: 14, padding: "16px 18px", marginBottom: 10, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: "rgba(255,255,255,0.06)", borderRadius: "50%" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <CreditCard size={28} color="rgba(255,255,255,0.8)" />
                <button onClick={() => { setCards(cards.filter(x => x.id !== c.id)); showToast("Card remove ho gayi"); }} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "5px 8px", cursor: "pointer" }}>
                  <Trash2 size={13} color="#fff" />
                </button>
              </div>
              <p style={{ fontSize: 17, letterSpacing: "0.18em", color: "#fff", fontWeight: 600, margin: "12px 0 6px" }}>•••• •••• •••• {c.last4}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{c.name}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{c.brand} · {c.exp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* UPI */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 2px 12px rgba(103,58,183,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e" }}>📱 UPI IDs</h3>
            <button onClick={() => setAddUpi(a => !a)} style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0eaf8", border: "none", color: "#673ab7", borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              <Plus size={12} /> Add UPI
            </button>
          </div>

          {addUpi && (
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <input value={upiInput} onChange={e => setUpiInput(e.target.value)} placeholder="yourname@upi" style={{ flex: 1, padding: "10px 12px", border: "1.5px solid #e0d5f5", borderRadius: 9, fontSize: 13, outline: "none" }} />
              <button onClick={() => { if (upiInput) { setUpis([...upis, { id: Date.now().toString(), id_str: upiInput, provider: "UPI", color: "#673ab7" }]); setUpiInput(""); setAddUpi(false); showToast("UPI add ho gayi!"); } }} style={{ padding: "10px 16px", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", border: "none", borderRadius: 9, fontWeight: 700, cursor: "pointer" }}>Add</button>
            </div>
          )}

          {upis.map(u => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 14px", background: "#f9f7ff", borderRadius: 12, marginBottom: 8, border: "1px solid #e0d5f5" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: u.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff" }}>{u.provider[0]}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{u.id_str}</p>
                  <p style={{ fontSize: 11, color: "#aaa" }}>{u.provider}</p>
                </div>
              </div>
              <button onClick={() => { setUpis(upis.filter(x => x.id !== u.id)); showToast("UPI remove ho gayi"); }} style={{ background: "#fff0f0", border: "none", borderRadius: 8, padding: "6px 9px", cursor: "pointer" }}>
                <Trash2 size={13} color="#e91e8c" />
              </button>
            </div>
          ))}
        </div>

        {/* COD */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 12px rgba(103,58,183,0.08)", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, background: "#fff3e0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💵</div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>Cash on Delivery</p>
            <p style={{ fontSize: 12, color: "#aaa" }}>Pay with cash at the time of delivery</p>
          </div>
          <span style={{ marginLeft: "auto", background: "#e8f5e9", color: "#2e7d32", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>Available</span>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <ProtectedRoute><PaymentContent /></ProtectedRoute>;
}
