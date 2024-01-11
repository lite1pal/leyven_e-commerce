"use client";

import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Divider } from "@mui/joy";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CardCart from "@/components/cards/cardCart";
import { useCart } from "react-use-cart";
import Button from "@/components/base/Button";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  const { items, isEmpty, cartTotal, emptyCart } = useCart();

  return (
    <Fragment>
      <div
        className="flex cursor-pointer gap-3 rounded-lg border-2 border-blue-600 border-opacity-0 p-1.5 text-lg transition duration-300  hover:border-opacity-100 hover:text-blue-600"
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={items.length} badgeInset="-20%">
          <ShoppingCartIcon />
        </Badge>
        <div className="hidden sm:flex">Кошик</div>
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
            className="ml-5 text-sm font-light underline"
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

          {!isEmpty && (
            <div className="fixed bottom-0 right-0 z-20 mx-auto mt-5 flex w-full items-center gap-5 border-2 bg-white p-5 max-lg:flex-col max-lg:gap-3">
              <Link href="/order" className="max-sm:order-2">
                <Button
                  title="Оформити замовлення"
                  onClick={() => setOpen(false)}
                />
              </Link>
              <div className="rounded border p-3 font-sans text-2xl font-semibold text-slate-600 max-sm:order-1 max-sm:border-none max-sm:text-xl">
                {cartTotal}.00 UAH
              </div>
            </div>
          )}
        </DialogContent>
      </Drawer>
    </Fragment>
  );
}
