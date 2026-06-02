import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Makeup | Glam Store",
  description: "Shop premium makeup products including foundation, lipstick, eyeshadow, and more.",
  keywords: "makeup, cosmetics, lipstick, foundation, eyeshadow",
  openGraph: {
    title: "Makeup | Glam Store",
    description: "Shop premium makeup products including foundation, lipstick, eyeshadow, and more.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["makeup"] }} />;
}
