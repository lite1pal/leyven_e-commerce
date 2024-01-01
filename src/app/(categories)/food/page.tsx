import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";

export default async function Food({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const page = searchParams.page;
  const inStock = searchParams.instock;
  const searchString = `&sorting=${sorting}&page=${page}&instock=${inStock}`;

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products?category=food${searchString}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <>
      <CategoryHeader title="Годування домашніх тварин" />
      <CatalogView {...{ data }} />;
    </>
  );
}
