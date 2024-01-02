import MySpinner from "@/components/base/Spinner";
import Catalog from "@/components/catalog";
import CategoryHeader from "@/components/categoryHeader";
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
    <Suspense fallback={<MySpinner />}>
      <div className="bg-slate-100">
        <RelatedProducts header="Акційні пропозиції" />
        <Suspense>
          {/* <CarouselComponent /> */}
          <RelatedProducts header="Новинки" />
        </Suspense>
        <Suspense>
          <CategoryHeader title="Всі товари" />
          <Catalog {...{ data }} />
        </Suspense>
      </div>
    </Suspense>
  );
}
