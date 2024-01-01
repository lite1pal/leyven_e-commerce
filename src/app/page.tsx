import Catalog from "../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "./api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import CategoryHeader from "@/components/categoryHeader";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { products } from "@/data";
import RelatedProducts from "@/components/relatedProducts";
import { Toaster } from "react-hot-toast";

export default async function HomeScreen({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const page = searchParams.page;
  const inStock = searchParams.instock;
  const searchString = `?sorting=${sorting}&page=${page}&instock=${inStock}`;

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products${searchString}`, {
    cache: "no-store",
  });
  const data = await res.json();

  const countriesOfManufacture = products.map(
    (product: any) =>
      product.info.filter(
        (i: any) => i["g:attribute_name"]._text === "Країна виробник",
      )[0],
  );

  return (
    <div className="bg-slate-100">
      <Suspense>
        <RelatedProducts header="Акційні пропозиції" />
        <Suspense>
          {/* <CarouselComponent /> */}
          <RelatedProducts header="Новинки" />
        </Suspense>
        <Suspense>
          <CategoryHeader title="Всі товари" />
          <Catalog {...{ data }} />
        </Suspense>
      </Suspense>
    </div>
  );
}
