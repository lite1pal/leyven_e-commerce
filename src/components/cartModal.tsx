"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function CartModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="text-white bg-blue-600 hover:text-blue-600 hover:bg-white transition border border-blue-600 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        В корзину
      </button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Корзина</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Пусто
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>
            Оформити замовлення
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Видалити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
