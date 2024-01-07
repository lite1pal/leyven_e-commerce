import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import Catalog from "@/domains/shop/allProducts/components/catalog";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";

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
