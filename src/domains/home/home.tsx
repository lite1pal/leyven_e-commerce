import MySpinner from "@/components/base/Spinner";
import Catalog from "@/components/catalog";
import Categories from "@/components/categories";
import CategoryHeader from "@/components/categoryHeader";
import DiscountProducts from "@/components/discountProducts";
import RelatedProducts from "@/components/relatedProducts";
import { API_URL } from "@/config/api";
import { Suspense } from "react";

export default async function HomeView({ searchParams }: any) {
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
    <div>
      {/* <CarouselComponent /> */}
      <DiscountProducts header="Акційні пропозиції" />
      <RelatedProducts header="Новинки" />
      <Categories />
      <CategoryHeader title="Всі товари" />
      <Suspense>
        <Catalog {...{ data }} />
      </Suspense>
    </div>
  );
}