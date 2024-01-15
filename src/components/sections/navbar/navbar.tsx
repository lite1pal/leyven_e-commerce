import React, { Suspense } from "react";
import SearchInput from "./components/searchInput";
import Link from "next/link";
import Sidebar from "./components/sidebar";
import Icons from "./components/icons";
import { Spinner } from "flowbite-react";
import ExtraNavbar from "./components/extraNavbar";

export default async function Navbar() {
  return (
    <nav
      // style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      className={`sticky top-0 z-50 flex flex-col rounded-lg bg-white px-2 shadow transition sm:px-8`}
    >
      <div
        className={`flex items-center justify-between py-3 font-normal max-xl:py-3 max-sm:px-2`}
      >
        <Link href="/" className="hidden xl:flex">
          <div className="group flex w-16 items-center gap-2.5 sm:w-36">
            <img
              src="/new-logo-remove-bg.png"
              alt="Leyven logo"
              className="hidden w-10 sm:flex"
              // sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="hidden text-lg font-light transition duration-100 group-hover:text-blue-600 sm:flex">
              Лейвен
            </div>
          </div>
        </Link>
        <Sidebar />
        <ul className="flex w-1/2 items-center justify-evenly text-lg max-xl:hidden">
          {/* <li className="h-5 w-3 border-r-2 border-black opacity-50"></li> */}
          <Link href="/allProducts">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Каталог
            </li>
          </Link>
          <Link href="/category/veterinarni-zasobi-preparati">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Ветеринарія
            </li>
          </Link>
          <Link href="/category/goduvannya-domashnih-tvarin">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Годування
            </li>
          </Link>
          <Link href="/category/tovari-dlya-progulyanok">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Подорожі
            </li>
          </Link>
          <Link href="/category/tovari-dlya-komfortu">
            <li className="duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
              Іграшки
            </li>
          </Link>
        </ul>
        <div className="flex items-center gap-1">
          <div className="mx-5">
            <SearchInput />
          </div>
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <Icons />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
