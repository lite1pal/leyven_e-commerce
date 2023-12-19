"use client";

import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationComponent({ data }: any) {
  const searchParams = useSearchParams();
  const sorting = searchParams.get("sorting") as string;
  const page = searchParams.get("page") as string;

  const searchString = `?sorting=${sorting}&`;

  const router = useRouter();
  const pathName = usePathname();
  return (
    <Pagination
      sx={{
        marginInline: "auto",
        marginBlock: "1.5rem",
        width: "fit-content",
      }}
      page={parseInt(page) || 1}
      onChange={(e, value) => {
        console.log(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
        router.push(`${pathName}${searchString}page=${value}`);
      }}
      siblingCount={1}
      boundaryCount={1}
      hidePrevButton
      hideNextButton
      count={data?.length > 23 ? parseInt(page) + 1 || 2 : parseInt(page)}
    />
  );
}
