import Catalog from "../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";
import { auth } from "./api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import CategoryHeader from "@/components/categoryHeader";
import { revalidatePath } from "next/cache";

export default async function HomeScreen({ searchParams }: any) {
  const sorting = searchParams.sorting;
  const page = searchParams.page;
  const searchString = `?sorting=${sorting}&page=${page}`;

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products${searchString}`, {
    next: { revalidate: 1000 },
  });
  const data = await res.json();

  console.log(data);

  return (
    <div className="bg-slate-100">
      <CarouselComponent />
      <CategoryHeader title="Всі товари" />
      <Catalog {...{ data }} />
    </div>
  );
}
