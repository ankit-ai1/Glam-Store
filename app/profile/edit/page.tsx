"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { useAuth } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

const INPUT: React.CSSProperties = {
  width: "100%", padding: "13px 14px", border: "1.5px solid #e0d5f5",
  borderRadius: 10, fontSize: 14, outline: "none", background: "#fff",
  color: "#1a1a2e", boxSizing: "border-box", transition: "border 0.2s",
};
const LABEL: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 700, color: "#673ab7",
  marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em",
};

function EditContent() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(user?.avatar || "");
  const [form, setForm] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    gender: (user?.gender || "") as "male" | "female" | "other" | "",
    dob: user?.dob || "",
  });
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return setErr("Image size must be less than 5MB.");
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setErr("");
    if (!form.name.trim()) return setErr("Full name is required.");
    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) return setErr("Please enter a valid 10-digit mobile number.");
    if (!form.gender) return setErr("Please select your gender.");
    if (!form.dob) return setErr("Please enter your date of birth.");
    updateProfile({
      name: form.name,
      mobile: form.mobile,
      gender: form.gender as "male" | "female" | "other",
      dob: form.dob,
      ...(preview !== user?.avatar ? { avatar: preview } : {}),
    });
    setSaved(true);
    setTimeout(() => { setSaved(false); router.push("/profile"); }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a0a2e 0%,#673ab7 60%,#9c27b0 100%)", padding: "0 0 40px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 20px 0" }}>
          <button onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}>
            <ArrowLeft size={15} /> Back
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Edit Profile</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Update your profile details</p>
        </div>
        {/* Avatar */}
        <div style={{ maxWidth: 600, margin: "20px auto 0", padding: "0 20px" }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <img
                src={preview || user?.avatar}
                alt={user?.name}
                style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.4)", objectFit: "cover" }}
              />
              <div
                onClick={() => fileRef.current?.click()}
                title="Change photo"
                style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, background: "linear-gradient(135deg,#673ab7,#9c27b0)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
              >
                <Camera size={13} color="#fff" />
              </div>
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>{user?.name}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{user?.email}</p>
              <p
                onClick={() => fileRef.current?.click()}
                style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4, cursor: "pointer", textDecoration: "underline" }}
              >
                Tap to change photo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div style={{ maxWidth: 600, margin: "-20px auto 40px", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 24px rgba(103,58,183,0.10)" }}>

          <div style={{ marginBottom: 20 }}>
            <label style={LABEL}>Full Name *</label>
            <input style={INPUT} value={form.name} onChange={set("name")} placeholder="Poora naam" />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={LABEL}>Email Address</label>
            <input style={{ ...INPUT, background: "#f8f8f8", color: "#999", cursor: "not-allowed" }} value={user?.email || ""} readOnly />
            <p style={{ fontSize: 11, color: "#bbb", marginTop: 4 }}>Email cannot be changed</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={LABEL}>Mobile Number *</label>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ ...INPUT, width: "auto", padding: "13px 12px", background: "#f0eaf8", color: "#673ab7", fontWeight: 700, flexShrink: 0, display: "flex", alignItems: "center" }}>+91</span>
              <input style={INPUT} type="tel" maxLength={10} value={form.mobile} onChange={set("mobile")} placeholder="10 digit mobile" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={LABEL}>Gender *</label>
              <select style={INPUT} value={form.gender} onChange={set("gender")}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label style={LABEL}>Date of Birth *</label>
              <input style={INPUT} type="date" value={form.dob} onChange={set("dob")} max={new Date(Date.now() - 13 * 365.25 * 24 * 3600 * 1000).toISOString().split("T")[0]} />
            </div>
          </div>

          {err && (
            <div style={{ padding: "11px 14px", marginBottom: 16, background: "#fff0f0", border: "1px solid #ffb3b3", borderRadius: 8, color: "#c0392b", fontSize: 13, fontWeight: 600 }}>
              ⚠️ {err}
            </div>
          )}

          {saved && (
            <div style={{ padding: "11px 14px", marginBottom: 16, background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: 8, color: "#2e7d32", fontSize: 13, fontWeight: 600 }}>
              ✅ Profile saved successfully! Redirecting…
            </div>
          )}

          <button onClick={handleSave} style={{
            width: "100%", padding: "14px", background: "linear-gradient(90deg,#673ab7,#9c27b0)",
            color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <ProtectedRoute><EditContent /></ProtectedRoute>;
}
