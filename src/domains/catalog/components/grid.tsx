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
import BasicBreadcrumbs from "../../../layout_components/breadCrumbs";
import PaginationComponent from "./pagination";
import IconButton from "@mui/joy/IconButton";
import { Inter, Roboto } from "next/font/google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Suspense, useEffect, useState } from "react";

const inter = Roboto({ subsets: ["latin"], weight: "300" });

export default function GridComponent({ session }: any) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        return "Failed to fetch products";
      }
      const parsedRes = await res.json();
      setProducts(parsedRes);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <BasicBreadcrumbs />
      <div
        className={`${inter.className} flex justify-between items-center px-8 mb-4 w-full`}
      >
        <div className={`text-lg font-bold`}>{products?.length} товарів</div>
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
        {products?.map((product: any, i: number) => {
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

{
  /* {loading
  ? [1, 2, 3, 4, 5, 6, 7, 8].map((d, i) => {
      return (
        <Grid key={i} xs={4} sm={4} lg={3}>
          <Skeleton
            sx={{ bgcolor: "grey.900", borderRadius: "0.625rem" }}
            variant="rectangular"
            width={330}
            height={500}
          />
        </Grid>
      );
    })
  : products?.map((product, i) => {
      return (
        <Grid key={i} xs={4} sm={4} lg={3}>
          <Card data={product} session={session} />
        </Grid>
      );
    })} */
}
