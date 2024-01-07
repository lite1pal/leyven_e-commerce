import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/shop/allProducts/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";

export default async function SubCategoryView({ params, searchParams }: any) {
  const category = params.category;
  const subCategory = params.subCategory;

  // gets products for the catalog
  const res = await fetch(
    `${API_URL}/products?category=${category}&subCategory=${subCategory}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();

  return (
    <>
      <BasicBreadcrumbs {...{ data }} />
      <CategoryHeader
        title={categories[category].subCategories[subCategory].name}
      />
      <CatalogView {...{ data }} />
    </>
  );
}
