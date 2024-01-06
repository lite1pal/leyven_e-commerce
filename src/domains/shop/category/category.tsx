import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Categories from "@/components/categories";

export default async function CategoryView({ params }: any) {
  const category = params.category;

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products?category=${category}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <>
      <Categories />
      <BasicBreadcrumbs {...{ data }} />
      <CategoryHeader title={categories[category].name} />
      <CatalogView {...{ data }} />
    </>
  );
}
