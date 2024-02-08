import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";
import { type Product } from "@/types";
import Link from "next/link";
import { slugifyString } from "@/libs/utils";
import { ChildCategories } from "@/components/sections/childCategories";
import BreadcrumbsCategory from "@/components/sections/breadcrumbsCategory";

export default async function CategoryView({ params }: any) {
  const category = params.category;
  const categoryId = category.split("-")[0];

  // gets products for the catalog
  const res = await fetch(`${API_URL}/products?categoryId=${categoryId}`, {
    cache: "no-store",
  });
  const data: Product[] = await res.json();

  return (
    <>
      <BreadcrumbsCategory categoryId={categoryId} />
      <ChildCategories {...{ params }} />

      <CategoryHeader categoryId={categoryId} />
      <CatalogView {...{ data }} />
    </>
  );
}
