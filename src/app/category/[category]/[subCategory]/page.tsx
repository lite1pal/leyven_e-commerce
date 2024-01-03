import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import SubCategoryView from "@/domains/category/subCategory/subCategory";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";

export default async function SubCategory({ params, searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <SubCategoryView {...{ params, searchParams }} />
    </Suspense>
  );
}
