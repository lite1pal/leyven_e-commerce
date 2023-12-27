import CategoryHeader from "@/components/categoryHeader";
import { API_URL } from "@/config/api";
import CatalogView from "@/domains/catalog/catalog";
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
    }
  );
  const data = await res.json();

  return (
    <div className="flex flex-col flex-grow">
      <CategoryHeader title="Результат пошуку" />
      <div className="flex ml-10 gap-1 items-center pb-5">
        <Link href="/">
          <div className="transition duration-300 hover:text-blue-600 cursor-pointer border-2 border-blue-600 border-opacity-0 hover:border-opacity-100  p-1.5 rounded-lg">
            <CloseIcon fontSize="small" />
          </div>
        </Link>
        <div className="border-2 cursor-default p-2 rounded-lg w-fit text-lg">
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
