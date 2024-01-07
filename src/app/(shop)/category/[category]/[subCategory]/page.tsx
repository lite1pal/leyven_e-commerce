import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/shop/allProducts/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import SubCategoryView from "@/domains/shop/category/subCategory/subCategory";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";

export async function generateMetadata({ params }: any) {
  return {
    title:
      categories[params.category].subCategories[params.subCategory].name +
      " від інтернет-магазину ЛейВен! ціни від 16 грн",
  };
}

export default async function SubCategory({ params, searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <SubCategoryView {...{ params, searchParams }} />
    </Suspense>
  );
}
