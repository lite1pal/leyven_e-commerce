"use client";

import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Card, CardContent, Divider } from "@mui/joy";
import { API_URL } from "@/config/api";
import { Fragment, useEffect, useState } from "react";
import { Button, Modal, Rating, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function DrawerScrollable({ session }: any) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({ cartProducts: [] });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getCart = async () => {
    setLoading(true);
    if (session) {
      const res = await fetch(`${API_URL}/cart?email=${session.user.email}`);
      const data = await res.json();
      setCart(data);
    }
    setLoading(false);
  };

  const deleteProductFromCart = async (cartProductId: string) => {
    if (!cartProductId) return console.log("Provide product id as a parameter");

    await fetch(`${API_URL}/cartProduct?cartProductId=${cartProductId}`, {
      method: "DELETE",
    });
    getCart();
  };

  useEffect(() => {
    // if (open) {
    getCart();
    // }
  }, [open]);

  return (
    <Fragment>
      <div
        className="transition hover:bg-slate-200 rounded"
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={cart.cartProducts.length} badgeInset="-20%">
          <ShoppingCartIcon />
        </Badge>
      </div>

      <Drawer
        anchor="right"
        size="lg"
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalClose />
        <DialogTitle>Корзина</DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: "0.78rem" }}>
          {!loading && cart.cartProducts.length === 0 && (
            <>
              <div className="mb-2">Ваш кошик порожній.</div>
              <div>
                Не вагайтеся і перегляньте наш каталог, щоб знайти щось корисне
                для Вашого пухнастого друга!
              </div>
            </>
          )}
          <div className="flex flex-col gap-3">
            {/* <AnimatePresence> */}
            {cart.cartProducts.length > 0 &&
              cart.cartProducts.map((cartProduct: any, i: number) => {
                return (
                  // <motion.div
                  //   key={cartProduct.id}
                  //   initial={{ opacity: 0.2, scale: 0.5 }}
                  //   animate={{ opacity: 1, scale: 1 }}
                  //   transition={{ duration: 0.5 }}
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
                        onClick={() => {
                          setOpen(false);
                          router.push(`/product/${cartProduct.product.id}`);
                        }}
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
          </div>
          {loading && (
            <div className="my-5 mx-auto">
              <Spinner
                aria-label="Alternate spinner button example"
                size="lg"
              />
            </div>
          )}
          {cart.cartProducts.length > 0 && (
            <div className="flex w-fit mt-5 mx-auto gap-2">
              <Link href="/order">
                <Button onClick={() => setOpen(false)}>
                  Оформити замовлення
                </Button>
              </Link>
              <Button color="gray">Видалити</Button>
            </div>
          )}
        </DialogContent>
      </Drawer>
    </Fragment>
  );
}
