"use client";

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
import Card from "./card";
import BasicBreadcrumbs from "./breadCrumbs";
import PaginationComponent from "./pagination";
import IconButton from "@mui/joy/IconButton";
import { Inter, Roboto } from "next/font/google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Suspense, useEffect, useState } from "react";

const inter = Roboto({ subsets: ["latin"], weight: "300" });

export default function GridComponent({ session, data }: any) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <BasicBreadcrumbs />
      <div
        className={`${inter.className} flex justify-between items-center px-8 mb-4 w-full`}
      >
        <div className={`text-lg font-bold`}>{data?.length} товарів</div>
        <Dropdown>
          <MenuButton
            sx={{ border: "none", fontWeight: "400" }}
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            За популярністю
            <KeyboardArrowDownIcon />
          </MenuButton>

          <Menu>
            <MenuItem>За новизною</MenuItem>
            <MenuItem>За знижкою</MenuItem>
            <MenuItem>Від найдешевших</MenuItem>
            <MenuItem>Від найдорожчих</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 3.5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}
        marginBottom={"2.5rem"}
        marginX={"1rem"}
        padding={"0"}
      >
        {data?.map((product: any, i: number) => {
          return (
            <Grid key={i} xs={4} sm={4} lg={3}>
              <Card data={product} session={session} />
            </Grid>
          );
        })}
      </Grid>
      <PaginationComponent />
    </>
  );
}
