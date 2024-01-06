import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import Catalog from "@/components/catalog";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Categories from "@/components/categories";

export default async function AllProductsView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <>
      <Categories />
      <BasicBreadcrumbs {...{ data }} />
      <CategoryHeader title="Каталог" />
      <Catalog {...{ data }} />
    </>
  );
}
