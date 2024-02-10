"use client";

import PlaceIcon from "@mui/icons-material/Place";
import { useState, useEffect } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Link from "next/link";

export default function ExtraNavbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    setPrevScrollPos(window.scrollY);
    window.addEventListener("scroll", function () {
      // current scroll position
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 30) {
        // user has scrolled up
        setShowNav(false);
      } else {
        // user has scrolled down
        setShowNav(true);
      }

      // update previous scroll position
      setPrevScrollPos(currentScrollPos);
      return () => window.removeEventListener("scroll", () => {});
    });
  }, [prevScrollPos]);

  return (
    <div
      className={`hidden w-full flex-col items-center justify-between gap-3 py-1 font-light text-slate-600 transition sm:gap-1.5 lg:flex lg:flex-row`}
    >
      <div className="flex gap-10 text-sm">
        <Link
          href="/paymentAndShipping"
          className="w-fit cursor-pointer transition hover:text-blue-600"
        >
          Оплата і доставка
        </Link>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
        <div className="flex items-center gap-1 text-sm text-slate-600">
          <div className="text-blue-600">
            <PlaceIcon fontSize="small" />
          </div>
          вул. Чернявського, 46, Звягель, Україна
        </div>

        <div className="hidden h-5 w-3 border-r-2 border-slate-900 opacity-50 sm:flex"></div>

        <div className="flex items-center gap-1 rounded-full  p-1.5 text-sm font-semibold text-slate-600 sm:text-base">
          <div className="text-blue-600">
            <LocalPhoneIcon fontSize="small" />
          </div>
          +380 (50) 598-74-77
        </div>
      </div>
    </div>
  );
}
