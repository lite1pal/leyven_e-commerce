"use client";

import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationComponent() {
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
        router.push(`${pathName}${searchString}page=${value}`);
      }}
      count={10}
    />
  );
}

// import { Pagination } from "flowbite-react";
// import { useState } from "react";

// export default function PaginationComponent() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const onPageChange = (page: number) => setCurrentPage(page);
//   return (
//     <div className="w-fit mx-auto pb-10">
//       <Pagination
//         currentPage={currentPage}
//         totalPages={100}
//         onPageChange={onPageChange}
//         showIcons
//         previousLabel=""
//         nextLabel=""
//       />
//     </div>
//   );
// }
