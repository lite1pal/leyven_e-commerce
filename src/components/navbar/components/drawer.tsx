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
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CardCart from "@/components/cardCart";
import { useCart } from "react-use-cart";
import Button from "@/components/base/Button";
import { Tooltip } from "flowbite-react";

export default function DrawerScrollable() {
  const [open, setOpen] = useState(false);

  const { items, isEmpty, cartTotal, emptyCart } = useCart();

  return (
    <Fragment>
      <div
        className="transition flex text-lg gap-3 duration-300 hover:text-blue-600 cursor-pointer border-2 border-blue-600 border-opacity-0 hover:border-opacity-100  p-1.5 rounded-lg"
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={items.length} badgeInset="-20%">
          <ShoppingCartIcon />
        </Badge>
        <div className="">Кошик</div>
      </div>

      <Drawer
        anchor="right"
        size="lg"
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalClose />
        <DialogTitle>
          Кошик{" "}
          <button
            onClick={emptyCart}
            className="font-light underline text-sm ml-5"
          >
            Очистити кошик
          </button>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            padding: "0.78rem",
            paddingBottom: "20rem",
            position: "relative",
          }}
        >
          {isEmpty && (
            <>
              <div className="mb-2">Ваш кошик порожній.</div>
              <div>
                Не вагайтеся і перегляньте наш каталог, щоб знайти щось корисне
                для Вашого пухнастого друга!
              </div>
            </>
          )}
          <div className={`flex flex-col gap-3`}>
            <AnimatePresence>
              {!isEmpty &&
                items.map((cartProduct: any, i: number) => {
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
                        }}
                      />
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
          {/* {loading && (
            <div className="my-5 mx-auto">
              <Spinner
                aria-label="Alternate spinner button example"
                size="lg"
              />
            </div>
          )} */}
          {!isEmpty && (
            <div className="flex max-sm:flex-col max-sm:gap-3 fixed items-center bg-white z-20 bottom-0 p-5 border-2 right-0 w-full mt-5 mx-auto gap-5">
              <Link href="/order" className="max-sm:order-2">
                <Button
                  title="Оформити замовлення"
                  onClick={() => setOpen(false)}
                />
              </Link>
              <div className="max-sm:order-1 max-sm:border-none max-sm:text-xl border p-3 text-slate-600 font-sans text-2xl font-semibold rounded">
                {cartTotal}.00 UAH
              </div>
            </div>
          )}
        </DialogContent>
      </Drawer>
    </Fragment>
  );
}
