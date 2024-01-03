import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/catalog/catalog";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Categories from "@/components/categories";
import { Suspense } from "react";
import MySpinner from "@/components/base/Spinner";

export default async function CatalogScreen({ searchParams }: any) {
  return (
    <Suspense fallback={<MySpinner />}>
      <CatalogView {...{ searchParams }} />
    </Suspense>
  );
}
