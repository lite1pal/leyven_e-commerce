import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";
import { type Product } from "@/types";

export default async function CategoryView({ params }: any) {
  const category = params.category;

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products?category=${category}`, {
    cache: "no-store",
  });
  const data: Product[] = await res.json();

  return (
    <>
      <Categories />
      <BasicBreadcrumbs />
      <CategoryHeader title={categories[category].name} />
      <CatalogView {...{ data }} />
    </>
  );
}
