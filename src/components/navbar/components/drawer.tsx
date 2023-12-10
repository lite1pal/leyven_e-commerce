"use client";

import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Divider } from "@mui/joy";

export default function DrawerScrollable({ cart }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div
        className="transition hover:bg-slate-200 rounded"
        onClick={() => setOpen(true)}
      >
        <ShoppingCartIcon />
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>Корзина</DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: "0.78rem" }}>
          <div className="mb-2">Ваш кошик порожній.</div>
          <div>
            Не вагайтеся і перегляньте наш каталог, щоб знайти щось корисне для
            Вашого пухнастого друга!
          </div>
        </DialogContent>
      </Drawer>
    </React.Fragment>
  );
}
