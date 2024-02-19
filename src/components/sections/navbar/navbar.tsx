import React, { Suspense } from "react";
import SearchInput from "./components/search/search";
import Link from "next/link";
import Sidebar from "./components/sidebar";
import Icons from "./components/icons";
import { Spinner } from "flowbite-react";

const navItems = [
  { route: "/allProducts", name: "Каталог" },
  {
    route: "/category/105-veterinarni-zasobi-ta-preparati",
    name: "Ветеринарія",
  },
  {
    route: "/category/91-goduvannya-domashnih-tvarin-i-ptahiv",
    name: "Годування",
  },
  {
    route: "/category/96-tovari-dlya-progulyanok-i-podorozhej-z-tvarinami",
    name: "Подорожі",
  },
  {
    route: "/category/99-tovari-dlya-komfortu-domashnih-tvarin",
    name: "Іграшки",
  },
];

export default async function Navbar() {
  return (
    <nav
      className={`sticky top-0 z-50 flex flex-col rounded-lg bg-white px-2 shadow transition sm:px-8`}
    >
      <div
        className={`flex items-center justify-between py-3 font-normal max-xl:py-3 max-sm:px-2`}
      >
        <Link href="/" className="hidden xl:flex">
          <div className="group flex w-16 items-center gap-2.5 sm:w-36">
            <img
              src="/new-logo-remove-bg.png"
              alt="Лейвен логотип"
              className="hidden w-10 sm:flex"
              // sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="hidden text-lg font-light text-blue-600 transition duration-100 sm:flex">
              Лейвен
            </div>
          </div>
        </Link>
        <Sidebar />
        <ul className="flex w-1/2 items-center justify-evenly text-lg max-xl:hidden">
          {/* <li className="h-5 w-3 border-r-2 border-black opacity-50"></li> */}
          {navItems.map((item) => {
            return (
              <NavItem key={item.route} route={item.route} name={item.name} />
            );
          })}
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

function NavItem({ route, name }: { route: string; name: string }) {
  return (
    <Link href={route}>
      <li className="group cursor-default border-opacity-0 transition duration-300 hover:border-opacity-100 hover:text-blue-600">
        {name}
        <span className="block h-0.5 max-w-0 bg-blue-600 transition-all duration-300 group-hover:max-w-full"></span>
      </li>
    </Link>
  );
}
