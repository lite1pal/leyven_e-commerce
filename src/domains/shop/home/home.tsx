import Catalog from "@/domains/shop/allProducts/components/catalog";
import Categories from "@/components/sections/categories";
import CategoryHeader from "@/components/base/CategoryHeader";
import DiscountProducts from "@/components/sections/discountProducts";
import RelatedProducts from "@/components/sections/relatedProducts";
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
