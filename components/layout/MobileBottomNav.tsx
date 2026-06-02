"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Tag, Heart, User } from "lucide-react";
import { useCart } from "@/lib/cart";

const tabs = [
  { href: "/",            icon: Home,      label: "Home" },
  { href: "/makeup",      icon: Grid3X3,   label: "Categories" },
  { href: "/offers",      icon: Tag,       label: "Offers" },
  { href: "/wishlist",    icon: Heart,     label: "Wishlist" },
  { href: "/profile",     icon: User,      label: "Profile" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { state } = useCart();

  return (
    <nav style={{
      display: "none",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      background: "#fff",
      borderTop: "1px solid #f0eaf8",
      zIndex: 500,
      boxShadow: "0 -4px 20px rgba(103,58,183,0.1)",
    }} className="mobile-bottom-nav">
      {tabs.map(({ href, icon: Icon, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        const badge = label === "Wishlist" ? state.wishlist.length : 0;
        return (
          <Link key={href} href={href} style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            textDecoration: "none",
            color: active ? "#673ab7" : "#aaa",
            position: "relative",
            paddingTop: active ? 0 : 2,
          }}>
            {active && (
              <span style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 32,
                height: 3,
                background: "linear-gradient(90deg,#673ab7,#9c27b0)",
                borderRadius: "0 0 4px 4px",
              }} />
            )}
            <span style={{ position: "relative" }}>
              <Icon size={20} fill={active ? "#673ab7" : "none"} strokeWidth={active ? 2.5 : 1.8} />
              {badge > 0 && (
                <span style={{
                  position: "absolute", top: -5, right: -7,
                  background: "#e91e8c", color: "#fff",
                  fontSize: 9, fontWeight: 800,
                  borderRadius: "50%", width: 15, height: 15,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {badge}
                </span>
              )}
            </span>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
