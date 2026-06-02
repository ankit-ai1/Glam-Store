import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Bath & Body Care | Glam Store",
  description: "Luxurious bath and body products for complete self-care.",
  keywords: "body wash, body lotion, bath products, body butter",
  openGraph: {
    title: "Bath & Body Care | Glam Store",
    description: "Luxurious bath and body products for complete self-care.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["bath-body"] }} />;
}
