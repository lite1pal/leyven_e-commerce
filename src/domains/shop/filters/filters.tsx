import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/components/catalog";
import { categories } from "@/data/categories";
import BasicBreadcrumbs from "@/components/base/BreadCrumbs";
import Categories from "@/components/sections/categories";
import { type Product } from "@/types";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { ChildCategories } from "@/components/sections/childCategories";
import BreadcrumbsCategory from "@/components/sections/breadcrumbsCategory";

export default async function FiltersView({
  params,
  searchParams,
}: {
  params: {
    category: string | undefined;
    filters: string;
  };
  searchParams: {
    search: string;
  };
}) {
  const { category, filters } = params;

  const { search } = searchParams;

  const queryString = `${
    category ? `&categoryId=${category.split("-")[0]}` : ""
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

  return (
    <>
      {search ? (
        <>
          <div
            className={`px-4 py-5 font-sans text-3xl font-medium text-slate-900`}
          >
            Результати пошуку
          </div>
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
          {category && (
            <>
              {/* <BreadcrumbsCategory categoryId={category.split("-")[0]} />
              <ChildCategories params={params} /> */}
            </>
          )}
        </>
      )}
      {category ? (
        <CategoryHeader categoryId={category.split("-")[0]} />
      ) : (
        <div
          className={`px-4 py-5 font-sans text-3xl font-medium text-slate-900`}
        >
          Каталог
        </div>
      )}
      <CatalogView {...{ data }} />
    </>
  );
}
