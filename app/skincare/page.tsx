import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Skincare Products | Glam Store",
  description: "Premium skincare collection for all skin types and concerns.",
  keywords: "skincare, face care, serum, moisturizer, sunscreen",
  openGraph: {
    title: "Skincare Products | Glam Store",
    description: "Premium skincare collection for all skin types and concerns.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["skincare"] }} />;
}
