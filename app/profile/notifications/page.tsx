"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const NOTIFS = [
  { key: "order_updates",   emoji: "📦", title: "Order Updates",       sub: "Shipping, delivery & return updates" },
  { key: "offers",          emoji: "🔥", title: "Offers & Deals",      sub: "Flash sales, coupons & exclusive discounts" },
  { key: "new_launches",    emoji: "✨", title: "New Launches",         sub: "Be first to know about new products" },
  { key: "wishlist_alerts", emoji: "❤️", title: "Wishlist Alerts",      sub: "Price drops on wishlist items" },
  { key: "beauty_tips",     emoji: "💄", title: "Beauty Tips & Blog",   sub: "Skincare routines & makeup tutorials" },
  { key: "points",          emoji: "⭐", title: "Glamour Points",        sub: "Points earned, redeemed & expiry alerts" },
  { key: "sms",             emoji: "💬", title: "SMS Notifications",    sub: "Receive updates via SMS" },
  { key: "whatsapp",        emoji: "📱", title: "WhatsApp Alerts",      sub: "Order & offer updates on WhatsApp" },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} style={{
      width: 48, height: 26, borderRadius: 99, border: "none",
      background: on ? "linear-gradient(90deg,#673ab7,#9c27b0)" : "#e0e0e0",
      position: "relative", cursor: "pointer", flexShrink: 0,
      transition: "background 0.25s",
    }}>
      <span style={{
        position: "absolute", top: 3, left: on ? 25 : 3,
        width: 20, height: 20, borderRadius: "50%", background: "#fff",
        transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

function NotifsContent() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("glam_notif_prefs") || "{}");
      const defaults: Record<string, boolean> = {};
      NOTIFS.forEach(n => { defaults[n.key] = stored[n.key] !== undefined ? stored[n.key] : true; });
      setPrefs(defaults);
    } catch {
      const defaults: Record<string, boolean> = {};
      NOTIFS.forEach(n => { defaults[n.key] = true; });
      setPrefs(defaults);
    }
  }, []);

  const toggle = (key: string) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const savePrefs = () => {
    localStorage.setItem("glam_notif_prefs", JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const enableAll = () => {
    const all: Record<string, boolean> = {};
    NOTIFS.forEach(n => { all[n.key] = true; });
    setPrefs(all);
  };
  const disableAll = () => {
    const none: Record<string, boolean> = {};
    NOTIFS.forEach(n => { none[n.key] = false; });
    setPrefs(none);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#2e7d32,#388e3c)", padding: "20px 20px 48px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <button onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
            <ArrowLeft size={15} /> Back
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>Notifications</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Choose which notifications you want to receive</p>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={enableAll} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 999, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✓ Enable All</button>
            <button onClick={disableAll} style={{ background: "rgba(255,255,255,0.10)", border: "none", color: "rgba(255,255,255,0.7)", borderRadius: 999, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>✕ Disable All</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: "-28px auto 40px", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(103,58,183,0.08)" }}>
          {NOTIFS.map((n, i) => (
            <div key={n.key} style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", borderBottom: i < NOTIFS.length - 1 ? "1px solid #f5f0ff" : "none" }}>
              <div style={{ width: 42, height: 42, background: "#f5f0ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{n.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 2 }}>{n.title}</p>
                <p style={{ fontSize: 12, color: "#aaa" }}>{n.sub}</p>
              </div>
              <Toggle on={!!prefs[n.key]} onToggle={() => toggle(n.key)} />
            </div>
          ))}
        </div>

        {saved && (
          <div style={{ margin: "16px 0", padding: "13px", background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: 12, color: "#2e7d32", fontSize: 13, fontWeight: 600, textAlign: "center" }}>
            ✅ Preferences save ho gayi!
          </div>
        )}

        <button onClick={savePrefs} style={{ width: "100%", marginTop: 16, padding: "14px", background: "linear-gradient(90deg,#2e7d32,#43a047)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return <ProtectedRoute><NotifsContent /></ProtectedRoute>;
}
