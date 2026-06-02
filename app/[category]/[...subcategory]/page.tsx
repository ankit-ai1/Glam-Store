import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.join(" / ").replace(/-/g, " ");

  return {
    title: `${categoryName} | Glam Store`,
    description: `Shop our collection of ${categoryName} products at Glam Store.`,
  };
}

export default function Page({ params }: Props) {
  return <CategoryPage params={params} />;
}
