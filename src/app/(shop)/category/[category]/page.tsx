import CategoryView from "@/domains/shop/category/category";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";
import { categories } from "@/data/categories";
import { API_URL } from "@/config/api";

// export async function generateMetadata({ params }: any) {
//   const res = await fetch(`${API_URL}/categories`);
//   const categories = await res.json();

//   const category = categories.find(
//     (category: any) => category.categoryId === params.category.split("-")[0],
//   );

//   return {
//     title: category.title + " від інтернет-магазину ЛейВен!",
//   };
// }

export default async function Category({ params, searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <CategoryView {...{ params, searchParams }} />
    </Suspense>
  );
}
