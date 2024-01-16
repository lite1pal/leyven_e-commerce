"use client";

import { Modal } from "flowbite-react";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";

export default function SignInComponent({ icon = "person" }) {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className={`flex cursor-pointer items-center gap-2.5 rounded-lg border-2 border-blue-600 border-opacity-0 p-1.5 text-center text-lg transition duration-300 hover:border-opacity-100 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        <PersonIcon sx={{ color: "#2563eb" }} />
        <div>Вхід</div>
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center space-y-6">
            <h3 className="w-fit text-xl font-medium dark:text-white">
              Вхід до акаунту
            </h3>
            <p className="text-center text-slate-500">
              Ввійдіть у ваш акаунт за допомогою одного з наступних провайдерів
            </p>

            <div className="flex w-fit flex-col items-center gap-2 font-sans text-xs">
              <GoogleButton onClick={() => signIn("google")} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
