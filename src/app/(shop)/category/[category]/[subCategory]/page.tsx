import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import SubCategoryView from "@/domains/shop/category/subCategory/subCategory";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";

export async function generateMetadata({ params }: any) {
  return {
    title:
      categories[params.category].subCategories[params.subCategory].name +
      " від інтернет-магазину ЛейВен",
  };
}

export default async function SubCategory({ params, searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <SubCategoryView {...{ params, searchParams }} />
    </Suspense>
  );
}
