import { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NavItem from "@/app/(dashboard)/nav-item";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";

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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen bg-gray-100 font-sans text-slate-900 antialiased",
          fontSans.variable,
        )}
      >
        <SpeedInsights />
        <Toaster />
        <ToasterShadcn />

        <div className="container mx-auto flex flex-col">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center gap-10">
              <Link
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "bg-yellow-300",
                })}
                href="/"
              >
                Leyven
              </Link>
              <div className="flex items-center gap-6 text-sm">
                {navigation.map((item, i) => {
                  return (
                    <Link key={i} href={item.href}>
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
