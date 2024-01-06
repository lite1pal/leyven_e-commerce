import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/breadCrumbs";
import Categories from "@/components/categories";

export default async function FiltersView({ params }: any) {
  const { category, subCategory, filters } = params;

  // console.log("asdfsdaf\n\nasdfsadfsadf\n\n\n\n\nsdfasdf", filters);

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
