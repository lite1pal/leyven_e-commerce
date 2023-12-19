import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/catalog/catalog";

export default async function Veterynarny({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const page = searchParams.page;
  const searchString = `&sorting=${sorting}&page=${page}`;

  // gets products for the catalog
  const res = await fetch(
    `${API_URL}/products?category=veterynarny${searchString}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return (
    <>
      <CategoryHeader title="Ветеринарні засоби" />
      <CatalogView {...{ data }} />;
    </>
  );
}
