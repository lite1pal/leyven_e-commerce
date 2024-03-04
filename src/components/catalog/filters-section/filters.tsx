"use client";

import PriceFilter from "./filterPrice";
import FilterRadioButton from "./filterRadioButton";

export default function Filters() {
  return (
    <div
      style={{ marginLeft: "1rem" }}
      className="flex h-fit w-48 max-w-sm flex-col gap-5 rounded-lg bg-white p-5 max-xl:hidden"
    >
      <FilterRadioButton
        type="instock"
        header="В наявності"
        labels={["Всі", "Так", "Ні"]}
      />
      <FilterRadioButton
        type="country"
        header="Країна виробник"
        labels={[
          "Всі",
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
          "Всі",
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
