import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import Catalog from "@/components/catalog";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";
import { type Product } from "@/types";

export default async function AllProductsView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  const data: Product[] = await res.json();
  return (
    <>
      <Categories />
      <BasicBreadcrumbs />
      <CategoryHeader title="Каталог" />
      <Catalog {...{ data }} />
    </>
  );
}
