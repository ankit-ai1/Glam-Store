import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import {
  getPageTitle,
  getDescription,
  findSubcategory,
  findCategory,
} from "@/src/data/navigation";

interface Props {
  params: { category: string; subcategory: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = params.category;
  const subcategory = params.subcategory;
  const subcategoryItem = findSubcategory(category, subcategory);
  const categoryItem = findCategory(category);

  return {
    title: getPageTitle(category, subcategory),
    description: getDescription(category, subcategory),
    openGraph: {
      title: getPageTitle(category, subcategory),
      description: getDescription(category, subcategory),
      images: [
        subcategoryItem?.description
          ? "https://images.unsplash.com/photo-1512207857060-7f410ceac27c?auto=format&fit=crop&w=1200&q=80"
          : categoryItem?.description
          ? "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
          : "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  };
}

export default function Page({ params }: Props) {
  return <CategoryPage params={{ slug: [params.category, params.subcategory] }} />;
}
