"use client";

import CartModal from "./cartModal";
import { Rating } from "flowbite-react";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import SignInComponent from "./navbar/components/signIn";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import Link from "next/link";

export default function Card({ data, openModal, setOpenModal }: any) {
  const router = useRouter();
  return (
    <div
      className={`relative w-full group mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
    >
      {/* <div className="absolute z-10 hover:bg-blue-100 bg-white top-5 right-5 border-2 border-blue-500 rounded-full px-2 py-1.5 group-hover:opacity-100 opacity-0 transition duration-300">
        <FavoriteBorderIcon fontSize="small" color="primary" />
      </div> */}
      <Link href={`/product/${data.id}`}>
        <div
          className={`${
            data.availability === "out of stock" && "opacity-30"
          } mx-auto max-sm:h-48 h-96 sm:h-80 md:h-64 lg:h-56 xl:h-40 cursor-pointer`}
        >
          <img
            className={`p-4 group-hover:scale-105 transition duration-500 rounded-t-lg mx-auto w-full h-full object-contain`}
            src={data.img}
            alt="product image"
          />
        </div>
      </Link>
      <div className="max-sm:px-2.5 max-sm:pb-2.5 px-4 relative pb-4 flex flex-col gap-1">
        <Link href={`/product/${data.id}`}>
          <h5
            title={data.title}
            style={{ animation: "move-words 20s linear infinite;" }}
            className="max-sm:text-base text-lg xl:text-base whitespace-nowrap overflow-x-hidden hover:underline cursor-pointer font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {data.title}
          </h5>
        </Link>

        <div
          className={`${
            data.availability === "in stock"
              ? "text-green-600"
              : "text-slate-700"
          } flex items-center gap-1`}
        >
          {data.availability === "in stock" && <UnarchiveIcon />}
          {data.availability === "in stock" ? "В наявності" : "Немає на складі"}
        </div>

        {/* <Rating>
          <Rating.Star />
          <p className="text-sm mb-1 font-bold text-gray-900 dark:text-white">
            {data.rating}
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <a className="text-sm cursor-pointer font-medium text-gray-900 underline hover:no-underline dark:text-white">
            8 reviews
          </a>
        </Rating> */}
        <div className="max-sm:pt-2.5 flex items-center justify-between border-t-2 pt-4">
          <span className="max-sm:text-base text-2xl font-sans lg:text-base font-medium text-gray-900 dark:text-white">
            {data.price}.00 UAH
          </span>
          <CartModal
            data={data}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
          {/* {session ? (
          ) : (
            <SignInComponent icon="cart" />
          )} */}
        </div>
      </div>
    </div>
  );
}
