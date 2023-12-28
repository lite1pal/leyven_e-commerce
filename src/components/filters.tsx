"use client";

import { useState } from "react";
import PriceFilter from "./filterPrice";
import FilterRadioButton from "./filterRadioButton";
import SwitchAvailability from "./switchAvailability";
import { Accordion, AccordionContent, Modal } from "flowbite-react";

export default function Filters() {
  return (
    <div
      style={{ marginLeft: "1rem" }}
      className="bg-white flex flex-col gap-6 max-xl:hidden h-fit w-48 p-5 shadow rounded-lg max-w-sm border border-gray-200"
    >
      <FilterRadioButton
        header="В наявності"
        labels={["Так", "Ні"]}
        link="?instock="
      />
      <FilterRadioButton
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
  );
}
