"use client";

import Button from "@/components/base/Button";
import { API_URL } from "@/config/api";
import { categories } from "@/data/categories";
import { type Product } from "@/types";
import { Divider } from "@mui/material";
import { Label, TextInput, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
      <div className=" mt-5 flex w-full flex-col gap-3">
        <div className="text-lg font-medium">Змінити товар</div>
        <Divider />
        <div className="mb-6 flex max-w-2xl flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Назва" />
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
              <Label htmlFor="description" value="Опис" />
            </div>
            <Textarea
              rows={15}
              defaultValue={data.description}
              id="description"
              // type="text"
              required
              shadow
              {...register("description", {
                required: true,
              })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Ціна" />
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
              <Label htmlFor="unique_id" value="Унікальне id, Prom.ua" />
            </div>
            <TextInput
              disabled
              defaultValue={data.unique_id}
              id="unique_id"
              type="text"
              shadow
              // {...register("description", {
              //   required: true,
              // })}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="unique_id_1c" value="Унікальне id, 1C" />
            </div>
            <TextInput
              disabled
              defaultValue={data.unique_id_1c}
              id="unique_id_1c"
              type="text"
              shadow
              // {...register("description", {
              //   required: true,
              // })}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="barcode" value="Штрихкод" />
            </div>
            <TextInput
              defaultValue={data.barcode}
              id="barcode"
              type="text"
              disabled
              shadow
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="artycul" value="Артикул" />
            </div>
            <TextInput
              defaultValue={data.artycul}
              id="artycul"
              type="text"
              disabled
              shadow
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="Кількість" />
            </div>
            <TextInput
              defaultValue={data.quantity}
              id="quantity"
              type="text"
              required
              shadow
              {...register("quantity", {
                required: true,
              })}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="img" value="Наявність" />
            </div>
            <select
              defaultValue={data.availability}
              {...register("availability", { required: true })}
            >
              <option value="out of stock">Ні</option>
              <option value="in stock">Так</option>
            </select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="img" value="Характеристики" />
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {data.info.map((item: any, i) => {
                return (
                  <div
                    key={i}
                    className="flex w-fit cursor-default gap-2 rounded-lg border-2 p-3"
                  >
                    <div>{item["g:attribute_name"]._text}</div>
                    <div>{"-"}</div>
                    <div>{item["g:attribute_value"]._text}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Категорія" />
            </div>
            <TextInput
              defaultValue={data.breadcrumbs}
              id="category"
              type="text"
              disabled
              shadow
              {...register("category", {
                required: true,
              })}
            />
          </div>
        </div>
        <Button type="submit" title="Змінити" />
      </div>
    </form>
  );
}
