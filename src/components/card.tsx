"use client";

import CartModal from "./cartModal";
import { Rating } from "flowbite-react";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import SignInComponent from "./navbar/components/signIn";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { valueOfPercent } from "@/libs/utils";

export default function Card({
  data,
  openModal,
  setOpenModal,
  type = "catalog",
}: any) {
  return (
    <div
      className={`${
        type !== "catalog" && "max-w-xs"
      } duration-50 group relative mx-auto w-full rounded-lg border border-gray-200 bg-white shadow transition hover:border-blue-600 dark:border-gray-700 dark:bg-gray-800`}
    >
      {/* <div className="absolute flex flex-col flex-end group-hover:opacity-100 w-full z-10 pb-10 border border-blue-600 rounded-lg opacity-0 transition duration-300">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          hello
        </div>
      </div> */}

      {data.discount > 0 && (
        <div className="absolute left-1 top-1 z-20 flex items-center justify-center rounded-full bg-red-500 px-2 text-slate-50">
          Акція
        </div>
      )}
      <Link href={`/product/${data.id}`}>
        <div
          className={`${data.availability === "out of stock" && "opacity-30"} ${
            type !== "catalog" && "h-80 sm:h-80 md:h-80 lg:h-80 xl:h-80"
          } mx-auto h-48 cursor-pointer sm:h-80 md:h-64 lg:h-56 xl:h-40`}
        >
          <img
            // sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 33vw"
            className={`res mx-auto h-full w-full rounded-t-lg object-contain p-4 transition duration-500 group-hover:scale-105`}
            src={data.img}
            alt="product image"
            // priority={true}
          />
        </div>
      </Link>
      <div className="relative flex flex-col gap-1 px-4 pb-4 max-sm:px-2.5 max-sm:pb-2.5">
        <Link href={`/product/${data.id}`}>
          <h5
            title={data.title}
            style={{ animation: "move-words 20s linear infinite;" }}
            className="cursor-pointer overflow-x-hidden whitespace-nowrap text-lg font-medium tracking-tight text-gray-900 hover:underline dark:text-white max-sm:text-base xl:text-base"
          >
            {data.title}
          </h5>
        </Link>

        <div
          className={`${
            data.availability === "in stock"
              ? "text-emerald-600"
              : "text-slate-700"
          } flex items-center gap-1`}
        >
          {data.availability === "in stock" ? "В наявності" : "Немає на складі"}
        </div>

        {/* {data.reviews && data.reviews.length > 0 && (
          <Rating>
            <Rating.Star />
            <p className="mb-1 text-sm font-bold text-gray-900 dark:text-white">
              {data.rating}
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a className="cursor-pointer text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {data?.reviews.length} reviews
            </a>
          </Rating>
        )} */}
        <div className="flex items-center justify-between border-t-2 pt-4 max-sm:pt-2.5">
          <span
            className={`${
              type === "catalog" ? "flex-col" : "gap-5"
            } flex font-sans text-2xl font-medium text-gray-900 dark:text-white max-sm:text-base lg:text-base`}
          >
            {data.discount ? (
              <del className="">{data.price}.00 UAH </del>
            ) : (
              data.price + ".00 UAH"
            )}
            {data.discount !== 0 && (
              <span className="font-medium text-red-600">
                {data.price - valueOfPercent(data.discount, data.price)} UAH
              </span>
            )}
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
        {/* <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </AnimatePresence> */}
      </div>
    </div>
  );
}
