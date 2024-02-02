"use client";

import "react-photo-view/dist/react-photo-view.css";
import { Divider, Grid } from "@mui/joy";
import Link from "next/link";
import type { CustomFlowbiteTheme } from "flowbite-react";
import ProductInfoTable from "@/components/productInfoTable";
import { useCart } from "react-use-cart";
import Button from "@/components/base/Button";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import ProductImg from "./img";
import ProductRating from "./rating";
import ProductTitle from "./title";
import ProductAvailability from "./availability";
import ProductPrice from "./price";
import ProductArtycul from "./artycul";

type Props = {
  data: Product;
};

export default function AllAbout({ data }: Props) {
  const { addItem, inCart } = useCart();

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12} marginInline="auto" marginBlock="auto" lg={4}>
        <ProductImg {...{ data }} />
      </Grid>
      <Grid sx={{ width: "100%" }} xs={8} md={8} lg={6}>
        <ProductTitle {...{ data }} />
        <div className="flex items-center justify-between py-2">
          <ProductRating {...{ data }} />
          <ProductArtycul {...{ data }} />
        </div>
        <Divider />
        <div className="flex items-center gap-5 pt-4">
          <div className="flex flex-col gap-3">
            <ProductPrice {...{ data }} />
            <ProductAvailability {...{ data }} />
          </div>

          <span
            className={`${
              data.availability === "out of stock" && "hidden"
            } mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400`}
          />

          {data.availability === "in stock" && (
            <Link
              onClick={() => !inCart(data.id) && addItem(data)}
              href="/order"
            >
              <Button title="Купити" />
            </Link>
          )}

          {/* {data.breadcrumbs.includes("Ветеринарія") && (
            <div className="w-44 text-center text-xs font-medium text-slate-600">
              Замовлення можливе тільки через дзвінок менеджеру -{" "}
              <span className="font-semibold text-slate-900">
                +380 (50) 598-74-77
              </span>
            </div>
          )} */}
        </div>
        <ProductInfoTable {...{ data }} />
      </Grid>
    </Grid>
  );
}
