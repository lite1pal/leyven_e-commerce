"use client";

import {
  changeArrayValue,
  decodeURIParams,
  getArrayValueByKey,
  getDecodedFilters,
  getFiltersPathName,
} from "@/libs/utils";
import Pagination from "@mui/material/Pagination";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function PaginationComponent({ data }: any) {
  const params = useParams();

  // current filters
  const filters = getDecodedFilters(params.filters as string);

  // current page
  const page = parseInt(getArrayValueByKey(filters, "page"));

  const router = useRouter();
  const pathName = usePathname();

  return (
    <Pagination
      sx={{
        marginInline: "auto",
        marginBlock: "1.5rem",
        width: "fit-content",
      }}
      page={page || 1}
      onChange={(e, value) => {
        // scroll smoothly to the top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // updates filters value
        const newFilters = changeArrayValue(filters, "page", value.toString());

        router.push(getFiltersPathName(newFilters, pathName));
      }}
      siblingCount={1}
      boundaryCount={1}
      hidePrevButton
      hideNextButton
      count={data?.length > 23 ? page + 1 || 2 : page}
    />
  );
}
