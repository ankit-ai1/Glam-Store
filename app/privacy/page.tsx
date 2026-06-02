export default function PrivacyPage() {
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 12, letterSpacing: "-0.02em" }}>{title}</h2>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.9 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#673ab7)", padding: "56px 20px 64px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 10 }}>Last updated: June 2025</p>
      </div>

      <div style={{ maxWidth: 800, margin: "-28px auto 60px", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 24px rgba(103,58,183,0.09)" }}>

          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.85, marginBottom: 32, padding: "16px 20px", background: "#f5f0ff", borderRadius: 12, borderLeft: "4px solid #673ab7" }}>
            At Glam Store, we respect your privacy and are committed to protecting your personal information. This policy explains what we collect, how we use it, and your rights.
          </p>

          <S title="1. Information We Collect">
            <p><strong>Account Information:</strong> When you register, we collect your name, email address, phone number, date of birth, and gender.</p>
            <p style={{ marginTop: 10 }}><strong>Order Information:</strong> Delivery addresses, purchase history, payment method type (we never store full card numbers), and order status.</p>
            <p style={{ marginTop: 10 }}><strong>Usage Data:</strong> Pages visited, products viewed, search queries, and session duration — collected via cookies to improve your experience.</p>
            <p style={{ marginTop: 10 }}><strong>Device Information:</strong> Browser type, IP address, and operating system for security and performance purposes.</p>
          </S>

          <S title="2. How We Use Your Information">
            <ul style={{ paddingLeft: 20 }}>
              {["Process and fulfil your orders","Send order confirmations, shipping updates, and invoices","Personalise product recommendations","Send promotional offers (only if you've opted in)","Improve our website and app experience","Detect and prevent fraud or security breaches","Comply with legal obligations"].map(i => (
                <li key={i} style={{ marginBottom: 6 }}>{i}</li>
              ))}
            </ul>
          </S>

          <S title="3. Sharing Your Information">
            <p>We do <strong>not</strong> sell your personal data. We share information only with:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              {["Delivery partners (name, address, phone) to fulfil orders","Payment processors (encrypted transaction data only)","Analytics providers (anonymised usage data)","Legal authorities when required by law"].map(i => (
                <li key={i} style={{ marginBottom: 6 }}>{i}</li>
              ))}
            </ul>
          </S>

          <S title="4. Cookies & Tracking">
            <p>We use cookies to remember your login session, cart contents, and preferences. You can disable cookies in your browser settings, though some features may not function correctly. We also use Google Analytics and similar tools to understand how visitors use our website.</p>
          </S>

          <S title="5. Data Security">
            <p>All data is transmitted using 256-bit SSL encryption. We are PCI DSS compliant for payment processing. We never store full card numbers — only tokenised references. Our systems are regularly audited for security vulnerabilities.</p>
          </S>

          <S title="6. Your Rights">
            <ul style={{ paddingLeft: 20 }}>
              {["Access your personal data","Correct inaccurate information","Request deletion of your account and data","Opt out of marketing communications at any time","Request data portability"].map(i => (
                <li key={i} style={{ marginBottom: 6 }}>{i}</li>
              ))}
            </ul>
            <p style={{ marginTop: 10 }}>To exercise these rights, email us at privacy@glamstore.in.</p>
          </S>

          <S title="7. Data Retention">
            <p>We retain your data for as long as your account is active or as needed to provide services. Order records are retained for 7 years to comply with tax and legal requirements. You may request deletion of non-legal data at any time.</p>
          </S>

          <S title="8. Children's Privacy">
            <p>Our services are not directed at individuals under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us immediately.</p>
          </S>

          <S title="9. Changes to This Policy">
            <p>We may update this Privacy Policy periodically. We'll notify you via email or a prominent notice on our website at least 30 days before material changes take effect. Continued use of our services after changes constitutes acceptance.</p>
          </S>

          <div style={{ background: "#f5f0ff", borderRadius: 14, padding: "18px 20px", marginTop: 8 }}>
            <p style={{ fontSize: 14, color: "#555" }}>
              <strong>Questions?</strong> Contact our Privacy Officer at{" "}
              <a href="mailto:privacy@glamstore.in" style={{ color: "#673ab7", fontWeight: 600 }}>privacy@glamstore.in</a>
              {" "}or write to us at Glam Store India Pvt. Ltd., Bengaluru, Karnataka — 560001.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
