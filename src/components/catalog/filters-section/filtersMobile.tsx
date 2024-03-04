"use client";

import { useState } from "react";
import FilterRadioButton from "./filterRadioButton";
import CloseIcon from "@mui/icons-material/Close";
import PriceFilter from "./filterPrice";
import TuneIcon from "@mui/icons-material/Tune";

export default function FiltersMobile() {
  return (
    <div className="pointer-events-none items-center justify-center opacity-0 max-xl:pointer-events-auto max-xl:opacity-100">
      <div className="mb-4">
        <div
          className="flex items-center gap-2.5"
          onClick={() => {
            (
              document.getElementById("filtersModal") as HTMLFormElement
            ).showModal();
          }}
        >
          Фільтри
          <TuneIcon fontSize="small" />
        </div>
      </div>

      <dialog id="filtersModal" className="modal px-3">
        <div className="modal-box flex w-full max-w-sm flex-col gap-3 bg-white text-black">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 bg-white pb-4">
            <h3 className="text-lg font-bold">Фільтри</h3>
            <form method="dialog">
              <button className="h-fit cursor-pointer rounded-lg border-2 border-blue-600 border-opacity-0 p-1 transition duration-300 hover:border-opacity-100 hover:text-blue-600">
                <CloseIcon />
              </button>
            </form>
          </div>

          <FilterRadioButton
            type="instock"
            header="В наявності"
            labels={["Так", "Ні"]}
            link="?instock="
          />
          <FilterRadioButton
            type="country"
            header="Країна виробник"
            labels={[
              "Німеччина",
              "Італія",
              "Словенія",
              "Україна",
              "Іспанія",
              "США",
              "Тайвань",
            ]}
          />
          <FilterRadioButton
            type="brand"
            header="Виробник"
            labels={[
              "Happy Cat",
              "Хома",
              "Tropiclean",
              "Happy Dog",
              "Укрзооветпромпостач",
              "KRKA",
              "Shuttle",
              "Vetbio Group",
              "Zoetis",
              "Trixie",
              "Бровафарма",
              "Rolls Rocky",
              "Pettric",
              "Smartis",
              "Dolfos",
              "Geoplast",
              "Magic Pet",
              "Invesa",
              "Sonic",
              "GEORPLAST",
              "КРОНТЕС",
              "Веда",
              "UFO",
              "Purflux",
              "PetQm",
              "Bayer",
              "BioTestLab",
              "Cherie",
            ]}
          />
          <PriceFilter />
        </div>
      </dialog>
    </div>
  );
}
