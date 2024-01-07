import Catalog from "@/components/catalog";
import Categories from "@/components/sections/categories";
import CategoryHeader from "@/components/base/CategoryHeader";
import DiscountProducts from "@/components/sections/discountProducts";
import RelatedProducts from "@/components/sections/relatedProducts";
import { API_URL } from "@/config/api";
import { Suspense } from "react";
import { type Product } from "@/types";
import SectionHeader from "@/components/base/SectionHeader";

export default async function HomeView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  const data: Product[] = await res.json();

  return (
    <>
      <DiscountProducts header="Акційні пропозиції" />
      <RelatedProducts header="Новинки" />
      <Categories />
      <CategoryHeader title="Вибір товарів" />
      <Suspense>
        <Catalog {...{ data }} />
      </Suspense>
    </>
  );
}
