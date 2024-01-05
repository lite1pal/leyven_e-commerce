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
  { name: "Аналітика", href: "/dashboard/orders" },
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

        <div className="flex">
          <div className="sticky top-0 flex h-screen w-2/12 flex-col gap-3 bg-slate-700 p-4 text-sm text-slate-300">
            <Link
              href="/catalog"
              className="flex items-center gap-2 hover:text-white"
            >
              <ExitToAppIcon />
              До сайту
            </Link>
            <ul className="flex flex-col gap-1">
              {navigation.map((nav, i) => {
                return <NavItem key={i} {...{ nav }} />;
              })}
            </ul>
          </div>

          <div className="w-10/12">{children}</div>
        </div>
      </body>
    </html>
  );
}
