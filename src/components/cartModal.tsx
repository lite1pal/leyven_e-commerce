"use client";

import { API_URL } from "@/config/api";
import { Card, CardContent } from "@mui/joy";
import { Button, Modal, Rating, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

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
    setLoading(true);
    if (!isProductAlreadyInCart()) {
      await fetch(`${API_URL}/cartProduct`, {
        method: "POST",
        body: JSON.stringify({ data, session }),
      });
    }
    setLoading(false);
    setOpenModal(true);
  };

  const deleteProductFromCart = async (cartProductId: string) => {
    setLoading(true);
    if (!cartProductId) return console.log("Provide product id as a parameter");

    await fetch(`${API_URL}/cartProduct?cartProductId=${cartProductId}`, {
      method: "DELETE",
    });
    getCart();
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={addProductToCart}
        className={`${
          isProductAlreadyInCart() &&
          "bg-green-600 border-green-600 hover:text-green-600"
        } text-white bg-blue-600 hover:text-blue-600 hover:bg-white transition border border-blue-600 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        {isProductAlreadyInCart() ? "Додано" : "В корзину"}
        {loading && <Spinner style={{ marginLeft: "0.5rem" }} />}
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Корзина</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-5">
            {cart.cartProducts.length === 0 && (
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Пусто
                </p>
              </div>
            )}
            {/* <AnimatePresence> */}
            {cart.cartProducts.length > 0 &&
              cart.cartProducts.map((cartProduct: any, i: number) => {
                return (
                  // <motion.div
                  //   key={cartProduct.id}
                  //   initial={{ opacity: 0.2, scale: 0.5 }}
                  //   animate={{ opacity: 1, scale: 1 }}
                  //   transition={{ duration: 0.4 }}
                  //   exit={{ opacity: 0.2, scale: 0.5 }}
                  // >
                  <Card
                    key={i}
                    orientation="horizontal"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  >
                    <div className="h-44 w-36 ml-3">
                      <img
                        className="w-full h-full object-contain rounded-lg"
                        src={cartProduct.product.img}
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <CardContent>
                      <div
                        onClick={() =>
                          router.push(`/product/${cartProduct.product.id}`)
                        }
                        className="cursor-pointer font-medium hover:underline"
                      >
                        {cartProduct.product.title}
                      </div>
                      <Rating style={{ paddingBlock: "0.5rem" }}>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                          {cartProduct.product.rating}
                        </p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                        <a className="text-sm cursor-pointer font-medium text-gray-900 underline hover:no-underline dark:text-white">
                          0 reviews
                        </a>
                      </Rating>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl max-sm:text-lg font-bold text-gray-900 dark:text-white">
                          {cartProduct.product.price} грн
                        </span>
                      </div>
                    </CardContent>
                    <div
                      onClick={() => deleteProductFromCart(cartProduct.id)}
                      className="p-1 cursor-pointer transition rounded-lg hover:bg-slate-200 h-fit"
                    >
                      <CloseIcon />
                    </div>
                  </Card>
                  // </motion.div>
                );
              })}
            {/* </AnimatePresence> */}
            {/* {loading && <Spinner style={{ marginInline: "auto" }} />} */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link href="/order">
            <Button onClick={() => setOpenModal(false)}>
              Оформити замовлення
            </Button>
          </Link>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Видалити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
