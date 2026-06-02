import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import "@/styles/home.css";

export default function Page() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <span className="section-label">Style & Advice</span>
        <h1 className="section-title">Beauty Blog</h1>
        <div className="section-bar section-bar-center" />
        <p className="section-subtitle">Expert tips, trends and tutorials from our beauty editors.</p>
      </div>
      <div className="blog-grid">
        {BLOG_POSTS.map(p => (
          <Link key={p.id} href={`/beauty-blog/${p.slug}`} className="blog-card">
            <img src={p.img} alt={p.title} className="blog-img" />
            <div className="blog-body">
              <span className="blog-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-meta">&#9201; {p.read} read</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
