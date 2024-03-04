import CategoryHeader from "@/components/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog/catalog";
import { type Product } from "@/types";
import { ChildCategories } from "@/components/sections/childCategories";
import BreadcrumbsCategory from "@/components/breadcrumbs";

export default async function CategoryView({ params }: any) {
  const category = params.category;
  const categoryId = category.split("-")[0];

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products?categoryId=${categoryId}`, {
    next: { revalidate: 360 },
  });
  const data: Product[] = await res.json();

  return (
    <>
      <BreadcrumbsCategory categoryId={categoryId} />
      <ChildCategories {...{ params }} />
      <CategoryHeader categoryId={categoryId} />

      <CatalogView {...{ data }} />
    </>
  );
}
