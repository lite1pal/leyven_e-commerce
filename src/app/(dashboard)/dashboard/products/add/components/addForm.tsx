"use client";

import Button from "@/components/Button";
import { API_URL } from "@/config/api";
import { categories } from "@/data/categories";
import { type Product } from "@/types";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectInput from "./selectInput";
import { countries } from "@/data/countries";
import { brands } from "@/data/brands";
import TextInput from "./textInput";
import { Suspense, useState } from "react";
import SelectCategories from "../../edit/[id]/components/selectCategories";
import EditInfo from "../../edit/[id]/components/editInfo";
import EditKeywords from "../../edit/[id]/components/editKeywords";
import FormSelectField from "../../edit/[id]/components/formSelectField";
import FormField from "../../edit/[id]/components/formField";
import { Label } from "flowbite-react";
import TextEditor from "../../edit/[id]/components/textEditor";
import MySpinner from "@/components/base/Spinner";

/*

[
    {
        "g:attribute_name":{"_text":"Країна виробник"},
        "g:attribute_value":{"_text":"Україна"}
    },
    {
        "g:attribute_name":{"_text":"Тип"},
        "g:attribute_value":{"_text":"Таблетки"}
    }
]
 */

type Info = {
  "g:attribute_name": { _text: string };
  "g:attribute_value": { _text: string };
};

export default function AddForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getFieldState,
    watch,
    reset,
    formState: { isDirty },
  } = useForm();

  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState([]);

  const watchCategory = watch("category", ""); // you can supply default value as second argument

  const onSubmit = async (fields: FieldValues) => {
    try {
      return;
      // fields.breadcrumbs =
      //   categories[fields.category].name +
      //   ">" +
      //   categories[fields.category].subCategories[fields.subCategory];
      // info.unshift({
      //   "g:attribute_name": { _text: "Країна виробник" },
      //   "g:attribute_value": { _text: fields.country },
      // });
      // fields.info = info;
      // const res = await fetch(`${API_URL}/product`, {
      //   method: "POST",
      //   body: JSON.stringify(fields),
      // });
      // const parsedRes: Product = await res.json();
      // console.log(parsedRes);
      // if (!res.ok) {
      //   toast.error("Помилка створення");
      //   reset();
      //   return;
      // }
      // toast.success("Створення успішне!");
      // router.push("/dashboard/products");
    } catch (err) {
      console.error(err, "Failed to edit product data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 px-4">
      <div className="mb-6 flex max-w-2xl flex-col gap-10">
        <FormField
          id="title"
          label="Назва"
          defaultValue={""}
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
          defaultValue={0}
          type={"number"}
          required
          register={register}
          border
        />

        <FormField
          id="img"
          label="Посилання на картинку"
          defaultValue={""}
          register={register}
          required
          border
        />

        <FormField
          id="discount"
          label="Знижка %"
          defaultValue={0}
          register={register}
          type="number"
          required
          border
        />

        <FormField
          id="barcode"
          label="Штрихкод"
          register={register}
          defaultValue={""}
        />

        <FormField
          id="artycul"
          label="Артикул"
          register={register}
          defaultValue={""}
        />

        <FormField
          id="quantity"
          label="Кількість"
          type="number"
          register={register}
          defaultValue={0}
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

        <EditInfo {...{ info, setInfo }} />

        <Suspense fallback={<MySpinner />}>
          <SelectCategories {...{ register }} />
        </Suspense>
      </div>
      {/* <Button type="submit" title="Додати товар" /> */}
    </form>
  );
}
