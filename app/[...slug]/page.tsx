import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategoryMetadata } from "@/lib/categories";

interface Props {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.join("/");
  const metadata = getCategoryMetadata(path);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [metadata.banner],
    },
  };
}

export default function Page({ params }: Props) {
  return <CategoryPage params={params} />;
}
