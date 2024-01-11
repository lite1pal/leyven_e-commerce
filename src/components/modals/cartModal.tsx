"use client";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import CardCart from "../cards/cardCart";
import { useCart } from "react-use-cart";
import Button from "../base/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function CartModal({ data }: any) {
  const { addItem, items, isEmpty, cartTotal, inCart } = useCart();

  return (
    <>
      <button
        onClick={() => {
          addItem(data);
          (document.getElementById("cartModal") as HTMLFormElement).showModal();
        }}
        className={`${
          inCart(data.id) &&
          "border-emerald-600 bg-emerald-600 hover:text-emerald-600"
        } ${
          data.availability === "out of stock" &&
          "pointer-events-none border-slate-500 bg-slate-500"
        } rounded border-2 border-blue-600 bg-blue-600 p-2.5 text-center text-sm font-medium text-white transition hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-sm:p-1 lg:p-1.5`}
      >
        {inCart(data.id) ? (
          <ShoppingCartIcon fontSize="small" />
        ) : (
          <AddShoppingCartIcon fontSize="small" />
        )}
      </button>

      <dialog id="cartModal" className="modal">
        <div className="modal-box bg-white p-0 text-black">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 bg-white p-6">
            <h3 className="text-lg font-bold">Кошик</h3>
            <form method="dialog">
              <button className="h-fit cursor-pointer rounded-lg border-2 border-blue-600 border-opacity-0 p-1 transition duration-300 hover:border-opacity-100 hover:text-blue-600">
                <CloseIcon />
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-5 border p-6 max-sm:gap-2 max-sm:p-1.5">
            {isEmpty && (
              <div className="space-y-6">
                <p className="p-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Пусто
                </p>
              </div>
            )}
            <AnimatePresence>
              {items.length > 0 &&
                items.map((cartProduct: any, i: number) => {
                  return (
                    <motion.div
                      key={cartProduct.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CardCart
                        {...{
                          cartProduct,
                        }}
                      />
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
          <footer className="sticky bottom-0 z-10 flex items-center justify-between border-t-2 bg-white p-6 max-sm:flex-col max-sm:gap-3">
            <div
              className={`${
                items.length === 0 && "hidden"
              } flex gap-3 max-sm:order-2`}
            >
              <Link href="/order">
                <Button size="sm" title="Оформити замовлення" />
              </Link>
            </div>
            <div className="rounded border p-3 font-sans text-2xl font-semibold max-sm:order-1 max-sm:border-none max-sm:text-xl">
              {cartTotal}.00 UAH
            </div>
          </footer>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
