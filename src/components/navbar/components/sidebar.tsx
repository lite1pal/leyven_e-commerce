"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import MenuIcon from "@/icons/menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Footer } from "flowbite-react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import HealingIcon from "@mui/icons-material/Healing";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Link from "next/link";
import { Session } from "next-auth";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      //   if (
      //     event.type === "keydown" &&
      //     ((event as React.KeyboardEvent).key === "Tab" ||
      //       (event as React.KeyboardEvent).key === "Shift")
      //   ) {
      //     return;
      //   }

      setOpen(inOpen);
    };

  return (
    <div className="flex md:hidden">
      <div
        className="flex cursor-pointer items-center gap-2 rounded-lg text-lg font-medium transition duration-300 hover:scale-125"
        onClick={toggleDrawer(true)}
        // onMouseEnter={toggleDrawer(true)}
      >
        <MenuIcon />
      </div>
      <Drawer size="sm" open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
          // onMouseLeave={toggleDrawer(false)}
        >
          {/* <Link href="/" className="flex w-full items-center gap-3 p-5">
            <img src="/small_logo.jpg" alt="Leyven logo" className="w-20" />
            <div className="text-lg font-medium">Головна</div>
          </Link> */}

          <Divider />
          <List>
            <Link href="/food">
              <ListItem>
                <ListItemButton sx={{ padding: "1rem" }}>
                  <FoodBankIcon color="primary" />
                  <div>Годування тварин</div>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/veterynarny">
              <ListItem>
                <ListItemButton sx={{ padding: "1rem" }}>
                  <HealingIcon color="primary" />
                  <div>Ветеринарні засоби</div>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/animalcare">
              <ListItem>
                <ListItemButton sx={{ padding: "1rem" }}>
                  <CelebrationIcon color="primary" />
                  <div>Товари для догляду</div>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/outdoors">
              <ListItem>
                <ListItemButton sx={{ padding: "1rem" }}>
                  <CelebrationIcon color="primary" />
                  <div>Товари для подорожей</div>
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem>
              <Link href="contacts">Контакти</Link>
            </ListItem>
            <ListItem>
              <Link href="about">Про компанію</Link>
            </ListItem>
            {/* <ListItem>Відгуки</ListItem>
            <ListItem>Сертифікації</ListItem>
            <ListItem>Цікаві факти</ListItem> */}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
