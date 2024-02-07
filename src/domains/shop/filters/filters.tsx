import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";
import { type Product } from "@/types";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

export default async function FiltersView({
  params,
  searchParams,
}: {
  params: {
    category: string | undefined;
    subCategory: string | undefined;
    filters: string;
  };
  searchParams: {
    search: string;
  };
}) {
  const { category, subCategory, filters } = params;

  const { search } = searchParams;

  const queryString = `${category ? `&category=${category}` : ""}${
    subCategory ? `&subCategory=${subCategory}` : ""
  }${filters ? `&filters=${filters}` : ""}${search ? `&search=${search}` : ""}`;

  // gets products for the catalog
  const res = await fetch(
    `${API_URL}/products${queryString.length > 0 && "?"}${queryString.slice(
      1,
    )}`,
    {
      cache: "no-store",
    },
  );
  const data: Product[] = await res.json();

  const categoryHeader = category
    ? subCategory
      ? categories[category].subCategories[subCategory].name
      : categories[category].name
    : "Каталог";

  return (
    <>
      {search ? (
        <>
          <CategoryHeader title="Результат пошуку" />
          <div className="ml-10 flex items-center gap-1 pb-5">
            <Link href="/">
              <div className="cursor-pointer rounded-lg border-2 border-blue-600 border-opacity-0 p-1.5 transition duration-300  hover:border-opacity-100 hover:text-blue-600">
                <CloseIcon fontSize="small" />
              </div>
            </Link>
            <div className="w-fit cursor-default rounded-lg border-2 p-2 text-lg">
              {searchParams.search}
            </div>
          </div>
        </>
      ) : (
        <>
          <Categories />
          <BasicBreadcrumbs />
        </>
      )}
      <CategoryHeader title={categoryHeader} />
      <CatalogView {...{ data }} />
    </>
  );
}
