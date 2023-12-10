"use client";

import { API_URL } from "@/config/api";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import { Button, Modal, Rating } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartModal({
  data,
  session,
  cart,
  openModal,
  setOpenModal,
}: any) {
  // const [cart, setCart] = useState<any>({});
  const router = useRouter();

  const addProductToCart = async () => {
    await fetch(`${API_URL}/cart`, {
      method: "POST",
      body: JSON.stringify({ data, session }),
    });
    setOpenModal(true);
  };

  return (
    <>
      <button
        onClick={addProductToCart}
        className="text-white bg-blue-600 hover:text-blue-600 hover:bg-white transition border border-blue-600 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        В корзину
      </button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
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
            {cart.cartProducts.length > 0 &&
              cart.cartProducts.map((cartProduct: any, i: number) => {
                return (
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
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {cartProduct.product.price} грн
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>
            Оформити замовлення
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Видалити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
