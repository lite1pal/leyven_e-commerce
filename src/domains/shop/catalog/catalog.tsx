import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import Catalog from "@/components/catalog";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Categories from "@/components/categories";

export default async function CatalogView({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const page = searchParams.page;
  const inStock = searchParams.instock;
  const searchString = `?sorting=${sorting}&page=${page}&instock=${inStock}`;

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products${searchString}`, {
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
