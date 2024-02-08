import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import Catalog from "@/components/catalog";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";
import { type Product } from "@/types";
import { ParentCategories } from "@/components/sections/parentCategories";

export default async function AllProductsView() {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  const data: Product[] = await res.json();
  return (
    <>
      <ParentCategories />
      <div className={`px-4 font-sans text-3xl font-medium text-slate-900`}>
        Каталог
      </div>
      <Catalog {...{ data }} />
    </>
  );
}
