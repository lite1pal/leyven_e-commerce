"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import MenuIcon from "@/icons/menu";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setOpen(inOpen);
    };

  return (
    <div className="flex xl:hidden">
      <div
        className="flex cursor-pointer items-center gap-2 rounded-lg text-lg font-medium transition duration-300 hover:scale-125"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </div>
      <Drawer size="md" open={open} onClose={toggleDrawer(false)}>
        <Box role="presentation" onClick={toggleDrawer(false)}>
          <Link
            prefetch={false}
            href="/"
            className="flex w-full items-center gap-3 p-5"
          >
            <img
              src="/new-logo-remove-bg.png"
              alt="Leyven logo"
              className="w-10"
            />
            <div className="text-lg font-light">Лейвен</div>
          </Link>

          <Divider />
          <div className="p-2 text-lg font-semibold">Категорії</div>

          <List sx={{ marginTop: "1.5rem" }}>
            <ListItem>
              <Link href="contacts">Контакти</Link>
            </ListItem>
            <ListItem>
              <Link href="about">Про компанію</Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
