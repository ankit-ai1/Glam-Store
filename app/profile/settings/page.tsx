"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Globe, Moon, Trash2, Lock, ChevronRight, LogOut, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} style={{ width: 48, height: 26, borderRadius: 99, border: "none", background: on ? "linear-gradient(90deg,#673ab7,#9c27b0)" : "#e0e0e0", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.25s" }}>
      <span style={{ position: "absolute", top: 3, left: on ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", marginBottom: 16, boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#673ab7", padding: "14px 20px 10px", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #f5f0ff" }}>{title}</p>
      {children}
    </div>
  );
}

function Row({ icon: Icon, label, sub, right, onClick, danger }: { icon: any; label: string; sub?: string; right?: React.ReactNode; onClick?: () => void; danger?: boolean }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 20px", borderBottom: "1px solid #f5f0ff", cursor: onClick ? "pointer" : "default" }}>
      <div style={{ width: 38, height: 38, background: danger ? "#fff0f0" : "#f5f0ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={17} color={danger ? "#e91e8c" : "#673ab7"} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: danger ? "#e91e8c" : "#1a1a2e" }}>{label}</p>
        {sub && <p style={{ fontSize: 12, color: "#aaa", marginTop: 1 }}>{sub}</p>}
      </div>
      {right || (onClick && <ChevronRight size={16} color="#ccc" />)}
    </div>
  );
}

function SettingsContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    localStorage.removeItem("glam_store_auth");
    localStorage.removeItem("glam_store_users");
    logout();
    router.push("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#37474f,#546e7a)", padding: "20px 20px 48px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <button onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
            <ArrowLeft size={15} /> Back
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>Account Settings</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Privacy, security aur app preferences</p>
          <div style={{ marginTop: 16, background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <img src={user?.avatar} alt="" style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)" }} />
            <div>
              <p style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{user?.name}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: "-28px auto 40px", padding: "0 20px" }}>

        <Section title="Appearance">
          <Row icon={Moon} label="Dark Mode" sub="Switch app to dark theme" right={<Toggle on={darkMode} onToggle={() => setDarkMode(d => !d)} />} />
          <Row icon={Globe} label="Language" sub="Choose your app language" right={
            <select value={lang} onChange={e => setLang(e.target.value)} style={{ border: "1.5px solid #e0d5f5", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "#673ab7", fontWeight: 700, background: "#f5f0ff", cursor: "pointer", outline: "none" }}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          } />
        </Section>

        <Section title="Security">
          <Row icon={Lock} label="Change Password" sub="Reset your password via OTP" onClick={() => router.push("/login")} />
          <Row icon={Lock} label="Two-Factor Auth" sub="Ek extra layer of security" right={<Toggle on={true} onToggle={() => {}} />} />
        </Section>

        <Section title="Privacy">
          <Row icon={Globe} label="Profile Visibility" sub="Sirf aap dekh sakte ho" right={<span style={{ fontSize: 12, fontWeight: 700, color: "#673ab7", background: "#f0eaf8", borderRadius: 99, padding: "4px 12px" }}>Private</span>} />
          <div style={{ padding: "13px 20px", borderBottom: "1px solid #f5f0ff" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 8 }}>Data Sharing</p>
            {[["Share analytics data","Share usage data to improve the app"],["Personalized ads","Show beauty product ads based on your interests"]].map(([lbl, sub]) => (
              <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div><p style={{ fontSize: 13, color: "#444", fontWeight: 600 }}>{lbl}</p><p style={{ fontSize: 11, color: "#aaa" }}>{sub}</p></div>
                <Toggle on={true} onToggle={() => {}} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="About">
          {[["App Version","1.0.0",""],["Terms of Service","","chevron"],["Privacy Policy","","chevron"],["Help & Support","","chevron"]].map(([lbl,val,type])=>(
            <div key={lbl} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:"1px solid #f5f0ff",cursor:type==="chevron"?"pointer":"default" }}>
              <p style={{ fontWeight:600,fontSize:14,color:"#444" }}>{lbl}</p>
              {val ? <p style={{ fontSize:13,color:"#aaa" }}>{val}</p> : <ChevronRight size={16} color="#ccc" />}
            </div>
          ))}
        </Section>

        {/* Logout */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", marginBottom: 16, boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
          <div onClick={() => { logout(); router.push("/"); }} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, background: "#fff3e0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogOut size={17} color="#e65100" />
            </div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#e65100" }}>Logout</p>
          </div>
        </div>

        {/* Delete Account */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(103,58,183,0.07)" }}>
          <div onClick={() => setShowDelete(true)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, background: "#fff0f0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Trash2 size={17} color="#c0392b" />
            </div>
            <div><p style={{ fontWeight: 700, fontSize: 14, color: "#c0392b" }}>Delete Account</p><p style={{ fontSize: 12, color: "#aaa" }}>This action cannot be undone</p></div>
          </div>
        </div>

        {showDelete && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", maxWidth: 360, width: "100%", textAlign: "center" }}>
              <AlertTriangle size={44} color="#c0392b" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontWeight: 900, fontSize: 18, color: "#1a1a2e", marginBottom: 8 }}>Account Delete Karo?</h3>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 24, lineHeight: 1.6 }}>Once deleted, all your data will be permanently removed and cannot be recovered. Are you sure?</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowDelete(false)} style={{ flex: 1, padding: "12px", border: "1.5px solid #e0d5f5", borderRadius: 10, background: "#fff", color: "#673ab7", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleDelete} style={{ flex: 1, padding: "12px", background: "#c0392b", border: "none", borderRadius: 10, color: "#fff", fontWeight: 800, cursor: "pointer" }}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return <ProtectedRoute><SettingsContent /></ProtectedRoute>;
}
