"use client";

import { Roboto } from "next/font/google";
import BasicBreadcrumbs from "./breadCrumbs";
import {
  AspectRatio,
  Divider,
  Dropdown,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  Skeleton,
} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

// const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function Meta({ data }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const inStock = searchParams.get("instock");

  const currentSortingTitle = useMemo(() => {
    if (searchParams.get("sorting") === "price_desc") {
      return "Від найдорожчих";
    } else if (searchParams.get("sorting") === "price_asc") {
      return "Від найдешевших";
    }
    return "За популярністю";
  }, [searchParams]);

  return (
    <div className={`mb-4 flex w-full items-center justify-between px-8`}>
      <div className={`text-base xl:ml-44`}>
        Сторінка -{" "}
        <span className="font-medium">{searchParams.get("page") || 1}</span>
      </div>
      <div className="group">
        <div className="cursor-pointer">
          {currentSortingTitle}
          <KeyboardArrowDownIcon />
        </div>
        <div className="duration-50 absolute z-10 mt-2 flex flex-col gap-2 rounded-lg border-2 bg-white p-2 opacity-0 transition group-hover:opacity-100">
          <div
            className="cursor-pointer transition hover:text-blue-600"
            onClick={() =>
              router.push(
                `${pathName}?sorting=price_asc&search=${search}&instock=${inStock}`,
              )
            }
          >
            Від найдешевших
          </div>
          <Divider />
          <div
            className="cursor-pointer transition hover:text-blue-600"
            onClick={() =>
              router.push(
                `${pathName}?sorting=price_desc&search=${search}&instock=${inStock}`,
              )
            }
          >
            Від найдорожчих
          </div>
          <Divider />
          <div
            className="cursor-pointer transition hover:text-blue-600"
            onClick={() =>
              router.push(`${pathName}?search=${search}&instock=${inStock}`)
            }
          >
            За популярністю
          </div>
        </div>
      </div>
    </div>
  );
}
