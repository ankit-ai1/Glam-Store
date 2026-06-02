import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Top Beauty Brands | Glam Store",
  description: "Shop from 100+ premium beauty brands — L'Oréal, MAC, Huda Beauty & more.",
  keywords: "beauty brands, loreal, mac, huda beauty, lakme, maybelline",
  openGraph: {
    title: "Top Beauty Brands | Glam Store",
    description: "Shop from 100+ premium beauty brands — L'Oréal, MAC, Huda Beauty & more.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["brands"] }} />;
}
