import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import {
  getPageTitle,
  getDescription,
  findCategory,
} from "@/src/data/navigation";

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = params.category;
  const categoryItem = findCategory(category);

  return {
    title: getPageTitle(category),
    description: getDescription(category),
    openGraph: {
      title: getPageTitle(category),
      description: getDescription(category),
      images: [
        categoryItem?.description
          ? "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
          : "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  };
}

export default function Page({ params }: Props) {
  return <CategoryPage params={{ slug: [params.category] }} />;
}
