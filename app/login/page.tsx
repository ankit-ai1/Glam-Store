"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import "@/styles/pages.css";

type Step = "form" | "otp";
type Tab = "signin" | "register";

const INPUT: React.CSSProperties = {
  width: "100%", padding: "12px 14px", border: "1.5px solid #e0d5f5",
  borderRadius: 10, fontSize: 14, outline: "none", background: "#faf8ff",
  color: "#1a1a2e", boxSizing: "border-box",
};
const LABEL: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 700, color: "#555",
  marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em",
};
const FIELD = { marginBottom: 16 };

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sendOTP, verifyOTPAndLogin, verifyOTPAndRegister, isAuthenticated, isLoading, pendingOTP } = useAuth();

  const [tab, setTab] = useState<Tab>("signin");
  const [step, setStep] = useState<Step>("form");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", mobile: "",
    gender: "" as "male" | "female" | "other" | "",
    dob: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(searchParams.get("redirect") || "/");
    }
  }, [isAuthenticated, isLoading]);

  // Reset step when tab changes
  useEffect(() => { setStep("form"); setErr(""); setOtp(""); }, [tab]);

  const handleSendOTP = async () => {
    setErr("");
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return setErr("Please enter a valid email address.");
    if (tab === "register") {
      if (!form.name.trim()) return setErr("Full name is required.");
      if (!form.mobile || !/^\d{10}$/.test(form.mobile)) return setErr("Please enter a valid 10-digit mobile number.");
      if (!form.gender) return setErr("Please select your gender.");
      if (!form.dob) return setErr("Please enter your date of birth.");
    }
    setBusy(true);
    try {
      await sendOTP(form.email);
      setStep("otp");
    } catch (e: any) { setErr(e.message); }
    setBusy(false);
  };

  const handleVerify = async () => {
    setErr("");
    if (!otp || otp.length !== 6) return setErr("Please enter the 6-digit OTP.");
    setBusy(true);
    try {
      if (tab === "signin") {
        await verifyOTPAndLogin(form.email, otp);
      } else {
        await verifyOTPAndRegister(
          { name: form.name, email: form.email, mobile: form.mobile, gender: form.gender as "male" | "female" | "other", dob: form.dob },
          otp
        );
      }
      router.push(searchParams.get("redirect") || "/");
    } catch (e: any) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <div className="login-page">
      <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1800&q=80" alt="" className="login-bg" />
      <div className="login-overlay" />
      <div className="login-layout">
        {/* Left hero */}
        <div className="login-hero">
          <span className="login-hero-label">Luxury Beauty</span>
          <h1 className="login-hero-title">Your Beauty<br />Journey Starts Here</h1>
          <p className="login-hero-desc">Premium skincare, makeup and wellness curated for your luxurious self-care experience.</p>
          <div className="login-hero-features">
            {[["✦ Curated Collections","Handpicked products from world's finest brands."],["✦ Exclusive Rewards","Members enjoy private drops, points & free shipping."]].map(([t,d])=>(
              <div key={t}><p className="login-feature-title">{t}</p><p className="login-feature-desc">{d}</p></div>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div className="login-card">
          <p className="login-card-store-name">✦ Glam Store</p>
          <h2 className="login-card-title">{step === "otp" ? "Verify Your Email" : "Welcome Back"}</h2>
          <p className="login-card-sub">{step === "otp" ? `OTP sent to: ${form.email}` : "Sign in or create a new account via OTP."}</p>

          {step === "form" && (
            <>
              {/* Tabs */}
              <div className="login-tabs">
                {(["signin","register"] as Tab[]).map(t => (
                  <button key={t} className={`login-tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>
                    {t==="signin" ? "Sign In" : "Register"}
                  </button>
                ))}
              </div>

              {tab==="register" && (
                <div style={FIELD}>
                  <label style={LABEL}>Full Name *</label>
                  <input style={INPUT} value={form.name} onChange={set("name")} placeholder="Apna poora naam" disabled={busy} />
                </div>
              )}

              <div style={FIELD}>
                <label style={LABEL}>Email Address *</label>
                <input style={INPUT} type="email" value={form.email} onChange={set("email")} placeholder="example@email.com" disabled={busy} />
              </div>

              {tab==="register" && (
                <>
                  <div style={FIELD}>
                    <label style={LABEL}>Mobile Number *</label>
                    <div style={{display:"flex",gap:8}}>
                      <span style={{...INPUT,width:"auto",padding:"12px 10px",background:"#f0eaf8",color:"#673ab7",fontWeight:700,flexShrink:0}}>+91</span>
                      <input style={{...INPUT}} type="tel" maxLength={10} value={form.mobile} onChange={set("mobile")} placeholder="10 digit mobile" disabled={busy} />
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                    <div>
                      <label style={LABEL}>Gender *</label>
                      <select style={INPUT} value={form.gender} onChange={set("gender")} disabled={busy}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={LABEL}>Date of Birth *</label>
                      <input style={INPUT} type="date" value={form.dob} onChange={set("dob")} max={new Date(Date.now()-18*365.25*24*3600*1000).toISOString().split("T")[0]} disabled={busy} />
                    </div>
                  </div>
                </>
              )}

              {err && <ErrBox msg={err} />}

              <button onClick={handleSendOTP} disabled={busy} style={{
                width:"100%",padding:"14px",background:"linear-gradient(90deg,#673ab7,#9c27b0)",
                color:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:15,
                cursor:busy?"not-allowed":"pointer",opacity:busy?0.7:1,marginTop:4,
              }}>
                {busy ? "Sending…" : "Send OTP 📧"}
              </button>

              <p style={{textAlign:"center",fontSize:12,color:"#aaa",marginTop:16}}>
                By continuing, you agree to our <a href="#" style={{color:"#673ab7"}}>Terms</a> & <a href="#" style={{color:"#673ab7"}}>Privacy Policy</a>
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              {/* Demo OTP display */}
              {pendingOTP && (
                <div style={{
                  background:"linear-gradient(135deg,#f0eaf8,#e8f5e9)",
                  border:"1.5px dashed #673ab7",borderRadius:12,
                  padding:"14px 18px",marginBottom:20,textAlign:"center",
                }}>
                  <p style={{fontSize:11,fontWeight:700,color:"#673ab7",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>
                    🔒 Demo Mode — Actual app mein email aata
                  </p>
                  <p style={{fontSize:28,fontWeight:900,letterSpacing:"0.2em",color:"#1a1a2e"}}>{pendingOTP}</p>
                  <p style={{fontSize:11,color:"#888",marginTop:2}}>Enter this OTP below</p>
                </div>
              )}

              <div style={FIELD}>
                <label style={LABEL}>6-Digit OTP *</label>
                <input
                  style={{...INPUT,fontSize:24,letterSpacing:"0.3em",textAlign:"center",fontWeight:700}}
                  maxLength={6} value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g,""))}
                  placeholder="••••••" disabled={busy}
                  autoFocus
                />
              </div>

              {err && <ErrBox msg={err} />}

              <button onClick={handleVerify} disabled={busy} style={{
                width:"100%",padding:"14px",background:"linear-gradient(90deg,#673ab7,#9c27b0)",
                color:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:15,
                cursor:busy?"not-allowed":"pointer",opacity:busy?0.7:1,
              }}>
                {busy ? "Verifying…" : (tab==="signin" ? "Sign In ✓" : "Create Account ✓")}
              </button>

              <button onClick={() => { setStep("form"); setErr(""); setOtp(""); }}
                style={{width:"100%",marginTop:10,padding:"10px",background:"none",border:"1.5px solid #e0d5f5",borderRadius:12,color:"#673ab7",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                ← Go Back
              </button>

              <button onClick={handleSendOTP} disabled={busy}
                style={{display:"block",margin:"12px auto 0",background:"none",border:"none",color:"#aaa",fontSize:12,cursor:"pointer",textDecoration:"underline"}}>
                Resend OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrBox({ msg }: { msg: string }) {
  return (
    <div style={{padding:"11px 14px",marginBottom:14,background:"#fff0f0",border:"1px solid #ffb3b3",borderRadius:8,color:"#c0392b",fontSize:13,fontWeight:600}}>
      ⚠️ {msg}
    </div>
  );
}
