import CategoryHeader from "@/components/base/CategoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/shop/allProducts/components/catalog";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { Suspense } from "react";

export default async function SearchScreen({ searchParams, params }: any) {
  const sorting = searchParams.sorting;
  const search = searchParams.search;

  // gets products for the catalog
  const res = await fetch(
    `${API_URL}/products?search=${search}&sorting=${sorting}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();

  return (
    <div className="flex flex-grow flex-col">
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
      {data.length === 0 ? (
        <div className="mx-auto text-lg font-medium">
          На жаль, нічого не знайдено
        </div>
      ) : (
        <CatalogView {...{ data }} />
      )}
    </div>
  );
}
