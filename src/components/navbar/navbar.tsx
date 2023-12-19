import React from "react";
import SearchInput from "./components/searchInput";
import { Footer } from "flowbite-react";
import Link from "next/link";
import NavItem from "./components/navItem";
import Sidebar from "./components/sidebar";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Icons from "./components/icons";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      className={`sticky z-50 bg-white top-0 flex transition flex-col max-sm:px-2 px-8`}
    >
      <div
        className={`flex py-6 max-sm:border-b-2 max-sm:mb-3 max-xl:py-4 items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <Sidebar {...{ session }} />
          <Footer.Brand
            href="/"
            src="/small_logo.jpg"
            alt="Flowbite Logo"
            name=""
            className="max-sm:pt-4"
          />
        </div>
        <ul className="flex max-xl:hidden items-center gap-20 text-lg justify-center">
          <Link href="/">
            <li className="border-b-blue-600 hover:text-blue-600 duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Каталог
            </li>
          </Link>
          <Link href="/veterynarny">
            <li className="border-b-blue-600 hover:text-blue-600 duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Ветеринарія
            </li>
          </Link>
          <Link href="/food">
            <li className="border-b-blue-600 hover:text-blue-600 duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Годування
            </li>
          </Link>
          <Link href="/outdoors">
            <li className="border-b-blue-600 hover:text-blue-600 duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
              Подорожі
            </li>
          </Link>
        </ul>

        <Icons {...{ session }} />
      </div>
      <div className="mx-auto mb-3 sm:hidden">
        <SearchInput />
      </div>
      <ul className="xl:hidden max-md:hidden flex border-t-2 items-center gap-5 md:gap-20 text-lg justify-center p-4">
        <NavItem link="/" title="Каталог" />
        <NavItem link="/veterynarny" title="Ветеринарія" />
        <NavItem link="/food" title="Годування" />
        <NavItem link="/outdoors" title="Подорожі" />
      </ul>
    </nav>
  );
}
