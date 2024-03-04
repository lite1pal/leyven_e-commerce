"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  changeArrayValue,
  getArrayValueByKey,
  getDecodedFilters,
  getFiltersPathName,
} from "@/libs/utils";

function Sorting() {
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // current filters
  const filters = getDecodedFilters(params.filters as string);

  // returns current sorting method
  const currentSortingTitle = useMemo(() => {
    if (getArrayValueByKey(filters, "sort") === "price_desc") {
      return "Від найдорожчих";
    } else if (getArrayValueByKey(filters, "sort") === "price_asc") {
      return "Від найдешевших";
    }
    return "За популярністю";
  }, [params]);

  const handleChange = (value: string) => {
    const newFilters = changeArrayValue(filters, "sort", value);
    router.push(getFiltersPathName(newFilters, pathName, search));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] bg-white focus:ring-0">
        <SelectValue placeholder={currentSortingTitle} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price_asc">Від найдешевших</SelectItem>
        <SelectItem value="price_desc">Від найдорожчих</SelectItem>
        <SelectItem value="popular">За популярністю</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Sorting;
