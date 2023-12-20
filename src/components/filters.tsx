import PriceFilter from "./filterPrice";
import FilterRadioButton from "./filterRadioButton";
import SwitchAvailability from "./switchAvailability";

export default function Filters() {
  return (
    <div
      style={{ marginLeft: "1rem" }}
      className="bg-white flex flex-col gap-6 max-xl:hidden h-fit w-44 p-5  shadow rounded-lg max-w-sm  border border-gray-200"
    >
      {/* <SwitchAvailability /> */}
      <FilterRadioButton header="В наявності" labels={["Так", "Ні"]} />
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
      {/* <FilterRadioButton
        header="Ціна"
        labels={[
          "Менше 50грн",
          "від 50 до 250грн",
          "від 250 до 1000грн",
          "від 1000грн",
        ]}
      /> */}
    </div>
  );
}
