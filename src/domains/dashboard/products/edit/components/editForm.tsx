"use client";

import Button from "@/components/base/Button";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { Divider } from "@mui/material";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditForm({ data }: { data: Product }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (fields: FieldValues) => {
    try {
      fields.id = data.id;
      const res = await fetch(`${API_URL}/product`, {
        method: "PUT",
        body: JSON.stringify(fields),
      });
      const parsedRes = await res.json();
      if (!res.ok) {
        toast.error("Помилка зміни");
      }
      toast.success("Зміна успішна!");
      router.push("/dashboard/products");
    } catch (err) {
      console.error(err, "Failed to edit product data");
    }
    return "";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
      <div className=" mt-5 flex w-full flex-col gap-3">
        <div className="text-lg font-medium">Змінити товар</div>
        <Divider />
        <div className="mb-6 flex max-w-2xl flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Назва товару" />
            </div>
            <TextInput
              defaultValue={data.title}
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
              defaultValue={data.price}
              className="w-fit"
              id="price"
              type="number"
              shadow
              {...register("price")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="img" value="Посилання на картинку" />
            </div>
            <TextInput
              defaultValue={data.img}
              id="img"
              type="text"
              shadow
              {...register("img")}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="img" value="Знижка %" />
            </div>
            <TextInput
              defaultValue={data.discount}
              id="discount"
              type="number"
              shadow
              {...register("discount")}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="img" value="Наявність" />
            </div>
            <select
              defaultValue={data.availability}
              {...register("Наявність", { required: true })}
            >
              <option value="out of stock">Ні</option>
              <option value="in stock">Так</option>
            </select>
          </div>
        </div>
        <Button type="submit" title="Змінити" />
      </div>
    </form>
  );
}
