export default function TermsPage() {
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 12, letterSpacing: "-0.02em" }}>{title}</h2>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.9 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0ff" }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#37474f,#673ab7)", padding: "56px 20px 64px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 10 }}>Last updated: June 2025 · Effective immediately</p>
      </div>

      <div style={{ maxWidth: 800, margin: "-28px auto 60px", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 24px rgba(103,58,183,0.09)" }}>

          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.85, marginBottom: 32, padding: "16px 20px", background: "#f5f0ff", borderRadius: 12, borderLeft: "4px solid #673ab7" }}>
            By accessing or using Glam Store, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
          </p>

          <S title="1. Acceptance of Terms">
            <p>By creating an account or making a purchase on Glam Store, you agree to these Terms of Service, our Privacy Policy, and all applicable laws. If you do not agree, please do not use our services.</p>
          </S>

          <S title="2. Eligibility">
            <p>You must be at least 18 years old (or have parental consent) to use Glam Store. By using our services, you represent that you meet this requirement. We reserve the right to refuse service to anyone for any reason.</p>
          </S>

          <S title="3. Account Responsibilities">
            <ul style={{ paddingLeft: 20 }}>
              {["You are responsible for maintaining the confidentiality of your account credentials","You must provide accurate and current information during registration","You must promptly update any changes to your information","You are responsible for all activity that occurs under your account","Notify us immediately if you suspect unauthorised access"].map(i => <li key={i} style={{ marginBottom: 6 }}>{i}</li>)}
            </ul>
          </S>

          <S title="4. Products & Pricing">
            <p>We reserve the right to modify product listings, prices, and availability at any time without notice. Prices are inclusive of GST unless stated otherwise. We make every effort to display accurate product images and descriptions, but cannot guarantee that your device's screen accurately represents colours.</p>
            <p style={{ marginTop: 10 }}>In the event of a pricing error, we will notify you before fulfilling your order and give you the option to proceed at the correct price or cancel your order.</p>
          </S>

          <S title="5. Orders & Payment">
            <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel orders that we suspect are fraudulent or violate these terms. Payment must be received in full before orders are dispatched.</p>
          </S>

          <S title="6. Intellectual Property">
            <p>All content on Glam Store — including logos, product images, text, and software — is the property of Glam Store India Pvt. Ltd. or its content suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </S>

          <S title="7. Prohibited Activities">
            <ul style={{ paddingLeft: 20 }}>
              {["Using our services for any unlawful purpose","Attempting to gain unauthorised access to our systems","Scraping, crawling, or extracting data from our platform","Posting false, misleading, or fraudulent reviews","Reselling products purchased at discounted rates","Interfering with or disrupting our services"].map(i => <li key={i} style={{ marginBottom: 6 }}>{i}</li>)}
            </ul>
          </S>

          <S title="8. Limitation of Liability">
            <p>Glam Store shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability to you for any claim shall not exceed the amount paid by you for the specific product or service that is the subject of the claim.</p>
          </S>

          <S title="9. Governing Law">
            <p>These terms are governed by the laws of India. Any disputes arising from these terms or your use of Glam Store shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</p>
          </S>

          <S title="10. Changes to Terms">
            <p>We may update these terms at any time. We will notify you of significant changes via email or a prominent notice on our website. Continued use of our services after the effective date of changes constitutes your acceptance of the updated terms.</p>
          </S>

          <div style={{ background: "#f5f0ff", borderRadius: 14, padding: "18px 20px", marginTop: 8 }}>
            <p style={{ fontSize: 14, color: "#555" }}>
              <strong>Questions about these terms?</strong> Email us at{" "}
              <a href="mailto:legal@glamstore.in" style={{ color: "#673ab7", fontWeight: 600 }}>legal@glamstore.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
