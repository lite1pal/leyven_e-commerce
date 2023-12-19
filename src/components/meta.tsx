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

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function Meta({ data }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentSortingTitle = useMemo(() => {
    if (searchParams.get("sorting") === "price_desc") {
      return "Від найдорожчих";
    } else if (searchParams.get("sorting") === "price_asc") {
      return "Від найдешевших";
    }
    return "За популярністю";
  }, [searchParams]);
  return (
    <div
      className={`${roboto.className} flex justify-between items-center px-8 mb-4 w-full`}
    >
      <div className={`text-base font-bold xl:ml-44`}>
        {searchParams.get("page") || 1} сторінка
      </div>
      <Dropdown>
        <MenuButton
          sx={{ border: "none", fontWeight: "400" }}
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "outlined", color: "neutral" } }}
        >
          {currentSortingTitle}
          <KeyboardArrowDownIcon />
        </MenuButton>

        <Menu>
          <MenuItem onClick={() => router.push(`${pathName}`)}>
            За популярністю
          </MenuItem>
          <MenuItem
            onClick={() => router.push(`${pathName}?sorting=price_asc`)}
          >
            Від найдешевших
          </MenuItem>
          <MenuItem
            onClick={() => router.push(`${pathName}?sorting=price_desc`)}
          >
            Від найдорожчих
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}
