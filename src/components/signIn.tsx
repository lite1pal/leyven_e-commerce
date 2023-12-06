"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Вхід
            </h3>
            <div>
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
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Ваш пароль" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
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
            </div>
            <div className="w-full">
              <Button>Ввійти до аккаунту</Button>
            </div>
            <div className="flex cursor-pointer justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Немає аккаунту?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Створити аккаунт
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
