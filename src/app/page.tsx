import Catalog from "../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "./api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import CategoryHeader from "@/components/categoryHeader";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { products } from "@/data";

export default async function HomeScreen({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const page = searchParams.page;
  const searchString = `?sorting=${sorting}&page=${page}`;

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products${searchString}`, {
    cache: "no-store",
  });
  const data = await res.json();

  const countriesOfManufacture = products.map(
    (product: any) =>
      product.info.filter(
        (i: any) => i["g:attribute_name"]._text === "Країна виробник"
      )[0]
  );
  console.log(
    new Set(
      countriesOfManufacture.map((country) => {
        if (country) {
          return country["g:attribute_value"]._text;
        }
        return "Німеччина";
      })
    )
  );

  return (
    <div className="bg-slate-100">
      <CarouselComponent />
      <CategoryHeader title="Всі товари" />
      <Catalog {...{ data }} />
    </div>
  );
}
