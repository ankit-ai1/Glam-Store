"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, ChevronRight, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

const ORDERS = [
  { id: "GS4K9X2M", date: "20 May 2025", status: "Delivered",  items: ["Vitamin C Serum 20%", "SPF 50 Sunscreen"],   total: 648, icon: CheckCircle, statusColor: "#2e7d32", statusBg: "#e8f5e9" },
  { id: "GS7A3LMN", date: "15 May 2025", status: "Processing", items: ["Matte Liquid Lipstick"],                      total: 299, icon: Clock,        statusColor: "#e65100", statusBg: "#fff3e0" },
  { id: "GS9B1XRP", date: "10 May 2025", status: "Shipped",    items: ["Naked Eyeshadow Palette", "Lip Balm SPF 30"], total: 1398, icon: Truck,       statusColor: "#1565c0", statusBg: "#e3f2fd" },
  { id: "GS2C8WZQ", date: "02 May 2025", status: "Cancelled",  items: ["Onion Shampoo 300ml"],                        total: 299, icon: XCircle,      statusColor: "#c62828", statusBg: "#ffebee" },
];

const STEP_MAP: Record<string, number> = { "Processing": 1, "Shipped": 2, "Delivered": 3, "Cancelled": 0 };

function OrdersContent() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#673ab7,#e91e8c)", padding: "20px 20px 48px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <button onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
            <ArrowLeft size={15} /> Back
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>My Orders</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{ORDERS.length} orders placed so far</p>
          <div style={{ display: "flex", gap: 10, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
            {["All","Active","Delivered","Cancelled"].map(f => (
              <button key={f} style={{ flexShrink: 0, padding: "7px 16px", borderRadius: 999, border: "none", background: f==="All"?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.15)", color: f==="All"?"#673ab7":"#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "-28px auto 40px", padding: "0 20px" }}>
        {ORDERS.map(o => {
          const StatusIcon = o.icon;
          const step = STEP_MAP[o.status];
          return (
            <div key={o.id} style={{ background: "#fff", borderRadius: 20, padding: "20px", marginBottom: 14, boxShadow: "0 2px 12px rgba(103,58,183,0.08)", border: "1px solid #f0eaf8" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e" }}>Order #{o.id}</p>
                  <p style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>Placed on {o.date}</p>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, background: o.statusBg, color: o.statusColor, borderRadius: 999, padding: "5px 12px" }}>
                  <StatusIcon size={12} /> {o.status}
                </span>
              </div>

              {/* Products */}
              <div style={{ background: "#f9f7ff", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
                {o.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: i > 0 ? "8px 0 0" : "0" }}>
                    <Package size={14} color="#b39ddb" />
                    <p style={{ fontSize: 13, color: "#444", fontWeight: 500 }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar (only for non-cancelled) */}
              {o.status !== "Cancelled" && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    {["Ordered","Processing","Shipped","Delivered"].map((s, i) => (
                      <div key={s} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: i < step ? "#673ab7" : i === step ? "#9c27b0" : "#e0d5f5", margin: "0 auto 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {i < step && <CheckCircle size={12} color="#fff" />}
                        </div>
                        <p style={{ fontSize: 10, color: i <= step ? "#673ab7" : "#bbb", fontWeight: i <= step ? 700 : 400 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 3, background: "#f0eaf8", borderRadius: 99, position: "relative" }}>
                    <div style={{ height: "100%", width: `${(step / 3) * 100}%`, background: "linear-gradient(90deg,#673ab7,#9c27b0)", borderRadius: 99, transition: "width 0.5s" }} />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontWeight: 900, fontSize: 16, color: "#1a1a2e" }}>₹{o.total.toLocaleString("en-IN")}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {o.status === "Delivered" && (
                    <button style={{ padding: "7px 14px", background: "#f0eaf8", border: "none", borderRadius: 8, color: "#673ab7", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Rate & Review</button>
                  )}
                  <button style={{ padding: "7px 14px", background: "linear-gradient(90deg,#673ab7,#9c27b0)", border: "none", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    Details <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty state CTA */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 20px", textAlign: "center", boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
          <p style={{ fontSize: 13, color: "#aaa", marginBottom: 12 }}>Discover more products</p>
          <Link href="/" style={{ display: "inline-block", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "11px 28px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <ProtectedRoute><OrdersContent /></ProtectedRoute>;
}
