import CategoryView from "@/domains/shop/category/category";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";
import { categories } from "@/data/categories";

export async function generateMetadata({ params }: any) {
  return {
    title:
      categories[params.category].name +
      " від інтернет-магазину ЛейВен! ціни від 16 грн",
  };
}

export default async function Category({ params, searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <CategoryView {...{ params, searchParams }} />
    </Suspense>
  );
}
