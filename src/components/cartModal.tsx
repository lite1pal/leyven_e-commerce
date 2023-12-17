"use client";

import { API_URL } from "@/config/api";
import { Card, CardContent } from "@mui/joy";
import { Button, Modal, Rating, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { Transition } from "react-transition-group";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import CardCart from "./cardCart";

export default function CartModal({
  data,
  session,
  cart,
  getCart,
  openModal,
  setOpenModal,
}: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const isProductAlreadyInCart = useCallback(() => {
    const existingCartProduct = cart.cartProducts.filter(
      (cartProduct: any) => cartProduct.productId === data.id
    );
    return existingCartProduct[0];
  }, [cart]);

  const addProductToCart = async () => {
    try {
      setLoading(true);
      if (!isProductAlreadyInCart()) {
        await fetch(`${API_URL}/cartProduct`, {
          method: "POST",
          body: JSON.stringify({ data, session }),
        });
        toast.success("Товар доданий у корзину!");
      }
      setLoading(false);
      setOpenModal(true);
    } catch (err) {
      console.error("Failed to add a product to the cart", err);
    }
  };

  const increaseQuantity = async (cartProductId: string) => {
    try {
      setLoading(true);
      if (!cartProductId) {
        return console.log("Provide product id as a parameter");
      }
      await fetch(
        `${API_URL}/cartProduct?cartProductId=${cartProductId}&type=increase`,
        {
          method: "PUT",
        }
      );
      setLoading(false);
      getCart();
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantity = async (cartProductId: string) => {
    try {
      setLoading(true);
      if (!cartProductId) {
        return console.log("Provide product id as a parameter");
      }

      await fetch(
        `${API_URL}/cartProduct?cartProductId=${cartProductId}&type=decrease`,
        {
          method: "PUT",
        }
      );
      setLoading(false);
      getCart();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProductFromCart = async (cartProductId: string) => {
    try {
      setLoading(true);
      if (!cartProductId)
        return console.log("Provide product id as a parameter");

      await fetch(`${API_URL}/cartProduct?cartProductId=${cartProductId}`, {
        method: "DELETE",
      });
      toast.success(`Товар видалено з корзини`);
      getCart();
      setLoading(false);
    } catch (err) {
      console.error("Failed to delete a product from the cart", err);
    }
  };

  return (
    <>
      <button
        onClick={addProductToCart}
        className={`${
          isProductAlreadyInCart() &&
          "bg-green-600 border-green-600 hover:text-green-600"
        } text-white lg:px-1.5 lg:py-1.5 bg-blue-600 hover:text-blue-600 hover:bg-white transition border border-blue-600 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        {isProductAlreadyInCart() ? (
          <ShoppingCartIcon />
        ) : loading ? (
          <Spinner />
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
          <div
            className={`${
              loading && "opacity-50 pointer-events-none"
            } flex flex-col gap-5`}
          >
            {cart.cartProducts.length === 0 && (
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Пусто
                </p>
              </div>
            )}
            <AnimatePresence>
              {cart.cartProducts.length > 0 &&
                cart.cartProducts.map((cartProduct: any, i: number) => {
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
                          deleteProductFromCart,
                          increaseQuantity,
                          decreaseQuantity,
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
            {cart.totalPrice}.00 UAH
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
