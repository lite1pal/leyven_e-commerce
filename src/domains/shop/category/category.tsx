import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/shop/allProducts/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";

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
