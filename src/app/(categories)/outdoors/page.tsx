import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/catalog/catalog";

export default async function Outdoors({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const searchString = `&sorting=${sorting}`;
  // gets products for the catalog
  const res = await fetch(
    `${API_URL}/products?category=outdoors${searchString}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return (
    <>
      <CategoryHeader title="Товари для прогулянок та подорожей з домашніми тваринами" />
      <CatalogView {...{ data }} />;
    </>
  );
}
