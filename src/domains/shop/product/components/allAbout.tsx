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
import Payment from "./payment";
import Shipping from "./shipping";

type Props = {
  data: Product;
};

export default function AllAbout({ data }: Props) {
  const { addItem, inCart } = useCart();

  return (
    <div className="mb-10 flex flex-col gap-10 px-7 pt-5 lg:flex-row">
      <ProductImg {...{ data }} />
      <div className="w-full lg:w-1/2">
        <ProductTitle {...{ data }} />
        <div className="flex items-center justify-between py-2">
          <ProductRating {...{ data }} />
          <ProductArtycul {...{ data }} />
        </div>
        <Divider />
        <div className="flex items-center gap-5 py-4">
          <div className="flex flex-col gap-1">
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
        </div>
        <Divider />
        <Payment />
        <Divider />
        <Shipping />
      </div>
    </div>
  );
}
