import CategoryMeetis from "@/src/features/meetis/components/CategoryMeetis";
import { categoryService } from "@/src/features/meetis/services/CategoryService";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import { cache } from "react";

const getCategoryCached = cache(async (id: string) => {
  return await categoryService.getCategoryById(id);
});

export async function generateMetadata({
  params,
}: PageProps<"/categories/[id]">): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryCached(id);
  return {
    title: generatePageTitle(`Categoria: ${category.name}`),
  };
}
export default async function CategoryPage({
  params,
}: PageProps<"/categories/[id]">) {
  const { id } = await params;
  const category = await getCategoryCached(id);

  return (
    <main className="max-w-7xl mx-auto px-5 lg:px-0 py-10">
      <Heading>{category.name}</Heading>
      <CategoryMeetis categoryId={category.id} />
    </main>
  );
}
