"use client";

import { useState } from "react";
import PriceFilter from "./filterPrice";
import FilterRadioButton from "./filterRadioButton";
import SwitchAvailability from "./switchAvailability";
import { Accordion, AccordionContent, Modal } from "flowbite-react";
import Button from "./base/Button";

export default function FiltersMobile() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="hidden items-center justify-center max-xl:flex">
      {/* <div
        className="border-none bg-transparent"
        onClick={() => setOpenModal(true)}
      >
        Фільтри
      </div> */}
      <div className="mb-4">
        <Button onClick={() => setOpenModal(true)} title="Фільтри" />
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Фільтри</Modal.Header>
        <Modal.Body className="flex flex-col gap-3">
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
        </Modal.Body>
      </Modal>
    </div>
  );
}
