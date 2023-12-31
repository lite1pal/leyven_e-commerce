"use client";

import { useState } from "react";
import FilterRadioButton from "./filterRadioButton";
import { Accordion, AccordionContent, Modal } from "flowbite-react";
import Button from "./base/Button";
import CloseIcon from "@mui/icons-material/Close";
import PriceFilter from "./filterPrice";

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
        <Button
          onClick={() => {
            setOpenModal(true);
            (
              document.getElementById("filtersModal") as HTMLFormElement
            ).showModal();
          }}
          title="Фільтри"
        />
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

      {/* <Modal show={openModal} onClose={() => setOpenModal(false)}>
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
      </Modal> */}
    </div>
  );
}
