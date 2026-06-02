"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setBusy(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setBusy(false);
  };

  const INPUT: React.CSSProperties = {
    width: "100%", padding: "12px 14px", border: "1.5px solid #e0d5f5",
    borderRadius: 10, fontSize: 14, outline: "none", background: "#faf8ff",
    color: "#1a1a2e", boxSizing: "border-box",
  };
  const LABEL: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 700, color: "#673ab7",
    marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#673ab7,#9c27b0)", padding: "56px 20px 64px", textAlign: "center" }}>
        <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", borderRadius: 999, fontSize: 10, fontWeight: 700, padding: "4px 14px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Get In Touch</span>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: "#fff", marginTop: 14, letterSpacing: "-0.03em" }}>Contact Us</h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 10, maxWidth: 480, margin: "10px auto 0" }}>
          Have a question, suggestion, or need help? We're here for you 24/7.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "-32px auto 60px", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>
        {/* Contact form */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 24px rgba(103,58,183,0.09)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 24 }}>Send us a Message</h2>

          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <CheckCircle size={56} color="#2e7d32" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: "#888", marginBottom: 24 }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                style={{ background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", border: "none", borderRadius: 999, padding: "11px 28px", fontWeight: 700, cursor: "pointer" }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={LABEL}>Your Name *</label>
                  <input style={INPUT} value={form.name} onChange={set("name")} placeholder="Full name" required />
                </div>
                <div>
                  <label style={LABEL}>Email Address *</label>
                  <input style={INPUT} type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" required />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={LABEL}>Subject</label>
                <select style={INPUT} value={form.subject} onChange={set("subject")}>
                  <option value="">Select a topic</option>
                  <option>Order Issue</option>
                  <option>Return / Refund</option>
                  <option>Product Query</option>
                  <option>Account Help</option>
                  <option>Partnership / Media</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={LABEL}>Message *</label>
                <textarea style={{ ...INPUT, resize: "vertical" } as React.CSSProperties} rows={5} value={form.message} onChange={set("message")} placeholder="How can we help you?" required />
              </div>
              <button type="submit" disabled={busy} style={{ width: "100%", padding: "14px", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Send size={16} /> {busy ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: Mail, color: "#673ab7", bg: "#f0eaf8", title: "Email Us", lines: ["support@glamstore.in", "business@glamstore.in"] },
            { icon: Phone, color: "#1565c0", bg: "#e3f2fd", title: "Call Us", lines: ["1800-123-4567 (Toll Free)", "Mon–Sat, 9am–6pm"] },
            { icon: MapPin, color: "#e91e8c", bg: "#fce4ec", title: "Our Office", lines: ["Glam Store India Pvt. Ltd.", "Bengaluru, Karnataka — 560001"] },
            { icon: Clock, color: "#e65100", bg: "#fff3e0", title: "Support Hours", lines: ["Mon–Fri: 9am – 8pm IST", "Sat–Sun: 10am – 6pm IST"] },
          ].map(({ icon: Icon, color, bg, title, lines }) => (
            <div key={title} style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 10px rgba(103,58,183,0.07)", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 4 }}>{title}</p>
                {lines.map(l => <p key={l} style={{ fontSize: 13, color: "#666" }}>{l}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
