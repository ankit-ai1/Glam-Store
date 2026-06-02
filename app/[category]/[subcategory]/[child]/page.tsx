import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import {
  getPageTitle,
  getDescription,
} from "@/src/data/navigation";

interface Props {
  params: { category: string; subcategory: string; child: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = params.category;
  const subcategory = params.subcategory;
  const child = params.child;

  return {
    title: getPageTitle(category, subcategory, child),
    description: getDescription(category, subcategory, child),
    openGraph: {
      title: getPageTitle(category, subcategory, child),
      description: getDescription(category, subcategory, child),
      images: [
        "https://images.unsplash.com/photo-1512207857060-7f410ceac27c?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  };
}

export default function Page({ params }: Props) {
  return <CategoryPage params={{ slug: [params.category, params.subcategory, params.child] }} />;
}
