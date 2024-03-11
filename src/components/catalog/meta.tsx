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
      <FiltersMobile />

      <Sorting />
    </div>
  );
}
