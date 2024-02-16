"use client";

import CartModal from "../modals/cartModal";
import Link from "next/link";
import { slugifyString, valueOfPercent } from "@/libs/utils";

export default function Card({
  data,
  openModal,
  setOpenModal,
  type = "catalog",
}: any) {
  return (
    <div
      className={`${
        type !== "catalog" ? "w-52 max-w-xs" : "w-full"
      } duration-50 group relative mx-auto rounded-lg border border-gray-200 border-opacity-0 bg-white  transition hover:border-blue-600 hover:border-opacity-100 dark:border-gray-700 dark:bg-gray-800`}
    >
      {/* {data.discount > 0 && (
        <div className="absolute left-1 top-1 z-20 flex items-center justify-center rounded-full p-1.5 text-sm text-blue-600">
          {data.discount}%
        </div>
      )} */}
      <Link
        prefetch={false}
        href={`/product/${data.id}-${slugifyString(data.title)}`}
      >
        <div
          className={`${data.availability === "out of stock" && "opacity-30"} ${
            type !== "catalog" && "h-52"
          }  mx-auto h-40 cursor-pointer sm:h-96 md:h-80 lg:h-72 xl:h-52`}
        >
          <img
            // sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 33vw"
            className={`res mx-auto h-full w-full rounded-t-lg object-contain p-4 transition duration-500 group-hover:scale-105`}
            src={data.img}
            alt={data.title + " - фото продукту Лейвен"}
          />
        </div>
      </Link>
      <div className="relative flex flex-col gap-1 px-4 pb-4 max-sm:px-2.5 max-sm:pb-2.5">
        <Link
          prefetch={false}
          href={`/product/${data.id}-${slugifyString(data.title)}`}
        >
          <h5
            title={data.title}
            // style={{ animation: "move-words 20s linear infinite;" }}
            className="overflow-x-hidden whitespace-nowrap text-lg font-medium tracking-tight dark:text-white max-sm:text-base xl:text-base"
          >
            {data.title}
          </h5>
        </Link>

        <div
          className={`${
            data.availability === "in stock"
              ? "text-emerald-600"
              : "text-slate-600"
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
            className={`flex flex-col font-sans text-2xl font-medium text-slate-900 dark:text-white max-sm:text-base lg:text-base`}
          >
            {data.discount !== 0 && (
              <span className="font-medium text-red-600">
                {data.price - valueOfPercent(data.discount, data.price)} UAH
              </span>
            )}
            {data.discount !== 0 ? (
              <del className="">{data.price}.00 UAH </del>
            ) : (
              data.price + ".00 UAH"
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
