import Catalog from "@/components/catalog";
import Categories from "@/components/categories";
import CategoryHeader from "@/components/categoryHeader";
import DiscountProducts from "@/components/discountProducts";
import RelatedProducts from "@/components/relatedProducts";
import { API_URL } from "@/config/api";
import { Suspense } from "react";

export default async function HomeView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      {/* <CarouselComponent /> */}
      <DiscountProducts header="Акційні пропозиції" />
      <RelatedProducts header="Новинки" />
      <Categories />
      <CategoryHeader title="Вибір товарів" />
      <Suspense>
        <Catalog {...{ data }} />
      </Suspense>
    </div>
  );
}
