"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useMemo } from "react";
import {
  changeArrayValue,
  getArrayValueByKey,
  getDecodedFilters,
  getFiltersPathName,
} from "@/libs/utils";
import FiltersMobile from "./filters-section/filtersMobile";
import { Separator } from "../ui/separator";
import Sorting from "./sorting";

export default function Meta() {
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // current filters
  const filters = getDecodedFilters(params.filters as string);

  // returns current page
  const page = parseInt(getArrayValueByKey(filters, "page"));

  // returns current sorting method
  const currentSortingTitle = useMemo(() => {
    if (getArrayValueByKey(filters, "sort") === "price_desc") {
      return "Від найдорожчих";
    } else if (getArrayValueByKey(filters, "sort") === "price_asc") {
      return "Від найдешевших";
    }
    return "За популярністю";
  }, [params]);

  return (
    <div className={`mb-4 flex w-full justify-between px-8`}>
      {/* <div className={`text-base opacity-0 xl:ml-44`}>
        Сторінка - <span className="font-medium">{page || 1}</span>
      </div> */}
      <FiltersMobile />

      <Sorting />

      {/* <div className="group">
        <div className="cursor-pointer">
          {currentSortingTitle}
          <KeyboardArrowDownIcon />
        </div>
        <div className="duration-50 absolute z-30 mt-2 flex flex-col gap-2 rounded-lg border-2 bg-white p-2 opacity-0 transition group-hover:opacity-100">
          <div
            className="cursor-pointer transition hover:text-blue-600"
            onClick={() => {
              // updates filters value
              const newFilters = changeArrayValue(filters, "sort", "price_asc");

              router.push(getFiltersPathName(newFilters, pathName, search));
            }}
          >
            Від найдешевших
          </div>
          <Separator />
          <div
            className="cursor-pointer transition hover:text-blue-600"
            onClick={() => {
              // updates filters value
              const newFilters = changeArrayValue(
                filters,
                "sort",
                "price_desc",
              );

              router.push(getFiltersPathName(newFilters, pathName, search));
            }}
          >
            Від найдорожчих
          </div>
          <Separator />
          <div
            className="cursor-pointer transition hover:text-blue-600"
            onClick={() => {
              // updates filters value
              const newFilters = changeArrayValue(filters, "sort", "popular");

              router.push(getFiltersPathName(newFilters, pathName, search));
            }}
          >
            За популярністю
          </div>
        </div>
      </div> */}
    </div>
  );
}
