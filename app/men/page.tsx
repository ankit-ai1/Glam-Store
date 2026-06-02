import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Men's Grooming | Glam Store",
  description: "Premium grooming products for men including beard care, shaving, and skincare.",
  keywords: "men grooming, beard care, shaving products, men skincare",
  openGraph: {
    title: "Men's Grooming | Glam Store",
    description: "Premium grooming products for men including beard care, shaving, and skincare.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["men"] }} />;
}
