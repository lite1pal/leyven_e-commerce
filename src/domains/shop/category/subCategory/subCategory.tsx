import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import { type Product } from "@/types";

export default async function SubCategoryView({
  params,
}: {
  params: { category: string; subCategory: string };
}) {
  const category = params.category;
  const subCategory = params.subCategory;

  // gets products for the catalog
  const res = await fetch(
    `${API_URL}/products?category=${category}&subCategory=${subCategory}`,
    {
      cache: "no-store",
    },
  );
  const data: Product[] = await res.json();

  return (
    <>
      <BasicBreadcrumbs />
      <CategoryHeader
        title={categories[category].subCategories[subCategory].name}
      />
      <CatalogView {...{ data }} />
    </>
  );
}
