"use client";

import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import DrawerScrollable from "../drawer";
import styles from "./navbar.module.scss";
import SearchInput from "./components/searchInput";
import {
  Alert,
  Avatar,
  Button,
  Footer,
  ListGroup,
  Toast,
} from "flowbite-react";
import { HiFire } from "react-icons/hi";
import SignInComponent from "../signIn";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import Link from "next/link";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  return (
    <nav
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      className={`sticky z-50 bg-white top-0 flex transition flex-col px-8`}
    >
      <div className={`flex py-2 items-center justify-between`}>
        {/* <div className="text-2xl cursor-default">LeyVen</div> */}
        <Footer.Brand
          href="/"
          src="https://images.prom.ua/4809555867_w100_h50_leyven.jpg"
          alt="Flowbite Logo"
          name=""
        />
        <ul className="flex items-center gap-20 text-lg justify-center p-4">
          <Link href="/">
            <li className="border-b-black duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Каталог
            </li>
          </Link>
          <Link href="/contacts">
            <li className="border-b-black duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Контакти
            </li>
          </Link>
          <Link href="/about">
            <li className="border-b-black duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Про нас
            </li>
          </Link>
          <Link href="/collaboration">
            <li className="border-b-black duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Співпраця
            </li>
          </Link>
        </ul>

        <div className="flex gap-5 items-center">
          <SearchInput />
          <SignInComponent />
          <Dropdown>
            <MenuButton
              sx={{
                padding: 0,
                border: "none",
                borderRadius: "50%",
                height: "fit-content",
              }}
            >
              <Avatar
                onClick={toggleUserDropdown}
                img="https://media.licdn.com/dms/image/D4D35AQEupibI8CO8xw/profile-framedphoto-shrink_400_400/0/1692984044624?e=1702468800&v=beta&t=DwzogxzoP2D8fGxueuEhVsE0hzKV3ooyRVYslfdptsg"
                rounded
                size={"sm"}
              />
            </MenuButton>
            <Menu>
              <MenuItem>Історія замовлень</MenuItem>
              <MenuItem>Вийти</MenuItem>
            </Menu>
          </Dropdown>

          <DrawerScrollable />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
