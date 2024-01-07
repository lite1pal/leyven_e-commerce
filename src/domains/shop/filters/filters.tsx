import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/shop/allProducts/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";

export default async function FiltersView({ params }: any) {
  const { category, subCategory, filters } = params;

  const queryString = `${category ? `&category=${category}` : ""}${
    subCategory ? `&subCategory=${subCategory}` : ""
  }${filters ? `&filters=${filters}` : ""}`;

  // gets products for the catalog
  const res = await fetch(
    `${API_URL}/products${queryString.length > 0 && "?"}${queryString.slice(
      1,
    )}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();

  const categoryHeader = category
    ? subCategory
      ? categories[category].subCategories[subCategory].name
      : categories[category].name
    : "Каталог";

  return (
    <>
      <Categories />
      <BasicBreadcrumbs {...{ data }} />
      <CategoryHeader title={categoryHeader} />
      <CatalogView {...{ data }} />
    </>
  );
}
