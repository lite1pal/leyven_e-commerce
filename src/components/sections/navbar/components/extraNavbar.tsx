"use client";

import PlaceIcon from "@mui/icons-material/Place";
import { useState, useEffect } from "react";

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
      className={`hidden w-full flex-col items-center justify-between gap-3 border-b border-slate-300 py-2 transition sm:gap-1.5 lg:flex lg:flex-row`}
    >
      <div className="flex gap-10 text-sm sm:text-base">
        <div className="w-fit cursor-pointer transition hover:text-blue-600">
          Оплата і доставка
        </div>

        <div className="w-fit cursor-pointer transition hover:text-blue-600">
          Дисконтна програма
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
        <div className="text-sm italic sm:text-base">
          <PlaceIcon />
          вул. Чернявського, 46, Звягель, Україна
        </div>

        <div className="hidden h-5 w-3 border-r-2 border-black opacity-50 sm:flex"></div>

        <div className="rounded-full border p-1 text-sm font-medium sm:text-base">
          +380 (50) 598-74-77
        </div>
      </div>
    </div>
  );
}
