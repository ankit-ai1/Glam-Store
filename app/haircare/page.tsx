import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Haircare Products | Glam Store",
  description: "Complete haircare range including shampoo, conditioner, oils, and treatments.",
  keywords: "haircare, shampoo, conditioner, hair oil, hair mask",
  openGraph: {
    title: "Haircare Products | Glam Store",
    description: "Complete haircare range including shampoo, conditioner, oils, and treatments.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["haircare"] }} />;
}
