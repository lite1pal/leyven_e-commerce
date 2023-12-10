"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
        className="hover:bg-slate-200 transition rounded"
        onClick={() => setOpenModal(true)}
      >
        {icon === "person" ? (
          <PersonIcon />
        ) : (
          <button className="px-4 py-2 rounded bg-blue-600 border-2 border-blue-600 hover:bg-white text-white transition text-sm hover:text-blue-600">
            В корзину
          </button>
        )}
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 flex flex-col items-center">
            <h3 className="text-xl w-fit font-medium text-gray-900 dark:text-white">
              Вхід до акаунту
            </h3>
            <p className="text-center text-slate-500">
              Ввійдіть у ваш акаунт за допомогою одного з наступних провайдерів
            </p>

            <div className="w-fit flex flex-col font-sans items-center gap-2 text-xs">
              <GoogleButton onClick={() => signIn("google")} />
              {/* <FacebookLoginButton /> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
