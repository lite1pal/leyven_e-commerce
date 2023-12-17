import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/catalog/catalog";

export default async function Food({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const searchString = `&sorting=${sorting}`;
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products?category=food${searchString}`, {
    next: { revalidate: 1000 },
  });

  const data = await res.json();
  return (
    <>
      <CategoryHeader title="Годування домашніх тварин" />
      <CatalogView {...{ data }} />;
    </>
  );
}
