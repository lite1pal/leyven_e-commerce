import { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NavItem from "@/domains/dashboard/layout/components/navItem";

const navigation = [
  { name: "Замовлення", href: "/dashboard/orders" },
  {
    name: "Управління товарами",
    href: "/dashboard/products",
  },
];

export const metadata: Metadata = {
  title: "Панель адміністрування Leyven",
  description: "Панель для управління вебсайтом",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights />
        <Toaster />

        <div className="flex min-h-screen">
          <div className="sticky top-0 hidden h-screen w-2/12 flex-col gap-3 border-r border-gray-500 border-opacity-20 bg-gray-100 py-4 text-sm text-slate-900 sm:flex">
            <Link
              href="/"
              className="flex items-center gap-2 border-b border-gray-500 border-opacity-20 pb-4 pl-4 hover:text-slate-700"
            >
              <ExitToAppIcon fontSize="small" />
              До сайту
            </Link>
            <ul className="flex flex-col gap-1 pl-4">
              {navigation.map((nav, i) => {
                return <NavItem key={i} {...{ nav }} />;
              })}
            </ul>
          </div>

          <div className="w-full bg-gray-100 sm:w-10/12">{children}</div>

          <div className="dropdown dropdown-end dropdown-bottom absolute right-0 top-2 flex  bg-white sm:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-slate-50 p-2 shadow"
            >
              <li>
                <Link href="/">До сайту</Link>
              </li>
              <li>
                <Link href="/dashboard/orders">Замовлення</Link>
              </li>
              <li>
                <Link href="/dashboard/products">Управління товарами</Link>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
