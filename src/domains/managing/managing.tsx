"use client";

import Button from "@/components/base/Button";
import FilterRadioButton from "@/components/filterRadioButton";
import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

export default function ManagingView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex flex-col gap-4 px-5">
      <div className="text-xl font-medium">Управління товарами</div>
      {/* <div className="flex flex-col gap-3">
      <div className="text-lg">Додати товар</div>
    </div> */}
      <div className=" mt-5 flex w-full flex-col gap-3">
        <div className="text-lg font-medium">Додати товар</div>
        <div className="mb-6 flex max-w-2xl flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Назва товару" />
            </div>
            <TextInput
              id="title"
              type="text"
              required
              shadow
              {...register("title", {
                required: true,
              })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Ціна товару" />
            </div>
            <TextInput
              className="w-fit"
              id="price"
              type="text"
              shadow
              {...register("price")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="img" value="Посилання на картинку" />
            </div>
            <TextInput id="img" type="text" shadow {...register("img")} />
          </div>
          <FilterRadioButton header={"В наявності"} labels={["Так", "Ні"]} />
        </div>
        <Button title="Додати" />
      </div>
    </div>
  );
}
