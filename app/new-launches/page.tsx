import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "New Launches | Glam Store",
  description: "Be the first to shop the latest beauty arrivals and trending new products.",
  keywords: "new beauty products, new launches, latest arrivals, trending beauty",
  openGraph: {
    title: "New Launches | Glam Store",
    description: "Be the first to shop the latest beauty arrivals and trending new products.",
  },
};

export default function Page() {
  return <CategoryPage params={{ slug: ["new-launches"] }} />;
}
