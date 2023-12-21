"use client";

import { Modal, Spinner } from "flowbite-react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import CardCart from "./cardCart";
import { useCart } from "react-use-cart";
import { useCallback, useEffect } from "react";
import { Add } from "@mui/icons-material";
import Button from "./base/Button";

export default function CartModal({ data, openModal, setOpenModal }: any) {
  const { addItem, items, isEmpty, cartTotal, inCart } = useCart();

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (e.target.id === "cartModal") {
        setOpenModal(false);
      }
    });

    return () => {
      window.removeEventListener("click", (e: any) => {});
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          addItem(data);
          setOpenModal(true);
        }}
        className={`${
          inCart(data.id) &&
          "bg-green-600 border-green-600 hover:text-green-600"
        } ${
          data.availability === "out of stock" &&
          "pointer-events-none bg-slate-500 border-slate-500"
        } text-white p-2.5 lg:p-1.5 bg-blue-600 hover:text-blue-600 hover:bg-white transition border-2 border-blue-600 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        {inCart(data.id) ? (
          <ShoppingCartIcon fontSize="small" />
        ) : (
          <AddShoppingCartIcon fontSize="small" />
        )}
      </button>

      <Modal
        className="bg-opacity-5"
        show={openModal}
        id="cartModal"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Корзина</Modal.Header>
        <Modal.Body className="max-sm:p-1.5 border flex flex-col gap-5 max-sm:gap-2">
          {isEmpty && (
            <div className="space-y-6">
              <p className="text-base leading-relaxed p-4 text-gray-500 dark:text-gray-400">
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
        </Modal.Body>
        <Modal.Footer className="max-sm:flex-col max-sm:gap-3 justify-between">
          <div
            className={`${
              items.length === 0 && "hidden"
            } flex gap-3 max-sm:order-2`}
          >
            <Link href="/order">
              <Button
                size="sm"
                title="Оформити замовлення"
                onClick={() => setOpenModal(false)}
              />
            </Link>
          </div>
          <div className="max-sm:order-1 max-sm:text-xl max-sm:border-none border p-3 font-sans text-2xl font-semibold rounded">
            {cartTotal}.00 UAH
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
