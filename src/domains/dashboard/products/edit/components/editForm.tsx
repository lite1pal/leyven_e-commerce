"use client";

import Button from "@/components/base/Button";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import { Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormField from "./formField";
import FormSelectField from "./formSelectField";
import EditKeywords from "./editKeywords";
import { Suspense, useState } from "react";
import TextEditor from "./textEditor";
import EditInfo from "./editInfo";
import SelectCategories from "./selectCategories";

export default function EditForm({ data }: { data: Product }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const [keywords, setKeywords] = useState(data.keywords || "");
  const [description, setDescription] = useState(data.description || "");
  const [info, setInfo] = useState(data.info || [{}]);

  const onSubmit = async (fields: FieldValues) => {
    try {
      fields.id = data.id;
      fields.description = description;
      fields.keywords = keywords;
      fields.info = info;
      const res = await fetch(`${API_URL}/product`, {
        method: "PUT",
        body: JSON.stringify(fields),
      });
      const parsedRes = await res.json();
      if (!res.ok) {
        toast.error("Помилка зміни");
        console.error(parsedRes);
        return;
      }
      toast.success("Зміна успішна!");
      router.push("/dashboard/products");
    } catch (err) {
      console.error(err, "Failed to edit product data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-4">
      <div className="mb-6 flex max-w-2xl flex-col gap-10">
        <FormField
          id="title"
          label="Назва"
          defaultValue={data.title}
          required
          register={register}
          border
        />

        {/* Description Text Editor */}
        <div className="w-full">
          <div className="mb-2 block">
            <Label
              className="text-slate-900"
              htmlFor={"description"}
              value={"Опис"}
            />
          </div>

          <TextEditor
            description={description}
            register={register}
            setDescription={setDescription}
          />
        </div>

        <FormField
          id="price"
          label="Ціна"
          defaultValue={data.price}
          type={"number"}
          required
          register={register}
          border
        />

        <div className="flex flex-col gap-5">
          <FormField
            id="img"
            label="Посилання на картинку"
            defaultValue={data.img}
            register={register}
            required
            border
          />
          <div className="h-36 w-36">
            <img
              src={data.img}
              className="h-full w-full object-contain"
              alt={data.title + " - картинка"}
            />
          </div>
        </div>

        <FormField
          id="discount"
          label="Знижка %"
          defaultValue={data.discount}
          register={register}
          type="number"
          required
          border
        />
        {/* 
        <FormField
          id="unique_id"
          label="Унікальне id, Prom.ua"
          register={register}
          defaultValue={data.unique_id}
          required
        />

        <FormField
          id="unique_id_1c"
          label="Унікальне id, 1C"
          register={register}
          defaultValue={data.unique_id_1c}
          required
        /> */}

        {/* <FormField
          id="barcode"
          label="Штрихкод"
          register={register}
          defaultValue={data.barcode!}
        />

        <FormField
          id="artycul"
          label="Артикул"
          register={register}
          defaultValue={data.artycul!}
        /> */}

        <FormField
          id="quantity"
          label="Кількість"
          type="number"
          register={register}
          defaultValue={data.quantity}
          required
          border
        />

        <FormSelectField
          id="availability"
          label="Наявність"
          register={register}
        >
          <option value="in stock">Так</option>
          <option value="out of stock">Ні</option>
        </FormSelectField>

        <EditKeywords
          setKeywords={setKeywords}
          keywords={keywords}
          register={register}
        />

        <EditInfo {...{ data, info, setInfo }} />

        <Suspense>
          <SelectCategories {...{ data, register }} />
        </Suspense>
      </div>
      <Button type="submit" title="Змінити" />
    </form>
  );
}
