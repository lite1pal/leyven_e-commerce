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
import CardCart from "@/components/cardCart";

export default function DrawerScrollable({ session }: any) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({ totalPrice: "", cartProducts: [] });

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
    if (!cartProductId) return console.log("Provide product id as a parameter");

    await fetch(`${API_URL}/cartProduct?cartProductId=${cartProductId}`, {
      method: "DELETE",
    });
    getCart();
  };

  useEffect(() => {
    if (open) {
      getCart();
    }
  }, [open]);

  return (
    <Fragment>
      <div
        className="transition hover:bg-slate-200 p-1 rounded"
        onClick={() => setOpen(true)}
      >
        {/* <Badge badgeContent={cart.cartProducts.length} badgeInset="-20%"> */}
        <ShoppingCartIcon />
        {/* </Badge> */}
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
        <DialogContent
          sx={{
            padding: "0.78rem",
            paddingBottom: "7.2rem",
            position: "relative",
          }}
        >
          {!loading && cart.cartProducts.length === 0 && (
            <>
              <div className="mb-2">Ваш кошик порожній.</div>
              <div>
                Не вагайтеся і перегляньте наш каталог, щоб знайти щось корисне
                для Вашого пухнастого друга!
              </div>
            </>
          )}
          <div
            className={`${
              loading && "opacity-50 pointer-events-none"
            } flex flex-col gap-3`}
          >
            <AnimatePresence>
              {cart.cartProducts.length > 0 &&
                cart.cartProducts.map((cartProduct: any, i: number) => {
                  return (
                    <motion.div
                      key={cartProduct.id}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.5 }}
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
          {loading && (
            <div className="my-5 mx-auto">
              <Spinner
                aria-label="Alternate spinner button example"
                size="lg"
              />
            </div>
          )}
          {cart.cartProducts.length > 0 && (
            <div className="flex fixed items-center bg-white z-20 bottom-0 p-5 border-2 right-0 w-full mt-5 mx-auto gap-5">
              <Link href="/order">
                <Button onClick={() => setOpen(false)}>
                  Оформити замовлення
                </Button>
              </Link>
              <div className="border p-3 text-slate-600 font-sans text-2xl font-semibold rounded">
                {cart.totalPrice}.00 UAH
              </div>
            </div>
          )}
        </DialogContent>
      </Drawer>
    </Fragment>
  );
}
