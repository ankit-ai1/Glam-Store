import Link from "next/link";
import "@/styles/pages.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-circle">G</div>
              <div>
                <div className="footer-logo-name">Glam Store</div>
                <div className="footer-logo-sub">Luxury Beauty</div>
              </div>
            </div>
            <p className="footer-desc">India's luxury beauty destination for premium skincare, makeup, haircare and wellness products.</p>
            <div className="footer-socials">
              {["f","t","in","yt"].map(s => <button key={s} className="footer-social-btn">{s}</button>)}
            </div>
          </div>

          <div>
            <p className="footer-col-title">Shop</p>
            {["Makeup","Skincare","Haircare","Fragrance","Bath & Body","Men's","Wellness","Nails","Appliances","Luxe"].map(item => (
              <Link key={item} href={`/${item.toLowerCase().replace(/ & /g,"-").replace("'","")}`} className="footer-link">{item}</Link>
            ))}
          </div>

          <div>
            <p className="footer-col-title">Support</p>
            {[["Track Order","/profile/orders"],["Returns & Refunds","/returns"],["FAQ","/faq"],["Contact Us","/contact"],["Beauty Blog","/beauty-blog"],["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([label, href]) => (
              <Link key={label} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

          <div>
            <p className="footer-col-title">Newsletter</p>
            <p className="footer-newsletter-sub">Get exclusive deals, new launches & beauty tips in your inbox.</p>
            <div className="footer-newsletter-form">
              <input type="email" placeholder="Your email address" className="footer-newsletter-input" />
              <button className="footer-newsletter-btn">Join</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Glam Store. All rights reserved.</p>
          <p className="footer-payments">VISA • MASTERCARD • UPI • PAYTM • COD</p>
        </div>
      </div>
    </footer>
  );
}
