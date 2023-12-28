import React from "react";
import SearchInput from "./components/searchInput";
import Link from "next/link";
import NavItem from "./components/navItem";
import Sidebar from "./components/sidebar";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Icons from "./components/icons";
import Contact from "./components/contact";
import { Footer } from "flowbite-react";
import PlaceIcon from "@mui/icons-material/Place";
import ExtraNavbar from "./components/extraNavbar";
import { AnimatePresence, motion } from "framer-motion";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      className={`sticky top-0 z-50 flex flex-col bg-white px-8 transition max-sm:px-2`}
    >
      <ExtraNavbar />

      <div
        className={`flex items-center justify-between py-3 font-normal max-xl:py-4 max-sm:mb-3 max-sm:border-b-2`}
      >
        <Link href="/">
          <div className="flex items-center gap-1.5">
            <Footer.Brand
              href="/"
              src="/small_logo.jpg"
              alt="Flowbite Logo"
              name=""
              className="max-sm:pt-4"
            />
            <div className="hidden text-lg sm:flex">Головна</div>
            {/* <Sidebar {...{ session }} /> */}
          </div>
        </Link>
        <ul className="flex w-1/2 items-center justify-evenly text-lg max-xl:hidden">
          <li className="h-5 w-3 border-r-2 border-black opacity-50"></li>
          <Link href="/">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Каталог
            </li>
          </Link>
          <Link href="/veterynarny">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Ветеринарія
            </li>
          </Link>
          <Link href="/food">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Годування
            </li>
          </Link>
          <Link href="/outdoors">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Подорожі
            </li>
          </Link>
          <Link href="/outdoors">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Іграшки
            </li>
          </Link>
        </ul>

        <div className="mx-5 max-sm:hidden">
          <SearchInput />
        </div>
        <Icons {...{ session }} />
      </div>
      <div className="mx-auto mb-3 sm:hidden">
        <SearchInput />
      </div>
      <ul className="flex items-center justify-center gap-5 border-t-2 p-4 text-lg max-sm:hidden sm:gap-20 xl:hidden">
        <NavItem link="/" title="Каталог" />
        <NavItem link="/veterynarny" title="Ветеринарія" />
        <NavItem link="/food" title="Годування" />
        <NavItem link="/outdoors" title="Подорожі" />
        <NavItem link="/outdoors" title="Іграшки" />
      </ul>
    </nav>
  );
}
