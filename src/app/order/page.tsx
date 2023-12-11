import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { auth } from "../api/auth/[...nextauth]/auth";
import { useState } from "react";
import { FormControl } from "@mui/joy";
import InputLabel from "@mui/material/InputLabel";
import CitySelect from "@/components/citySelect";
import WarehouseSelect from "@/components/warehouseSelect";

export default async function OrderScreen() {
  const session = await auth();
  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="text-2xl font-semibold -ml-1">Оформлення замовлення</div>
      <div className="text-lg font-medium">Ваші контактні дані</div>
      <form className="flex max-w-2xl flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Ваша пошта" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder={"name@gmail.com"}
            required
            value={session?.user?.email!}
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="number" value="Ваш номер телефону" />
          </div>
          <TextInput id="number" type="phone" required shadow />
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Ваше ім`я" />
            </div>
            <TextInput id="name" type="text" required shadow />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="last-name" value="Ваша фамілія" />
            </div>
            <TextInput id="last-name" type="text" required shadow />
          </div>
        </div>
        <div className="text-lg font-medium">Доставка</div>
        <CitySelect />
        <WarehouseSelect />

        <Link href="/order_success">
          <Button className="mt-1 w-fit mx-auto">Замовити</Button>
        </Link>
      </form>
    </div>
  );
}
