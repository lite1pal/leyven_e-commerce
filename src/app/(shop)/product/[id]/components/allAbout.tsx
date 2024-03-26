"use client";

import "react-photo-view/dist/react-photo-view.css";
import { Divider } from "@mui/joy";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { Product } from "@/types";
import ProductImg from "./img";
import ProductRating from "./rating";
import ProductTitle from "./title";
import ProductAvailability from "./availability";
import ProductPrice from "./price";
import ProductArtycul from "./artycul";
import Payment from "./payment";
import Shipping from "./shipping";
import AddCartButton from "@/components/modals/addCartButton";
import CartModal from "@/components/modals/add-cart-modal";
import Button from "@/components/Button";

type Props = {
  data: Product;
};

export default function AllAbout({ data }: Props) {
  const { addItem, inCart } = useCart();

  return (
    <div className="mb-5 flex w-full flex-col gap-5 rounded-lg bg-white lg:flex-row">
      <div className="w-full rounded-lg bg-white p-6">
        <ProductImg {...{ data }} />
      </div>

      <div className="w-full rounded-lg bg-white p-6">
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

          {/* <span
            className={`${
              data.availability === "out of stock" && "hidden"
            } mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400`}
          /> */}
          <span
            className={`${
              data.quantity === 0 && "hidden"
            } mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400`}
          />

          {/* {data.availability === "in stock" && (
            <div className="flex gap-3">
              <Link
                onClick={() => !inCart(data.id) && addItem(data)}
                href="/order"
              >
                <Button theme="green" title="Купити" />
              </Link>
              <CartModal data={data} />
            </div>
          )} */}
          {data.quantity > 0 && (
            <div className="flex gap-3">
              <Link
                onClick={() => !inCart(data.id) && addItem(data)}
                href="/order"
              >
                {/* <Button className="text-lg" theme="green" title="Купити" /> */}
                <button className="btn btn-success rounded text-lg text-white">
                  Купити
                </button>
              </Link>
              <CartModal data={data} />
            </div>
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
