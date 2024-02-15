"use client";

import Button from "@/components/base/Button";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { Divider } from "@mui/material";
import { Label, TextInput, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormHeader from "./formHeader";
import FormField from "./formField";
import FormSelectField from "./formSelectField";

export default function EditForm({ data }: { data: Product }) {
  const router = useRouter();
  const { register, handleSubmit, getFieldState, watch } = useForm();

  const watchCategory = watch("category", ""); // you can supply default value as second argument

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

  console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-4">
      {/* <FormHeader>Змінити товар</FormHeader>
      <Divider /> */}
      <div className="mb-6 flex max-w-2xl flex-col gap-4">
        <FormField
          id="title"
          label="Назва"
          defaultValue={data.title}
          required
          register={register}
        />

        <FormField
          id="description"
          label="Опис"
          type="textarea"
          register={register}
          defaultValue={data.description}
          required
          rows={15}
        />

        <FormField
          id="price"
          label="Ціна"
          defaultValue={data.price}
          type={"number"}
          required
          register={register}
        />

        <FormField
          id="img"
          label="Посилання на картинку"
          defaultValue={data.img}
          disabled
          register={register}
          required
        />

        <FormField
          id="discount"
          label="Знижка %"
          defaultValue={data.discount}
          register={register}
          type="number"
          required
        />

        <FormField
          id="unique_id"
          label="Унікальне id, Prom.ua"
          register={register}
          defaultValue={data.unique_id}
          disabled
          required
        />

        <FormField
          id="unique_id_1c"
          label="Унікальне id, 1C"
          register={register}
          defaultValue={data.unique_id_1c}
          disabled
          required
        />

        <FormField
          id="barcode"
          label="Штрихкод"
          register={register}
          defaultValue={data.barcode!}
          disabled
        />

        <FormField
          id="artycul"
          label="Артикул"
          register={register}
          defaultValue={data.artycul!}
          disabled
        />

        <FormField
          id="quantity"
          label="Кількість"
          type="number"
          register={register}
          defaultValue={data.quantity}
          required
        />

        <FormSelectField
          id="availability"
          label="Наявність"
          register={register}
        >
          <option value="out of stock">Ні</option>
          <option value="in stock">Так</option>
        </FormSelectField>

        <div>
          <div className="mb-2 block">
            <Label
              className="text-slate-900"
              htmlFor="img"
              value="Характеристики"
            />
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {data.info.map((item: any, i) => {
              return (
                <div
                  key={i}
                  className="flex w-fit cursor-default gap-2 rounded-lg border p-1 text-slate-900"
                >
                  <div>{item["g:attribute_name"]._text}</div>
                  <div>{"-"}</div>
                  <div>{item["g:attribute_value"]._text}</div>
                </div>
              );
            })}
          </div>
        </div>

        <FormField
          id="breadcrumbs"
          label="Категорія"
          register={register}
          defaultValue={data.breadcrumbs}
          disabled
          required
        />
      </div>
      <Button type="submit" title="Змінити" />
    </form>
  );
}
