"use client";

import { Divider, Dropdown, Grid, Menu, MenuButton, MenuItem } from "@mui/joy";
import Card from "./card";
import BasicBreadcrumbs from "./breadCrumbs";
import PaginationComponent from "./pagination";
import IconButton from "@mui/joy/IconButton";
import { MoreVert } from "@mui/icons-material";
import { products } from "@/data/data";
import { Inter, Roboto } from "next/font/google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const inter = Roboto({ subsets: ["latin"], weight: "300" });

export default function GridComponent() {
  return (
    <>
      <BasicBreadcrumbs />
      <div
        className={`${inter.className} flex justify-between items-center px-8 mb-4 w-full`}
      >
        <div className={`text-lg font-bold`}>{products.length} товарів</div>
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
        {products.map((product) => {
          return (
            <Grid xs={4} sm={4} lg={3}>
              <Card data={product} />
            </Grid>
          );
        })}
      </Grid>
      <PaginationComponent />
    </>
  );
}
