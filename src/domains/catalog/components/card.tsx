"use client";

import { Roboto } from "next/font/google";
import CartModal from "./cartModal";
import { Rating } from "flowbite-react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function Card({ data, session }: any) {
  const router = useRouter();
  return (
    <div
      className={`${roboto.className} relative w-full group h-[32rem] mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="absolute hover:bg-blue-100 bg-white top-5 right-5 border-2 border-blue-500 rounded-full p-3 group-hover:opacity-100 opacity-0 transition duration-300">
        <FavoriteBorderIcon color="primary" />
      </div>
      <div
        onClick={() => router.push(`/product/${data.id}`)}
        className="mx-auto h-96 cursor-pointer"
      >
        <img
          className="p-4 rounded-t-lg mx-auto w-full h-full object-contain"
          src={data.img}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5">
        <h5
          onClick={() => router.push(`/product/${data.id}`)}
          title={data.title}
          className="md:text-xl hover:underline cursor-pointer font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {data.title.length > 27
            ? data.title.slice(0, 28) + "..."
            : data.title}
        </h5>

        <Rating style={{ paddingBlock: "0.5rem" }}>
          <Rating.Star />
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            {data.rating}
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <a className="text-sm cursor-pointer font-medium text-gray-900 underline hover:no-underline dark:text-white">
            {data.reviews} reviews
          </a>
        </Rating>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.price} грн
          </span>
          <CartModal data={data} session={session} />
        </div>
      </div>
    </div>
  );
}
