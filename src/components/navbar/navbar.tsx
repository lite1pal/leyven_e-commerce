import React from "react";

import DrawerScrollable from "./components/drawer";
import SearchInput from "./components/searchInput";
import { Footer } from "flowbite-react";
import Link from "next/link";
import NavItem from "./components/navItem";
import Sidebar from "./components/sidebar";
import UserDropdown from "./components/userDropdown";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { API_URL } from "@/config/api";

export default async function Navbar() {
  const session = await auth();

  // gets current cart
  const res = await fetch(`${API_URL}/cart?email=${session?.user?.email}`);
  const cart = await res.json();
  console.log(cart);

  return (
    <nav
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      className={`sticky z-50 bg-white top-0 flex transition flex-col max-sm:px-2 px-8`}
    >
      <div
        className={`flex py-6 max-sm:border-b-2 max-sm:mb-3 max-sm:py-3 items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <Sidebar />
          <Footer.Brand
            href="/"
            src="https://images.prom.ua/4809555867_w100_h50_leyven.jpg"
            alt="Flowbite Logo"
            name=""
            className="max-sm:pt-4"
          />
        </div>
        <ul className="flex max-xl:hidden items-center gap-20 text-lg justify-center">
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
          <div className="max-sm:hidden">
            <SearchInput />
          </div>

          <UserDropdown session={session} />
          <DrawerScrollable cart={cart} />
        </div>
      </div>
      <div className="mx-auto mb-3 sm:hidden">
        <SearchInput />
      </div>
      <ul className="xl:hidden max-md:hidden flex border-t-2 items-center gap-5 md:gap-20 text-lg justify-center p-4">
        <NavItem link="/" title="Каталог" />
        <NavItem link="/contacts" title="Контакти" />
        <NavItem link="/about" title="Про нас" />
        <NavItem link="/collaboration" title="Співпраця" />
      </ul>
    </nav>
  );
}
