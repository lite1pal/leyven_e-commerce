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

export default function SignInComponent() {
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
        <PersonIcon />
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
            {/* <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Ваш email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div> */}
            {/* <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Ваш пароль" />
              </div>
              <TextInput id="password" type="password" required />
            </div> */}
            {/* <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Запам`ятати</Label>
              </div>
              <a
                href="#"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Забули пароль?
              </a>
            </div> */}
            <div className="w-fit flex flex-col font-sans items-center gap-2 text-xs">
              <GoogleButton onClick={() => signIn("google")} />
              {/* <FacebookLoginButton /> */}
            </div>
            {/* <div className="flex cursor-pointer justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Немає аккаунту?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Створити аккаунт
              </a>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
