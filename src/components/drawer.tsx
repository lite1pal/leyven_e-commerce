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

export default function DrawerScrollable() {
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
        <DialogContent>
          <List>
            {[...new Array(11)].map((_, index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => setOpen(false)}>
                  Item {index}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Drawer>
    </React.Fragment>
  );
}
