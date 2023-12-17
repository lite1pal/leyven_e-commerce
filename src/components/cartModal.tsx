"use client";

import { Button, Modal, Spinner } from "flowbite-react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import CardCart from "./cardCart";
import { useCart } from "react-use-cart";
import { useCallback, useEffect } from "react";
import { Add } from "@mui/icons-material";

export default function CartModal({ data, openModal, setOpenModal }: any) {
  const { addItem, items, isEmpty, cartTotal, inCart } = useCart();

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
        } text-white lg:px-1.5 lg:py-1.5 bg-blue-600 hover:text-blue-600 hover:bg-white transition border border-blue-600 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        {inCart(data.id) ? (
          <ShoppingCartIcon />
        ) : (
          <AddShoppingCartIcon fontSize="small" />
        )}
      </button>

      <Modal
        className="bg-opacity-5"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Корзина</Modal.Header>
        <Modal.Body>
          <div className={`flex flex-col gap-5`}>
            {isEmpty && (
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
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
        </Modal.Body>
        <Modal.Footer className="justify-between">
          <div className="flex gap-3">
            <Link href="/order">
              <Button onClick={() => setOpenModal(false)}>
                Оформити замовлення
              </Button>
            </Link>
          </div>
          <div className="border p-3 font-sans text-2xl font-semibold rounded">
            {cartTotal}.00 UAH
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
