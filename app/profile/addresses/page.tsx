"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, MapPin, Trash2, Edit2, Home, Briefcase } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Address {
  id: string; type: "home" | "work" | "other";
  name: string; mobile: string; line1: string;
  line2: string; city: string; state: string; pincode: string; isDefault: boolean;
}

const INPUT: React.CSSProperties = { width: "100%", padding: "11px 12px", border: "1.5px solid #e0d5f5", borderRadius: 9, fontSize: 13, outline: "none", background: "#faf8ff", boxSizing: "border-box" };
const LABEL: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, color: "#673ab7", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" };

function AddressContent() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form, setForm] = useState({ type: "home" as Address["type"], name: "", mobile: "", line1: "", line2: "", city: "", state: "", pincode: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    try { setAddresses(JSON.parse(localStorage.getItem("glam_addresses") || "[]")); } catch {}
  }, []);

  const save = (list: Address[]) => { setAddresses(list); localStorage.setItem("glam_addresses", JSON.stringify(list)); };

  const handleSubmit = () => {
    setErr("");
    if (!form.name || !form.mobile || !form.line1 || !form.city || !form.state || !form.pincode)
      return setErr("Please fill all required fields.");
    if (!/^\d{6}$/.test(form.pincode)) return setErr("Please enter a valid 6-digit pincode.");
    if (editing) {
      save(addresses.map(a => a.id === editing.id ? { ...editing, ...form } : a));
    } else {
      const newAddr: Address = { ...form, id: Date.now().toString(), isDefault: addresses.length === 0 };
      save([...addresses, newAddr]);
    }
    setShowForm(false); setEditing(null); setForm({ type: "home", name: "", mobile: "", line1: "", line2: "", city: "", state: "", pincode: "" });
  };

  const del = (id: string) => save(addresses.filter(a => a.id !== id));
  const setDefault = (id: string) => save(addresses.map(a => ({ ...a, isDefault: a.id === id })));

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#1565c0,#673ab7)", padding: "20px 20px 48px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <button onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
            <ArrowLeft size={15} /> Back
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>Saved Addresses</h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{addresses.length} address{addresses.length !== 1 ? "es" : ""} saved</p>
            </div>
            <button onClick={() => { setEditing(null); setShowForm(true); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              <Plus size={14} /> Add New
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "-28px auto 40px", padding: "0 20px" }}>
        {/* Address Form */}
        {showForm && (
          <div style={{ background: "#fff", borderRadius: 20, padding: "24px", marginBottom: 16, boxShadow: "0 4px 24px rgba(103,58,183,0.12)" }}>
            <h3 style={{ fontWeight: 800, fontSize: 16, color: "#1a1a2e", marginBottom: 16 }}>{editing ? "Edit Address" : "Add New Address"}</h3>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {(["home","work","other"] as Address["type"][]).map(t => (
                <button key={t} onClick={() => setForm(f => ({...f, type: t}))} style={{ flex: 1, padding: "9px", border: `1.5px solid ${form.type===t?"#673ab7":"#e0d5f5"}`, borderRadius: 9, background: form.type===t?"#f0eaf8":"#fff", color: form.type===t?"#673ab7":"#888", fontWeight: 700, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>
                  {t==="home"?<Home size={13}/>:t==="work"?<Briefcase size={13}/>:"📍"} {t}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div><label style={LABEL}>Full Name *</label><input style={INPUT} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Full name" /></div>
              <div><label style={LABEL}>Mobile *</label><input style={INPUT} type="tel" maxLength={10} value={form.mobile} onChange={e=>setForm(f=>({...f,mobile:e.target.value}))} placeholder="10 digit" /></div>
            </div>
            <div style={{ marginBottom: 12 }}><label style={LABEL}>Address Line 1 *</label><input style={INPUT} value={form.line1} onChange={e=>setForm(f=>({...f,line1:e.target.value}))} placeholder="House / flat no., society" /></div>
            <div style={{ marginBottom: 12 }}><label style={LABEL}>Address Line 2</label><input style={INPUT} value={form.line2} onChange={e=>setForm(f=>({...f,line2:e.target.value}))} placeholder="Area, landmark" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div><label style={LABEL}>City *</label><input style={INPUT} value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} placeholder="City" /></div>
              <div><label style={LABEL}>State *</label><input style={INPUT} value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value}))} placeholder="State" /></div>
              <div><label style={LABEL}>Pincode *</label><input style={INPUT} maxLength={6} value={form.pincode} onChange={e=>setForm(f=>({...f,pincode:e.target.value}))} placeholder="000000" /></div>
            </div>

            {err && <div style={{ padding: "10px", marginBottom: 12, background: "#fff0f0", borderRadius: 8, color: "#c0392b", fontSize: 12, fontWeight: 600 }}>⚠️ {err}</div>}

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleSubmit} style={{ flex: 1, padding: "12px", background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Save Address</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ padding: "12px 20px", background: "#f5f0ff", border: "1.5px solid #e0d5f5", borderRadius: 10, color: "#673ab7", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Address List */}
        {addresses.length === 0 && !showForm ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: "48px 24px", textAlign: "center", boxShadow: "0 2px 12px rgba(103,58,183,0.08)" }}>
            <MapPin size={48} color="#e0d5f5" style={{ margin: "0 auto 16px" }} />
            <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>No addresses saved yet</p>
            <p style={{ fontSize: 13, color: "#aaa", marginBottom: 20 }}>Add your first delivery address to get started</p>
            <button onClick={() => setShowForm(true)} style={{ background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", border: "none", borderRadius: 999, padding: "11px 28px", fontWeight: 700, cursor: "pointer" }}>
              + Add Address
            </button>
          </div>
        ) : (
          addresses.map(a => (
            <div key={a.id} style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", marginBottom: 12, boxShadow: "0 2px 12px rgba(103,58,183,0.07)", border: a.isDefault ? "1.5px solid #673ab7" : "1.5px solid #f0eaf8" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ background: "#f0eaf8", color: "#673ab7", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{a.type}</span>
                  {a.isDefault && <span style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>Default</span>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setEditing(a); setForm({type:a.type,name:a.name,mobile:a.mobile,line1:a.line1,line2:a.line2,city:a.city,state:a.state,pincode:a.pincode}); setShowForm(true); }} style={{ padding: "6px", background: "#f0eaf8", border: "none", borderRadius: 8, cursor: "pointer" }}><Edit2 size={14} color="#673ab7" /></button>
                  <button onClick={() => del(a.id)} style={{ padding: "6px", background: "#fff0f0", border: "none", borderRadius: 8, cursor: "pointer" }}><Trash2 size={14} color="#e91e8c" /></button>
                </div>
              </div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{a.name} | {a.mobile}</p>
              <p style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{a.line1}{a.line2 ? ", " + a.line2 : ""}, {a.city}, {a.state} - {a.pincode}</p>
              {!a.isDefault && <button onClick={() => setDefault(a.id)} style={{ marginTop: 10, background: "none", border: "1.5px solid #673ab7", color: "#673ab7", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Set as Default</button>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return <ProtectedRoute><AddressContent /></ProtectedRoute>;
}
