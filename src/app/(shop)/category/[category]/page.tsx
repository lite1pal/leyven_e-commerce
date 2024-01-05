import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Categories from "@/components/categories";
import CategoryView from "@/domains/shop/category/category";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";

export default async function Category({ params, searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <CategoryView {...{ params, searchParams }} />
    </Suspense>
  );
}
