import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Deals & Offers | Glam Store",
  description: "Exclusive discounts, flash sales, and combo deals on top beauty products.",
  keywords: "beauty offers, discounts, flash sale, combo deals, beauty coupons",
  openGraph: {
    title: "Deals & Offers | Glam Store",
    description: "Exclusive discounts, flash sales, and combo deals on top beauty products.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["offers"] }} />;
}
