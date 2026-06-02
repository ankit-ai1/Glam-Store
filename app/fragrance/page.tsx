import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Fragrance & Perfume | Glam Store",
  description: "Browse our collection of perfumes, body mists, and premium attars.",
  keywords: "perfume, fragrance, body mist, attar, deodorant",
  openGraph: {
    title: "Fragrance & Perfume | Glam Store",
    description: "Browse our collection of perfumes, body mists, and premium attars.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["fragrance"] }} />;
}
